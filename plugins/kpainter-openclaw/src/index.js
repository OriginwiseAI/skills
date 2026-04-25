const DEFAULT_API_BASE_URL = "https://kpainter.ai/kp-app-api/v1";
const DEFAULT_TIMEOUT_MS = 30_000;
const CONTENT_TYPES = ["video", "static-video", "unify-video", "image", "h5", "slides"];
const OUTPUT_QUALITIES = ["1K", "2K", "4K"];
const ASPECT_RATIOS = ["16:9", "9:16"];
const TRIGGER_MODES = ["async", "sync"];
const SORT_OPTIONS = [
  "created_asc",
  "created_desc",
  "views_desc",
  "likes_desc",
  "published_asc",
  "published_desc",
];

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function trimToString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function buildNoInputSchema() {
  return {
    type: "object",
    additionalProperties: false,
    properties: {},
  };
}

function cleanObject(value) {
  const result = {};
  for (const [key, entry] of Object.entries(value)) {
    if (entry === undefined) continue;
    result[key] = entry;
  }
  return result;
}

function deepCloneJson(value) {
  return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
}

function resolveConfig(context) {
  const config = isRecord(context?.config) ? context.config : {};
  const apiBaseUrl = trimToString(config.apiBaseUrl) || DEFAULT_API_BASE_URL;
  const apiKey = trimToString(config.apiKey);
  const rawTimeout = Number(config.requestTimeoutMs);
  const requestTimeoutMs =
    Number.isFinite(rawTimeout) && rawTimeout >= 1000 ? Math.floor(rawTimeout) : DEFAULT_TIMEOUT_MS;

  return {
    apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
    apiKey,
    requestTimeoutMs,
  };
}

function ensureApiKey(config) {
  if (config.apiKey) return config.apiKey;
  throw new Error(
    'Missing KPainter API key. Set plugins.entries["kpainter-openclaw"].config.apiKey first.',
  );
}

function buildHeaders(config, needsAuth, extraHeaders = {}) {
  const headers = {
    Accept: "application/json",
    ...extraHeaders,
  };

  if (!needsAuth) {
    if (config.apiKey) {
      headers.Authorization = `Bearer ${config.apiKey}`;
      headers["X-KGP-Api-Key"] = config.apiKey;
    }
    return headers;
  }

  const apiKey = ensureApiKey(config);
  headers.Authorization = `Bearer ${apiKey}`;
  headers["X-KGP-Api-Key"] = apiKey;
  return headers;
}

function appendQuery(url, query) {
  if (!isRecord(query)) return;

  for (const [key, rawValue] of Object.entries(query)) {
    if (rawValue === undefined || rawValue === null || rawValue === "") continue;
    if (Array.isArray(rawValue)) {
      for (const item of rawValue) {
        if (item === undefined || item === null || item === "") continue;
        url.searchParams.append(key, String(item));
      }
      continue;
    }
    url.searchParams.set(key, String(rawValue));
  }
}

async function readResponsePayload(response) {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    return await response.text();
  } catch {
    return null;
  }
}

function buildApiError(response, payload) {
  const message =
    (isRecord(payload) && trimToString(payload.message)) ||
    (isRecord(payload) && Array.isArray(payload.detail) && trimToString(payload.detail[0]?.msg)) ||
    `KPainter API request failed with HTTP ${response.status}`;
  const error = new Error(message);
  error.status = response.status;
  error.payload = payload;
  return error;
}

async function requestJson(context, { method, path, query, body, needsAuth = false }) {
  const config = resolveConfig(context);
  const url = new URL(`${config.apiBaseUrl}${path}`);
  appendQuery(url, query);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.requestTimeoutMs);

  try {
    const headers = buildHeaders(
      config,
      needsAuth,
      body === undefined ? undefined : { "Content-Type": "application/json" },
    );

    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    const payload = await readResponsePayload(response);
    if (!response.ok) {
      throw buildApiError(response, payload);
    }

    return payload;
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`KPainter API request timed out after ${config.requestTimeoutMs}ms`);
    }
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

function buildExtraConfig(input) {
  const safeInput = isRecord(input) ? input : {};
  const extraConfig = isRecord(safeInput.extra_config) ? deepCloneJson(safeInput.extra_config) : {};

  if (trimToString(safeInput.output_quality) || trimToString(safeInput.aspect_ratio)) {
    const output = isRecord(extraConfig.output) ? extraConfig.output : {};
    if (trimToString(safeInput.output_quality)) output.quality = trimToString(safeInput.output_quality);
    if (trimToString(safeInput.aspect_ratio)) output.aspect_ratio = trimToString(safeInput.aspect_ratio);
    extraConfig.output = output;
  }

  if (trimToString(safeInput.voice_profile_id)) {
    extraConfig.voice_profile_id = trimToString(safeInput.voice_profile_id);
  }

  if (Number.isInteger(safeInput.scene_count)) {
    const staticVideo = isRecord(extraConfig.static_video) ? extraConfig.static_video : {};
    staticVideo.scene_count = safeInput.scene_count;
    extraConfig.static_video = staticVideo;
  }

  if (Number.isInteger(safeInput.target_duration_seconds)) {
    const unifyVideo = isRecord(extraConfig.unify_video) ? extraConfig.unify_video : {};
    unifyVideo.target_duration_seconds = safeInput.target_duration_seconds;
    extraConfig.unify_video = unifyVideo;
  }

  return Object.keys(extraConfig).length > 0 ? extraConfig : undefined;
}

function buildCreatePayload(input) {
  const safeInput = isRecord(input) ? input : {};
  const payload = cleanObject({
    topic_input: trimToString(safeInput.topic_input),
    description: trimToString(safeInput.description) || undefined,
    audience_profile: trimToString(safeInput.audience_profile) || undefined,
    language: trimToString(safeInput.language) || undefined,
    content_type: trimToString(safeInput.content_type) || undefined,
    trigger_mode: trimToString(safeInput.trigger_mode) || undefined,
    enable_retrieval: Boolean(safeInput.enable_retrieval),
    extra_config: buildExtraConfig(safeInput),
  });

  if (!payload.topic_input) {
    throw new Error("topic_input is required");
  }

  return payload;
}

function buildPublicUrl(publicToken) {
  const token = trimToString(publicToken);
  return token ? `https://kpainter.ai/knowledge/${token}` : null;
}

export default function registerKPainterPlugin(api) {
  api.registerTool({
    name: "kpainter_get_create_catalog",
    description:
      "Fetch the KPainter create catalog including languages, voices, and visual styles.",
    inputSchema: buildNoInputSchema(),
    handler: async (_input, context) =>
      requestJson(context, {
        method: "GET",
        path: "/knowledge/create-catalog",
      }),
  });

  api.registerTool({
    name: "kpainter_get_me",
    description: "Fetch the current KPainter account profile for the configured API key.",
    inputSchema: buildNoInputSchema(),
    handler: async (_input, context) =>
      requestJson(context, {
        method: "GET",
        path: "/users/me",
        needsAuth: true,
      }),
  });

  api.registerTool({
    name: "kpainter_get_credit_balance",
    description: "Fetch the current KPainter credits balance and recent transactions.",
    inputSchema: buildNoInputSchema(),
    handler: async (_input, context) =>
      requestJson(context, {
        method: "GET",
        path: "/users/me/credits",
        needsAuth: true,
      }),
  });

  api.registerTool({
    name: "kpainter_create_knowledge",
    description:
      "Create a KPainter explainer video, slides, GPT-Image-2 image, or interactive lesson from a prompt and optional output settings.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["topic_input"],
      properties: {
        topic_input: {
          type: "string",
          minLength: 1,
          maxLength: 10000,
          description: "Main topic or prompt for the KPainter creation request.",
        },
        description: {
          type: "string",
          maxLength: 10000,
          description: "Optional extra instruction or creative brief.",
        },
        audience_profile: {
          type: "string",
          maxLength: 1024,
          description: "Optional target audience description.",
        },
        language: {
          type: "string",
          maxLength: 32,
          description: "Preferred output language code such as zh or en.",
        },
        content_type: {
          type: "string",
          enum: CONTENT_TYPES,
          description: "KPainter content type.",
        },
        trigger_mode: {
          type: "string",
          enum: TRIGGER_MODES,
          description: "Use sync only for image requests; other types should stay async.",
        },
        enable_retrieval: {
          type: "boolean",
          description: "Allow KPainter planner retrieval/search when needed.",
        },
        output_quality: {
          type: "string",
          enum: OUTPUT_QUALITIES,
          description: "Convenience field mapped to extra_config.output.quality.",
        },
        aspect_ratio: {
          type: "string",
          enum: ASPECT_RATIOS,
          description: "Convenience field mapped to extra_config.output.aspect_ratio.",
        },
        voice_profile_id: {
          type: "string",
          description: "Optional KPainter voice profile id.",
        },
        scene_count: {
          type: "integer",
          minimum: 1,
          description: "Optional scene/page count for static-video or slides flows.",
        },
        target_duration_seconds: {
          type: "integer",
          minimum: 4,
          maximum: 90,
          description: "Optional target duration for unify-video.",
        },
        extra_config: {
          type: "object",
          additionalProperties: true,
          description:
            "Optional raw extra_config object. Convenience fields above merge into this payload.",
        },
      },
    },
    handler: async (input, context) => {
      const result = await requestJson(context, {
        method: "POST",
        path: "/knowledge",
        body: buildCreatePayload(input),
        needsAuth: true,
      });

      return cleanObject({
        ...result,
        public_url: buildPublicUrl(result?.public_token),
      });
    },
  });

  api.registerTool({
    name: "kpainter_list_knowledge",
    description: "List the current user's KPainter creations with optional filters.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        page: {
          type: "integer",
          minimum: 1,
          default: 1,
        },
        page_size: {
          type: "integer",
          minimum: 1,
          maximum: 100,
          default: 20,
        },
        status: {
          type: "string",
          description: "Optional status filter such as queued, processing, ready, or failed.",
        },
        content_type: {
          anyOf: [
            {
              type: "string",
              enum: CONTENT_TYPES,
            },
            {
              type: "array",
              items: {
                type: "string",
                enum: CONTENT_TYPES,
              },
            },
          ],
          description: "One content type or a list of content types.",
        },
        language: {
          type: "string",
          description: "Optional language code filter.",
        },
        query: {
          type: "string",
          description: "Optional fuzzy search query.",
        },
        sort: {
          type: "string",
          enum: SORT_OPTIONS,
          default: "created_desc",
        },
      },
    },
    handler: async (input, context) =>
      requestJson(context, {
        method: "GET",
        path: "/knowledge",
        query: cleanObject({
          page: input?.page,
          page_size: input?.page_size,
          status: trimToString(input?.status) || undefined,
          content_type: Array.isArray(input?.content_type)
            ? input.content_type
            : trimToString(input?.content_type) || undefined,
          language: trimToString(input?.language) || undefined,
          query: trimToString(input?.query) || undefined,
          sort: trimToString(input?.sort) || undefined,
        }),
        needsAuth: true,
      }),
  });

  api.registerTool({
    name: "kpainter_get_knowledge",
    description: "Fetch one KPainter creation by knowledge id.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["knowledge_id"],
      properties: {
        knowledge_id: {
          type: "integer",
          minimum: 1,
        },
      },
    },
    handler: async (input, context) =>
      requestJson(context, {
        method: "GET",
        path: `/knowledge/${input.knowledge_id}`,
        needsAuth: true,
      }),
  });

  api.registerTool({
    name: "kpainter_get_job_status",
    description: "Fetch one KPainter job status by job id.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["job_id"],
      properties: {
        job_id: {
          type: "integer",
          minimum: 1,
        },
      },
    },
    handler: async (input, context) =>
      requestJson(context, {
        method: "GET",
        path: `/knowledge/jobs/${input.job_id}/status`,
        needsAuth: true,
      }),
  });

  api.registerTool({
    name: "kpainter_get_knowledge_status",
    description: "Fetch KPainter knowledge status by knowledge id.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["knowledge_id"],
      properties: {
        knowledge_id: {
          type: "integer",
          minimum: 1,
        },
      },
    },
    handler: async (input, context) =>
      requestJson(context, {
        method: "GET",
        path: `/knowledge/${input.knowledge_id}/status`,
        needsAuth: true,
      }),
  });
}

const DEFAULT_API_BASE_URL = "https://api.kpainter.ai/openapi/v1";
const DEFAULT_TIMEOUT_MS = 30_000;
const CONTENT_TYPES = [
  "explainer_video",
  "knowledge_video",
  "vector_animation",
  "image",
  "ai_video",
  "slide_deck",
  "interactive_lesson",
];
const OUTPUT_QUALITIES = ["1K", "2K", "4K"];
const ASPECT_RATIOS = ["16:9", "9:16", "3:2", "2:3", "1:1"];
const EDIT_ACTIONS = ["update_scene_narration", "regenerate_scene", "iterate"];

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function trimToString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanObject(value) {
  return Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined));
}

function noInputSchema() {
  return { type: "object", additionalProperties: false, properties: {} };
}

function resolveConfig(context) {
  const config = isRecord(context?.config) ? context.config : {};
  const rawTimeout = Number(config.requestTimeoutMs);
  return {
    apiBaseUrl: (trimToString(config.apiBaseUrl) || DEFAULT_API_BASE_URL).replace(/\/+$/, ""),
    apiKey: trimToString(config.apiKey),
    requestTimeoutMs:
      Number.isFinite(rawTimeout) && rawTimeout >= 1_000
        ? Math.floor(rawTimeout)
        : DEFAULT_TIMEOUT_MS,
  };
}

function requireApiKey(config) {
  if (config.apiKey) return config.apiKey;
  throw new Error('Missing KPainter API key. Configure plugins.entries["kpainter-openclaw"].config.apiKey.');
}

function appendQuery(url, query) {
  for (const [key, value] of Object.entries(query || {})) {
    if (value === undefined || value === null || value === "") continue;
    url.searchParams.set(key, String(value));
  }
}

async function readPayload(response) {
  const contentType = response.headers.get("content-type") || "";
  return contentType.includes("application/json") ? response.json() : response.text();
}

async function requestJson(context, { method, path, query, body, authenticated = true }) {
  const config = resolveConfig(context);
  const url = new URL(`${config.apiBaseUrl}${path}`);
  appendQuery(url, query);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), config.requestTimeoutMs);

  try {
    const headers = { Accept: "application/json" };
    if (authenticated) {
      const apiKey = requireApiKey(config);
      headers.Authorization = `Bearer ${apiKey}`;
      headers["X-KGP-Api-Key"] = apiKey;
    }
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
    const payload = await readPayload(response);
    if (!response.ok) {
      const detail = isRecord(payload?.detail) ? payload.detail : payload;
      const message = trimToString(detail?.message) || `KPainter API request failed with HTTP ${response.status}`;
      const error = new Error(message);
      error.status = response.status;
      error.payload = payload;
      throw error;
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

function buildCreatePayload(input) {
  const imageGeneration = cleanObject({
    provider: trimToString(input?.image_provider) || undefined,
    model: trimToString(input?.image_model) || undefined,
    size: trimToString(input?.image_size) || undefined,
    quality: trimToString(input?.image_quality) || undefined,
  });
  const videoGeneration = cleanObject({
    model: trimToString(input?.video_model) || undefined,
    task: trimToString(input?.video_task) || undefined,
    resolution: trimToString(input?.video_resolution) || undefined,
    duration_seconds: input?.video_duration_seconds,
    native_audio: input?.video_native_audio,
  });

  return cleanObject({
    type: trimToString(input?.type),
    prompt: trimToString(input?.prompt),
    instructions: trimToString(input?.instructions) || undefined,
    language: trimToString(input?.language) || undefined,
    aspect_ratio: trimToString(input?.aspect_ratio) || undefined,
    output_quality: trimToString(input?.output_quality) || undefined,
    voice_id: trimToString(input?.voice_id) || undefined,
    style_id: trimToString(input?.style_id) || undefined,
    duration_seconds: input?.duration_seconds,
    scene_count: input?.scene_count,
    image_generation: Object.keys(imageGeneration).length ? imageGeneration : undefined,
    video_generation: Object.keys(videoGeneration).length ? videoGeneration : undefined,
  });
}

export default function registerKPainterPlugin(api) {
  api.registerTool({
    name: "kpainter_get_me",
    description: "Validate the configured KPainter Public OpenAPI key.",
    inputSchema: noInputSchema(),
    handler: async (_input, context) => requestJson(context, { method: "GET", path: "/me" }),
  });

  api.registerTool({
    name: "kpainter_get_catalog",
    description: "Read KPainter product, generation-model, voice, style, and limit capabilities.",
    inputSchema: noInputSchema(),
    handler: async (_input, context) => requestJson(context, { method: "GET", path: "/catalog" }),
  });

  api.registerTool({
    name: "kpainter_create_creation",
    description: "Create a KPainter result. Call kpainter_get_catalog first.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["type", "prompt"],
      properties: {
        type: { type: "string", enum: CONTENT_TYPES },
        prompt: { type: "string", minLength: 1, maxLength: 10000 },
        instructions: { type: "string", maxLength: 10000 },
        language: { type: "string", maxLength: 32 },
        aspect_ratio: { type: "string", enum: ASPECT_RATIOS },
        output_quality: { type: "string", enum: OUTPUT_QUALITIES },
        voice_id: { type: "string" },
        style_id: { type: "string" },
        duration_seconds: { type: "integer", minimum: 4, maximum: 90 },
        scene_count: { type: "integer", minimum: 1, maximum: 20 },
        image_provider: { type: "string", enum: ["gemini", "azure_openai"] },
        image_model: { type: "string" },
        image_size: { type: "string", enum: ["1536x1024", "1024x1536", "1024x1024"] },
        image_quality: { type: "string", enum: ["low", "medium", "high"] },
        video_model: {
          type: "string",
          enum: ["gemini-omni-flash", "veo-3.1-fast", "veo-3.1-standard"],
        },
        video_task: { type: "string", enum: ["text_to_video"] },
        video_resolution: { type: "string", enum: ["720p", "1080p", "4K"] },
        video_duration_seconds: { type: "integer", minimum: 3, maximum: 10 },
        video_native_audio: { type: "boolean", const: true },
      },
    },
    handler: async (input, context) => {
      const body = buildCreatePayload(input);
      if (!body.type || !body.prompt) throw new Error("type and prompt are required");
      return requestJson(context, { method: "POST", path: "/creations", body });
    },
  });

  api.registerTool({
    name: "kpainter_list_creations",
    description: "List creations owned by the configured API key.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      properties: {
        page: { type: "integer", minimum: 1, default: 1 },
        page_size: { type: "integer", minimum: 1, maximum: 100, default: 20 },
        type: { type: "string", enum: CONTENT_TYPES },
        status: { type: "string", enum: ["queued", "processing", "ready", "failed", "invalid"] },
        query: { type: "string" },
      },
    },
    handler: async (input, context) =>
      requestJson(context, { method: "GET", path: "/creations", query: input }),
  });

  api.registerTool({
    name: "kpainter_get_creation",
    description: "Read one creation, its artifacts, editable actions, and scenes.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["creation_id"],
      properties: { creation_id: { type: "integer", minimum: 1 } },
    },
    handler: async (input, context) =>
      requestJson(context, { method: "GET", path: `/creations/${input.creation_id}` }),
  });

  api.registerTool({
    name: "kpainter_get_job_status",
    description: "Poll one KPainter create or edit job.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["job_id"],
      properties: { job_id: { type: "integer", minimum: 1 } },
    },
    handler: async (input, context) =>
      requestJson(context, { method: "GET", path: `/creations/jobs/${input.job_id}` }),
  });

  api.registerTool({
    name: "kpainter_edit_creation",
    description: "Edit one scene or iterate an editable Gemini Omni Flash AI Video.",
    inputSchema: {
      type: "object",
      additionalProperties: false,
      required: ["creation_id", "action"],
      properties: {
        creation_id: { type: "integer", minimum: 1 },
        action: { type: "string", enum: EDIT_ACTIONS },
        scene_id: { type: "string" },
        prompt: { type: "string", maxLength: 10000 },
        narration_text: { type: "string", maxLength: 10000 },
        voice_id: { type: "string" },
      },
    },
    handler: async (input, context) => {
      const body = cleanObject({
        action: input.action,
        scene_id: trimToString(input.scene_id) || undefined,
        prompt: trimToString(input.prompt) || undefined,
        narration_text: trimToString(input.narration_text) || undefined,
        voice_id: trimToString(input.voice_id) || undefined,
      });
      return requestJson(context, {
        method: "POST",
        path: `/creations/${input.creation_id}/edit`,
        body,
      });
    },
  });
}

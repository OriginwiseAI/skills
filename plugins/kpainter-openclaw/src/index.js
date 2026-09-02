const DEFAULT_API_BASE_URL = "https://api.kpainter.ai/openapi/v1";
const DEFAULT_TIMEOUT_MS = 30_000;
const TYPES = ["video", "image", "app"];

const noInput = () => ({ type: "object", additionalProperties: false, properties: {} });
const object = (properties, required = []) => ({ type: "object", additionalProperties: false, properties, required });

function config(context) {
  const value = context?.config && typeof context.config === "object" ? context.config : {};
  return {
    apiBaseUrl: (String(value.apiBaseUrl || DEFAULT_API_BASE_URL)).replace(/\/+$/, ""),
    apiKey: String(value.apiKey || "").trim(),
    timeout: Number.isFinite(Number(value.requestTimeoutMs)) ? Number(value.requestTimeoutMs) : DEFAULT_TIMEOUT_MS,
  };
}

async function request(context, { method, path, body, form }) {
  const settings = config(context);
  if (!settings.apiKey) throw new Error("Configure the KPainter API key before calling this tool.");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), settings.timeout);
  try {
    const headers = { Accept: "application/json", Authorization: `Bearer ${settings.apiKey}` };
    if (body !== undefined) headers["Content-Type"] = "application/json";
    const response = await fetch(`${settings.apiBaseUrl}${path}`, {
      method,
      headers,
      body: form || (body === undefined ? undefined : JSON.stringify(body)),
      signal: controller.signal,
    });
    const payload = (response.headers.get("content-type") || "").includes("application/json") ? await response.json() : await response.text();
    if (!response.ok) throw new Error(typeof payload?.detail === "string" ? payload.detail : `KPainter API request failed with HTTP ${response.status}`);
    return payload;
  } finally {
    clearTimeout(timer);
  }
}

function creationSchema() {
  return object({
    type: { type: "string", enum: TYPES },
    prompt: { type: "string", minLength: 1 },
    instructions: { type: "string" },
    input_file_ids: { type: "array", items: { type: "string" } },
    max_credits: { type: "integer", minimum: 1 },
    video: object({
      duration_seconds: { type: "integer", enum: [120, 240, 360, 510, 900, 1500] },
      aspect_ratio: { type: "string", const: "16:9" },
      language: { type: "string" },
      voice_id: { type: "string" },
      template_id: { type: "string" },
      expression_style_id: { type: "string" },
    }),
    image: object({
      provider: { type: "string", enum: ["gemini", "azure_openai"] },
      model: { type: "string", enum: ["nano-banana-2", "gpt-image-2"] },
      aspect_ratio: { type: "string", enum: ["16:9", "9:16", "3:2", "2:3", "1:1"] },
      output_quality: { type: "string", enum: ["1K", "2K", "4K"] },
      quality: { type: "string", enum: ["low", "medium", "high"] },
      style_id: { type: "string" },
    }),
    app: object({ language: { type: "string" } }),
  }, ["type", "prompt"]);
}

export default function register(api) {
  api.registerTool({ name: "kpainter_capabilities", description: "Read supported KPainter types, source files, and account limits.", inputSchema: noInput(), handler: (_input, context) => request(context, { method: "GET", path: "/capabilities" }) });
  api.registerTool({
    name: "kpainter_upload_file", description: "Upload one base64 source file and return file_id.",
    inputSchema: object({ name: { type: "string" }, mime_type: { type: "string" }, content_base64: { type: "string" } }, ["name", "mime_type", "content_base64"]),
    handler: (input, context) => {
      const form = new FormData();
      form.append("file", new Blob([Buffer.from(input.content_base64, "base64")], { type: input.mime_type }), input.name);
      return request(context, { method: "POST", path: "/files", form });
    },
  });
  api.registerTool({ name: "kpainter_create", description: "Create one video, image, or app.", inputSchema: creationSchema(), handler: (input, context) => request(context, { method: "POST", path: "/creations", body: input }) });
  api.registerTool({ name: "kpainter_list", description: "List unified KPainter creations.", inputSchema: object({ type: { type: "string", enum: TYPES }, page: { type: "integer", minimum: 1 }, page_size: { type: "integer", minimum: 1, maximum: 100 } }), handler: (input, context) => { const query = new URLSearchParams(Object.entries(input).filter(([, value]) => value !== undefined).map(([key, value]) => [key, String(value)])); return request(context, { method: "GET", path: `/creations${query.size ? `?${query}` : ""}` }); } });
  api.registerTool({ name: "kpainter_get", description: "Read a creation's safe state and available actions.", inputSchema: object({ creation_id: { type: "string" } }, ["creation_id"]), handler: (input, context) => request(context, { method: "GET", path: `/creations/${encodeURIComponent(input.creation_id)}` }) });
  api.registerTool({ name: "kpainter_message", description: "Ask about or change a video; accepted changes continue automatically.", inputSchema: object({ creation_id: { type: "string" }, content: { type: "string" }, input_file_ids: { type: "array", items: { type: "string" } }, idempotency_key: { type: "string", minLength: 8 } }, ["creation_id", "content"]), handler: (input, context) => { const { creation_id, ...body } = input; return request(context, { method: "POST", path: `/creations/${encodeURIComponent(creation_id)}/messages`, body }); } });
  api.registerTool({ name: "kpainter_act", description: "Perform the latest server-advertised paused-creation action.", inputSchema: object({ creation_id: { type: "string" }, action: { type: "string", enum: ["resume_after_recharge", "approve_overage", "retry"] }, idempotency_key: { type: "string", minLength: 8 } }, ["creation_id", "action", "idempotency_key"]), handler: (input, context) => { const { creation_id, ...body } = input; return request(context, { method: "POST", path: `/creations/${encodeURIComponent(creation_id)}/actions`, body }); } });
  api.registerTool({ name: "kpainter_outputs", description: "Read QA-approved outputs for a ready creation.", inputSchema: object({ creation_id: { type: "string" } }, ["creation_id"]), handler: (input, context) => request(context, { method: "GET", path: `/creations/${encodeURIComponent(input.creation_id)}/outputs` }) });
}

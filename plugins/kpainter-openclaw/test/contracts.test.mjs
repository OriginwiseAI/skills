import assert from "node:assert/strict";
import test from "node:test";
import register from "../src/index.js";

function tools() { const found = new Map(); register({ registerTool(tool) { found.set(tool.name, tool); } }); return found; }
const context = { config: { apiBaseUrl: "https://example.test/openapi/v1", apiKey: "test-key" } };

test("registers only the unified creation tools", () => {
  const found = tools();
  assert.deepEqual([...found.keys()].sort(), ["kpainter_act", "kpainter_capabilities", "kpainter_create", "kpainter_get", "kpainter_list", "kpainter_message", "kpainter_outputs", "kpainter_upload_file"].sort());
  assert.deepEqual(found.get("kpainter_create").inputSchema.properties.type.enum, ["video", "image", "app"]);
});

test("routes unified snake_case calls through /openapi/v1 and bearer auth", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url: String(url), options }); return new Response(JSON.stringify({ id: "cr_test", type: "video", status: "planning", prompt: "test", progressPct: 0, availableActions: [] }), { headers: { "content-type": "application/json" } }); };
  await tools().get("kpainter_create").handler({ type: "video", prompt: "Explain attention", video: { duration_seconds: 120, aspect_ratio: "16:9" } }, context);
  assert.equal(new URL(calls[0].url).pathname, "/openapi/v1/creations");
  assert.equal(calls[0].options.headers.Authorization, "Bearer test-key");
  const body = JSON.parse(calls[0].options.body);
  assert.equal(body.type, "video");
  assert.equal(body.video.duration_seconds, 120);
  assert.equal("durationSeconds" in body.video, false);
});

test("keeps OpenClaw names while matching the recovery contract", () => {
  const action = tools().get("kpainter_act").inputSchema;
  assert.deepEqual(action.required, ["creation_id", "action", "idempotency_key"]);
  assert.deepEqual(action.properties.action.enum, ["resume_after_recharge", "approve_overage", "retry"]);
  assert.equal("quote_id" in action.properties, false);
  assert.equal("repair_media" in action.properties.action.enum, false);
});

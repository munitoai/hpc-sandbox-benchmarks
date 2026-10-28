import { defineProviderMeta } from "../provider-meta.ts";

export default defineProviderMeta("munito", {
	displayName: "Munito Sandboxes",
	vendor: "Munito",
	website: "https://munito.ai",
	// No client library exists; the adapter calls the documented REST API (see packages/munito).
	sdkPackage: "Munito Sandboxes API",
	// Boots Munito's own `base` template; the API takes no image.
	artifact: { kind: "none" },
	inputs: [
		"MUNITO_API_KEY",
		{ name: "MUNITO_SANDBOXES_URL", source: { kind: "variable" }, required: false },
	],
	isolation: {
		class: "microVM",
		technology: "Firecracker microVM",
		notes: "Each sandbox is a Firecracker microVM with its own guest kernel. Commands run as root.",
	},
	pricing: {
		model: "unavailable",
		reason: "unpublished",
		notes:
			"Sandboxes is a preview for some organizations, and Munito has not published its prices.",
	},
	maturity: {
		status: "beta",
		notes:
			"Native REST driver for create, readiness, command exec with streamed output, files, inventory by a metadata marker, and delete teardown; opt-in. A create sets the root disk from 10 to 100 GiB, so the benchmark's 40 GB target maps onto it. The stock `base` template is Debian 12 with a runtime-installed toolchain rather than the shared toolchain image.",
	},
	// A create names a preset or sets vCPUs and memory itself, and sets its disk.
	specPinning: "settable",
	transport: {
		streaming: false,
		syncCapMs: 60_000,
		detachedPoll: true,
	},
});

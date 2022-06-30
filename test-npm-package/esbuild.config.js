const esbuild = require("esbuild");
// Automatically exclude all node_modules from the bundled version
const { nodeExternalsPlugin } = require("esbuild-node-externals");
const { Generator } = require("npm-dts");

const shared = {
  entryPoints: ["./src/test.ts"],
  bundle: true,
  minify: false,
  platform: "node",
  sourcemap: true,
  target: "node16",
  plugins: [nodeExternalsPlugin()],
  define: { "process.env.NODE_ENV": '"development"' },
};

esbuild
  .build({
    ...shared,
    outfile: "dist/index.js",
  })
  .catch(() => process.exit(1));

esbuild
  .build({
    ...shared,
    format: "esm",
    outfile: "dist/index.esm.js",
  })
  .catch(() => process.exit(1));

new Generator({
  entry: "src/test.ts",
  output: "dist/index.d.ts",
}).generate();

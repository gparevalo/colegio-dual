import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import * as fs from "fs";
import path from "path";

// server deps to bundle to reduce openat(2) syscalls
const allowlist = [
  "@google/generative-ai",
  "axios",
  "connect-pg-simple",
  "cors",
  "date-fns",
  "drizzle-orm",
  "drizzle-zod",
  "express",
  "express-rate-limit",
  "express-session",
  "jsonwebtoken",
  "memorystore",
  "multer",
  "nanoid",
  "nodemailer",
  "openai",
  "passport",
  "passport-local",
  "pg",
  "stripe",
  "uuid",
  "ws",
  "xlsx",
  "zod",
  "zod-validation-error",
];

async function buildAll() {
  await fs.promises.rm("dist", { recursive: true, force: true });
  await fs.promises.rm("deploy", { recursive: true, force: true });

  console.log("building client...");
  await viteBuild();

  console.log("copying client to wp-theme-colegio (dist/public)...");
  const wpThemePath = path.resolve("wp-theme-colegio/dist/public");
  await fs.promises.mkdir(wpThemePath, { recursive: true });
  await fs.promises.cp("dist/public", wpThemePath, {
    recursive: true,
  });

  console.log("generating deployment package in deploy/wp-theme-colegio...");
  const deployPath = path.resolve("deploy/wp-theme-colegio");
  await fs.promises.mkdir(deployPath, { recursive: true });

  await fs.promises.cp("wp-theme-colegio", deployPath, {
    recursive: true,
    filter: (src) => {
      const b = path.basename(src);
      return b !== 'Archivo.zip' && b !== '.DS_Store';
    }
  });

  console.log("building server...");
  const pkg = JSON.parse(await fs.promises.readFile("package.json", "utf-8"));
  const allDeps = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.devDependencies || {}),
  ];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: ["server/index.ts"],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: "dist/index.cjs",
    define: {
      "process.env.NODE_ENV": '"production"',
    },
    minify: true,
    external: externals,
    logLevel: "info",
  });

  console.log("✅ Build completo y copiado a deploy/wp-theme-colegio");
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
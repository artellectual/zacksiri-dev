import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import { SITE } from "./src/config";

export default defineConfig({
  site: SITE.website,
  output: "static",
  // Preserve HTML whitespace behavior from Astro 4.
  compressHTML: true,
  redirects: {
    "/posts/work-distribution-with-jump-consistent-hashing":
      "/posts/work-distribution-with-jump-consistent-hash",
  },
  integrations: [react(), sitemap()],
  markdown: {
    // Keep the existing TOC/collapse plugins instead of changing Markdown engines.
    processor: unified({
      remarkPlugins: [
        remarkToc,
        [remarkCollapse, { test: "Table of contents" }],
      ],
    }),
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  vite: {
    css: {
      // @astrojs/tailwind does not support Astro 7. Retain Tailwind 3 directly.
      postcss: {
        plugins: [tailwindcss(), autoprefixer()],
      },
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  scopedStyleStrategy: "where",
});

import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import remarkGfm from "remark-gfm";

export default defineConfig({
  site: "https://ryan-papa.github.io",
  base: "/ai-guide/",
  integrations: [mdx(), tailwind()],
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: "github-dark",
    },
  },
});

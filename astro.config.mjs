import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://your-username.github.io",
  base: "/ai-guide",
  integrations: [mdx(), tailwind()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
});

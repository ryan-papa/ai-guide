import { defineCollection, z } from "astro:content";

const guideSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  category: z.enum(["ai-basics", "ai-history", "engineering", "claude-code"]),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

const aiBasics = defineCollection({
  type: "content",
  schema: guideSchema,
});

const aiHistory = defineCollection({
  type: "content",
  schema: guideSchema,
});

const engineering = defineCollection({
  type: "content",
  schema: guideSchema,
});

const claudeCode = defineCollection({
  type: "content",
  schema: guideSchema,
});

export const collections = {
  "ai-basics": aiBasics,
  "ai-history": aiHistory,
  engineering,
  "claude-code": claudeCode,
};

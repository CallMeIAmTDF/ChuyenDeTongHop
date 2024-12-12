import z from "zod";

export const CreateBody = z
  .object({
    name: z.string({ required_error: "Required information" }).trim().max(256),
    image: z
      .string()
      .trim()
  })
  .strict();

export type CreateBodyType = z.TypeOf<typeof CreateBody>;

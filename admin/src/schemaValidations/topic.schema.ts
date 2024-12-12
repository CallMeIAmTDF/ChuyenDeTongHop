import z from "zod";

export const CreateBody = z
  .object({
    name: z.string({ required_error: "Required information" }).trim().max(256),
    levelId: z
      .number({ required_error: "Required information" })
  })
  .strict();

export type CreateBodyType = z.TypeOf<typeof CreateBody>;

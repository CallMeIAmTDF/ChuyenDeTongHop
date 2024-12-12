import z from "zod";

export const CreateBody = z
  .object({
    word: z.string({ required_error: "Required information" }).trim().max(256),
    pronun: z.string({ required_error: "Required information" }).trim().max(256),
    entype: z.string({ required_error: "Required information" }).trim().max(256),
    vietype: z.string({ required_error: "Required information" }).trim().max(256),
    voice: z.string({ required_error: "Required information" }).trim().max(256),
    photo: z.string({ required_error: "Required information" }).trim().max(256),
    meaning: z.string({ required_error: "Required information" }).trim().max(256),
    endesc: z.string({ required_error: "Required information" }).trim().max(256),
    viedesc: z.string({ required_error: "Required information" }).trim().max(256),
    topicId: z.number({ required_error: "Required information" })
  })
  .strict();

export type CreateBodyType = z.TypeOf<typeof CreateBody>;
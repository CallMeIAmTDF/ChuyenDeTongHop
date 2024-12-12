import z from 'zod'

export const AccountRes = z
  .object({
    data: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      gender: z.string(),
      address: z.string(),
      dob: z.date(),
      company: z.object({
        id: z.number(),
        name: z.string()
      }),
      role: z.object({
        id: z.number(),
        name: z.string()
      }),
      mobile_number: z.string(),
      no_password: z.boolean()
    }),
    message: z.string()
  })
  .strict()

export type AccountResType = z.TypeOf<typeof AccountRes>

export const UpdateMeBody = z.object({
  name: z.string().trim().min(2).max(256)
})

export type UpdateMeBodyType = z.TypeOf<typeof UpdateMeBody>

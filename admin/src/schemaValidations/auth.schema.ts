import z from "zod";

export const RegisterBody = z
  .object({
    name: z.string({ required_error: "Required information" }).trim().max(256),
    email: z
      .string({ required_error: "Required information" })
      .trim()
      .email("Email không đúng định dạng")
      .max(256),
    password: z
      .string({ required_error: "Required information" })
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự",
      })
      .max(30),
    // confirmPassword: z.string().min(6).max(30),
  })
  .strict();
// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "Mật khẩu không khớp",
//       path: ["confirmPassword"],
//     });
//   }
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z
      .string({ required_error: "Required information" })
      .trim()
      .email("Email không đúng định dạng")
      .max(256),
    password: z
      .string({ required_error: "Required information" })
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự",
      })
      .max(30),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export const LoginRes = z.object({
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
    role: z.string(),
    image: z.string(),
  }),
  access_token: z.string(),
  refresh_token: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

import z from "zod";

export const ForgotPasswordBody = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, {
        message: "Required information",
      })
      .email("Email không đúng định dạng")
      .max(256),
  })
  .strict();

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>;

export const EditPasswordBody = z
  .object({
    password: z
      .string({})
      .nonempty({ message: "Required information" })
      .min(8, {Required information
        message: "Mật khẩu phải có ít nhất 8 ký tự",
      })
      .max(30),
    confirmPassword: z
      .string()
      .nonempty({ message: "Required information" })
      .min(8, {
        message: "Mật khẩu phải có ít nhất 8 ký tự",
      })
      .max(30),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu xác nhận không giống Mật khẩu mới",
        path: ["confirmPassword"],
      });
    }
  });

export type EditPasswordBodyType = z.TypeOf<typeof EditPasswordBody>;

export type NewPasswordReq = {
  code: string;
  password: string;
};

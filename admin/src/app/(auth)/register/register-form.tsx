"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterBody,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import authApiRequest from "@/apiRequests/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

const RegisterForm = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const form = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
    mode: "all",
    defaultValues: {
      name: "Hoàng Tuấn Anh",
      email: "user@gmail.com",
      password: "12345678",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: RegisterBodyType) {
    const resRegister = await authApiRequest.sRegister(values);

    if (resRegister.payload.code === 201) {
      // form.reset();    
      router.push(`/verify?email=${values.email}`);
    } else if (resRegister.payload.code === 409) {
      form.setError('email', {
        type: "invalid",
        message: "Email đã được đăng ký",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 flex-shrink-0 w-full"
        noValidate
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Họ và Tên <abbr className="text-red-600">*</abbr>
              </FormLabel>
              <FormControl>
                <Input className="h-11" placeholder="Họ và Tên" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <abbr className="text-red-600">*</abbr>
              </FormLabel>
              <FormControl>
                <Input
                  className="h-11"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Mật khẩu <abbr className="text-red-600">*</abbr>
              </FormLabel>

              <FormControl>
                <Input
                  className="h-11"
                  placeholder="Mật khẩu"
                  type="password"
                  {...field}
                />
                {/* <PasswordInput/> */}
                {/* <PasswordInput
                  id="password_confirmation"
                  // value={passwordConfirmation}
                  // onChange={(e) => setPasswordConfirmation(e.target.value)}
                  autoComplete="new-password"
                /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <label
          htmlFor="termRegister"
          className="my-4 text-[#414042] text-[16px] font-medium cursor-pointer inline-block group select-none"
        >
          <div
            className={
              isChecked
                ? "inline-flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-[#cb4040] group-hover:bg-opacity-20"
                : "inline-flex h-12 w-12 items-center justify-center rounded-full group-hover:bg-[#a6a6a6] group-hover:bg-opacity-20"
            }
          >
            <Checkbox
              onCheckedChange={() => {
                setIsChecked(!isChecked);
              }}
              id="termRegister"
              className={
                isChecked
                  ? "data-[state=checked]:bg-primary[data-state=checked] w-6 h-6 border-red-600 border-2 bg-red-600"
                  : "w-6 h-6  border-2"
              }
            />
          </div>
          Tôi đã đọc và đồng ý với các{" "}
          <Link href={"#"} className="text-[#0e2eed]">
            Điều khoản dịch vụ
          </Link>{" "}
          và{" "}
          <Link href={"#"} className="text-[#0e2eed]">
            Chính sách quyền riêng tư
          </Link>{" "}
          của ITviec liên quan đến thông tin riêng tư của bạn.
        </label>

        <Button
          type="submit"
          className={
            isChecked
              ? "!mt-8 w-full h-11 bg-[#ED1B2F] hover:bg-[#c83333] text-[16px]"
              : "!mt-8 w-full h-11 bg-[#a6a6a6] text-[16px] pointer-events-none"
          }
        >
          Đăng ký bằng Email
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;

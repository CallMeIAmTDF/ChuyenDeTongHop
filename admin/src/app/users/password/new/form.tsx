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
  ForgotPasswordBody,
  ForgotPasswordBodyType,
} from "@/schemaValidations/user.schema";

import { useRouter } from "next/navigation";
import Link from "next/link";
import userApiRequest from "@/apiRequests/users";
import { useState } from "react";

const NewPasswordForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<ForgotPasswordBodyType>({
    resolver: zodResolver(ForgotPasswordBody),
    mode: "all",
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordBodyType) {
    const { payload } = await userApiRequest.sForgotPassword(values);

    if (payload.code === 200) {
      router.push(`/verify?email=${values.email}`);
    } else if (payload.code === 404) {
      setError("Oops! Email không tồn tại, vui lòng thử lại.");
    } else if (payload.code === 400) {
      setError(
        "Email này đã dùng để đăng ký qua tài khoản Google.\nVui lòng đăng nhập bằng Google"
      );
    }
  }

  return (
    <>
      {error && <div className="mb-4 text-[#f60d00] text-base">{error}</div>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 flex-shrink-0 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email của bạn <abbr className="text-red-600">*</abbr>
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    placeholder="Email của bạn"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="!mt-8 w-full h-11 bg-[#ED1B2F] hover:bg-[#c83333] text-[16px]"
          >
            Đặt lại mật khẩu
          </Button>
          <div className=" flex items-center justify-center text-sm font-normal">
            HOẶC
          </div>

          <Link href={"/login"}>
            <Button
              className="w-full h-11 mt-4 border-[#ed1b2f] text-[#ed1b2f] font-semibold text-[16px] hover:bg-[#fff5f5] hover:text-[#ed1b2f] select-none "
              variant="outline"
            >
              Đăng nhập
            </Button>
          </Link>
        </form>
      </Form>
    </>
  );
};

export default NewPasswordForm;

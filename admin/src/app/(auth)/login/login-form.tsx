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
import { LoginBodyType, LoginBody } from "@/schemaValidations/auth.schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Description } from "@radix-ui/react-toast";
import Link from "next/link";
import { useLoginMutation, useLogoutMutation } from "@/queries/useAuth";
import { useAppStore } from "@/components/app-provider";
import { decodeJWT, getAccessTokenFormLocalStorage } from "@/lib/utils";

const LoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();

  const setRole = useAppStore((state) => state.setRole);
  const setImage = useAppStore((state) => state.setImage);
  const setName = useAppStore((state) => state.setName);
  const setNoPassword = useAppStore((state) => state.setNoPassword);

  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    mode: "all",
    defaultValues: {
      email: "admin@gmail.com",
      password: "12345678",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: LoginBodyType) {
    if (loginMutation.isPending) return;

    const res = await loginMutation.mutateAsync(values);

    if (res.payload.code === 200) {
      // toast({ description: "Đăng nhập thành công" });
      form.reset();
      const accessToken = getAccessTokenFormLocalStorage();
      if (accessToken) {
        const role = decodeJWT(accessToken).scope;
        if (role !== "ROLE_ADMIN") {
          toast({
            variant: "destructive",
            title: "Chỉ ADMIN mới được vào trang này",
          });
          await logoutMutation.mutateAsync();
        } else {
          toast({ description: "Đăng nhập thành công" });
          const decode = decodeJWT(res.payload.data?.access_token!);

          setRole(decode.scope);
          setImage(decode.image);
          setName(decode.name);
          setNoPassword(decode.no_password);
        }
      }
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Nhập sai Email hoặc mật khẩu ",
        // description: "Friday, February 10, 2023 at 5:57 PM",
        // action: (
        //   <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
        // ),
      });
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
              <div className="flex justify-between items-center">
                <FormLabel>
                  Mật khẩu <abbr className="text-red-600">*</abbr>
                </FormLabel>
                <Description className="text-[#192fb5] font-normal">
                  <Link href={"/users/password/new"}>Quên mật khẩu?</Link>
                </Description>
              </div>
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

        <Button
          type="submit"
          className="!mt-8 w-full h-11 bg-[#ED1B2F] hover:bg-[#c83333] text-[16px]"
        >
          Đăng nhập bằng Email
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;

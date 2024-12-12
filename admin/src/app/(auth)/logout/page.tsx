"use client";
import { useAppStore } from "@/components/app-provider";
import { getRefreshTokenFormLocalStorage } from "@/lib/utils";
import { useLogoutMutation } from "@/queries/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
export default function Logout() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutateAsync } = useLogoutMutation();
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");
  const ref = useRef<any>(null);
  const setRole = useAppStore((state) => state.setRole);

  useEffect(() => {
    if (ref.current
      ||(refreshToken && refreshToken !== getRefreshTokenFormLocalStorage())
      || (accessToken && accessToken === getRefreshTokenFormLocalStorage())
    )
      return;

    ref.current = mutateAsync;

    mutateAsync().then((res) => {
      setTimeout(() => {
        ref.current = null;
      }, 1000);
      setRole();
      router.push("/login");
    });
  }, [mutateAsync, router, refreshToken]);
  return <div>Logout</div>;
}

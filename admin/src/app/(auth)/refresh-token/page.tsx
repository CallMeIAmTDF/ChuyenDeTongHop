"use client";
import {
  checkAndRefreshToken,
  getRefreshTokenFormLocalStorage,
} from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function RefreshTokenPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPathname = searchParams.get("redirect");
  const refreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (refreshToken && refreshToken === getRefreshTokenFormLocalStorage()) {
      checkAndRefreshToken({
        onSuccess: () => {
          router.push(redirectPathname ?? "/");
        },
      });
    }
  }, [router, refreshToken, redirectPathname]);
  return <div>Refresh Token ...</div>;
}

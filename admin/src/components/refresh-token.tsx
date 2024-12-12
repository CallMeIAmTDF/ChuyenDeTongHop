"use client";

import { checkAndRefreshToken } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// const UNAUTHENTICATED_PATH = ["/login", "/register", "/refresh-token"];
const UNAUTHENTICATED_PATH = ["/login", "/register"];

export default function RefreshToken() {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (UNAUTHENTICATED_PATH.includes(pathName)) return;
    let interval: any = null;

    checkAndRefreshToken({
      onError: () => {
        clearInterval(interval);
        router.push("/login");
      },
    });

    interval = setInterval(
      () =>
        checkAndRefreshToken({
          onError: () => {
            clearInterval(interval);
            router.push("/login");
          },
        }),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [pathName, router]);
  return null;
}

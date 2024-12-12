"use client";
import {
  decodeJWT,
  getAccessTokenFormLocalStorage,
  removeTokenFormLocalStorage,
} from "@/lib/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect, useRef } from "react";
import { create } from "zustand";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

type AppStoreType = {
  isAuth: boolean;
  role: string | undefined;
  setRole: (role?: string | undefined) => void;
  image: string;
  setImage: (image: string) => void;
  name: string;
  setName: (name: string) => void;
  noPassword: boolean;
  setNoPassword: (noPassword: boolean) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  isAuth: false,
  role: undefined as string | undefined,
  setRole: (role?: string | undefined) => {
    set({ role: role, isAuth: Boolean(role) });
    if (!role) {
      removeTokenFormLocalStorage();
    }
  },
  image: "",
  setImage: (image: string) => {
    set({ image: image });
  },
  name: "",
  setName: (name: string) => {
    set({ name: name });
  },
  noPassword: false,
  setNoPassword: (noPassword: boolean) => {
    set({ noPassword: noPassword });
  },
}));

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const count = useRef(0);
  const setRole = useAppStore((state) => state.setRole);
  const setImage = useAppStore((state) => state.setImage);
  const setName = useAppStore((state) => state.setName);
  const setNoPassword = useAppStore((state) => state.setNoPassword);

  useEffect(() => {
    if (count.current === 0) {
      const accessToken = getAccessTokenFormLocalStorage();
      if (accessToken) {
        const decode = decodeJWT(accessToken!);

        setRole(decode.scope);
        setImage(decode.image);
        setName(decode.name);
        setNoPassword(decode.no_password);
      }
      count.current++;
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

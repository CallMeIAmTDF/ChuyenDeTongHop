"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";


const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function InputSearch({ className }: { className?: string }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <div className={cn("w-fit flex-1 flex gap-3", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full">
          <Input  className="h-full bg-white text-base " type="text" placeholder="Nhập từ khoá theo kỹ năng, chức vụ, công ty..." />
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command className="w-fit p-0">
            <CommandList className="w-fit p-0">
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup >
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {framework.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div>
        <Button
          type="submit"
          className="h-full w-[240px] bg-[#ED1B2F] hover:bg-[#c83333] text-[16px] font-semibold"
        >
             <Image
              className=" opacity-40 mr-2"
              alt="icon"
              src={"/search.svg"}
              width={20}
              height={20}
            //   style={{color: "white"}}
            />
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
}

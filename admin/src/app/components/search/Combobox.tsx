"use client";
import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "option",
    label: "Tất cả thành phố",
  },
  {
    value: "ho-chi-minh",
    label: "Ho Chi Minh",
  },
  {
    value: "ha-noi",
    label: "Ha Noi",
  },
  {
    value: "da-nang",
    label: "Da Nang",
  },
  {
    value: "others",
    label: "Others",
  },
];

export default function Combobox({className} : {className?: string}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(frameworks[0].value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={cn("w-[240px] " , className)}>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full text-base justify-between text-black h-full"
          >
            <Image
              className=" opacity-40 mr-2"
              alt="icon"
              src={"/place-marker.svg"}
              width={20}
              height={20}
            />
            <div className="flex-1 flex">
              {frameworks.find((framework) => framework.value === value)?.label}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50 " />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0 ">
          <Command>
            {/* <CommandInput placeholder="Search framework..." /> */}
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    className="text-base " 
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {/* <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    /> */}
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}

"use client";
import Combobox from "@/app/components/search/Combobox";
import InputSearch from "@/app/components/search/InputSearch";

export default function OptionSearch() {
  return (
    <div className="flex justify-between gap-3 h-[56px]">
      <Combobox className="h-full"/>
      <InputSearch className="h-full"/>
    </div>
  );
}

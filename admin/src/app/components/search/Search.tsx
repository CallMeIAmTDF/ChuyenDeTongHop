import OptionSearch from "@/app/components/search/OptionSearch";
import { SuggestionData } from "@/app/components/search/suggestion.data";

export default function Search() {
  return (
    <div className=" w-full bg-custom-gradient">
      <div className=" py-16 max-w-7xl mr-auto ml-auto ">
        <div className= " text-white">
          <div className="pb-8 text-[28px] font-bold ">
            1,004 Việc làm IT cho Developer "Chất"
          </div>
          <div className=" h-[56px]">
            <OptionSearch/>
          </div>
          <div className="mt-7 flex gap-4 items-center">
            <div>Gợi ý cho bạn:</div>
            <div className="flex gap-3">
              {SuggestionData.map((suggestion) => (
                <div key={suggestion.title} className="w-fit py-[6px] px-[12px] text-base border-[#414042] border-[1px] rounded-[20px] hover:bg-[#414042]">
                  {suggestion.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

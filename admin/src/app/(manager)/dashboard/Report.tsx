"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetPvpRankingReportQuery } from "@/queries/useStatistics";
import Image from "next/image";

export function Report() {
  const { data } = useGetPvpRankingReportQuery();

  function convertBytesToKB(bytes: number) {
    if (isNaN(bytes) || bytes < 0) {
      return "Invalid input"; // Kiểm tra dữ liệu đầu vào
    }

    const kb = bytes / 1024; // Chuyển đổi byte sang kilobyte
    return `${kb.toFixed(1)}kb`; // Làm tròn 1 chữ số thập phân và trả về chuỗi
  }

  const handleDownload = (fileName: string) => {
    console.log("Download", fileName);
    fetch("http://localhost:8080/statistics/downloadReport/" + fileName, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${fileName.split(".pdf")[0]}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode!.removeChild(link);
      });
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Competition ranking reports from previous weeks</CardTitle>
        <CardDescription>Click to download the file</CardDescription>
      </CardHeader>
      <CardContent>
        {data?.payload.data && (
          <ScrollArea className="w-full rounded-md border cursor-pointer">
            <div className="px-4">
              {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
              <div
                className="flex justify-between items-center p-2 text-base font-medium"
              >
                <div className="w-[30px]"></div>
                <div className=" flex-1 ml-2">File Name</div>
                <span>Last Modified</span>
                <span className="ml-6">Size</span>
              </div>
              {data.payload.data.map((tag, index) => (
                <div
                  className="flex justify-between items-center p-2"
                  onClick={() => handleDownload(tag.fileName)
                  }
                >
                  <div className="w-[30px]">{index + 1}</div>
                  <Image src={"/pdf.svg"} width={25} height={25} alt="" />
                  <div key={index} className="text-sm flex-1 ml-2">
                    {tag.fileName.split(".pdf")[0]}
                  </div>
                  <span>{tag.lastModified}</span>
                  <span className="ml-6">{convertBytesToKB(tag.fileSize)}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}

import Image from "next/image";

type Props = {
  searchParams: { email: string };
};

export default function VerifyEmail({ searchParams }: Props) {
  return (
    <div className="w-full flex justify-center h-screen items-center">
      <div className=" max-w-7xl p-6 w-full flex items-center flex-col">
        <Image
          src={"/robby-subscription.svg"}
          alt="Robby Subscription"
          width={160}
          height={160}
        />
        <h2 className="text-3xl font-bold mt-4 mb-6">Xác nhận địa chỉ email</h2>
        <p className="text-[16px]">
          Chúng tôi đã gửi email xác nhận đến{" "}
          <strong>{searchParams.email}</strong>
        </p>
        <p className="text-[16px] mb-2">
          Nếu bạn không thấy email nào, vui lòng xem trong thư mục Spam hoặc
          Junk.
        </p>
      </div>
    </div>
  );
}

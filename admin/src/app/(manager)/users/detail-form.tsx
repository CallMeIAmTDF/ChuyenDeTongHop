"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState, useRef, useMemo, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetByIdQuery } from "@/queries/useUser";
import { UserResponse } from "@/types/user";

const DetailForm = ({
  id,
  setId,
}: {
  id: string | undefined;
  setId: (value: string | undefined) => void;
}) => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data } = useGetByIdQuery(id ?? "", Boolean(id));

  const form = useForm<UserResponse>({
    // resolver: zodResolver(CreateBody),
    // mode: "all",
    // defaultValues: {
    //   name: "",
    //   image: "",
    // },
  });

  const image = form.watch("image");
  const name = form.watch("name");

  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return image;
  }, [image, file]);

  useEffect(() => {
    if (data) {
      const {
        id,
        name,
        email,
        address,
        createdAt,
        dob,
        gender,
        image,
        mobileNumber,
        noPassword,
        role,
      } = data.payload.data!;
      form.reset({
        id,
        name,
        email,
        address,
        createdAt,
        dob,
        gender,
        image: image ?? "",
        mobileNumber,
        noPassword,
        role,
      });
    }
  }, [data]);

  // 2. Define a submit handler.
  async function onSubmit() {
    // if (editUserMutation.isPending) return;
    // if (!form.formState.isDirty) {
    //   reset()
    //   return;
    // }
    // try {
    //   let body = values;
    //   if (file) {
    //     const formData = new FormData();
    //     formData.append("image", file);
    //     const res = await uploadUserImageMutation.mutateAsync(formData);
    //     const imgUrl = res.payload.data?.fileName[0] ?? "";
    //     body = { ...values, image: imgUrl };
    //   }
    //   const result = await editUserMutation.mutateAsync({
    //     ...body,
    //     id: id as number,
    //   });
    //   if (result.payload.code === 200) {
    //     reset();
    //     toast({ description: "Update user successfully"});
    //   } else if (result.payload.code === 409) {
    //     form.setError("name", {
    //       type: "custom",
    //       message: "Topic name existed",
    //     });
    //   }
    // } catch (error) {}
  }

  const reset = () => {
    form.reset();
    setFile(null);
    setId(undefined);
  };

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent
        className="sm:max-w-4xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Detail</DialogTitle>
          <DialogDescription>
            Detail topic here. Click ok when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-shrink-0 w-full"
            noValidate
          >
            <div className="grid grid-cols-3 gap-4">
              <div className=" row-span-2">
                <FormField
                  disabled
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex gap-2 items-start justify-start">
                        <div>
                          <Avatar className="aspect-square w-[130px] h-[130px] rounded-md object-cover relative group">
                            {image && (
                              <AvatarImage
                                src={
                                  image.startsWith("http")
                                    ? image
                                    : process.env
                                        .NEXT_PUBLIC_STORAGE_API_ENDPOINT +
                                      image
                                }
                              />
                            )}
                            {previewImage && <AvatarImage src={previewImage} />}
                            <AvatarFallback className="rounded-none">
                              Avatar
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                disabled
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Meaning"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                disabled
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Word"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Pronouns"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder=""
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder=""
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder=""
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DoB</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder=""
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder=""
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="submit"
                className={
                  form.formState.isDirty
                    ? "bg-[#ED1B2F] hover:bg-[#c83333]"
                    : "bg-[#cfcfcf] hover:bg-[#c83333] text-black"
                }
              >
                Ok
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default DetailForm;

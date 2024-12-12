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
import { CreateBody, CreateBodyType } from "@/schemaValidations/level.schema";
import { useState, useRef, useMemo, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useEditLevelMutation,
  useGetByIdQuery,
} from "@/queries/useLevel";
import { useUploadLevelMutation } from "@/queries/useMedia";

const EditForm = ({
  id,
  setId,
}: {
  id: number | undefined;
  setId: (value: number | undefined) => void;
}) => {
  const { toast } = useToast();
  const editLevelMutation = useEditLevelMutation();
  const uploadLevelImageMutation = useUploadLevelMutation();
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { data } = useGetByIdQuery(id as number, Boolean(id));

  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
      name: "",
      image: "",
    },
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
      const { name, image } = data.payload.data!;
      form.reset({ name, image: image ?? "" });
    }
  }, [data]);

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBodyType) {
    if (editLevelMutation.isPending) return;
    if (!form.formState.isDirty) {
      reset()
      return;
    }

    try {
      let body = values;
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await uploadLevelImageMutation.mutateAsync(formData);
        const imgUrl = res.payload.data?.fileName[0] ?? "";
        body = { ...values, image: imgUrl };
      }
      const result = await editLevelMutation.mutateAsync({
        ...body,
        id: id as number,
      });
      if (result.payload.code === 200) {
        reset();
        toast({ description: "Update level successfully"});
      } else if (result.payload.code === 409) {
        form.setError("name", {
          type: "custom",
          message: "Topic name existed",
        });
      }
    } catch (error) {}
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
        className="sm:max-w-lg"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>
            Edit more topics here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Name <abbr className="text-red-600">*</abbr>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      placeholder="Name"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <div className="flex gap-2 items-start justify-start">
                    {(previewImage || image) && (
                      <div>
                        <Avatar className="aspect-square w-[130px] h-[130px] rounded-md object-cover relative group">
                          {image && (
                            <AvatarImage
                              src={
                                image.startsWith("http")
                                  ? image
                                  : process.env
                                      .NEXT_PUBLIC_STORAGE_API_ENDPOINT + image
                              }
                            />
                          )}
                          {previewImage && <AvatarImage src={previewImage} />}
                          <AvatarFallback className="rounded-none">
                            {name}
                          </AvatarFallback>
                          <div className="w-[130px] h-[130px] absolute bg-[#f5c9ce] bg-opacity-50  items-center justify-center hidden group-hover:flex">
                            <button
                              className="bg-[#ED1B2F] hover:bg-[#c83333] rounded-full"
                              onClick={() => {
                                setFile(null);
                                field.onChange("");
                              }}
                            >
                              <X color="white" />
                            </button>
                          </div>
                        </Avatar>
                      </div>
                    )}
                    <Input
                      className="hidden"
                      type="file"
                      accept="image/*"
                      ref={imageInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFile(file);
                          field.onChange(file.name)
                        }
                      }}
                    />
                    <button
                      type="button"
                      className="flex aspect-square w-[130px] h-[130px] items-center justify-center rounded-md border border-muted bg-transparent hover:bg-accent hover:text-accent-foreground"
                      onClick={() => imageInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="submit"
                className={form.formState.isDirty ? "bg-[#ED1B2F] hover:bg-[#c83333]" : "bg-[#cfcfcf] hover:bg-[#c83333] text-black"}
              >
                {form.formState.isDirty ? "Save" : "Ok"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { CreateBody, CreateBodyType } from "@/schemaValidations/word.schema";
import { useState, useRef, useMemo, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEditWordMutation, useGetByIdQuery } from "@/queries/useWord";
import {
  useUploadLevelMutation,
  useUploadWordMutation,
} from "@/queries/useMedia";
import { useGetAllLevelQuery } from "@/queries/useLevel";
import { LevelResponse } from "@/types/level";
import { useGetAllTopicQuery } from "@/queries/useTopic";
import { set } from "zod";

const EditForm = ({
  id,
  setId,
}: {
  id: number | undefined;
  setId: (value: number | undefined) => void;
}) => {
  const { toast } = useToast();
  const editWordMutation = useEditWordMutation();
  const uploadWordImageMutation = useUploadWordMutation();
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [topicId, setTopicId] = useState<string>("");
  // console.log("🚀 ~ topicId:", topicId)
  const [levelId, setLevelId] = useState<string | undefined>();

  const { data } = useGetByIdQuery(id as number, Boolean(id));

  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
      // name: "",
      // image: "",
    },
  });

  const levelsQuery = useGetAllLevelQuery(
    { filter: "" },
    {
      page: 0,
      size: 20,
      sort: [],
    }
  );
  const levels: LevelResponse[] = levelsQuery.data?.payload.data?.result ?? [];

  const topicQuery = useGetAllTopicQuery(
    { filter: "" },
    {
      page: 0,
      size: 200,
      sort: [],
    },
    Number(levelId || 0)
  );
  const topics = topicQuery.data?.payload.data?.result ?? [];

  const photo = form.watch("photo");

  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return photo;
  }, [photo, file]);

  useEffect(() => {
    if (data) {
      const {
        word,
        pronun,
        entype,
        vietype,
        voice,
        photo,
        meaning,
        endesc,
        viedesc,
        topicId,
        topicName,
        levelId,
      } = data.payload.data!;
      setLevelId(levelId.toString());
      form.reset({
        word,
        pronun,
        entype,
        vietype,
        voice,
        photo: photo ?? "",
        meaning,
        endesc,
        topicId,
        viedesc,
      });
      setTopicId(topicId.toString());
    }
  }, [data]);

  // useEffect(() => {
  //   if (topics && data) {
  //     const { topicId } = data.payload.data!;
  //     setTopicId(topicId.toString());
  //   }
  // }, [topics])

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBodyType) {
    if (editWordMutation.isPending) return;
    if (!form.formState.isDirty) {
      reset();
      return;
    }

    try {
      let body = values;
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        const res = await uploadWordImageMutation.mutateAsync(formData);
        const imgUrl = res.payload.data?.fileName[0] ?? "";
        body = { ...values, photo: imgUrl };
      }
      const result = await editWordMutation.mutateAsync({
        ...body,
        id: id as number,
        topicId: parseInt(topicId),
      });
      if (result.payload.code === 200) {
        reset();
        toast({ description: "Update level successfully" });
      } else {
        toast({
          variant: "destructive",
          description: "Edit word không thành công",
        });
      }
    } catch (error) {}
  }

  const reset = () => {
    setId(undefined);
    form.reset();
    setFile(null);
    // setLevelId(undefined);
    console.log("reset");
    setTopicId("");
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
            <div className="grid grid-cols-3 gap-4">
              <div className=" row-span-2">
                {/* <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex gap-2 items-start justify-start">
                        {previewImage && (
                          <div>
                            <Avatar className="aspect-square w-[130px] h-[130px] rounded-md object-cover relative group">
                              <AvatarImage src={previewImage} />
                              <AvatarFallback className="rounded-none">
                                Image
                              </AvatarFallback>
                              <div className="w-[130px] h-[130px] absolute bg-[#f5c9ce] bg-opacity-50  items-center justify-center hidden group-hover:flex">
                                <button
                                  className="bg-[#ED1B2F] hover:bg-[#c83333] rounded-full"
                                  onClick={() => {
                                    field.onChange("");
                                    setFile(null);
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
                              field.onChange(file.name);
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
                /> */}

                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex gap-2 items-start justify-start">
                        {(previewImage || photo) && (
                          <div>
                            <Avatar className="aspect-square w-[130px] h-[130px] rounded-md object-cover relative group">
                              {photo && (
                                <AvatarImage
                                  src={
                                    photo.startsWith("http")
                                      ? photo
                                      : process.env
                                          .NEXT_PUBLIC_STORAGE_API_ENDPOINT +
                                          photo
                                  }
                                />
                              )}
                              {previewImage && (
                                <AvatarImage src={previewImage} />
                              )}
                              <AvatarFallback className="rounded-none">
                                Photo
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
                              field.onChange(file.name);
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
              </div>

              <FormItem>
                <FormLabel>
                  Level <abbr className="text-red-600">*</abbr>
                </FormLabel>
                <FormControl>
                  <Select
                    value={levelId}
                    onValueChange={(value) => {
                      setLevelId(value);
                      setTopicId("");
                    }}
                  >
                    <SelectTrigger className="w-full h-[44px]">
                      <SelectValue placeholder="Select a level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {levels.map((level) => (
                          <SelectItem
                            key={level.id}
                            value={level.id.toString()}
                          >
                            {level.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Topic <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={topicId.toString()}
                        onValueChange={(value) => {
                          field.onChange(Number(value));
                          setTopicId(value);
                        }}
                        disabled={!levelId}
                      >
                        <SelectTrigger className="w-full h-[44px]">
                          <SelectValue placeholder="Select a topic" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {topics.map((topic) => (
                              <SelectItem
                                key={topic.id}
                                value={topic.id.toString()}
                              >
                                {topic.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="word"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Word <abbr className="text-red-600">*</abbr>
                    </FormLabel>
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
                control={form.control}
                name="pronun"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Pronouns <abbr className="text-red-600">*</abbr>
                    </FormLabel>
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
                control={form.control}
                name="entype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Entype <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Entype"
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
                name="vietype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Vietype <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Vietype"
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
                name="meaning"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Meaning <abbr className="text-red-600">*</abbr>
                    </FormLabel>
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
                control={form.control}
                name="endesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Endesc <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Endesc"
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
                name="viedesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Viedesc <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="Viedesc"
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
                name="voice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Voice <abbr className="text-red-600">*</abbr>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11"
                        placeholder="URL voice"
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

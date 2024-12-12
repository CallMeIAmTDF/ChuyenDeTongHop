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
  DialogTrigger,
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
import { useMemo, useRef, useState } from "react";
import { Plus, Upload, X } from "lucide-react";
import { LevelResponse } from "@/types/level";
import {
  useGetAllTopicQuery,
} from "@/queries/useTopic";
import { useGetAllLevelQuery } from "@/queries/useLevel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCreateWordMutation } from "@/queries/useWord";
import { useUploadLevelMutation } from "@/queries/useMedia";

const CreateForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { toast } = useToast();
  const createWordMutation = useCreateWordMutation();
  const uploadLevelImageMutation = useUploadLevelMutation();
  const [levelId, setLevelId] = useState<string | undefined>();
  const [file, setFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [topicId, setTopicId] = useState<string>("");

  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
    },
  });

  const image = form.watch("photo");
  const previewImage = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file);
    }
    return image;
  }, [image, file]);
  const { data } = useGetAllLevelQuery(
    { filter: "" },
    {
      page: 0,
      size: 20,
      sort: [],
    }
  );
  const levels: LevelResponse[] = data?.payload.data?.result ?? [];
  const topicQuery = useGetAllTopicQuery(
    { filter: "" },
    {
      page: 0,
      size: 50,
      sort: [],
    },
    Number(levelId || 0)
  );
  const topics = topicQuery.data?.payload.data?.result ?? [];

  const reset = () => {
    form.reset();
    setTopicId("");
    setOpen(false);
  };

  async function onSubmit(values: CreateBodyType) {
    if (createWordMutation.isPending) return;
    try {
      let body = {...values, topicId: Number(topicId)};
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await uploadLevelImageMutation.mutateAsync(formData);
        const imgUrl = res.payload.data?.fileName[0] ?? "";
        body = { ...values, photo: imgUrl };
      }
      const result = await createWordMutation.mutateAsync(body);

      if (result.payload.code === 200) {
        reset();
        toast({ description: "Tạo mới Word thành công" });
      } else {
        toast({ variant: "destructive", description: "Tạo mới Topic không thành công" });
      }
    } catch (error) {}
  }

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setTopicId("");
        form.reset();
        setFile(null);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal">
          <Plus />
          New Word
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>New word</DialogTitle>
          <DialogDescription>
            Make more word here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-shrink-0 w-full"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className=" row-span-2">
                <FormField
                  control={form.control}
                  name="photo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <div className="flex gap-2 items-start justify-start">
                        {previewImage && file && (
                          <div>
                            <Avatar className="aspect-square w-[130px] h-[130px] rounded-md object-cover relative group">
                              <AvatarImage src={previewImage} />
                              <AvatarFallback className="rounded-none">
                                Image
                              </AvatarFallback>
                              <div className="w-[130px] h-[130px] absolute bg-[#f5c9ce] bg-opacity-50  items-center justify-center hidden group-hover:flex">
                                <button
                                  className="bg-[#ED1B2F] hover:bg-[#c83333] rounded-full"
                                  onClick={() => setFile(null)}
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
                        value={topicId}
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
                className=" bg-[#ED1B2F] hover:bg-[#c83333]"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;

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
import { CreateBody, CreateBodyType } from "@/schemaValidations/topic.schema";
import { useState, useEffect } from "react";
import { useEditTopicMutation, useGetByIdQuery } from "@/queries/useTopic";
import { useGetAllLevelQuery } from "@/queries/useLevel";
import { LevelResponse } from "@/types/level";

const EditForm = ({
  id,
  setId,
}: {
  id: number | undefined;
  setId: (value: number | undefined) => void;
}) => {
  const { toast } = useToast();
  const editMutation = useEditTopicMutation();
  const [valueSelect, setValueSelect] = useState<string>(id?.toString() ?? "");

  const { data } = useGetByIdQuery(id as number, Boolean(id));

  const pageAble: IModelPaginateRequest = {
    page: 0,
    size: 20,
    sort: [],
  };

  const queryLevels = useGetAllLevelQuery({ filter: "" }, pageAble);
  const levels: LevelResponse[] = queryLevels.data?.payload.data?.result ?? [];

  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
      name: "",
      // levelId: "",
    },
  });

  useEffect(() => {
    if (data) {
      const { name, levelId } = data.payload.data!;
      form.reset({ name, levelId });
      setValueSelect(levelId.toString());
    }
  }, [data]);

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBodyType) {
    if (editMutation.isPending) return;
    if (!form.formState.isDirty) {
      reset()
      return;
    }

    try {
      let body = values;

      const result = await editMutation.mutateAsync({
        ...body,
        id: id as number,
      });
      if (result.payload.code === 200) {
        reset();
        toast({ description: "Update level successfully" });
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
              name="levelId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Level <abbr className="text-red-600">*</abbr>
                  </FormLabel>
                  <FormControl>
                    <Select
                      value={valueSelect}
                      onValueChange={(value) => {
                        field.onChange(Number(value));
                        setValueSelect(value);
                      }}
                    >
                      <SelectTrigger className="w-[220px]">
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
              )}
            />

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

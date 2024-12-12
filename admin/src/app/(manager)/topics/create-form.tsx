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
import { CreateBody, CreateBodyType } from "@/schemaValidations/topic.schema";
import { useState } from "react";
import { Plus } from "lucide-react";
import {
  useGetAllLevelQuery,
} from "@/queries/useLevel";
import { LevelResponse } from "@/types/level";
import { useCreateTopicMutation } from "@/queries/useTopic";

const CreateForm = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { toast } = useToast();
  const createTopicMutation = useCreateTopicMutation();
  const [valueSelect, setValueSelect] = useState<string>("");

  const form = useForm<CreateBodyType>({
    resolver: zodResolver(CreateBody),
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: CreateBodyType) {
    if (createTopicMutation.isPending) return;
    try {
      const result = await createTopicMutation.mutateAsync({
        ...values,
        levelId: Number(valueSelect),
      });
      if (result.payload.code === 200) {
        reset();
        toast({ description: "Tạo mới Topic thành công" });
      } else if (result.payload.code === 409) {
        form.setError("name", {
          type: "custom",
          message: "Topic name existed",
        });
      }
    } catch (error) {}
  }

  const pageAble: IModelPaginateRequest = {
    page: 0,
    size: 20,
    sort: [],
  };

  const { data } = useGetAllLevelQuery({ filter: "" }, pageAble);
  const levels: LevelResponse[] = data?.payload.data?.result ?? [];

  const reset = () => {
    form.reset();
    setValueSelect("");
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setValueSelect("");
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="font-normal">
          <Plus />
          New Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New topic</DialogTitle>
          <DialogDescription>
            Make more topics here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex-shrink-0 w-full"
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

{
  /* <FormField
control={form.control}
name="levelId"
render={({ field }) => (
  <FormItem className="flex flex-col">
    <FormLabel>Language</FormLabel>
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value
              ? levels.find(
                  (level) => level.id === field.value
                )?.name
              : "Select language"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search framework..."
            className="h-9"
          />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {levels.map((level) => (
                <CommandItem
                  value={level.id.toString()}
                  key={level.id}
                  onSelect={() => {
                    form.setValue("levelId", level.id);
                  }}
                >
                  {level.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      level.id === field.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <FormMessage />
  </FormItem>
)}
/> */
}

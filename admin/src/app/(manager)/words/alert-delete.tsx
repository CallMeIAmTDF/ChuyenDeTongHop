import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { useDeleteWordMutation } from "@/queries/useWord";
import { WordResponse } from "@/types/word";

export function AlertDelete({
  word,
  setWord,
}: {
  word: WordResponse | undefined;
  setWord: (value: WordResponse | undefined) => void;
}) {
  const { mutateAsync } = useDeleteWordMutation();

  const deleteWord = async () => {
    if (word) {
      try {
        const result = await mutateAsync(word.id);
        if (result.payload.code === 200) {
          toast({ description: "Delete word successfully" });
          setWord(undefined);
        }
      } catch (error) {}
    }
  };

  return (
    <AlertDialog open={Boolean(word)} onOpenChange={() => setWord(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete word{" "}
            <b className="text-base">{word?.word}</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteWord}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

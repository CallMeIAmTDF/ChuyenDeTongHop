import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast";
import { useDeleteLevelMutation } from "@/queries/useLevel";
import { LevelResponse } from "@/types/level";

export function AlertDelete({
  level,
  setLevel,
}: {
  level: LevelResponse | undefined;
  setLevel: (value: LevelResponse | undefined) => void;
}) {
  const { mutateAsync } = useDeleteLevelMutation();

  const deleteLevel = async () => {
    if (level) {
      try {
        const result = await mutateAsync(level.id);
        if (result.payload.code === 200) {
          toast({description:"Delete level successfully"});
          setLevel(undefined);        
        }
      } catch (error) {
        
      }
    }
  }

  return (
    <AlertDialog open={Boolean(level)} onOpenChange={() => setLevel(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone. This will permanently delete level {level?.name}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteLevel}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

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
import { useDeleteTopicMutation } from "@/queries/useTopic";
import { TopicResponse } from "@/types/topic";

export function AlertDelete({
  topic,
  setTopic,
}: {
  topic: TopicResponse | undefined;
  setTopic: (value: TopicResponse | undefined) => void;
}) {
  const { mutateAsync } = useDeleteTopicMutation();

  const deleteTopic = async () => {
    if (topic) {
      try {
        const result = await mutateAsync(topic.id);
        if (result.payload.code === 200) {
          toast({ description: "Delete topic successfully" });
          setTopic(undefined);
        }
      } catch (error) {}
    }
  };

  return (
    <AlertDialog open={Boolean(topic)} onOpenChange={() => setTopic(undefined)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete topic{" "}
            <b className="text-base">{topic?.name}</b>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteTopic}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  id: string;
  onDelete: (id: string, force?: boolean) => Promise<void>;
  label?: string;
  confirmMessage?: string;
};

export default function DeleteButton({
  id,
  onDelete,
  label = "Delete",
  confirmMessage = "Are you sure you want to delete this?",
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    if (confirm(confirmMessage)) {
      startTransition(async () => {
        try {
            await onDelete(id, false);
        } catch (error) {
            const msg = (error as Error).message;
            if (msg.includes("NEXT_REDIRECT")) {
                return; // Redirect is successful behavior
            }
            
            if (msg.startsWith("WARNING: usage_found|")) {
                const routines = msg.split("|")[1];
                if (confirm(`This item is used in the following routines:\n\n${routines}\n\nDo you want to delete it anyway? It will be removed from these routines.`)) {
                    await onDelete(id, true);
                }
            } else {
                alert("Error: " + msg);
            }
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-900/50 text-red-200 border border-red-800 px-3 py-1 rounded text-sm hover:bg-red-800 disabled:opacity-50 transition-colors"
    >
      {isPending ? "Deleting..." : label}
    </button>
  );
}

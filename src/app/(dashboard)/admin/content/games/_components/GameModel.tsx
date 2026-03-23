"use client";

import { useState } from "react";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
import { toast } from "sonner";
import { GameItem } from "./GameTable";

interface GameModelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  game: GameItem | null;
  onSuccess: () => void;
}

export function GameModel({ open, onOpenChange, game, onSuccess }: GameModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!game) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/games/${game.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "حدث خطأ");
      }
      toast.success("تم حذف اللعبة بنجاح");
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء الحذف");
    } finally {
      setIsLoading(false);
    }
  };

  if (!game) return null;

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="حذف اللعبة"
      description={`هل أنت متأكد من حذف اللعبة "${game.title}"؟`}
      confirmLabel="حذف"
      onConfirm={handleDelete}
      variant="destructive"
      isLoading={isLoading}
    />
  );
}

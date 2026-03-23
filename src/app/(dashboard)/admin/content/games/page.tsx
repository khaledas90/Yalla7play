"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/Skeletons";
import { GameItem, getGameColumns } from "./_components/GameTable";
import { GameForm } from "./_components/GameForm";
import { GameModel } from "./_components/GameModel";

export default function GamesPage() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<GameItem | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [gamesRes, categoriesRes] = await Promise.all([
        fetch("/api/admin/games"),
        fetch("/api/admin/categories"),
      ]);
      if (!gamesRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch data");
      const gamesData = await gamesRes.json();
      const categoriesData = await categoriesRes.json();
      setGames(gamesData);
      setCategories(categoriesData.map((c: any) => ({ id: c.id, name: c.name })));
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تحميل الألعاب");
      console.error(error);
      setGames([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = getGameColumns(
    (game) => {
      setSelectedGame(game);
      setIsEditDialogOpen(true);
    },
    (game) => {
      setSelectedGame(game);
      setIsDeleteDialogOpen(true);
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <PageHeader title="إدارة الألعاب" description="إضافة وتعديل وحذف الألعاب" />
        <TableSkeleton rows={6} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="إدارة الألعاب"
        description="إضافة وتعديل وحذف الألعاب"
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            لعبة جديدة
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={games}
        searchKey="title"
        searchPlaceholder="ابحث باسم اللعبة..."
      />

      <GameForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        categories={categories}
        onSuccess={fetchData}
      />
      <GameForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        game={selectedGame}
        categories={categories}
        onSuccess={fetchData}
      />
      <GameModel
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        game={selectedGame}
        onSuccess={fetchData}
      />
    </div>
  );
}

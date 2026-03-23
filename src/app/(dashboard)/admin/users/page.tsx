"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { DataTable } from "@/components/common/data-table/DataTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/common/Skeletons";
import { UserItem, getUserColumns } from "./_components/UserTable";
import { UserForm } from "./_components/UserForm";
import { UserModel } from "./_components/UserModel";

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      toast.error("حدث خطأ أثناء تحميل المستخدمين");
      console.error(error);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = getUserColumns(
    (user) => {
      setSelectedUser(user);
      setIsEditDialogOpen(true);
    },
    (user) => {
      setSelectedUser(user);
      setIsDeleteDialogOpen(true);
    }
  );

  if (isLoading) {
    return (
      <div className="space-y-6" dir="rtl">
        <PageHeader
          title="إدارة المستخدمين"
          description="إضافة وتعديل وحذف المستخدمين"
        />
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      <PageHeader
        title="إدارة المستخدمين"
        description="إضافة وتعديل وحذف المستخدمين"
        actions={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            مستخدم جديد
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={users}
        searchKey="email"
        searchPlaceholder="ابحث بالبريد الإلكتروني..."
      />

      <UserForm
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={fetchUsers}
      />
      <UserForm
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
        onSuccess={fetchUsers}
      />
      <UserModel
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        user={selectedUser}
        onSuccess={fetchUsers}
      />
    </div>
  );
}

import React from "react";
import DashboardLayout from "./layout/DashboardLayout";
import UsersTable from "./users/UsersTable";
import { logout } from "../services/authService";

interface HomeProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const Home = ({
  user = {
    name: "John Doe",
    email: "john@example.com",
  },
  onLogout = () => {
    logout()
  }
}: HomeProps) => {
  const handleSearch = (query: string) => {
    console.log("Search query:", query);
  };

  const handleEdit = (user: any) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (user: any) => {
    console.log("Delete user:", user);
  };

  const handleBulkAction = (action: string, userIds: string[]) => {
    console.log("Bulk action:", action, "User IDs:", userIds);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <div className="container mx-auto p-4 sm:py-6 bg-background">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">User Management</h1>
        </div>

        <div className="bg-card rounded-lg shadow overflow-hidden">
          <UsersTable
            onSearch={handleSearch}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onBulkAction={handleBulkAction}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;

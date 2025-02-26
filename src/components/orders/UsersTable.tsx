import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import TableCommandBar from "./TableCommandBar";
import UserFormDialog from "./UserFormDialog";

interface User {
  id: string;
  displayName: string;
  createdAt: string,
  role: "admin" | "USER" | "manager";
  status: "active" | "inactive" | "pending";
}

interface UsersTableProps {
  users?: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
  onBulkAction?: (action: string, userIds: string[]) => void;
  onSearch?: (query: string) => void;
}

const UsersTable = ({
  onEdit = () => {},
  onDelete = () => {},
  onBulkAction = () => {},
  onSearch = () => {},
}: UsersTableProps) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
  const [showUserForm, setShowUserForm] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

   // Fetch users from API
   useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://bbsmarthomes.com/users"); // Replace with your API URL
        if (!response.ok) throw new Error("Failed to fetch users");
        console.log(response);
        

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const getStatusBadgeVariant = (status: User["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "secondary";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <div className="w-full bg-background">
      <TableCommandBar
        onSearch={onSearch}
        onAddUser={() => {
          setEditingUser(null);
          setShowUserForm(true);
        }}
        onBulkAction={(action) => onBulkAction(action, selectedUsers)}
        selectedCount={selectedUsers.length}
      />

      <div className="border rounded-md overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedUsers.length === users.length}
                  onCheckedChange={(checked: boolean) =>
                    handleSelectAll(checked)
                  }
                />
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Welcome date</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onCheckedChange={(checked: boolean) =>
                      handleSelectUser(user.id, checked)
                    }
                  />
                </TableCell>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.displayName}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                {/* <TableCell>
                  <Badge variant={getStatusBadgeVariant(user.status)}>
                    {user.status}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          setEditingUser(user);
                          setShowUserForm(true);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete(user)}
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserFormDialog
        open={showUserForm}
        onOpenChange={setShowUserForm}
        mode={editingUser ? "edit" : "create"}
        initialData={editingUser || undefined}
        onSubmit={(data) => {
          if (editingUser) {
            onEdit({ ...editingUser, ...data });
          }
          setShowUserForm(false);
          setEditingUser(null);
        }}
      />
    </div>
  );
};

export default UsersTable;
function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}


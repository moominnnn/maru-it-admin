import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  Plus,
  MoreHorizontal,
  Trash,
  UserPlus,
  UserCheck,
} from "lucide-react";

interface TableCommandBarProps {
  onSearch?: (query: string) => void;
  onAddUser?: () => void;
  onBulkAction?: (action: string) => void;
  selectedCount?: number;
}

const TableCommandBar = ({
  onSearch = () => {},
  onAddUser = () => {},
  onBulkAction = () => {},
  selectedCount = 0,
}: TableCommandBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 space-y-2 sm:space-y-0 bg-background border-b">
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {selectedCount > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontal className="h-4 w-4 mr-2" />
                Bulk Actions ({selectedCount})
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => onBulkAction("activate")}>
                <UserCheck className="h-4 w-4 mr-2" />
                Activate Selected
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBulkAction("delete")}>
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Button onClick={onAddUser}>
        <Plus className="h-4 w-4 mr-2" />
        Add User
      </Button>
    </div>
  );
};

export default TableCommandBar;

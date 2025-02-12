import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

const Sidebar = ({ collapsed = false, onToggle = () => {} }: SidebarProps) => {
  React.useEffect(() => {
    const handler = () => {
      const sidebar = document.getElementById("mobile-sidebar");
      if (sidebar) {
        sidebar.classList.toggle("translate-x-0");
        sidebar.classList.toggle("-translate-x-full");
      }
    };

    document.addEventListener("toggle-mobile-sidebar", handler);
    return () => document.removeEventListener("toggle-mobile-sidebar", handler);
  }, []);

  return (
    <>
      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className="fixed inset-y-0 left-0 z-50 -translate-x-full transform md:hidden transition-transform duration-300 ease-in-out"
      >
        <div className="flex flex-col h-full w-64 bg-background border-r">
          <div className="p-4 border-b flex items-center justify-between">
            <span className="text-xl font-bold">Admin</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                document.dispatchEvent(new CustomEvent("toggle-mobile-sidebar"))
              }
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 py-4">
            <nav className="space-y-2 px-2">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  className="w-full justify-start gap-3 px-4"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Button>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="text-sm text-muted-foreground">v1.0.0</div>
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "flex flex-col h-screen bg-background border-r transition-all duration-300",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          {!collapsed && <span className="text-xl font-bold">Admin</span>}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="ml-auto"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-2 px-2">
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3",
                  collapsed ? "px-2" : "px-4",
                )}
              >
                <item.icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t">
          {!collapsed && (
            <div className="text-sm text-muted-foreground">v1.0.0</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

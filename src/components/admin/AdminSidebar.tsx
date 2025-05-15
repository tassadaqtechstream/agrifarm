
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBasket, 
  FolderTree, 
  ClipboardList,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const AdminSidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { 
      title: "Dashboard", 
      path: "/admin", 
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    { 
      title: "Products", 
      path: "/admin/listings", 
      icon: <ShoppingBasket className="w-5 h-5" />
    },
    { 
      title: "Categories", 
      path: "/admin/categories", 
      icon: <FolderTree className="w-5 h-5" />
    },
    { 
      title: "Users", 
      path: "/admin/users", 
      icon: <Users className="w-5 h-5" />
    },
    { 
      title: "Orders", 
      path: "/admin/orders", 
      icon: <ClipboardList className="w-5 h-5" />
    }
  ];

  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin">
          <h2 className="text-xl font-bold text-earth-terracotta">Admin Panel</h2>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                location.pathname === item.path 
                  ? "bg-earth-terracotta text-white" 
                  : "text-gray-300 hover:bg-gray-800"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <Link to="/signin">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          >
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;

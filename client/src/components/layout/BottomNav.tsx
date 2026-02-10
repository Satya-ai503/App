import { Link, useLocation } from "wouter";
import { Home, Activity, Brain, Utensils, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/dashboard" },
    { icon: Activity, label: "Move", path: "/physical" },
    { icon: Brain, label: "Mind", path: "/mental" },
    { icon: Utensils, label: "Food", path: "/nutrition" },
    { icon: Users, label: "Social", path: "/social" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 pb-6 z-50 flex justify-between items-center max-w-[480px] mx-auto">
      {navItems.map((item) => {
        const isActive = location === item.path;
        return (
          <Link key={item.path} href={item.path}>
            <div className={cn(
              "flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer w-12",
              isActive ? "text-primary" : "text-gray-400 hover:text-gray-600"
            )}>
              <item.icon 
                size={24} 
                strokeWidth={isActive ? 2.5 : 2}
                className={cn(isActive && "drop-shadow-sm")}
              />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

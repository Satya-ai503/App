import { Bell, User } from "lucide-react";
import { useWellnessStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "wouter";

export function TopBar({ title }: { title?: string }) {
  const user = useWellnessStore((state) => state.user);

  return (
    <header className="sticky top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-40 px-4 py-3 flex justify-between items-center border-b border-border/50">
      <div>
        {title ? (
          <h1 className="text-xl font-display font-bold text-foreground">{title}</h1>
        ) : (
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-medium">Namaste,</span>
            <span className="text-lg font-display font-bold text-foreground leading-tight">
              {user?.name || "Friend"}
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <Link href="/notifications">
          <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors cursor-pointer">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border border-background"></span>
          </button>
        </Link>
        <Link href="/profile">
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm cursor-pointer">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} />
            <AvatarFallback>
              <User size={16} />
            </AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  );
}

import { useState } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWellnessStore } from "@/lib/store";
import { useLocation } from "wouter";
import { LogOut, User, Shield, Bell, Settings, ChevronRight } from "lucide-react";

export default function Profile() {
  const { user, logout } = useWellnessStore();
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    logout();
    setLocation("/auth");
  };

  const menuItems = [
    { icon: User, label: "Personal Information", color: "text-blue-500" },
    { icon: Shield, label: "Privacy & Security", color: "text-green-500" },
    { icon: Bell, label: "Notifications", color: "text-orange-500" },
    { icon: Settings, label: "App Settings", color: "text-gray-500" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Profile" />
      <div className="p-4 space-y-6">
        <div className="flex flex-col items-center gap-3 py-4">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'User'}`} />
            <AvatarFallback><User size={40} /></AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-display font-bold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          <div className="flex gap-2 mt-2">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {user?.diet}
            </span>
            <span className="bg-secondary/10 text-secondary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Age {user?.age}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {menuItems.map((item, i) => (
            <Card key={i} className="border-none shadow-sm hover:bg-muted/50 transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-background ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium">{item.label}</span>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </CardContent>
            </Card>
          ))}
        </div>

        <Button 
          variant="destructive" 
          className="w-full py-6 mt-4 gap-2 shadow-lg shadow-destructive/10"
          onClick={handleLogout}
        >
          <LogOut size={18} /> Sign Out
        </Button>
      </div>
      <BottomNav />
    </div>
  );
}

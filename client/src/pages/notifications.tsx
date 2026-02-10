import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Bell, Activity, Brain, Utensils, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      title: "Morning Yoga Reminder",
      desc: "It's time for your Surya Namaskar session.",
      time: "2h ago",
      type: "physical",
      unread: true,
    },
    {
      id: 2,
      title: "Hydration Check",
      desc: "You haven't logged water in 3 hours. Drink up!",
      time: "5h ago",
      type: "nutrition",
      unread: false,
    },
    {
      id: 3,
      title: "Mental Wellness Tip",
      desc: "Take a 2-minute break to focus on your breathing.",
      time: "1d ago",
      type: "mental",
      unread: false,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "physical": return <Activity className="text-orange-500" size={18} />;
      case "mental": return <Brain className="text-indigo-500" size={18} />;
      case "nutrition": return <Utensils className="text-green-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Notifications" />
      <div className="p-4 space-y-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <Bell size={48} className="opacity-20 mb-4" />
            <p>No new notifications</p>
          </div>
        ) : (
          notifications.map((n) => (
            <Card key={n.id} className={cn(
              "border-none shadow-sm relative overflow-hidden",
              n.unread ? "bg-primary/5" : "bg-card"
            )}>
              {n.unread && <div className="absolute top-0 left-0 w-1 h-full bg-primary" />}
              <CardContent className="p-4 flex gap-4">
                <div className="p-2 rounded-full bg-background shrink-0 self-start">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className={cn("font-bold text-sm", n.unread ? "text-foreground" : "text-muted-foreground")}>
                      {n.title}
                    </h3>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {n.desc}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
}

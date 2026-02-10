import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

export default function Social() {
  const leaderboard = [
    { rank: 1, name: "Priya S.", points: 2450, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { rank: 2, name: "Rahul K.", points: 2320, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { rank: 3, name: "Amit B.", points: 2100, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit" },
    { rank: 4, name: "Sneha M.", points: 1950, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { rank: 5, name: "You", points: 1200, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=User" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Community" />
      <div className="p-4 space-y-6">
        
        <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 border-none text-white shadow-lg">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Your Current Rank</p>
              <h2 className="text-3xl font-bold mt-1">#5</h2>
            </div>
            <Trophy size={48} className="text-yellow-300 opacity-80" />
          </CardContent>
        </Card>

        <div>
          <h2 className="text-lg font-display font-bold mb-4">Top Wellness Warriors</h2>
          <div className="bg-card rounded-xl shadow-sm border border-border/50 divide-y divide-border/50">
            {leaderboard.map((user) => (
              <div key={user.rank} className="p-4 flex items-center gap-4">
                <span className={`font-bold w-6 text-center ${user.rank <= 3 ? 'text-yellow-500' : 'text-muted-foreground'}`}>
                  {user.rank}
                </span>
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{user.name}</h3>
                </div>
                <span className="font-bold text-primary text-sm">{user.points} pts</span>
              </div>
            ))}
          </div>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}

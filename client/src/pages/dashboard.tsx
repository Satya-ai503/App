import { useWellnessStore } from "@/lib/store";
import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

function ScoreRing({ value, color, label }: { value: number, color: string, label: string }) {
  const data = [{ value: value, fill: color }];
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="70%" 
            outerRadius="100%" 
            barSize={10} 
            data={data} 
            startAngle={90} 
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{value}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  const { user, scores, dailyPlan, toggleAction } = useWellnessStore();
  const userName = user?.name?.split(' ')[0] || 'Friend';

  const todayActions = dailyPlan;

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar />
      
      <div className="p-4 space-y-6">
        {/* Wellness Score Card */}
        <Card className="border-none shadow-lg bg-gradient-to-br from-card to-muted">
          <CardContent className="p-6">
            <h2 className="text-lg font-display font-bold mb-4">Your Wellness Score</h2>
            <div className="flex justify-between items-center">
              <ScoreRing value={scores.physical} color="hsl(var(--chart-1))" label="Physical" />
              <ScoreRing value={scores.mental} color="hsl(var(--chart-2))" label="Mental" />
              <ScoreRing value={scores.nutrition} color="hsl(var(--chart-3))" label="Nutrition" />
            </div>
            <div className="mt-6 text-center">
               <p className="text-sm text-muted-foreground">Overall Status: <span className="font-bold text-primary">Good Balance</span></p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Plan Section */}
        <div>
          <h2 className="text-xl font-display font-bold mb-3 flex items-center gap-2">
            Today's Focus
            <span className="text-xs font-normal bg-primary/10 text-primary px-2 py-1 rounded-full">{todayActions.filter(a => a.completed).length}/{todayActions.length}</span>
          </h2>
          <div className="space-y-3">
            {todayActions.map((action, index) => (
              <motion.div 
                key={action.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleAction(action.id)}
              >
                <Card className={cn(
                  "border-l-4 transition-all duration-300 active:scale-[0.98]",
                  action.completed ? "bg-muted/50 border-l-gray-300 opacity-60" : "bg-card shadow-sm border-l-primary"
                )}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <button className={cn("text-primary transition-transform", action.completed && "scale-110 text-gray-400")}>
                      {action.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                    <div className="flex-1">
                      <h3 className={cn("font-medium", action.completed && "line-through text-muted-foreground")}>{action.title}</h3>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">+{action.points}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Banner */}
        <div className="rounded-2xl overflow-hidden relative h-32 shadow-md">
           <img src="/assets/yoga.jpg" className="w-full h-full object-cover" alt="Yoga Banner" />
           <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-4">
             <div className="text-white text-center">
               <p className="font-bold text-lg">Join the Sunday Yoga Session</p>
               <p className="text-xs opacity-90">Live at 8:00 AM IST</p>
             </div>
           </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

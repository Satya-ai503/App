import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Flame } from "lucide-react";

export default function Physical() {
  const workouts = [
    { id: 1, title: "Surya Namaskar", duration: "10 min", cal: "50", level: "Beginner", image: "/assets/yoga.jpg" },
    { id: 2, title: "HIIT Cardio", duration: "20 min", cal: "150", level: "Intermediate", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=300" },
    { id: 3, title: "Evening Stretch", duration: "15 min", cal: "40", level: "All Levels", image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?auto=format&fit=crop&q=80&w=300" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Physical Wellness" />
      <div className="p-4 space-y-6">
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-orange-50 border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-orange-600">1,240</span>
              <span className="text-xs text-orange-400 font-medium">Steps Today</span>
            </CardContent>
          </Card>
          <Card className="bg-orange-50 border-none shadow-sm">
            <CardContent className="p-4 flex flex-col items-center">
              <span className="text-2xl font-bold text-orange-600">320</span>
              <span className="text-xs text-orange-400 font-medium">Calories Burned</span>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-lg font-display font-bold mb-4">Recommended Workouts</h2>
          <div className="space-y-4">
            {workouts.map(workout => (
              <Card key={workout.id} className="overflow-hidden border-none shadow-md group cursor-pointer hover:shadow-lg transition-all">
                <div className="relative h-40">
                  <img src={workout.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt={workout.title} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-lg">{workout.title}</h3>
                    <div className="flex items-center gap-3 text-white/80 text-xs mt-1">
                      <span className="flex items-center gap-1"><Clock size={12} /> {workout.duration}</span>
                      <span className="flex items-center gap-1"><Flame size={12} /> {workout.cal} kcal</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded-full">{workout.level}</span>
                    </div>
                  </div>
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play fill="white" className="text-white ml-1" />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

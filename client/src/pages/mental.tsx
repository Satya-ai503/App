import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { useWellnessStore } from "@/lib/store";
import { Wind, BookHeart, Music, Phone, Play } from "lucide-react";

export default function Mental() {
  const [moodLevel, setMoodLevel] = useState(5);
  const { setMood } = useWellnessStore();

  const handleMoodChange = (val: number[]) => {
    setMoodLevel(val[0]);
    // Determine mood string based on slider
    const moods = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
    const index = Math.min(Math.floor((val[0] / 10) * 5), 4);
    setMood(moods[index]);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Mental Wellness" />
      <div className="p-4 space-y-6">
        
        {/* Mood Check-in */}
        <Card className="bg-indigo-50 border-none shadow-sm">
          <CardContent className="p-6 text-center space-y-4">
            <h2 className="font-display font-bold text-lg text-indigo-900">How are you feeling?</h2>
            <div className="text-4xl py-2">
              {moodLevel < 3 ? "😔" : moodLevel < 6 ? "😐" : moodLevel < 8 ? "🙂" : "🤗"}
            </div>
            <Slider 
              value={[moodLevel]} 
              onValueChange={handleMoodChange}
              max={10} 
              step={1} 
              className="py-4"
            />
            <p className="text-sm text-indigo-600 font-medium">Use the slider to check in</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white hover:bg-indigo-50 transition-colors cursor-pointer border-indigo-100">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                <Wind size={24} />
              </div>
              <span className="font-medium text-sm">Breathing</span>
            </CardContent>
          </Card>
          <Card className="bg-white hover:bg-indigo-50 transition-colors cursor-pointer border-indigo-100">
            <CardContent className="p-4 flex flex-col items-center gap-2">
              <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
                <BookHeart size={24} />
              </div>
              <span className="font-medium text-sm">Journal</span>
            </CardContent>
          </Card>
        </div>

        {/* Recommended */}
        <div>
          <h2 className="text-lg font-display font-bold mb-4">Relaxation</h2>
          <Card className="overflow-hidden">
             <div className="flex h-24">
               <img src="/assets/meditation.jpg" className="w-24 object-cover" alt="Meditation" />
               <div className="p-4 flex-1 flex flex-col justify-center">
                 <h3 className="font-bold">Sleep Meditation</h3>
                 <p className="text-xs text-muted-foreground mb-2">10 min • Guided</p>
                 <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium cursor-pointer">
                   <Play size={12} fill="currentColor" /> Play Now
                 </div>
               </div>
             </div>
          </Card>
        </div>

        {/* Crisis Helpline - Safety Rule */}
        <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100 flex items-center gap-4">
           <Phone className="text-red-500" />
           <div>
             <h4 className="font-bold text-red-700 text-sm">Need Help?</h4>
             <p className="text-xs text-red-600">Call the National Helpline: 988</p>
           </div>
        </div>

      </div>
      <BottomNav />
    </div>
  );
}

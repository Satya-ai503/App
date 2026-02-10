import { TopBar } from "@/components/layout/TopBar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function Nutrition() {
  const meals = [
    { title: "Dal Chawal Bowl", cal: 350, tag: "Lunch", img: "/assets/thali.jpg" },
    { title: "Roti & Mixed Sabzi", cal: 280, tag: "Dinner", img: "https://images.unsplash.com/photo-1505253716371-26d7d424fe8d?auto=format&fit=crop&q=80&w=300" },
    { title: "Sprouts Salad", cal: 120, tag: "Snack", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=300" },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <TopBar title="Nutrition" />
      <div className="p-4 space-y-6">

        {/* Hydration Tracker */}
        <Card className="bg-blue-50 border-none">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-900">Hydration</h3>
              <p className="text-sm text-blue-700">4 / 8 Glasses</p>
            </div>
            <div className="flex gap-1">
              {[1,2,3,4].map(i => <div key={i} className="w-3 h-8 bg-blue-500 rounded-full" />)}
              {[5,6,7,8].map(i => <div key={i} className="w-3 h-8 bg-blue-200 rounded-full" />)}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="suggestions">
          <TabsList className="w-full">
            <TabsTrigger value="suggestions" className="flex-1">Suggestions</TabsTrigger>
            <TabsTrigger value="log" className="flex-1">Food Log</TabsTrigger>
          </TabsList>
          
          <TabsContent value="suggestions" className="mt-4 space-y-4">
             {meals.map((meal, i) => (
               <Card key={i} className="overflow-hidden border-none shadow-sm">
                 <div className="flex">
                   <img src={meal.img} className="w-28 object-cover" alt={meal.title} />
                   <div className="p-3 flex-1">
                     <div className="flex justify-between items-start">
                       <h4 className="font-bold text-sm">{meal.title}</h4>
                       <Badge variant="secondary" className="text-[10px] h-5">{meal.tag}</Badge>
                     </div>
                     <p className="text-xs text-muted-foreground mt-1">{meal.cal} kcal</p>
                     <button className="mt-2 text-xs font-semibold text-green-600 border border-green-200 px-2 py-1 rounded-md hover:bg-green-50">
                       Add to Log
                     </button>
                   </div>
                 </div>
               </Card>
             ))}
          </TabsContent>
          
          <TabsContent value="log">
            <div className="text-center py-10 text-muted-foreground">
              <p>Food logging coming soon!</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
}

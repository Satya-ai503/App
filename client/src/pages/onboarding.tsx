import { useState } from "react";
import { useLocation } from "wouter";
import { useWellnessStore, Gender, Goal } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const updateUser = useWellnessStore((state) => state.updateUser);
  const user = useWellnessStore((state) => state.user);

  const totalSteps = 4;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setLocation("/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col">
      <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
        <motion.div 
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${(step / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">Tell us about yourself</h2>
              <div className="space-y-4">
                <Label className="text-lg">I identify as...</Label>
                <RadioGroup 
                  value={user?.gender} 
                  onValueChange={(val) => updateUser({ gender: val as Gender })}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female" className="cursor-pointer flex-1">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male" className="cursor-pointer flex-1">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other" className="cursor-pointer flex-1">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-lg">My Age: {user?.age || 25}</Label>
                <Slider 
                  value={[user?.age || 25]} 
                  onValueChange={(val) => updateUser({ age: val[0] })}
                  min={13} 
                  max={99} 
                  step={1} 
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">What's your goal?</h2>
              <div className="space-y-3">
                {[
                  { id: 'weight_loss', label: 'Lose Weight' },
                  { id: 'muscle_gain', label: 'Build Muscle' },
                  { id: 'stress_reduction', label: 'Reduce Stress' },
                  { id: 'better_sleep', label: 'Sleep Better' },
                  { id: 'general_health', label: 'Stay Healthy' }
                ].map((goal) => (
                  <div 
                    key={goal.id}
                    className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <Checkbox 
                      id={goal.id} 
                      checked={user?.goals?.includes(goal.id as Goal)}
                      onCheckedChange={(checked) => {
                        const currentGoals = user?.goals || [];
                        if (checked) {
                          updateUser({ goals: [...currentGoals, goal.id as Goal] });
                        } else {
                          updateUser({ goals: currentGoals.filter(g => g !== goal.id) });
                        }
                      }}
                    />
                    <Label htmlFor={goal.id} className="text-base font-medium flex-1 cursor-pointer">{goal.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-bold">Diet Preference</h2>
              <RadioGroup 
                  value={user?.diet} 
                  onValueChange={(val) => updateUser({ diet: val as any })}
                  className="space-y-3"
                >
                  {[
                    { val: 'veg', label: 'Vegetarian' },
                    { val: 'non-veg', label: 'Non-Vegetarian' },
                    { val: 'vegan', label: 'Vegan' },
                    { val: 'egg', label: 'Eggetarian' },
                  ].map((diet) => (
                    <div key={diet.val} className="flex items-center space-x-2 border rounded-xl p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5">
                      <RadioGroupItem value={diet.val} id={diet.val} />
                      <Label htmlFor={diet.val} className="text-base font-medium flex-1 cursor-pointer">{diet.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 flex flex-col items-center justify-center flex-1">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 className="text-3xl font-display font-bold">All Set!</h2>
              <p className="text-muted-foreground text-lg">We've personalized your daily wellness plan.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-border/50">
        <Button 
          variant="ghost" 
          onClick={handleBack} 
          disabled={step === 1}
          className={step === 1 ? "opacity-0" : ""}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Button onClick={handleNext} className="shadow-lg shadow-primary/20">
          {step === totalSteps ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

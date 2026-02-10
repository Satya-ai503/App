import { useState } from "react";
import { useLocation } from "wouter";
import { useWellnessStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [, setLocation] = useLocation();
  const login = useWellnessStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      // Mock auth
      login(email, name || email.split('@')[0]);
      setLocation(isLogin ? "/dashboard" : "/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm z-10"
      >
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Wellify" className="w-20 h-20 mx-auto mb-4 drop-shadow-lg" />
          <h1 className="text-3xl font-display font-bold text-foreground">Wellify</h1>
          <p className="text-muted-foreground mt-2">Your holistic wellness journey begins here.</p>
        </div>

        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/90">
          <CardHeader>
            <CardTitle className="text-xl text-center">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription className="text-center">
              {isLogin ? "Enter your details to sign in" : "Sign up for a healthier you"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Aditi Sharma" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                    className="bg-background/50"
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="hello@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="bg-background/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="bg-background/50"
                />
              </div>
              <Button type="submit" className="w-full text-base py-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                {isLogin ? "Sign In" : "Get Started"}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors underline decoration-dotted"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

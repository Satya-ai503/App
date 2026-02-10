import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Gender = 'male' | 'female' | 'other';
export type Goal = 'weight_loss' | 'muscle_gain' | 'stress_reduction' | 'better_sleep' | 'general_health';

interface User {
  name: string;
  email: string;
  gender: Gender;
  age: number;
  goals: Goal[];
  diet: 'veg' | 'non-veg' | 'vegan' | 'egg';
}

interface Action {
  id: string;
  type: 'physical' | 'mental' | 'nutrition';
  title: string;
  description: string;
  completed: boolean;
  points: number;
}

interface WellnessState {
  user: User | null;
  isAuthenticated: boolean;
  scores: {
    physical: number;
    mental: number;
    nutrition: number;
    social: number;
  };
  dailyPlan: Action[];
  mood: string | null;
  
  // Actions
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  toggleAction: (id: string) => void;
  setMood: (mood: string) => void;
  resetDaily: () => void;
}

const MOCK_ACTIONS: Action[] = [
  { id: '1', type: 'physical', title: 'Surya Namaskar', description: '3 rounds of Sun Salutation', completed: false, points: 10 },
  { id: '2', type: 'nutrition', title: 'Drink Water', description: 'Glass of warm water', completed: false, points: 5 },
  { id: '3', type: 'mental', title: 'Deep Breathing', description: '2 mins box breathing', completed: false, points: 10 },
  { id: '4', type: 'physical', title: 'Evening Walk', description: '15 mins brisk walk', completed: false, points: 15 },
  { id: '5', type: 'nutrition', title: 'Eat Fruit', description: 'Seasonal fruit snack', completed: false, points: 10 },
];

export const useWellnessStore = create<WellnessState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      scores: {
        physical: 65,
        mental: 72,
        nutrition: 50,
        social: 80,
      },
      dailyPlan: MOCK_ACTIONS,
      mood: null,

      login: (email, name) => set({ 
        isAuthenticated: true, 
        user: { 
          name, 
          email, 
          gender: 'female', 
          age: 25, 
          goals: ['general_health'], 
          diet: 'veg' 
        } 
      }),

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (data) => set((state) => ({ 
        user: state.user ? { ...state.user, ...data } : null 
      })),

      toggleAction: (id) => {
        set((state) => {
          const newPlan = state.dailyPlan.map(a => 
            a.id === id ? { ...a, completed: !a.completed } : a
          );
          
          // Recalculate scores based on completion
          // Simplified logic for prototype
          const completedCount = newPlan.filter(a => a.completed).length;
          const totalCount = newPlan.length;
          const bonus = Math.floor((completedCount / totalCount) * 10);

          return {
            dailyPlan: newPlan,
            scores: {
              ...state.scores,
              physical: Math.min(100, state.scores.physical + (get().dailyPlan.find(a => a.id === id && a.type === 'physical') ? 5 : 0)),
              mental: Math.min(100, state.scores.mental + (get().dailyPlan.find(a => a.id === id && a.type === 'mental') ? 5 : 0)),
              nutrition: Math.min(100, state.scores.nutrition + (get().dailyPlan.find(a => a.id === id && a.type === 'nutrition') ? 5 : 0)),
            }
          };
        });
      },

      setMood: (mood) => set({ mood }),
      
      resetDaily: () => set({ dailyPlan: MOCK_ACTIONS, mood: null }),
    }),
    {
      name: 'wellify-storage',
    }
  )
);

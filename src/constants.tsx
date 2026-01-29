import { Shield, Clock, BarChart3, Bell, Zap, Sliders, Lock, Smartphone } from 'lucide-react';
import { Feature, Testimonial, ToneProfile, StatItem } from './types';

export const NAV_LINKS = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Reviews', href: '#testimonials' },
];

export const FEATURES: Feature[] = [
  {
    id: 'blocking',
    title: 'Strict App Blocking',
    description: 'Uses Apple’s native Screen Time API to completely block access to distracting apps until tasks are done.',
    icon: Shield,
  },
  {
    id: 'timer',
    title: 'Flexible Task Timers',
    description: 'From 2-minute micro-tasks to 2-hour deep work marathons. You set the pace.',
    icon: Clock,
  },
  {
    id: 'stats',
    title: 'Visual Progress',
    description: 'Track your focus streaks and see exactly how much time you’ve reclaimed from scrolling.',
    icon: BarChart3,
  },
  {
    id: 'reminders',
    title: 'Smart Planning',
    description: 'Gentle nudges in the morning and evening to help you plan your distraction-free periods.',
    icon: Bell,
  },
  {
    id: 'dynamic',
    title: 'Live Activities',
    description: 'Track your remaining focus time directly from the Dynamic Island or Lock Screen.',
    icon: Zap,
  },
  {
    id: 'friction',
    title: 'Conscious Friction',
    description: 'Need to bypass? You’ll have to wait through a 30-second breathing exercise first.',
    icon: Lock,
  },
];

export const TONE_PROFILES: ToneProfile[] = [
  {
    id: 'firm',
    name: 'Firm',
    preview: "Clock's running. No excuses.",
    color: 'bg-brand-dark text-white',
  },
  {
    id: 'gentle',
    name: 'Gentle',
    preview: "You've got this. One step at a time.",
    color: 'bg-brand-coral text-white',
  },
  {
    id: 'neutral',
    name: 'Neutral',
    preview: "Timer started. 25:00 remaining.",
    color: 'bg-brand-subtle text-white',
  },
];

export const STATS: StatItem[] = [
  { value: '72', label: 'Minutes Reclaimed Daily', suffix: '+' },
  { value: '36', label: 'Less Screen Time', suffix: '%' },
  { value: '94', label: 'Task Completion Rate', suffix: '%' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    role: 'Product Designer',
    content: "LockMe completely changed my productivity. I finally have deep work blocks without fighting my phone.",
    rating: 5,
  },
  {
    id: '2',
    name: 'James K.',
    role: 'Founder',
    content: "The tone profiles are genius. The gentle one keeps me motivated without being harsh.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Alex T.',
    role: 'Developer',
    content: "Game-changer. My focus time has tripled since I started using LockMe.",
    rating: 5,
  },
];
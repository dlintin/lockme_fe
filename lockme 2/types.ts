import { LucideIcon } from 'lucide-react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ToneProfile {
  id: string;
  name: string;
  preview: string;
  color: string;
}

export interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

import React from 'react';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface SyllabusItem {
  id: string;
  title: string;
  description: string;
  week: string;
  topics: string[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
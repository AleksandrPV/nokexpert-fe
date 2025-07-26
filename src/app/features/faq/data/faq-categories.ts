import { FaqCategory } from '../models/faq.interface';

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    name: 'Общие вопросы',
    description: 'Общие вопросы по НОК, законодательству и процедурам',
    icon: 'help-circle',
    color: 'bg-blue-100 text-blue-800',
    count: 25
  },
  {
    id: 'nostroy',
    name: 'НОСТРОЙ (Строители)',
    description: 'Вопросы по НОК для специалистов строительной отрасли',
    icon: 'building',
    color: 'bg-green-100 text-green-800',
    count: 20
  },
  {
    id: 'nopriz',
    name: 'НОПРИЗ (Проектировщики)',
    description: 'Вопросы по НОК для проектировщиков и изыскателей',
    icon: 'ruler',
    color: 'bg-purple-100 text-purple-800',
    count: 20
  },
  {
    id: 'fire-safety',
    name: 'Пожарная безопасность',
    description: 'Вопросы по НОК для ответственных за пожарную безопасность',
    icon: 'flame',
    color: 'bg-red-100 text-red-800',
    count: 15
  }
]; 
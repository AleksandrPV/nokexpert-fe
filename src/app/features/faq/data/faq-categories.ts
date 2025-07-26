import { FaqCategory } from '../models/faq.interface';

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    name: 'Общие вопросы',
    description: 'Основные вопросы о НОК, законодательстве и процедурах',
    icon: '📋',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'nostroy',
    name: 'НОСТРОЙ (Строители)',
    description: 'Вопросы для специалистов строительной отрасли',
    icon: '🏗️',
    color: 'bg-orange-100 text-orange-800'
  },
  {
    id: 'nopriz',
    name: 'НОПРИЗ (Проектировщики)',
    description: 'Вопросы для проектировщиков и изыскателей',
    icon: '📐',
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'fire-safety',
    name: 'Пожарная безопасность',
    description: 'Вопросы по НОК для ответственных за пожарную безопасность',
    icon: '🔥',
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'practical',
    name: 'Практические вопросы',
    description: 'Вопросы по процедурам, документам и практическим аспектам',
    icon: '💼',
    color: 'bg-purple-100 text-purple-800'
  }
]; 
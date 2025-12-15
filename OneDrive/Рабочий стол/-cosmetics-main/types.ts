export enum SkinType {
  OILY = 'Жирная',
  DRY = 'Сухая',
  COMBINATION = 'Комбинированная',
  NORMAL = 'Нормальная',
  SENSITIVE = 'Чувствительная'
}

export enum Concern {
  ACNE = 'Акне и воспаления',
  AGING = 'Возрастные изменения',
  DARK_SPOTS = 'Пигментация',
  DULLNESS = 'Тусклый цвет',
  REDNESS = 'Покраснения',
  TEXTURE = 'Неровная текстура'
}

export interface UserPreferences {
  skinType: SkinType | null;
  concerns: Concern[];
  budget: 'Эконом' | 'Средний' | 'Люкс';
}

export interface ProductRecommendation {
  name: string;
  brand: string;
  category: string;
  price: string;
  reason: string;
  rating: number;
}

export interface AnalysisResult {
  skinTone: string;
  undertone: string;
  detectedFeatures: string[];
  analysisText: string;
  recommendations: ProductRecommendation[];
}

export type AppStep = 'LANDING' | 'QUIZ' | 'UPLOAD' | 'ANALYZING' | 'RESULTS';
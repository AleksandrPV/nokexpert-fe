export interface FeedbackFormData {
  name: string;
  email: string;
  phone: string;
  subject: FeedbackSubject;
  message: string;
  privacy: boolean;
}

export enum FeedbackSubject {
  NOK_NOSTROY = 'nok-nostroy',
  NOK_NOPRIZ = 'nok-nopriz',
  CONSULTATION = 'consultation',
  DOCUMENTS = 'documents',
  PRICING = 'pricing',
  OTHER = 'other'
}

export interface FeedbackSubjectOption {
  value: FeedbackSubject;
  label: string;
  icon: string;
}

export interface PopupConfig {
  isVisible: boolean;
  title?: string;
  subtitle?: string;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

export interface FeedbackSubmitResult {
  success: boolean;
  message: string;
  error?: string;
} 
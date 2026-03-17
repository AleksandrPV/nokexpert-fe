export interface Council {
  councilId: string;
  code: string;
  title: string;
  description: string | null;
}

export interface Qualification {
  profQualId: string;
  title: string;
  code: string;
  level: number;
  councilId: string;
  questionCount: number;
}

export type TestMode = 'training' | 'exam';
export type TestStatusType = 'in_progress' | 'completed' | 'expired';
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';

export interface StartTestRequest {
  profQualId: string;
  mode: TestMode;
  questionCount: number;
}

export interface StartTestResponse {
  testId: string;
  totalQuestions: number;
  mode: TestMode;
}

export interface TestState {
  testId: string;
  mode: TestMode;
  status: TestStatusType;
  totalQuestions: number;
  answeredQuestions: number;
  remainingSeconds: number | null;
  startedAt: string;
}

export interface QuestionOption {
  optionId: string;
  text: string;
  orderNumber: number;
  isCorrect?: boolean;
}

export interface UserAnswer {
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface TestQuestion {
  questionId: string;
  orderNumber: number;
  text: string;
  questionType: QuestionType;
  options: QuestionOption[];
  userAnswer?: UserAnswer | null;
}

export interface SubmitAnswerRequest {
  questionId: string;
  selectedOptionIds: string[];
}

export interface SubmitAnswerResponse {
  isCorrect: boolean | null;
  correctOptionIds?: string[];
  options?: QuestionOption[];
}

export interface CompleteTestResponse {
  testId: string;
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}

export interface ResultOption {
  optionId: string;
  text: string;
  orderNumber: number;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface ResultQuestion {
  questionId: string;
  orderNumber: number;
  text: string;
  questionType: QuestionType;
  options: ResultOption[];
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface TestResults {
  testId: string;
  mode: TestMode;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number;
  passed: boolean;
  timeTakenSeconds: number;
  questions: ResultQuestion[];
}

export interface CouncilCard {
  council: Council;
  qualifications: Qualification[];
  totalQuestions: number;
  isAvailable: boolean;
  icon: string;
}

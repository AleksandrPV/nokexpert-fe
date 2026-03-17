export enum TestMode {
  TRAINING = 'training',
  EXAM = 'exam',
}

export enum QuestionTypeCode {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
}

export enum TestStatus {
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
}

export interface CouncilResponse {
  councilId: string;
  code: string;
  title: string;
  description: string | null;
}

export interface QualificationResponse {
  profQualId: string;
  title: string;
  code: string;
  level: number;
  councilId: string;
  questionCount: number;
}

export interface TestStateResponse {
  testId: string;
  mode: TestMode;
  status: TestStatus;
  totalQuestions: number;
  answeredQuestions: number;
  remainingSeconds: number | null;
  startedAt: string;
}

export interface QuestionResponse {
  questionId: string;
  orderNumber: number;
  text: string;
  questionType: QuestionTypeCode;
  options: OptionResponse[];
  userAnswer?: UserAnswerResponse | null;
}

export interface OptionResponse {
  optionId: string;
  text: string;
  orderNumber: number;
  isCorrect?: boolean;
}

export interface UserAnswerResponse {
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface TestResultsResponse {
  testId: string;
  mode: TestMode;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number;
  passed: boolean;
  timeTakenSeconds: number;
  questions: ResultQuestionResponse[];
}

export interface ResultQuestionResponse {
  questionId: string;
  orderNumber: number;
  text: string;
  questionType: QuestionTypeCode;
  options: ResultOptionResponse[];
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface ResultOptionResponse {
  optionId: string;
  text: string;
  orderNumber: number;
  isCorrect: boolean;
  isSelected: boolean;
}

export interface UserTestHistoryItem {
  testId: string;
  mode: TestMode;
  status: TestStatus;
  score: number | null;
  passed: boolean;
  totalQuestions: number;
  qualificationTitle: string;
  startedAt: string;
  finishedAt: string | null;
  timeTakenSeconds: number;
}

export interface UserStatsResponse {
  totalTests: number;
  completedTests: number;
  avgScore: number;
  bestScore: number;
  passRate: number;
  totalTimeSec: number;
}

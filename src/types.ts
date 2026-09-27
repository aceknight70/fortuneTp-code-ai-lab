export type Tier = 'primary' | 'jss' | 'ss';
export type Programme = 'code_ai' | 'digital_technologies';

export interface CaiSchool {
  id: string;
  name: string;
  created_at: string;
}

export interface CaiClass {
  id: string;
  school_id: string;
  name: string;
  tier: Tier;
  programme?: Programme; // 'code_ai' (default) or 'digital_technologies'
  class_pin: string;
  created_at: string;
}

export interface CaiStudent {
  id: string;
  class_id: string;
  full_name: string;
  created_at: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CaiWeekContent {
  starterCode?: string;
  starterBlocks?: PrimaryBlock[];
  availableBlocks?: PrimaryBlock[];
  aiExamplePrompts?: string[];
  tips?: string[];
  challenge?: string;
  dtConcept?: string;
  dtRealWorldCase?: string;
  dtInteractiveType?: 'cipher' | 'phishing' | 'password' | 'network' | 'binary' | 'ethics' | 'concept';
  quiz?: QuizQuestion[];
}

export interface CaiWeek {
  id: string;
  week_number: number;
  tier: Tier;
  programme?: Programme;
  title: string;
  learn_text: string;
  do_instructions: string;
  content_json: CaiWeekContent;
  updated_at: string;
}

export interface MiniAIResult {
  verdict: 'Positive' | 'Negative' | 'Mixed' | 'Neutral / Not sure';
  emoji: string;
  posHits: string[];
  negHits: string[];
}

export interface CaiProgress {
  id: string;
  student_id: string;
  week_number: number;
  programme?: Programme;
  submission: {
    type: 'typed_code' | 'blocks' | 'dt_lab';
    code: string;
    blocks?: PrimaryBlock[];
    dtAnswers?: Record<string, string | number>;
    dtScore?: number;
  };
  output_captured: string;
  ai_demo_input?: string;
  ai_demo_result?: MiniAIResult;
  completed_at: string;
  parent_signoff: boolean;
  parent_signoff_at?: string | null;
}

export interface CaiAdmin {
  id: string;
  auth_user_id?: string;
  email?: string;
  name: string;
  role: 'master' | 'teacher';
  school_id?: string | null;
  created_at: string;
}

export interface CaiMasterOverview {
  school_id: string;
  school_name: string;
  class_count: number;
  student_count: number;
  total_submissions: number;
}

export interface PrimaryBlock {
  id: string;
  type: 'print_start' | 'text' | 'emoji' | 'number' | 'print_end';
  value: string;
  display: string;
  category?: 'say' | 'words' | 'emojis' | 'action';
}

export interface RunResult {
  output: string[];
  error: string | null;
}

export type AppRoom =
  | 'home'
  | 'scheme'
  | 'trainings'
  | 'assignments'
  | 'projects'
  | 'secrets'
  | 'about'
  | 'ask'
  | 'editor';

export interface CaiFile {
  id: string;
  student_id: string;
  filename: string;
  content: string;
  tier: 'jss' | 'ss';
  created_at: string;
  updated_at: string;
}

export interface CaiFileVersion {
  id: string;
  file_id: string;
  content_snapshot: string;
  saved_at: string;
}

export interface CaiTraining {
  id: string;
  tier: Tier;
  programme?: Programme;
  title: string;
  content: string;
  created_at: string;
}

export interface CaiAssignment {
  id: string;
  tier: Tier;
  programme?: Programme;
  school_id?: string | null;
  title: string;
  instructions: string;
  due_note?: string;
  created_at: string;
}

export interface CaiAssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  file_id?: string | null;
  notes?: string;
  submitted_at: string;
  file?: CaiFile;
}

export interface CaiProject {
  id: string;
  tier: Tier;
  programme?: Programme;
  title: string;
  description: string;
  deliverables?: string[];
  created_at: string;
}

export interface CaiProjectSubmission {
  id: string;
  project_id: string;
  student_id: string;
  file_id?: string | null;
  notes?: string;
  external_link?: string;
  whatsapp_sent_teacher?: boolean;
  whatsapp_sent_fortune?: boolean;
  submitted_at: string;
  file?: CaiFile;
}

export interface CaiQuestion {
  id: string;
  student_id: string;
  question_text: string;
  answer_text?: string | null;
  answered: boolean;
  created_at: string;
  student_name?: string;
  class_name?: string;
}

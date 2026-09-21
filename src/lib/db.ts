import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  CaiClass,
  CaiMasterOverview,
  CaiProgress,
  CaiSchool,
  CaiStudent,
  CaiWeek,
  Tier,
  CaiFile,
  CaiFileVersion,
  CaiTraining,
  CaiAssignment,
  CaiAssignmentSubmission,
  CaiProject,
  CaiProjectSubmission,
  CaiQuestion,
} from '../types';
import {
  SEED_CLASSES,
  SEED_PROGRESS,
  SEED_SCHOOLS,
  SEED_STUDENTS,
  SEED_WEEKS,
  SEED_FILES,
  SEED_FILE_VERSIONS,
  SEED_TRAININGS,
  SEED_ASSIGNMENTS,
  SEED_ASSIGNMENT_SUBMISSIONS,
  SEED_PROJECTS,
  SEED_PROJECT_SUBMISSIONS,
  SEED_QUESTIONS,
} from './seedData';

const STORAGE_KEY_PREFIX = 'cai_lab_';

// Optional Supabase configuration from environment or localStorage
function getInitialSupabaseConfig() {
  const envUrl = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as unknown as { env?: Record<string, string> }).env?.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = localStorage.getItem(`${STORAGE_KEY_PREFIX}supabase_url`) || envUrl;
  const storedKey = localStorage.getItem(`${STORAGE_KEY_PREFIX}supabase_key`) || envKey;

  return { url: storedUrl, key: storedKey };
}

let supabaseClient: SupabaseClient | null = null;

function initSupabase(): SupabaseClient | null {
  const { url, key } = getInitialSupabaseConfig();
  if (url && key) {
    try {
      supabaseClient = createClient(url, key);
    } catch (err) {
      console.warn('Supabase initialization error, falling back to local store:', err);
      supabaseClient = null;
    }
  }
  return supabaseClient;
}

initSupabase();

// Storage helper functions for local database
function getLocalItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setLocalItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${key}`, JSON.stringify(value));
  } catch (err) {
    console.warn('Failed to save to localStorage:', err);
  }
}

// Initial hydration
export function ensureDatabaseSeeded(): void {
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}schools`)) {
    setLocalItem('schools', SEED_SCHOOLS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}classes`)) {
    setLocalItem('classes', SEED_CLASSES);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}students`)) {
    setLocalItem('students', SEED_STUDENTS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}weeks`)) {
    setLocalItem('weeks', SEED_WEEKS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}progress`)) {
    setLocalItem('progress', SEED_PROGRESS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}files`)) {
    setLocalItem('files', SEED_FILES);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}file_versions`)) {
    setLocalItem('file_versions', SEED_FILE_VERSIONS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}trainings`)) {
    setLocalItem('trainings', SEED_TRAININGS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}assignments`)) {
    setLocalItem('assignments', SEED_ASSIGNMENTS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}assignment_submissions`)) {
    setLocalItem('assignment_submissions', SEED_ASSIGNMENT_SUBMISSIONS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}projects`)) {
    setLocalItem('projects', SEED_PROJECTS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}project_submissions`)) {
    setLocalItem('project_submissions', SEED_PROJECT_SUBMISSIONS);
  }
  if (!localStorage.getItem(`${STORAGE_KEY_PREFIX}questions`)) {
    setLocalItem('questions', SEED_QUESTIONS);
  }
}

ensureDatabaseSeeded();

// Public API matching SQL Schema operations
export const db = {
  // Check class PIN
  async checkClassPin(pin: string): Promise<{
    cls: CaiClass;
    school: CaiSchool;
    students: CaiStudent[];
  } | null> {
    const cleanPin = pin.trim().toUpperCase();

    // Try Supabase first if connected
    if (supabaseClient) {
      try {
        const { data: classData, error: classErr } = await supabaseClient
          .from('cai_classes')
          .select('*')
          .ilike('class_pin', cleanPin)
          .single();

        if (!classErr && classData) {
          const { data: schoolData } = await supabaseClient
            .from('cai_schools')
            .select('*')
            .eq('id', classData.school_id)
            .single();

          const { data: studentsData } = await supabaseClient
            .from('cai_students')
            .select('*')
            .eq('class_id', classData.id)
            .order('full_name', { ascending: true });

          return {
            cls: classData as CaiClass,
            school: (schoolData as CaiSchool) || { id: classData.school_id, name: 'Default Campus', created_at: '' },
            students: (studentsData as CaiStudent[]) || [],
          };
        }
      } catch (e) {
        console.warn('Supabase pin query error, checking local store:', e);
      }
    }

    // Local fallback
    const classes = getLocalItem<CaiClass[]>('classes', SEED_CLASSES);
    const matchedClass = classes.find(
      (c) => c.class_pin.trim().toUpperCase() === cleanPin
    );

    if (!matchedClass) return null;

    const schools = getLocalItem<CaiSchool[]>('schools', SEED_SCHOOLS);
    const school = schools.find((s) => s.id === matchedClass.school_id) || {
      id: matchedClass.school_id,
      name: "Fortune's TP Academy",
      created_at: '',
    };

    const students = getLocalItem<CaiStudent[]>('students', SEED_STUDENTS).filter(
      (s) => s.class_id === matchedClass.id
    ).sort((a, b) => a.full_name.localeCompare(b.full_name));

    return { cls: matchedClass, school, students };
  },

  // Get Weeks for tier (1-13)
  async getWeeks(tier: Tier): Promise<CaiWeek[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_weeks')
          .select('*')
          .eq('tier', tier)
          .order('week_number', { ascending: true });

        if (!error && data && data.length > 0) {
          return data as CaiWeek[];
        }
      } catch (e) {
        console.warn('Supabase getWeeks error:', e);
      }
    }

    const weeks = getLocalItem<CaiWeek[]>('weeks', SEED_WEEKS);
    return weeks
      .filter((w) => w.tier === tier)
      .sort((a, b) => a.week_number - b.week_number);
  },

  // Save/Update student progress
  async saveProgress(record: {
    student_id: string;
    week_number: number;
    submission: CaiProgress['submission'];
    output_captured: string;
    ai_demo_input?: string;
    ai_demo_result?: CaiProgress['ai_demo_result'];
  }): Promise<CaiProgress> {
    const timestamp = new Date().toISOString();

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_progress')
          .insert({
            student_id: record.student_id,
            week_number: record.week_number,
            submission: record.submission,
            output_captured: record.output_captured,
            ai_demo_input: record.ai_demo_input,
            ai_demo_result: record.ai_demo_result,
            completed_at: timestamp,
          })
          .select()
          .single();

        if (!error && data) {
          return data as CaiProgress;
        }
      } catch (e) {
        console.warn('Supabase saveProgress error, writing to local store:', e);
      }
    }

    const allProgress = getLocalItem<CaiProgress[]>('progress', SEED_PROGRESS);
    // Find existing attempt for this student and week, or add new
    const existingIndex = allProgress.findIndex(
      (p) => p.student_id === record.student_id && p.week_number === record.week_number
    );

    const newRecord: CaiProgress = {
      id: existingIndex >= 0 ? allProgress[existingIndex].id : `prg-${Date.now()}`,
      student_id: record.student_id,
      week_number: record.week_number,
      submission: record.submission,
      output_captured: record.output_captured,
      ai_demo_input: record.ai_demo_input,
      ai_demo_result: record.ai_demo_result,
      completed_at: timestamp,
      parent_signoff: existingIndex >= 0 ? allProgress[existingIndex].parent_signoff : false,
      parent_signoff_at: existingIndex >= 0 ? allProgress[existingIndex].parent_signoff_at : null,
    };

    if (existingIndex >= 0) {
      allProgress[existingIndex] = newRecord;
    } else {
      allProgress.push(newRecord);
    }

    setLocalItem('progress', allProgress);
    return newRecord;
  },

  // Get student progress
  async getStudentProgress(studentId: string): Promise<CaiProgress[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_progress')
          .select('*')
          .eq('student_id', studentId)
          .order('week_number', { ascending: true });

        if (!error && data) {
          return data as CaiProgress[];
        }
      } catch (e) {
        console.warn('Supabase getStudentProgress error:', e);
      }
    }

    const allProgress = getLocalItem<CaiProgress[]>('progress', SEED_PROGRESS);
    return allProgress
      .filter((p) => p.student_id === studentId)
      .sort((a, b) => a.week_number - b.week_number);
  },

  // Toggle parent sign-off
  async toggleParentSignoff(progressId: string, signoff: boolean): Promise<boolean> {
    const timestamp = signoff ? new Date().toISOString() : null;

    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('cai_progress')
          .update({
            parent_signoff: signoff,
            parent_signoff_at: timestamp,
          })
          .eq('id', progressId);

        if (!error) return true;
      } catch (e) {
        console.warn('Supabase signoff error:', e);
      }
    }

    const allProgress = getLocalItem<CaiProgress[]>('progress', SEED_PROGRESS);
    const target = allProgress.find((p) => p.id === progressId);
    if (target) {
      target.parent_signoff = signoff;
      target.parent_signoff_at = timestamp;
      setLocalItem('progress', allProgress);
      return true;
    }
    return false;
  },

  // Master: Update week curriculum content (live editable by Fortune)
  async updateWeek(id: string, updates: Partial<CaiWeek>): Promise<CaiWeek | null> {
    const timestamp = new Date().toISOString();

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_weeks')
          .update({
            ...updates,
            updated_at: timestamp,
          })
          .eq('id', id)
          .select()
          .single();

        if (!error && data) {
          return data as CaiWeek;
        }
      } catch (e) {
        console.warn('Supabase updateWeek error:', e);
      }
    }

    const allWeeks = getLocalItem<CaiWeek[]>('weeks', SEED_WEEKS);
    const index = allWeeks.findIndex((w) => w.id === id);
    if (index >= 0) {
      allWeeks[index] = {
        ...allWeeks[index],
        ...updates,
        updated_at: timestamp,
      };
      setLocalItem('weeks', allWeeks);
      return allWeeks[index];
    }
    return null;
  },

  // Master: Roll-up overview
  async getMasterOverview(): Promise<CaiMasterOverview[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_master_overview')
          .select('*');

        if (!error && data) {
          return data as CaiMasterOverview[];
        }
      } catch (e) {
        console.warn('Supabase getMasterOverview error:', e);
      }
    }

    const schools = getLocalItem<CaiSchool[]>('schools', SEED_SCHOOLS);
    const classes = getLocalItem<CaiClass[]>('classes', SEED_CLASSES);
    const students = getLocalItem<CaiStudent[]>('students', SEED_STUDENTS);
    const progress = getLocalItem<CaiProgress[]>('progress', SEED_PROGRESS);

    return schools.map((school) => {
      const schoolClasses = classes.filter((c) => c.school_id === school.id);
      const schoolClassIds = new Set(schoolClasses.map((c) => c.id));
      const schoolStudents = students.filter((s) => schoolClassIds.has(s.class_id));
      const schoolStudentIds = new Set(schoolStudents.map((s) => s.id));
      const schoolSubmissions = progress.filter((p) => schoolStudentIds.has(p.student_id));

      return {
        school_id: school.id,
        school_name: school.name,
        class_count: schoolClasses.length,
        student_count: schoolStudents.length,
        total_submissions: schoolSubmissions.length,
      };
    });
  },

  // Master: Full hierarchy for drilldown
  async getMasterHierarchy() {
    const schools = getLocalItem<CaiSchool[]>('schools', SEED_SCHOOLS);
    const classes = getLocalItem<CaiClass[]>('classes', SEED_CLASSES);
    const students = getLocalItem<CaiStudent[]>('students', SEED_STUDENTS);
    const progress = getLocalItem<CaiProgress[]>('progress', SEED_PROGRESS);

    return schools.map((s) => {
      const schoolClasses = classes
        .filter((c) => c.school_id === s.id)
        .map((c) => {
          const classStudents = students
            .filter((st) => st.class_id === c.id)
            .map((st) => {
              const studentProgress = progress.filter((p) => p.student_id === st.id);
              return {
                ...st,
                progressCount: studentProgress.length,
                progress: studentProgress,
              };
            });
          return {
            ...c,
            students: classStudents,
          };
        });
      return {
        ...s,
        classes: schoolClasses,
      };
    });
  },

  // Master PIN verification
  verifyMasterAuth(pinOrPass: string): boolean {
    const normalized = pinOrPass.trim().toUpperCase();
    return normalized === 'FORTUNE2026' || normalized === 'MASTER2026' || normalized === 'ESGMC2026' || normalized === 'ADMIN';
  },

  // Supabase connection settings
  getSupabaseConfig() {
    return getInitialSupabaseConfig();
  },

  setSupabaseConfig(url: string, key: string) {
    if (url.trim()) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}supabase_url`, url.trim());
    } else {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}supabase_url`);
    }

    if (key.trim()) {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}supabase_key`, key.trim());
    } else {
      localStorage.removeItem(`${STORAGE_KEY_PREFIX}supabase_key`);
    }

    return initSupabase();
  },

  // ============ FILES & VERSIONS (AI SYSTEM) ============
  async getFiles(studentId: string): Promise<CaiFile[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_files')
          .select('*')
          .eq('student_id', studentId)
          .order('updated_at', { ascending: false });
        if (!error && data) return data as CaiFile[];
      } catch (err) {
        console.warn('Supabase getFiles error:', err);
      }
    }
    const files = getLocalItem<CaiFile[]>('files', []);
    return files
      .filter((f) => f.student_id === studentId)
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  },

  async getFile(fileId: string): Promise<CaiFile | null> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_files')
          .select('*')
          .eq('id', fileId)
          .single();
        if (!error && data) return data as CaiFile;
      } catch (err) {
        console.warn('Supabase getFile error:', err);
      }
    }
    const files = getLocalItem<CaiFile[]>('files', []);
    return files.find((f) => f.id === fileId) || null;
  },

  async createFile(
    studentId: string,
    filename: string,
    tier: 'jss' | 'ss',
    initialContent = ''
  ): Promise<CaiFile> {
    const cleanName = filename.trim().endsWith('.py')
      ? filename.trim()
      : `${filename.trim()}.py`;

    const newFile: CaiFile = {
      id: `file-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      student_id: studentId,
      filename: cleanName,
      content: initialContent,
      tier,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_files')
          .insert([newFile])
          .select()
          .single();
        if (!error && data) return data as CaiFile;
      } catch (err) {
        console.warn('Supabase createFile error:', err);
      }
    }

    const files = getLocalItem<CaiFile[]>('files', []);
    setLocalItem('files', [newFile, ...files]);

    // Create initial version snapshot
    const initVersion: CaiFileVersion = {
      id: `ver-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file_id: newFile.id,
      content_snapshot: initialContent,
      saved_at: new Date().toISOString(),
    };
    const versions = getLocalItem<CaiFileVersion[]>('file_versions', []);
    setLocalItem('file_versions', [initVersion, ...versions]);

    return newFile;
  },

  async saveFile(
    fileId: string,
    content: string
  ): Promise<{ file: CaiFile; version: CaiFileVersion } | null> {
    const now = new Date().toISOString();
    const newVersion: CaiFileVersion = {
      id: `ver-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      file_id: fileId,
      content_snapshot: content,
      saved_at: now,
    };

    if (supabaseClient) {
      try {
        const { data: updatedFile, error: fileErr } = await supabaseClient
          .from('cai_files')
          .update({ content, updated_at: now })
          .eq('id', fileId)
          .select()
          .single();

        await supabaseClient.from('cai_file_versions').insert([newVersion]);

        if (!fileErr && updatedFile) {
          return { file: updatedFile as CaiFile, version: newVersion };
        }
      } catch (err) {
        console.warn('Supabase saveFile error:', err);
      }
    }

    const files = getLocalItem<CaiFile[]>('files', []);
    const idx = files.findIndex((f) => f.id === fileId);
    if (idx === -1) return null;

    files[idx] = {
      ...files[idx],
      content,
      updated_at: now,
    };
    setLocalItem('files', files);

    const versions = getLocalItem<CaiFileVersion[]>('file_versions', []);
    setLocalItem('file_versions', [newVersion, ...versions]);

    return { file: files[idx], version: newVersion };
  },

  async deleteFile(fileId: string): Promise<boolean> {
    if (supabaseClient) {
      try {
        const { error } = await supabaseClient
          .from('cai_files')
          .delete()
          .eq('id', fileId);
        if (!error) return true;
      } catch (err) {
        console.warn('Supabase deleteFile error:', err);
      }
    }
    const files = getLocalItem<CaiFile[]>('files', []);
    setLocalItem(
      'files',
      files.filter((f) => f.id !== fileId)
    );
    return true;
  },

  async getFileVersions(fileId: string): Promise<CaiFileVersion[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_file_versions')
          .select('*')
          .eq('file_id', fileId)
          .order('saved_at', { ascending: false });
        if (!error && data) return data as CaiFileVersion[];
      } catch (err) {
        console.warn('Supabase getFileVersions error:', err);
      }
    }
    const versions = getLocalItem<CaiFileVersion[]>('file_versions', []);
    return versions
      .filter((v) => v.file_id === fileId)
      .sort((a, b) => new Date(b.saved_at).getTime() - new Date(a.saved_at).getTime());
  },

  async revertFileVersion(fileId: string, versionId: string): Promise<CaiFile | null> {
    const versions = await this.getFileVersions(fileId);
    const targetVersion = versions.find((v) => v.id === versionId);
    if (!targetVersion) return null;

    const res = await this.saveFile(fileId, targetVersion.content_snapshot);
    return res ? res.file : null;
  },

  // ============ TRAININGS ============
  async getTrainings(tier: Tier): Promise<CaiTraining[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_trainings')
          .select('*')
          .eq('tier', tier)
          .order('created_at', { ascending: false });
        if (!error && data) return data as CaiTraining[];
      } catch (err) {
        console.warn('Supabase getTrainings error:', err);
      }
    }
    const trainings = getLocalItem<CaiTraining[]>('trainings', []);
    return trainings
      .filter((t) => t.tier === tier)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createTraining(tier: Tier, title: string, content: string): Promise<CaiTraining> {
    const newTrn: CaiTraining = {
      id: `trn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tier,
      title: title.trim(),
      content: content.trim(),
      created_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_trainings')
          .insert([newTrn])
          .select()
          .single();
        if (!error && data) return data as CaiTraining;
      } catch (err) {
        console.warn('Supabase createTraining error:', err);
      }
    }

    const trainings = getLocalItem<CaiTraining[]>('trainings', []);
    setLocalItem('trainings', [newTrn, ...trainings]);
    return newTrn;
  },

  // ============ ASSIGNMENTS ============
  async getAssignments(tier: Tier, schoolId?: string | null): Promise<CaiAssignment[]> {
    if (supabaseClient) {
      try {
        let q = supabaseClient.from('cai_assignments').select('*').eq('tier', tier);
        if (schoolId) {
          q = q.or(`school_id.is.null,school_id.eq.${schoolId}`);
        }
        const { data, error } = await q.order('created_at', { ascending: false });
        if (!error && data) return data as CaiAssignment[];
      } catch (err) {
        console.warn('Supabase getAssignments error:', err);
      }
    }
    const assignments = getLocalItem<CaiAssignment[]>('assignments', []);
    return assignments
      .filter((a) => a.tier === tier && (!a.school_id || a.school_id === schoolId))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createAssignment(
    tier: Tier,
    title: string,
    instructions: string,
    due_note = '',
    school_id: string | null = null
  ): Promise<CaiAssignment> {
    const newAsg: CaiAssignment = {
      id: `asg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tier,
      school_id,
      title: title.trim(),
      instructions: instructions.trim(),
      due_note: due_note.trim(),
      created_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_assignments')
          .insert([newAsg])
          .select()
          .single();
        if (!error && data) return data as CaiAssignment;
      } catch (err) {
        console.warn('Supabase createAssignment error:', err);
      }
    }

    const assignments = getLocalItem<CaiAssignment[]>('assignments', []);
    setLocalItem('assignments', [newAsg, ...assignments]);
    return newAsg;
  },

  async getAssignmentSubmissions(studentId: string): Promise<CaiAssignmentSubmission[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_assignment_submissions')
          .select('*, file:cai_files(*)')
          .eq('student_id', studentId);
        if (!error && data) return data as CaiAssignmentSubmission[];
      } catch (err) {
        console.warn('Supabase getAssignmentSubmissions error:', err);
      }
    }
    const submissions = getLocalItem<CaiAssignmentSubmission[]>('assignment_submissions', []);
    const files = getLocalItem<CaiFile[]>('files', []);
    return submissions
      .filter((s) => s.student_id === studentId)
      .map((s) => ({
        ...s,
        file: files.find((f) => f.id === s.file_id),
      }));
  },

  async submitAssignment(
    assignmentId: string,
    studentId: string,
    fileId?: string | null
  ): Promise<CaiAssignmentSubmission> {
    const newSub: CaiAssignmentSubmission = {
      id: `sub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      assignment_id: assignmentId,
      student_id: studentId,
      file_id: fileId || null,
      submitted_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_assignment_submissions')
          .insert([newSub])
          .select()
          .single();
        if (!error && data) return data as CaiAssignmentSubmission;
      } catch (err) {
        console.warn('Supabase submitAssignment error:', err);
      }
    }

    const submissions = getLocalItem<CaiAssignmentSubmission[]>('assignment_submissions', []);
    // Replace any existing submission for this assignment by this student
    const filtered = submissions.filter(
      (s) => !(s.assignment_id === assignmentId && s.student_id === studentId)
    );
    setLocalItem('assignment_submissions', [newSub, ...filtered]);
    return newSub;
  },

  // ============ PROJECTS ============
  async getProjects(tier: Tier): Promise<CaiProject[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_projects')
          .select('*')
          .eq('tier', tier)
          .order('created_at', { ascending: false });
        if (!error && data) return data as CaiProject[];
      } catch (err) {
        console.warn('Supabase getProjects error:', err);
      }
    }
    const projects = getLocalItem<CaiProject[]>('projects', []);
    return projects
      .filter((p) => p.tier === tier)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  },

  async createProject(tier: Tier, title: string, description: string): Promise<CaiProject> {
    const newPrj: CaiProject = {
      id: `prj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      tier,
      title: title.trim(),
      description: description.trim(),
      created_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_projects')
          .insert([newPrj])
          .select()
          .single();
        if (!error && data) return data as CaiProject;
      } catch (err) {
        console.warn('Supabase createProject error:', err);
      }
    }

    const projects = getLocalItem<CaiProject[]>('projects', []);
    setLocalItem('projects', [newPrj, ...projects]);
    return newPrj;
  },

  async getProjectSubmissions(studentId: string): Promise<CaiProjectSubmission[]> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_project_submissions')
          .select('*, file:cai_files(*)')
          .eq('student_id', studentId);
        if (!error && data) return data as CaiProjectSubmission[];
      } catch (err) {
        console.warn('Supabase getProjectSubmissions error:', err);
      }
    }
    const submissions = getLocalItem<CaiProjectSubmission[]>('project_submissions', []);
    const files = getLocalItem<CaiFile[]>('files', []);
    return submissions
      .filter((s) => s.student_id === studentId)
      .map((s) => ({
        ...s,
        file: files.find((f) => f.id === s.file_id),
      }));
  },

  async submitProject(
    projectId: string,
    studentId: string,
    fileId?: string | null
  ): Promise<CaiProjectSubmission> {
    const newSub: CaiProjectSubmission = {
      id: `psub-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      project_id: projectId,
      student_id: studentId,
      file_id: fileId || null,
      submitted_at: new Date().toISOString(),
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_project_submissions')
          .insert([newSub])
          .select()
          .single();
        if (!error && data) return data as CaiProjectSubmission;
      } catch (err) {
        console.warn('Supabase submitProject error:', err);
      }
    }

    const submissions = getLocalItem<CaiProjectSubmission[]>('project_submissions', []);
    const filtered = submissions.filter(
      (s) => !(s.project_id === projectId && s.student_id === studentId)
    );
    setLocalItem('project_submissions', [newSub, ...filtered]);
    return newSub;
  },

  // ============ QUESTIONS (ASK A QUESTION) ============
  async getQuestions(studentId?: string): Promise<CaiQuestion[]> {
    if (supabaseClient) {
      try {
        let q = supabaseClient.from('cai_questions').select('*');
        if (studentId) {
          q = q.eq('student_id', studentId);
        }
        const { data, error } = await q.order('created_at', { ascending: false });
        if (!error && data) return data as CaiQuestion[];
      } catch (err) {
        console.warn('Supabase getQuestions error:', err);
      }
    }
    const questions = getLocalItem<CaiQuestion[]>('questions', []);
    if (studentId) {
      return questions
        .filter((q) => q.student_id === studentId)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
    return [...questions].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  async askQuestion(
    studentId: string,
    questionText: string,
    studentName?: string,
    className?: string
  ): Promise<CaiQuestion> {
    const newQ: CaiQuestion = {
      id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      student_id: studentId,
      question_text: questionText.trim(),
      answer_text: null,
      answered: false,
      created_at: new Date().toISOString(),
      student_name: studentName,
      class_name: className,
    };

    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_questions')
          .insert([newQ])
          .select()
          .single();
        if (!error && data) return data as CaiQuestion;
      } catch (err) {
        console.warn('Supabase askQuestion error:', err);
      }
    }

    const questions = getLocalItem<CaiQuestion[]>('questions', []);
    setLocalItem('questions', [newQ, ...questions]);
    return newQ;
  },

  async answerQuestion(questionId: string, answerText: string): Promise<CaiQuestion | null> {
    if (supabaseClient) {
      try {
        const { data, error } = await supabaseClient
          .from('cai_questions')
          .update({ answer_text: answerText.trim(), answered: true })
          .eq('id', questionId)
          .select()
          .single();
        if (!error && data) return data as CaiQuestion;
      } catch (err) {
        console.warn('Supabase answerQuestion error:', err);
      }
    }

    const questions = getLocalItem<CaiQuestion[]>('questions', []);
    const idx = questions.findIndex((q) => q.id === questionId);
    if (idx === -1) return null;

    questions[idx] = {
      ...questions[idx],
      answer_text: answerText.trim(),
      answered: true,
    };
    setLocalItem('questions', questions);
    return questions[idx];
  },

  resetToDefaultSeed() {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}schools`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}classes`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}students`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}weeks`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}progress`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}files`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}file_versions`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}trainings`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}assignments`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}assignment_submissions`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}projects`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}project_submissions`);
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}questions`);
    ensureDatabaseSeeded();
  },
};

export const SUPABASE_SQL_SCHEMA = `-- ============ STEP ZERO: INSPECT AND RUN ============
-- Code & AI Lab Schema (PostgreSQL / Supabase)

create table if not exists cai_schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);

create table if not exists cai_classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid references cai_schools(id) on delete cascade,
  name text not null,                 -- e.g. "Primary 4", "JSS2 Gold", "SS1 Blue"
  tier text not null check (tier in ('primary','jss','ss')),
  class_pin text not null unique,
  created_at timestamptz default now()
);

create table if not exists cai_students (
  id uuid primary key default gen_random_uuid(),
  class_id uuid references cai_classes(id) on delete cascade,
  full_name text not null,
  created_at timestamptz default now()
);

create table if not exists cai_weeks (
  id uuid primary key default gen_random_uuid(),
  week_number int not null check (week_number between 1 and 13),
  tier text not null check (tier in ('primary','jss','ss')),
  title text not null,
  learn_text text,
  do_instructions text,
  content_json jsonb default '{}'::jsonb,
  updated_at timestamptz default now(),
  unique (week_number, tier)
);

create table if not exists cai_progress (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references cai_students(id) on delete cascade,
  week_number int not null,
  submission jsonb,
  output_captured text,
  ai_demo_input text,
  ai_demo_result jsonb,
  completed_at timestamptz default now(),
  parent_signoff boolean default false,
  parent_signoff_at timestamptz
);

create table if not exists cai_admins (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid references auth.users(id),
  name text,
  role text not null check (role in ('master','teacher')),
  school_id uuid references cai_schools(id),
  created_at timestamptz default now()
);

-- ============ SECTION 3: NEW APP SHELL & EDITOR SCHEMA ============

create table if not exists cai_files (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references cai_students(id) on delete cascade,
  filename text not null,
  content text default '',
  tier text not null check (tier in ('jss','ss')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists cai_file_versions (
  id uuid primary key default gen_random_uuid(),
  file_id uuid references cai_files(id) on delete cascade,
  content_snapshot text,
  saved_at timestamptz default now()
);

create table if not exists cai_trainings (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('primary','jss','ss')),
  title text not null,
  content text,           -- notes text and/or a video link
  created_at timestamptz default now()
);

create table if not exists cai_assignments (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('primary','jss','ss')),
  school_id uuid references cai_schools(id),   -- null = applies to every school
  title text not null,
  instructions text,
  due_note text,           -- plain text, e.g. "by Friday" — no strict deadline enforcement needed
  created_at timestamptz default now()
);

create table if not exists cai_assignment_submissions (
  id uuid primary key default gen_random_uuid(),
  assignment_id uuid references cai_assignments(id) on delete cascade,
  student_id uuid references cai_students(id) on delete cascade,
  file_id uuid references cai_files(id),
  submitted_at timestamptz default now()
);

create table if not exists cai_projects (
  id uuid primary key default gen_random_uuid(),
  tier text not null check (tier in ('primary','jss','ss')),
  title text not null,
  description text,
  created_at timestamptz default now()
);

create table if not exists cai_project_submissions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references cai_projects(id) on delete cascade,
  student_id uuid references cai_students(id) on delete cascade,
  file_id uuid references cai_files(id),
  submitted_at timestamptz default now()
);

create table if not exists cai_questions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references cai_students(id),
  question_text text not null,
  answer_text text,
  answered boolean default false,
  created_at timestamptz default now()
);

-- ============ MASTER ROLLUP VIEW ============

create or replace view cai_master_overview as
select
  s.id as school_id,
  s.name as school_name,
  count(distinct c.id) as class_count,
  count(distinct st.id) as student_count,
  count(distinct p.id) as total_submissions
from cai_schools s
left join cai_classes c on c.school_id = s.id
left join cai_students st on st.class_id = c.id
left join cai_progress p on p.student_id = st.id
group by s.id, s.name;
`;

import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Send,
  FileCode,
  Sparkles,
  Rocket,
  X,
} from 'lucide-react';
import {
  CaiClass,
  CaiFile,
  CaiProject,
  CaiProjectSubmission,
  CaiStudent,
} from '../types';
import { db } from '../lib/db';

interface ProjectsRoomProps {
  cls: CaiClass;
  student: CaiStudent;
}

export function ProjectsRoom({ cls, student }: ProjectsRoomProps) {
  const [projects, setProjects] = useState<CaiProject[]>([]);
  const [submissions, setSubmissions] = useState<CaiProjectSubmission[]>([]);
  const [files, setFiles] = useState<CaiFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Submit modal
  const [selectedProject, setSelectedProject] = useState<CaiProject | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [cls.tier, student.id]);

  const loadData = async () => {
    setLoading(true);
    const [prjs, subs, stFiles] = await Promise.all([
      db.getProjects(cls.tier),
      db.getProjectSubmissions(student.id),
      db.getFiles(student.id),
    ]);
    setProjects(prjs);
    setSubmissions(subs);
    setFiles(stFiles);
    if (stFiles.length > 0) {
      setSelectedFileId(stFiles[0].id);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject || !selectedFileId) return;

    setIsSubmitting(true);
    await db.submitProject(selectedProject.id, student.id, selectedFileId);
    setIsSubmitting(false);

    const updatedSubs = await db.getProjectSubmissions(student.id);
    setSubmissions(updatedSubs);
    setSelectedProject(null);
    setSubmitSuccess(`Project "${selectedProject.title}" successfully turned in!`);
    setTimeout(() => setSubmitSuccess(null), 3500);
  };

  return (
    <div id="projects-room" className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Capstone Engineering
            </span>
          </div>
          <h1 className="text-xl font-black text-[#17182B] tracking-tight">
            Major Multi-Week Projects — {cls.tier.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Comprehensive, real-world software applications that synthesize variables, math calculations, logical branching, and algorithmic patterns.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center gap-3">
          <Rocket className="w-5 h-5 text-indigo-600" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Projects Completed</div>
            <div className="text-base font-black text-[#17182B]">
              {submissions.length} / {projects.length}
            </div>
          </div>
        </div>
      </div>

      {submitSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium">{submitSuccess}</span>
        </div>
      )}

      {/* Project Cards */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-xs">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <FolderGit2 className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No projects currently assigned</p>
          <p className="text-xs text-slate-500">Major term projects unlock during Weeks 7 &amp; 13.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {projects.map((prj) => {
            const submission = submissions.find((s) => s.project_id === prj.id);
            const submittedFile = submission ? files.find((f) => f.id === submission.file_id) : null;

            return (
              <div
                key={prj.id}
                id={`project-card-${prj.id}`}
                className={`bg-white rounded-2xl border p-6 transition shadow-xs ${
                  submission ? 'border-indigo-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                        Capstone Project
                      </span>
                      <h3 className="font-bold text-base text-[#17182B]">{prj.title}</h3>
                      {submission ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50/70 p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap font-sans">
                      {prj.description}
                    </div>

                    {submission && (
                      <div className="text-xs text-indigo-950 bg-indigo-50/70 px-4 py-2.5 rounded-lg border border-indigo-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileCode className="w-4 h-4 text-indigo-600" />
                          <span>
                            Submitted File: <strong className="font-mono">{submittedFile?.filename || 'main.py'}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-600 font-mono">
                          Turned in on {new Date(submission.submitted_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="shrink-0 flex items-center lg:self-center">
                    <button
                      onClick={() => setSelectedProject(prj)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 ${
                        submission
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submission ? 'Resubmit Project' : 'Turn In Project'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Project Submission Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-4 h-4 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-800">Submit Project Solution</h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Select the Python file from your <strong>AI System</strong> workspace that contains your code for{' '}
              <strong>"{selectedProject.title}"</strong>:
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                {files.map((file) => (
                  <label
                    key={file.id}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition ${
                      selectedFileId === file.id
                        ? 'bg-indigo-50/70 border-indigo-300 text-indigo-950 font-bold'
                        : 'hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="projectFile"
                        value={file.id}
                        checked={selectedFileId === file.id}
                        onChange={() => setSelectedFileId(file.id)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <FileCode className="w-3.5 h-3.5 text-slate-500" />
                      <span className="font-mono">{file.filename}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(file.updated_at).toLocaleDateString()}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || files.length === 0}
                  className="px-4 py-1.5 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 rounded-lg shadow-xs"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

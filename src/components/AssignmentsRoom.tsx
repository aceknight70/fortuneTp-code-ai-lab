import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  FileCode,
  AlertCircle,
  X,
  ExternalLink,
} from 'lucide-react';
import {
  CaiAssignment,
  CaiAssignmentSubmission,
  CaiClass,
  CaiFile,
  CaiStudent,
} from '../types';
import { db } from '../lib/db';

interface AssignmentsRoomProps {
  cls: CaiClass;
  student: CaiStudent;
  onOpenEditorWithFile?: (file: CaiFile) => void;
}

export function AssignmentsRoom({
  cls,
  student,
  onOpenEditorWithFile,
}: AssignmentsRoomProps) {
  const [assignments, setAssignments] = useState<CaiAssignment[]>([]);
  const [submissions, setSubmissions] = useState<CaiAssignmentSubmission[]>([]);
  const [files, setFiles] = useState<CaiFile[]>([]);
  const [loading, setLoading] = useState(true);

  // Submit Modal
  const [selectedAssignment, setSelectedAssignment] = useState<CaiAssignment | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [cls.tier, student.id]);

  const loadData = async () => {
    setLoading(true);
    const [asgs, subs, stFiles] = await Promise.all([
      db.getAssignments(cls.tier, cls.school_id),
      db.getAssignmentSubmissions(student.id),
      db.getFiles(student.id),
    ]);
    setAssignments(asgs);
    setSubmissions(subs);
    setFiles(stFiles);
    if (stFiles.length > 0) {
      setSelectedFileId(stFiles[0].id);
    }
    setLoading(false);
  };

  const handleOpenSubmit = (asg: CaiAssignment) => {
    setSelectedAssignment(asg);
  };

  const handleSubmitFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignment || !selectedFileId) return;

    setIsSubmitting(true);
    const newSub = await db.submitAssignment(
      selectedAssignment.id,
      student.id,
      selectedFileId
    );
    setIsSubmitting(false);

    // Refresh submissions
    const updatedSubs = await db.getAssignmentSubmissions(student.id);
    setSubmissions(updatedSubs);
    setSelectedAssignment(null);
    setSubmitSuccess(`Assignment "${selectedAssignment.title}" successfully turned in!`);
    setTimeout(() => setSubmitSuccess(null), 3500);
  };

  return (
    <div id="assignments-room" className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Fortune's Challenge Desk
            </span>
          </div>
          <h1 className="text-xl font-black text-[#17182B] tracking-tight">
            Assignments &amp; Code Submissions — {cls.tier.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Targeted programming challenges set by Fortune outside the weekly curriculum. Write your solution in the AI System Code Editor and turn it in here.
          </p>
        </div>

        {/* Status Count */}
        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center gap-3">
          <FileCheck className="w-5 h-5 text-emerald-600" />
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Turned In</div>
            <div className="text-base font-black text-[#17182B]">
              {submissions.length} / {assignments.length} Tasks
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

      {/* Assignment List */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-xs">Loading assignments...</div>
      ) : assignments.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <FileCheck className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No active assignments</p>
          <p className="text-xs text-slate-500">All current challenges have been cleared. Excellent work!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((asg) => {
            const submission = submissions.find((s) => s.assignment_id === asg.id);
            const submittedFile = submission ? files.find((f) => f.id === submission.file_id) : null;
            const createdDate = new Date(asg.created_at);

            return (
              <div
                key={asg.id}
                id={`assignment-card-${asg.id}`}
                className={`bg-white rounded-xl border p-5 transition ${
                  submission
                    ? 'border-emerald-200 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-sm text-[#17182B]">{asg.title}</h3>
                      {submission ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>Pending Submission</span>
                        </span>
                      )}

                      {asg.due_note && (
                        <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>Due {asg.due_note}</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed whitespace-pre-wrap">
                      {asg.instructions}
                    </div>

                    {submission && (
                      <div className="text-[11px] text-emerald-800 bg-emerald-50/70 px-3 py-2 rounded-lg border border-emerald-100 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <FileCode className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Turned in file: <strong className="font-mono">{submittedFile?.filename || 'main.py'}</strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-600 font-mono">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Submission Action */}
                  <div className="shrink-0 flex items-center gap-2 md:self-center">
                    <button
                      onClick={() => handleOpenSubmit(asg)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs flex items-center gap-1.5 ${
                        submission
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submission ? 'Resubmit File' : 'Turn In Solution'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Turn In Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-800">Turn In Assignment</h3>
              </div>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-slate-600">
              Select which Python file from your <strong>AI System</strong> workspace you want to submit for{' '}
              <strong>"{selectedAssignment.title}"</strong>:
            </div>

            <form onSubmit={handleSubmitFile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Select Python Workspace File
                </label>
                {files.length === 0 ? (
                  <p className="text-xs text-rose-500">
                    No files found in workspace. Open the AI System to write code first!
                  </p>
                ) : (
                  <div className="space-y-2">
                    {files.map((file) => (
                      <label
                        key={file.id}
                        className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition ${
                          selectedFileId === file.id
                            ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                            : 'hover:bg-slate-50 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="selectedFile"
                            value={file.id}
                            checked={selectedFileId === file.id}
                            onChange={() => setSelectedFileId(file.id)}
                            className="text-emerald-600 focus:ring-emerald-500"
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
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || files.length === 0}
                  className="px-4 py-1.5 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 rounded-lg shadow-xs"
                >
                  {isSubmitting ? 'Turning In...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

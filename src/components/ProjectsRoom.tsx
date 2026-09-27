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
  Share2,
  Copy,
  Check,
  Phone,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';
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

  // Submit Modal State
  const [selectedProject, setSelectedProject] = useState<CaiProject | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string>('');
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // WhatsApp Post-Submission Modal State
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [recentSubmission, setRecentSubmission] = useState<{
    project: CaiProject;
    submission: CaiProjectSubmission;
  } | null>(null);

  // Phone Numbers for Notification (Customizable with persistent local storage)
  const [teacherPhone, setTeacherPhone] = useState(() => {
    return localStorage.getItem('cai_teacher_whatsapp') || '2348030000000';
  });
  const [fortunePhone, setFortunePhone] = useState(() => {
    return localStorage.getItem('cai_fortune_whatsapp') || '2348148924089';
  });

  const [copiedNotification, setCopiedNotification] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const isDT = cls.programme === 'digital_technologies';

  useEffect(() => {
    loadData();
  }, [cls.tier, cls.programme, student.id]);

  const loadData = async () => {
    setLoading(true);
    const [prjs, subs, stFiles] = await Promise.all([
      db.getProjects(cls.tier, cls.programme || 'code_ai'),
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

  const handleOpenSubmit = (prj: CaiProject) => {
    const existingSub = submissions.find((s) => s.project_id === prj.id);
    setSelectedProject(prj);
    if (existingSub) {
      setSelectedFileId(existingSub.file_id || (files[0]?.id || ''));
      setSubmissionNotes(existingSub.notes || '');
      setExternalLink(existingSub.external_link || '');
    } else {
      setSelectedFileId(files[0]?.id || '');
      setSubmissionNotes('');
      setExternalLink('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsSubmitting(true);
    const newSub = await db.submitProject(
      selectedProject.id,
      student.id,
      selectedFileId || null,
      submissionNotes,
      externalLink,
      false,
      false
    );
    setIsSubmitting(false);

    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });

    const updatedSubs = await db.getProjectSubmissions(student.id);
    setSubmissions(updatedSubs);

    const activePrj = selectedProject;
    setSelectedProject(null);
    setSubmitSuccess(`Project "${activePrj.title}" successfully recorded!`);

    // Launch WhatsApp notification flow modal
    setRecentSubmission({
      project: activePrj,
      submission: newSub,
    });
    setShowWhatsAppModal(true);

    setTimeout(() => setSubmitSuccess(null), 4000);
  };

  const formatPhoneNumber = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      return '234' + clean.slice(1);
    }
    if (clean.startsWith('234')) {
      return clean;
    }
    return clean;
  };

  const generateWhatsAppMessage = () => {
    if (!recentSubmission) return '';
    const { project, submission } = recentSubmission;
    const dateStr = new Date(submission.submitted_at).toLocaleDateString([], {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

    const programmeLabel = isDT ? 'JSS3 Digital Technologies' : `${cls.tier.toUpperCase()} Python Coding`;

    return `🎓 *Fortune's Code & AI Lab — Project Submission*
Powered by FATap-CT

👤 *Student:* ${student.full_name}
🏫 *Class:* ${cls.name} (${programmeLabel})
🚀 *Project:* ${project.title}
📅 *Date:* ${dateStr}
🆔 *Ref ID:* ${submission.id}
${submission.notes ? `📝 *Notes:* ${submission.notes}\n` : ''}${
      submission.external_link ? `🔗 *Artifact Link:* ${submission.external_link}\n` : ''
    }
✅ *Status:* Complete and recorded in the student booklet for teacher review.`;
  };

  const handleSendWhatsApp = (target: 'teacher' | 'fortune') => {
    if (!recentSubmission) return;
    const rawNumber = target === 'teacher' ? teacherPhone : fortunePhone;
    const cleanNumber = formatPhoneNumber(rawNumber);
    const msg = generateWhatsAppMessage();
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(msg)}`;

    // Persist phone numbers
    if (target === 'teacher') localStorage.setItem('cai_teacher_whatsapp', teacherPhone);
    if (target === 'fortune') localStorage.setItem('cai_fortune_whatsapp', fortunePhone);

    db.updateProjectWhatsAppStatus(recentSubmission.submission.id, target);

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    const msg = generateWhatsAppMessage();
    navigator.clipboard.writeText(msg);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  return (
    <div id="projects-room" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              {isDT ? 'JSS3 Digital Technologies Capstone' : 'Capstone Software Engineering'} • FATap-CT
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#17182B] tracking-tight">
            Major Term Projects — {isDT ? 'Digital Technologies' : cls.tier.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            {isDT
              ? 'Multi-week capstone projects synthesizing cybersecurity policies, Secrets Lab cryptosystems, local network blueprints, and ethical digital regulations.'
              : 'Comprehensive software applications synthesizing computational algorithms, variables, logic decisions, and structured programming.'}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center gap-3 shrink-0">
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
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-bold">{submitSuccess}</span>
        </div>
      )}

      {/* Projects List */}
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
                  submission ? 'border-indigo-300 ring-1 ring-indigo-200' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase tracking-wider">
                        Capstone Project
                      </span>
                      <h3 className="font-bold text-base text-[#17182B]">{prj.title}</h3>
                      {submission ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Submitted</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      )}
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50/70 p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap font-sans">
                      {prj.description}
                    </div>

                    {prj.deliverables && prj.deliverables.length > 0 && (
                      <div className="bg-indigo-50/40 border border-indigo-100 p-3.5 rounded-xl space-y-2">
                        <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block">
                          Project Deliverables &amp; Requirements:
                        </span>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                          {prj.deliverables.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {submission && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="text-xs text-indigo-950 bg-indigo-50/70 p-3 rounded-xl border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <FileCode className="w-4 h-4 text-indigo-600" />
                            <span>
                              {submittedFile ? (
                                <>
                                  Attached Code: <strong className="font-mono">{submittedFile.filename}</strong>
                                </>
                              ) : (
                                <strong>Written Project Solution Submitted</strong>
                              )}
                            </span>
                          </div>
                          <span className="text-[11px] text-indigo-600 font-mono">
                            Turned in on {new Date(submission.submitted_at).toLocaleDateString()}
                          </span>
                        </div>

                        {submission.notes && (
                          <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            <strong className="text-slate-700">Student Solution Notes:</strong> {submission.notes}
                          </div>
                        )}

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setRecentSubmission({ project: prj, submission });
                              setShowWhatsAppModal(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-300"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Open One-Tap WhatsApp Notification Receipt</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Action Button */}
                  <div className="shrink-0 flex items-center lg:self-center">
                    <button
                      onClick={() => handleOpenSubmit(prj)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer ${
                        submission
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submission ? 'Update Submission' : 'Turn In Project'}</span>
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
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-800">
                  Submit Project: {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Complete your capstone project submission below. Once submitted, you can immediately send a one-tap WhatsApp notification to your classroom teacher and Fortune.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Optional Code file selection for Python tracks or projects with code */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Attach Code File (Optional):
                  </label>
                  <div className="space-y-1.5 max-h-36 overflow-y-auto border border-slate-200 rounded-xl p-2 bg-slate-50">
                    <label
                      className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer ${
                        selectedFileId === '' ? 'bg-indigo-50 text-indigo-950 font-bold' : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="projectFile"
                          value=""
                          checked={selectedFileId === ''}
                          onChange={() => setSelectedFileId('')}
                        />
                        <span>No file attachment (Written/Policy Submission)</span>
                      </div>
                    </label>

                    {files.map((file) => (
                      <label
                        key={file.id}
                        className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer ${
                          selectedFileId === file.id
                            ? 'bg-indigo-100 text-indigo-950 font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="projectFile"
                            value={file.id}
                            checked={selectedFileId === file.id}
                            onChange={() => setSelectedFileId(file.id)}
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
                </div>
              )}

              {/* Solution Summary / Reflection Notes */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Project Solution Write-Up / Student Notes:
                </label>
                <textarea
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  rows={4}
                  required
                  placeholder="Detail your solution: how you satisfied the deliverables, cryptosystem results, policy guidelines, or architectural logic..."
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 font-sans"
                />
              </div>

              {/* External Artifact or Demo Link */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Optional Artifact / Google Drive / Repo Link:
                </label>
                <input
                  type="url"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 rounded-xl shadow-xs cursor-pointer"
                >
                  {isSubmitting ? 'Recording Submission...' : 'Confirm & Proceed to WhatsApp Notification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ONE-TAP WHATSAPP NOTIFICATION MODAL */}
      {showWhatsAppModal && recentSubmission && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-lg w-full shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">
                    Project Submitted — One-Tap WhatsApp Notification
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Notify your teacher and Fortune to review your work!
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Formatted Message Preview */}
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 relative">
              {generateWhatsAppMessage()}
              <button
                onClick={handleCopyMessage}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[10px] flex items-center gap-1 transition font-sans font-bold"
              >
                {copiedNotification ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedNotification ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Recipient Phone Numbers */}
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Notification Destinations:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Teacher's WhatsApp Phone:
                  </label>
                  <input
                    type="tel"
                    value={teacherPhone}
                    onChange={(e) => setTeacherPhone(e.target.value)}
                    placeholder="2348000000000"
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 block mb-1">
                    Fortune's Official WhatsApp:
                  </label>
                  <input
                    type="tel"
                    value={fortunePhone}
                    onChange={(e) => setFortunePhone(e.target.value)}
                    placeholder="2348148924089"
                    className="w-full text-xs font-mono p-2 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* One-Tap Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleSendWhatsApp('teacher')}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>📲 One-Tap Send WhatsApp to Classroom Teacher</span>
              </button>

              <button
                onClick={() => handleSendWhatsApp('fortune')}
                className="w-full py-3 rounded-xl bg-[#17182B] hover:bg-slate-800 text-[#F5A623] text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
              >
                <Share2 className="w-4 h-4" />
                <span>📲 One-Tap Send WhatsApp to Fortune (Lead / FATap-CT)</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-500">
                You can reopen this receipt anytime from the Projects Room.
              </span>
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="px-4 py-1.5 font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Save,
  History,
  Download,
  Share2,
  Sparkles,
  Plus,
  Trash2,
  FileCode,
  Check,
  AlertCircle,
  Clock,
  RotateCcw,
  Copy,
  ChevronRight,
  Send,
  Loader2,
  HelpCircle,
  Lightbulb,
  Wrench,
  MessageSquare,
  X,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import { CaiClass, CaiFile, CaiFileVersion, CaiStudent, RunResult } from '../types';
import { db } from '../lib/db';
import { runMiniPython } from '../lib/interpreter';

interface CodeEditorRoomProps {
  student: CaiStudent;
  cls: CaiClass;
  onNavigateToAssignments?: () => void;
}

export function CodeEditorRoom({
  student,
  cls,
  onNavigateToAssignments,
}: CodeEditorRoomProps) {
  const [files, setFiles] = useState<CaiFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');
  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // File management
  const [showNewFileModal, setShowNewFileModal] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  // Version history modal
  const [showVersionModal, setShowVersionModal] = useState(false);
  const [versions, setVersions] = useState<CaiFileVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<CaiFileVersion | null>(null);

  // Share modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // AI Assist State
  const [showAIPanel, setShowAIPanel] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiAction, setAiAction] = useState<'explain' | 'fix' | 'hint' | 'comment' | 'ask'>('explain');
  const [aiCustomQuestion, setAiCustomQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState<{
    explanation: string;
    whatChanged: string;
    suggestedCode: string | null;
  } | null>(null);

  const activeFile = files.find((f) => f.id === activeFileId) || null;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load student files on mount
  useEffect(() => {
    loadFiles();
  }, [student.id]);

  const loadFiles = async () => {
    let studentFiles = await db.getFiles(student.id);

    // If student has no files yet, create an initial main.py file
    if (studentFiles.length === 0) {
      const defaultContent =
        cls.tier === 'ss'
          ? `# Senior Secondary Python System\nstudent_name = "${student.full_name}"\nprint("Running Python algorithms for:", student_name)\n\n# Loop demonstration\nfor i in range(1, 6):\n    print("Step", i, "-> Square is:", i * i)\n\nprint("Execution complete.")`
          : `# Junior Secondary Python System\nstudent_name = "${student.full_name}"\nscore = 85\nprint("Welcome to Python,", student_name)\nprint("Recorded Score:", score)\n\nif score >= 75:\n    print("Remark: Distinction!")\nelse:\n    print("Remark: Good effort, keep practicing!")`;

      const created = await db.createFile(student.id, 'main.py', cls.tier as 'jss' | 'ss', defaultContent);
      studentFiles = [created];
    }

    setFiles(studentFiles);
    const initial = studentFiles[0];
    setActiveFileId(initial.id);
    setCode(initial.content);
  };

  const handleSelectFile = (file: CaiFile) => {
    // If active file was modified, auto-save state
    if (activeFile && code !== activeFile.content) {
      db.saveFile(activeFile.id, code);
    }
    setActiveFileId(file.id);
    setCode(file.content);
    setRunResult(null);
  };

  const handleCreateFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const initialTemplate = `# ${newFileName.trim()}\n# Created by ${student.full_name}\nprint("Hello from ${newFileName.trim()}!")\n`;
    const newFile = await db.createFile(
      student.id,
      newFileName.trim(),
      cls.tier as 'jss' | 'ss',
      initialTemplate
    );

    setFiles((prev) => [newFile, ...prev]);
    setActiveFileId(newFile.id);
    setCode(newFile.content);
    setNewFileName('');
    setShowNewFileModal(false);
  };

  const handleDeleteFile = async (fileId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (files.length <= 1) {
      alert('You must keep at least one file in your workspace.');
      return;
    }
    if (!confirm('Are you sure you want to delete this file?')) return;

    await db.deleteFile(fileId);
    const remaining = files.filter((f) => f.id !== fileId);
    setFiles(remaining);
    if (activeFileId === fileId) {
      setActiveFileId(remaining[0].id);
      setCode(remaining[0].content);
    }
  };

  // Run Code with tier gating
  const handleRunCode = () => {
    setIsRunning(true);
    setRunResult(null);

    // Short timeout to provide crisp visual feedback
    setTimeout(() => {
      const result = runMiniPython(code, cls.tier);
      setRunResult(result);
      setIsRunning(false);
    }, 150);
  };

  // Save Code & Version
  const handleSaveCode = async () => {
    if (!activeFileId) return;
    setIsSaving(true);
    const res = await db.saveFile(activeFileId, code);
    setIsSaving(false);

    if (res) {
      setFiles((prev) =>
        prev.map((f) => (f.id === activeFileId ? { ...f, content: code } : f))
      );
      setSaveStatus('Saved & version recorded');
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  // Open Version History
  const handleOpenVersions = async () => {
    if (!activeFileId) return;
    const vers = await db.getFileVersions(activeFileId);
    setVersions(vers);
    setSelectedVersion(vers[0] || null);
    setShowVersionModal(true);
  };

  // Revert Version
  const handleRevertVersion = async (version: CaiFileVersion) => {
    if (!activeFileId) return;
    if (!confirm('Revert current file content to this version snapshot?')) return;

    const reverted = await db.revertFileVersion(activeFileId, version.id);
    if (reverted) {
      setCode(reverted.content);
      setFiles((prev) =>
        prev.map((f) => (f.id === activeFileId ? { ...f, content: reverted.content } : f))
      );
      setShowVersionModal(false);
      setSaveStatus('Reverted to snapshot');
      setTimeout(() => setSaveStatus(null), 2500);
    }
  };

  // Download File
  const handleDownload = () => {
    if (!activeFile) return;
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeFile.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle Tab key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  // Request AI Assist from server endpoint
  const requestAIAssist = async (
    action: 'explain' | 'fix' | 'hint' | 'comment' | 'ask',
    customQ?: string
  ) => {
    setAiLoading(true);
    setAiAction(action);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code,
          action,
          question: customQ || aiCustomQuestion,
          tier: cls.tier,
          filename: activeFile?.filename || 'main.py',
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setAiResponse(data);
    } catch (err) {
      console.warn('AI Assist request failed, using local tutor logic:', err);
      // Fallback
      setAiResponse({
        explanation:
          cls.tier === 'jss'
            ? 'Tip: JSS Python focuses on linear code, variables, and if/else conditions. Always indent 4 spaces under if/else blocks!'
            : 'Tip: SS Python introduces algorithms and iteration loops using for i in range(...). Make sure your loop bounds and indentation match!',
        whatChanged: '',
        suggestedCode: null,
      });
    } finally {
      setAiLoading(false);
    }
  };

  const applySuggestedCode = () => {
    if (aiResponse?.suggestedCode) {
      setCode(aiResponse.suggestedCode);
      setSaveStatus('Applied AI improvements to editor');
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Calculate line numbers
  const lines = code.split('\n');

  return (
    <div id="ai-system-room" className="space-y-4">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-bold text-[#17182B] flex items-center gap-2">
              <span>AI System — Full Code Lab</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase font-semibold">
                {cls.tier.toUpperCase()} IDE
              </span>
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real Python workspace with file management, version control, and Gemini AI pedagogical coaching.
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Run Button */}
          <button
            id="editor-run-btn"
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs disabled:opacity-50"
          >
            {isRunning ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current" />
            )}
            <span>Run Python</span>
          </button>

          {/* Save Button */}
          <button
            id="editor-save-btn"
            onClick={handleSaveCode}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition shadow-xs"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>Save</span>
          </button>

          {/* Version History Button */}
          <button
            id="editor-versions-btn"
            onClick={handleOpenVersions}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            title="View saved version snapshots"
          >
            <History className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Versions</span>
          </button>

          {/* Download File */}
          <button
            id="editor-download-btn"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            title="Download .py file to device"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Share Button */}
          <button
            id="editor-share-btn"
            onClick={() => setShowShareModal(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
            title="Share this code snippet"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Toggle AI Panel Button */}
          <button
            id="editor-ai-toggle-btn"
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition ${
              showAIPanel
                ? 'bg-[#F5A623] text-[#17182B] shadow-xs'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Assist</span>
          </button>
        </div>
      </div>

      {/* Status banner if saved */}
      {saveStatus && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-3 py-2 rounded-lg flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="font-medium">{saveStatus}</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-mono">Synced with Supabase storage</span>
        </div>
      )}

      {/* Main IDE Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left / Center Editor Column */}
        <div className={showAIPanel ? 'lg:col-span-8 space-y-4' : 'lg:col-span-12 space-y-4'}>
          {/* File Tabs Bar */}
          <div className="bg-slate-900 text-slate-300 rounded-t-xl px-2 pt-2 flex items-center justify-between border-b border-slate-800 overflow-x-auto">
            <div className="flex items-center gap-1 overflow-x-auto">
              {files.map((file) => {
                const isActive = file.id === activeFileId;
                return (
                  <div
                    key={file.id}
                    id={`file-tab-${file.id}`}
                    onClick={() => handleSelectFile(file)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs font-mono rounded-t-md cursor-pointer transition select-none ${
                      isActive
                        ? 'bg-slate-950 text-[#F5A623] border-t-2 border-[#F5A623] font-bold'
                        : 'hover:bg-slate-800/60 text-slate-400'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5 text-slate-400" />
                    <span>{file.filename}</span>
                    {files.length > 1 && (
                      <button
                        onClick={(e) => handleDeleteFile(file.id, e)}
                        className="hover:text-rose-400 p-0.5 rounded"
                        title="Delete file"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Add New File Button */}
              <button
                id="add-file-btn"
                onClick={() => setShowNewFileModal(true)}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-slate-800 rounded transition font-sans ml-1"
                title="Create new Python file"
              >
                <Plus className="w-3.5 h-3.5" />
                <span className="text-[11px]">New file</span>
              </button>
            </div>

            {/* Language Pill */}
            <div className="text-[10px] font-mono text-slate-400 px-3 py-1 bg-slate-800/80 rounded-md mb-1 hidden sm:block">
              Python 3.10 ({cls.tier === 'ss' ? 'Full Loops' : 'No Loops'})
            </div>
          </div>

          {/* Code Textarea & Gutter */}
          <div className="bg-slate-950 text-slate-100 rounded-b-xl border border-slate-800 overflow-hidden shadow-md">
            <div className="flex min-h-[360px] max-h-[500px]">
              {/* Line Numbers Gutter */}
              <div className="w-12 bg-slate-900/90 text-slate-500 font-mono text-xs py-3 text-right pr-3 select-none border-r border-slate-800/80">
                {lines.map((_, idx) => (
                  <div key={idx} className="leading-6">
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Code Input */}
              <textarea
                ref={textareaRef}
                id="python-code-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                placeholder="# Write your Python code here..."
                className="flex-1 bg-transparent text-emerald-300 font-mono text-xs p-3 leading-6 resize-none focus:outline-hidden selection:bg-amber-500/30 overflow-y-auto"
                style={{ tabSize: 4 }}
              />
            </div>

            {/* Editor Footer Status Bar */}
            <div className="bg-slate-900 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <div className="flex items-center gap-4">
                <span>Lines: {lines.length}</span>
                <span>Chars: {code.length}</span>
                <span>Tab: 4 spaces</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Student:</span>
                <span className="text-slate-300">{student.full_name}</span>
              </div>
            </div>
          </div>

          {/* Run Console Output Panel */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-600" />
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Interpreter Console Output
                </span>
              </div>
              {runResult && (
                <button
                  onClick={() => setRunResult(null)}
                  className="text-[11px] text-slate-500 hover:text-slate-800 font-medium"
                >
                  Clear Console
                </button>
              )}
            </div>

            <div className="p-4 bg-slate-950 font-mono text-xs min-h-[120px] max-h-[220px] overflow-y-auto">
              {!runResult ? (
                <p className="text-slate-500 italic">
                  Press "Run Python" above to execute this script in real time.
                </p>
              ) : runResult.error ? (
                <div className="text-rose-400 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>Runtime Warning / Error</span>
                  </div>
                  <p className="text-slate-300 whitespace-pre-wrap">{runResult.error}</p>
                </div>
              ) : runResult.output.length === 0 ? (
                <p className="text-amber-400 italic">
                  Code ran successfully with no print output. (Add print(...) statements to see results!)
                </p>
              ) : (
                <div className="text-emerald-400 space-y-1">
                  {runResult.output.map((line, idx) => (
                    <div key={idx} className="whitespace-pre-wrap">
                      {line}
                    </div>
                  ))}
                  <div className="pt-2 text-[10px] text-slate-500 border-t border-slate-800 flex items-center justify-between">
                    <span>Process finished with exit code 0</span>
                    <span>{runResult.output.length} line(s) printed</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right AI Assist Column */}
        {showAIPanel && (
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl border border-amber-200 shadow-xs overflow-hidden">
              {/* AI Header */}
              <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent p-4 border-b border-amber-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#F5A623] text-[#17182B] flex items-center justify-center shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#17182B]">Gemini AI Assist</h3>
                    <p className="text-[10px] text-slate-500">Pedagogical Python Tutor</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                  Teaching Mode
                </span>
              </div>

              {/* Action Buttons */}
              <div className="p-3 border-b border-slate-100 bg-slate-50/50 grid grid-cols-2 gap-2">
                <button
                  id="ai-action-explain"
                  onClick={() => requestAIAssist('explain')}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-semibold text-slate-700 transition"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Explain Code</span>
                </button>

                <button
                  id="ai-action-fix"
                  onClick={() => requestAIAssist('fix')}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-semibold text-slate-700 transition"
                  title="Detect and fix mistakes, explaining what changed and why"
                >
                  <Wrench className="w-3.5 h-3.5 text-blue-500" />
                  <span>Fix &amp; Explain</span>
                </button>

                <button
                  id="ai-action-hint"
                  onClick={() => requestAIAssist('hint')}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-semibold text-slate-700 transition"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Get a Hint</span>
                </button>

                <button
                  id="ai-action-comment"
                  onClick={() => requestAIAssist('comment')}
                  disabled={aiLoading}
                  className="flex items-center gap-1.5 p-2 bg-white hover:bg-amber-50 border border-slate-200 hover:border-amber-300 rounded-lg text-xs font-semibold text-slate-700 transition"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                  <span>Add Comments</span>
                </button>
              </div>

              {/* AI Feedback & Explanation Content */}
              <div className="p-4 space-y-3">
                {aiLoading ? (
                  <div className="py-8 text-center space-y-3">
                    <Loader2 className="w-6 h-6 text-[#F5A623] animate-spin mx-auto" />
                    <p className="text-xs text-slate-600 font-medium">
                      Consulting Gemini AI Tutor for {cls.tier.toUpperCase()} guidance...
                    </p>
                  </div>
                ) : aiResponse ? (
                  <div className="space-y-3">
                    {/* Explanation */}
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Teacher Explanation
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200 whitespace-pre-wrap">
                        {aiResponse.explanation}
                      </div>
                    </div>

                    {/* What changed & why callout (per prompt requirement) */}
                    {aiResponse.whatChanged && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-amber-600" />
                          <span>What Changed &amp; Why</span>
                        </div>
                        <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-lg border border-amber-200 leading-relaxed font-medium">
                          {aiResponse.whatChanged}
                        </div>
                      </div>
                    )}

                    {/* Apply Fix / Improvements Button */}
                    {aiResponse.suggestedCode && (
                      <div className="pt-1">
                        <button
                          id="apply-ai-code-btn"
                          onClick={applySuggestedCode}
                          className="w-full flex items-center justify-center gap-2 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Apply Code to Editor</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6 px-2 space-y-2 text-slate-500">
                    <Sparkles className="w-8 h-8 text-amber-300 mx-auto" />
                    <p className="text-xs">
                      Click an action above or ask a specific question below. Your tutor explains concepts gently without just dumping the answers!
                    </p>
                  </div>
                )}

                {/* Custom Question Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (aiCustomQuestion.trim()) {
                      requestAIAssist('ask', aiCustomQuestion.trim());
                      setAiCustomQuestion('');
                    }
                  }}
                  className="pt-2 border-t border-slate-100 flex items-center gap-2"
                >
                  <input
                    id="ai-tutor-question-input"
                    type="text"
                    value={aiCustomQuestion}
                    onChange={(e) => setAiCustomQuestion(e.target.value)}
                    placeholder="Ask a question about this code..."
                    disabled={aiLoading}
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-[#F5A623] focus:bg-white"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiCustomQuestion.trim()}
                    className="p-2 bg-[#17182B] text-white hover:bg-slate-800 disabled:opacity-40 rounded-lg transition"
                    title="Send question"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Quick Link to Submit to Assignment */}
            {onNavigateToAssignments && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
                <div className="text-xs text-slate-700 font-medium">
                  Ready to turn in this file?
                </div>
                <button
                  onClick={onNavigateToAssignments}
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                >
                  <span>Submit Assignment</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* New File Modal */}
      {showNewFileModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-sm w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Create New Python File</h3>
              <button
                onClick={() => setShowNewFileModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateFile} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  File Name
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    placeholder="e.g. calculator or greetings"
                    required
                    autoFocus
                    className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-l-lg focus:outline-hidden focus:border-[#F5A623]"
                  />
                  <span className="bg-slate-100 border border-l-0 border-slate-300 px-3 py-2 text-xs font-mono text-slate-600 rounded-r-lg">
                    .py
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewFileModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#17182B] text-white hover:bg-slate-800 rounded-lg shadow-xs"
                >
                  Create File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Version History Modal */}
      {showVersionModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-2xl w-full shadow-xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-slate-700" />
                <div>
                  <h3 className="font-bold text-sm text-slate-800">
                    Version History: {activeFile?.filename}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Every save creates an immutable snapshot that you can inspect and restore anytime.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowVersionModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              {/* Snapshot List */}
              <div className="md:col-span-5 border-r border-slate-200 p-3 overflow-y-auto space-y-1.5 max-h-[50vh]">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
                  Saved Snapshots ({versions.length})
                </div>
                {versions.map((ver, idx) => {
                  const isSelected = selectedVersion?.id === ver.id;
                  const date = new Date(ver.saved_at);
                  return (
                    <div
                      key={ver.id}
                      onClick={() => setSelectedVersion(ver)}
                      className={`p-2.5 rounded-lg text-xs cursor-pointer transition ${
                        isSelected
                          ? 'bg-amber-50 border border-amber-200 font-semibold text-slate-800'
                          : 'hover:bg-slate-50 text-slate-600 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Version #{versions.length - idx}</span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Snapshot Preview */}
              <div className="md:col-span-7 p-4 bg-slate-950 text-slate-200 flex flex-col justify-between overflow-hidden">
                <div className="overflow-y-auto max-h-[40vh] font-mono text-xs leading-5 pr-2">
                  <pre>{selectedVersion?.content_snapshot || '# No content in snapshot'}</pre>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedVersion ? new Date(selectedVersion.saved_at).toLocaleString() : ''}
                  </span>
                  {selectedVersion && (
                    <button
                      onClick={() => handleRevertVersion(selectedVersion)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F5A623] hover:bg-amber-500 text-[#17182B] rounded-lg text-xs font-bold transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Restore This Snapshot</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-sm text-slate-800">
                  Share {activeFile?.filename}
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setCopiedShare(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Copy this Python snippet to share with classmates, teachers, or for your portfolio:
            </p>

            <div className="bg-slate-950 p-3 rounded-lg font-mono text-xs text-emerald-300 max-h-48 overflow-y-auto">
              <pre>{code}</pre>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Author: {student.full_name} ({cls.name})
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  setCopiedShare(true);
                  setTimeout(() => setCopiedShare(false), 2000);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#17182B] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition shadow-xs"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

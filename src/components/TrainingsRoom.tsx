import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Video,
  FileText,
  ExternalLink,
  Plus,
  X,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CaiClass, CaiStudent, CaiTraining } from '../types';
import { db } from '../lib/db';

interface TrainingsRoomProps {
  cls: CaiClass;
  student: CaiStudent;
}

export function TrainingsRoom({ cls, student }: TrainingsRoomProps) {
  const [trainings, setTrainings] = useState<CaiTraining[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    loadTrainings();
  }, [cls.tier]);

  const loadTrainings = async () => {
    setLoading(true);
    const data = await db.getTrainings(cls.tier);
    setTrainings(data);
    setLoading(false);
  };

  const handleAddTraining = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created = await db.createTraining(cls.tier, newTitle, newContent);
    setTrainings((prev) => [created, ...prev]);
    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  // Extract youtube video url if any
  const extractVideoUrl = (content: string) => {
    const match = content.match(/https?:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    return match ? match[0] : null;
  };

  return (
    <div id="trainings-room" className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Supplementary Masterclasses
            </span>
          </div>
          <h1 className="text-xl font-black text-[#17182B] tracking-tight">
            Trainings &amp; Video Modules — {cls.tier.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Curated video walkthroughs and conceptual breakdowns published by Fortune and the teaching staff to deepen your understanding beyond the weekly lab exercises.
          </p>
        </div>

        <button
          id="add-training-btn"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Study Note</span>
        </button>
      </div>

      {/* Grid of Trainings */}
      {loading ? (
        <div className="p-8 text-center text-slate-500 text-xs">Loading training materials...</div>
      ) : trainings.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center space-y-2">
          <GraduationCap className="w-8 h-8 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No training materials yet</p>
          <p className="text-xs text-slate-500">Check back soon as Fortune uploads new masterclass notes!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trainings.map((trn) => {
            const videoUrl = extractVideoUrl(trn.content);
            const date = new Date(trn.created_at);

            return (
              <div
                key={trn.id}
                id={`training-card-${trn.id}`}
                className="bg-white rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wider">
                      Module
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-[#17182B]">{trn.title}</h3>

                  <div className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                    {trn.content}
                  </div>
                </div>

                {videoUrl && (
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <Video className="w-4 h-4 text-rose-500" />
                      <span>Video resource linked</span>
                    </div>
                    <a
                      href={videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800"
                    >
                      <span>Watch</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Training Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-md w-full shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Publish Training Note</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTraining} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Masterclass: Variables & Memory"
                  required
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Content &amp; Video Link
                </label>
                <textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write study notes or paste a YouTube video URL..."
                  rows={4}
                  required
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold bg-[#17182B] text-white hover:bg-slate-800 rounded-lg"
                >
                  Publish Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

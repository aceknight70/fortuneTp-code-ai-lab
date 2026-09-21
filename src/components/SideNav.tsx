import React from 'react';
import {
  Home,
  BookOpen,
  GraduationCap,
  FileCheck,
  FolderGit2,
  Info,
  HelpCircle,
  Terminal,
  PlayCircle,
  LogOut,
  X,
  Code2,
} from 'lucide-react';
import { CaiClass, CaiStudent } from '../types';

export type StudentNavRoom =
  | 'home'
  | 'lab'
  | 'editor'
  | 'scheme'
  | 'trainings'
  | 'assignments'
  | 'projects'
  | 'about'
  | 'questions';

interface SideNavProps {
  currentRoom: StudentNavRoom;
  onSelectRoom: (room: StudentNavRoom) => void;
  selectedClass: CaiClass;
  selectedStudent: CaiStudent;
  onExit: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function SideNav({
  currentRoom,
  onSelectRoom,
  selectedClass,
  selectedStudent,
  onExit,
  mobileOpen,
  onCloseMobile,
}: SideNavProps) {
  const navItems: {
    id: StudentNavRoom;
    label: string;
    icon: React.ElementType;
    badge?: string;
    highlight?: boolean;
  }[] = [
    { id: 'home', label: 'Home', icon: Home },
    {
      id: 'editor',
      label: 'AI System',
      icon: Terminal,
      badge: 'IDE',
      highlight: true,
    },
    { id: 'lab', label: 'Weekly Lab', icon: PlayCircle },
    { id: 'scheme', label: 'Scheme of Work', icon: BookOpen },
    { id: 'trainings', label: 'Trainings', icon: GraduationCap },
    { id: 'assignments', label: 'Assignments', icon: FileCheck },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'questions', label: 'Ask a Question', icon: HelpCircle },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleNavClick = (id: StudentNavRoom) => {
    onSelectRoom(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          id="sidenav-backdrop"
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 md:hidden"
        />
      )}

      {/* Navigation Container */}
      <aside
        id="student-sidenav"
        className={`fixed md:sticky top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Section */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Mobile Header in Nav */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#17182B] text-[#F5A623] flex items-center justify-center font-bold text-sm">
                C&amp;A
              </div>
              <div>
                <div className="text-xs font-bold text-[#17182B]">Code &amp; AI Lab</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                  {selectedClass.tier.toUpperCase()} Tier
                </div>
              </div>
            </div>
            <button
              id="close-sidenav-btn"
              onClick={onCloseMobile}
              className="p-1 text-slate-500 hover:text-slate-800 rounded-md"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Label */}
          <div className="px-4 pt-5 pb-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Student Rooms
          </div>

          {/* Navigation Links */}
          <nav className="px-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentRoom === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? item.highlight
                        ? 'bg-[#17182B] text-white shadow-xs'
                        : 'bg-[#F5A623]/15 text-[#17182B] font-semibold'
                      : item.highlight
                      ? 'text-[#17182B] hover:bg-slate-100 font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive
                          ? item.highlight
                            ? 'text-[#F5A623]'
                            : 'text-[#F5A623]'
                          : 'text-slate-400'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                        isActive && item.highlight
                          ? 'bg-[#F5A623] text-[#17182B]'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Student Profile Card */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/80">
          <div className="bg-white rounded-lg p-3 border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 truncate">
                {selectedStudent.full_name}
              </div>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                {selectedClass.tier.toUpperCase()}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 truncate flex items-center justify-between">
              <span>{selectedClass.name}</span>
              <span className="font-mono text-slate-400 text-[10px]">{selectedClass.class_pin}</span>
            </div>

            <button
              id="switch-student-btn"
              onClick={onExit}
              className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded font-medium transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit / Switch Student</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

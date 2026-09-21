import React, { useState, useEffect } from 'react';
import { CaiClass, CaiProgress, CaiSchool, CaiStudent, CaiWeek } from './types';
import { db } from './lib/db';
import { Header } from './components/Header';
import { EntryFlow } from './components/EntryFlow';
import { PrimaryPlayground } from './components/PrimaryPlayground';
import { JSSPlayground } from './components/JSSPlayground';
import { SSPlayground } from './components/SSPlayground';
import { ParentBookletView } from './components/ParentBookletView';
import { MasterDashboard } from './components/MasterDashboard';
import { SideNav, StudentNavRoom } from './components/SideNav';
import { CodeEditorRoom } from './components/CodeEditorRoom';
import { SchemeOfWorkRoom } from './components/SchemeOfWorkRoom';
import { TrainingsRoom } from './components/TrainingsRoom';
import { AssignmentsRoom } from './components/AssignmentsRoom';
import { ProjectsRoom } from './components/ProjectsRoom';
import { AskQuestionRoom } from './components/AskQuestionRoom';
import { AboutUsRoom } from './components/AboutUsRoom';
import { HomeDashboardRoom } from './components/HomeDashboardRoom';
import { FATapSplashScreen } from './components/FATapSplashScreen';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'entry' | 'student' | 'parent' | 'master'>('entry');
  const [showSplash, setShowSplash] = useState<boolean>(true);
  const [selectedSchool, setSelectedSchool] = useState<CaiSchool | null>(null);
  const [selectedClass, setSelectedClass] = useState<CaiClass | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<CaiStudent | null>(null);
  const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(1);
  const [weeks, setWeeks] = useState<CaiWeek[]>([]);
  const [studentProgress, setStudentProgress] = useState<CaiProgress[]>([]);
  const [loading, setLoading] = useState(false);

  // Student Rooms & Navigation state
  const [studentRoom, setStudentRoom] = useState<StudentNavRoom>('home');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [primaryTab, setPrimaryTab] = useState<'home' | 'about'>('home');

  // Load weeks whenever class changes
  const loadClassData = async (cls: CaiClass, student: CaiStudent) => {
    setLoading(true);
    const tierWeeks = await db.getWeeks(cls.tier);
    const progress = await db.getStudentProgress(student.id);

    setWeeks(tierWeeks);
    setStudentProgress(progress);

    // Determine current active week: find first incomplete week or week 1
    if (progress.length > 0) {
      const maxCompleted = Math.max(...progress.map((p) => p.week_number));
      const nextWeek = maxCompleted < 13 ? maxCompleted + 1 : 13;
      setCurrentWeekNumber(nextWeek);
    } else {
      setCurrentWeekNumber(1);
    }

    setLoading(false);
  };

  const handleStudentStart = async (
    school: CaiSchool,
    cls: CaiClass,
    student: CaiStudent
  ) => {
    setSelectedSchool(school);
    setSelectedClass(cls);
    setSelectedStudent(student);
    await loadClassData(cls, student);
    setCurrentRole('student');
  };

  const handleParentStart = async (
    school: CaiSchool,
    cls: CaiClass,
    student: CaiStudent
  ) => {
    setSelectedSchool(school);
    setSelectedClass(cls);
    setSelectedStudent(student);
    await loadClassData(cls, student);
    setCurrentRole('parent');
  };

  const handleMasterLogin = () => {
    setCurrentRole('master');
  };

  const handleExit = () => {
    setCurrentRole('entry');
    setSelectedClass(null);
    setSelectedStudent(null);
  };

  const handleSaveProgress = async (
    submission: CaiProgress['submission'],
    output: string,
    aiInput?: string,
    aiResult?: CaiProgress['ai_demo_result']
  ) => {
    if (!selectedStudent) return;
    const newProgress = await db.saveProgress({
      student_id: selectedStudent.id,
      week_number: currentWeekNumber,
      submission,
      output_captured: output,
      ai_demo_input: aiInput,
      ai_demo_result: aiResult,
    });

    setStudentProgress((prev) => {
      const filtered = prev.filter((p) => p.week_number !== currentWeekNumber);
      return [...filtered, newProgress].sort((a, b) => a.week_number - b.week_number);
    });
  };

  const handleToggleSignoff = async (progressId: string, signed: boolean) => {
    const ok = await db.toggleParentSignoff(progressId, signed);
    if (ok && selectedStudent) {
      const updated = await db.getStudentProgress(selectedStudent.id);
      setStudentProgress(updated);
    }
  };

  const handleInspectStudentFromMaster = async (
    school: CaiSchool,
    cls: CaiClass,
    student: CaiStudent
  ) => {
    setSelectedSchool(school);
    setSelectedClass(cls);
    setSelectedStudent(student);
    await loadClassData(cls, student);
    setCurrentRole('parent');
  };

  // Find current active week object
  const activeWeek =
    weeks.find((w) => w.week_number === currentWeekNumber) ||
    weeks[0] ||
    null;

  const currentAttempt =
    studentProgress.find((p) => p.week_number === currentWeekNumber) || null;

  const handleSelectWeekForLab = (weekNum: number) => {
    setCurrentWeekNumber(weekNum);
    setStudentRoom('lab');
  };

  const isSeniorOrJuniorStudent =
    currentRole === 'student' &&
    selectedClass &&
    selectedStudent &&
    selectedClass.tier !== 'primary';

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#17182B] flex flex-col font-sans">
      {/* Opening Animated Splash Screen (FATap-CT) */}
      {showSplash && (
        <FATapSplashScreen onComplete={() => setShowSplash(false)} />
      )}

      {/* Top Header */}
      <Header
        currentRole={currentRole}
        selectedClass={selectedClass}
        selectedSchool={selectedSchool}
        selectedStudent={selectedStudent}
        currentWeekNumber={currentWeekNumber}
        totalWeeks={weeks.length || 13}
        onWeekChange={setCurrentWeekNumber}
        onExit={handleExit}
        onOpenMasterLogin={handleMasterLogin}
        onToggleMobileMenu={() => setMobileNavOpen((prev) => !prev)}
        primaryTab={primaryTab}
        onSelectPrimaryTab={(tab) => setPrimaryTab(tab)}
      />

      {/* Main Container Layout */}
      {isSeniorOrJuniorStudent ? (
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Persistent Side Navigation for JSS and SS */}
          <SideNav
            currentRoom={studentRoom}
            onSelectRoom={setStudentRoom}
            selectedClass={selectedClass}
            selectedStudent={selectedStudent}
            onExit={handleExit}
            mobileOpen={mobileNavOpen}
            onCloseMobile={() => setMobileNavOpen(false)}
          />

          {/* Room Content Container */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-6">
            {loading ? (
              <div className="flex items-center justify-center min-h-[50vh]">
                <div className="text-center space-y-3">
                  <div className="w-10 h-10 border-4 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-sm font-semibold text-slate-600">
                    Loading workspace...
                  </p>
                </div>
              </div>
            ) : (
              <>
                {studentRoom === 'home' && (
                  <HomeDashboardRoom
                    student={selectedStudent}
                    cls={selectedClass}
                    currentWeekNumber={currentWeekNumber}
                    weeks={weeks}
                    progress={studentProgress}
                    onNavigateRoom={setStudentRoom}
                    onSelectWeekForLab={handleSelectWeekForLab}
                  />
                )}

                {studentRoom === 'editor' && (
                  <CodeEditorRoom
                    student={selectedStudent}
                    cls={selectedClass}
                    onNavigateToAssignments={() => setStudentRoom('assignments')}
                  />
                )}

                {studentRoom === 'lab' && activeWeek && (
                  <>
                    {selectedClass.tier === 'jss' && (
                      <JSSPlayground
                        week={activeWeek}
                        student={selectedStudent}
                        existingProgress={currentAttempt}
                        onSaveProgress={handleSaveProgress}
                      />
                    )}
                    {selectedClass.tier === 'ss' && (
                      <SSPlayground
                        week={activeWeek}
                        student={selectedStudent}
                        existingProgress={currentAttempt}
                        onSaveProgress={handleSaveProgress}
                      />
                    )}
                  </>
                )}

                {studentRoom === 'scheme' && (
                  <SchemeOfWorkRoom
                    weeks={weeks}
                    progress={studentProgress}
                    cls={selectedClass}
                    student={selectedStudent}
                    onSelectWeekForLab={handleSelectWeekForLab}
                  />
                )}

                {studentRoom === 'trainings' && (
                  <TrainingsRoom cls={selectedClass} student={selectedStudent} />
                )}

                {studentRoom === 'assignments' && (
                  <AssignmentsRoom cls={selectedClass} student={selectedStudent} />
                )}

                {studentRoom === 'projects' && (
                  <ProjectsRoom cls={selectedClass} student={selectedStudent} />
                )}

                {studentRoom === 'questions' && (
                  <AskQuestionRoom cls={selectedClass} student={selectedStudent} />
                )}

                {studentRoom === 'about' && <AboutUsRoom />}
              </>
            )}
          </main>
        </div>
      ) : (
        /* Standard Container Layout for Entry, Master, Parent, and Primary Student */
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#F5A623] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-sm font-semibold text-slate-600">
                  Loading Fortune's Code &amp; AI Lab experience...
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentRole === 'entry' && (
                <EntryFlow
                  onStudentStart={handleStudentStart}
                  onParentStart={handleParentStart}
                  onMasterLogin={handleMasterLogin}
                  onReplaySplash={() => setShowSplash(true)}
                />
              )}

              {currentRole === 'master' && (
                <MasterDashboard
                  onSignOut={handleExit}
                  onInspectStudent={handleInspectStudentFromMaster}
                />
              )}

              {currentRole === 'parent' && selectedSchool && selectedClass && selectedStudent && (
                <ParentBookletView
                  school={selectedSchool}
                  cls={selectedClass}
                  student={selectedStudent}
                  weeks={weeks}
                  progress={studentProgress}
                  onToggleSignoff={handleToggleSignoff}
                  onSwitchChild={handleExit}
                />
              )}

              {currentRole === 'student' && selectedClass && selectedStudent && selectedClass.tier === 'primary' && activeWeek && (
                <>
                  {primaryTab === 'home' ? (
                    <PrimaryPlayground
                      week={activeWeek}
                      student={selectedStudent}
                      existingProgress={currentAttempt}
                      onSaveProgress={handleSaveProgress}
                    />
                  ) : (
                    <AboutUsRoom />
                  )}
                </>
              )}
            </>
          )}
        </main>
      )}
    </div>
  );
}

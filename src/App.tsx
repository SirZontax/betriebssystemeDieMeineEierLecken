import React, { useState, useEffect } from 'react';
import { Cpu, Settings, Clock, HardDrive, Database, Monitor, Target, FileText, Zap, Users, BookOpen, GraduationCap } from 'lucide-react';
import Navigation from './components/Navigation';
import OSIntroductionLearning from './components/OSIntroductionLearning';
import HardwareComponents from './components/HardwareComponents';
import ProcessManagement from './components/ProcessManagement';
import ProcessScheduling from './components/ProcessScheduling';
import ThreadsAndSynchronization from './components/ThreadsAndSynchronization';
import MemoryManagement from './components/MemoryManagement';
import FileSystems from './components/FileSystems';
import OSArchitectures from './components/OSArchitectures';
import ExamFocus from './components/ExamFocus';
import Exercises from './components/Exercises';
import ExamPractice from './components/ExamPractice';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const savedTopics = localStorage.getItem('completed-topics');
    const savedSteps = localStorage.getItem('completed-steps');
    
    if (savedTopics) {
      setCompletedTopics(JSON.parse(savedTopics));
    }
    if (savedSteps) {
      setCompletedSteps(JSON.parse(savedSteps));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completed-topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  useEffect(() => {
    localStorage.setItem('completed-steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  const handleTopicComplete = (topicId: string) => {
    if (!completedTopics.includes(topicId)) {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const sections = [
    { id: 'introduction', title: 'Einführung & Grundlagen', icon: Monitor, component: OSIntroductionLearning },
    { id: 'hardware', title: 'Hardware-Komponenten', icon: Zap, component: HardwareComponents },
    { id: 'processes', title: 'Prozessverwaltung', icon: Cpu, component: ProcessManagement },
    { id: 'threads', title: 'Threads & Synchronisation', icon: Users, component: ThreadsAndSynchronization },
    { id: 'scheduling', title: 'Scheduling', icon: Clock, component: ProcessScheduling },
    { id: 'memory', title: 'Speicherverwaltung', icon: Settings, component: MemoryManagement },
    { id: 'filesystems', title: 'Dateisysteme', icon: HardDrive, component: FileSystems },
    { id: 'architectures', title: 'BS-Architekturen', icon: Database, component: OSArchitectures },
    { id: 'exercises', title: 'Übungen', icon: BookOpen, component: Exercises },
    { id: 'exampractice', title: 'Beispielklausur', icon: GraduationCap, component: ExamPractice },
    { id: 'examfocus', title: 'Klausurfokus', icon: Target, component: ExamFocus },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || OSIntroductionLearning;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Cpu className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Betriebssysteme - Klausurvorbereitung
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Navigation 
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="mt-8">
          <ActiveComponent 
            onTopicComplete={handleTopicComplete}
            onStepComplete={handleStepComplete}
            completedSteps={completedSteps}
          />
        </main>
      </div>

      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>🎯 Interaktive Klausurvorbereitung für Betriebssysteme</p>
            <p className="text-sm mt-2">Fokussiert auf klausurrelevante Themen nach Einschränkung</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
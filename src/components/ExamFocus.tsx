import React, { useState } from 'react';
import { Target, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const ExamFocus: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('overview');

  const examTopics = {
    overview: {
      title: 'Klausurübersicht',
      items: [
        { topic: 'Geschichte der Betriebssysteme', status: 'limited', details: 'Nur dritte Generation, Spooling, MULTICS' },
        { topic: 'Hardware-Komponenten', status: 'limited', details: 'Keine Details, Hyperthreading wichtig, KEINE Mehrkernchips' },
        { topic: 'Wesentliche Aufgaben des BS', status: 'included', details: 'Kurz drüber schauen' },
        { topic: 'Prozessverwaltung Grundlagen', status: 'included', details: 'Bis F.12, F.13 raus, Copy-on-Write raus' },
        { topic: 'Prozessbeendigung', status: 'excluded', details: 'Komplett ausgeschlossen' },
        { topic: 'Prozesshierarchien', status: 'included', details: 'Bis F.32 relevant' },
        { topic: 'Ein-/Mehrprogrammbetrieb', status: 'included', details: 'CPU-Ausnutzung berechnen können!' },
        { topic: 'Threading-Konzepte', status: 'focus', details: 'Multithreading, Multiprocessing - F.57 wichtig!' }
      ]
    },
    processes: {
      title: 'Prozessverwaltung Details',
      items: [
        { topic: 'Threads bis F.82/87/110', status: 'included', details: 'Genauer Bereich zu klären' },
        { topic: 'Synchronisation (beide Szenarien)', status: 'included', details: 'Race Conditions, Critical Sections' },
        { topic: 'Selbstverwaltung F.132', status: 'excluded', details: 'Nicht relevant' },
        { topic: 'Atomare Operationen', status: 'included', details: 'Wie kriegt man Race Conditions in atomare Ops' },
        { topic: 'F.131-143', status: 'excluded', details: 'Nicht relevant' },
        { topic: 'Interprozess-Kommunikation', status: 'excluded', details: 'Komplett raus' }
      ]
    },
    scheduling: {
      title: 'Scheduling',
      items: [
        { topic: 'Alle Scheduling-Algorithmen', status: 'focus', details: 'Außer MLF (F.198 raus)' },
        { topic: 'Prozesszustände', status: 'included', details: 'F.166 kennen' },
        { topic: 'F.180 FOKUS!', status: 'focus', details: 'Besonders wichtig' },
        { topic: 'F.182 FIFO!', status: 'focus', details: 'FIFO-Algorithmus' },
        { topic: 'F.188!', status: 'focus', details: 'Wichtige Folie' },
        { topic: 'F.191!', status: 'focus', details: 'Wichtige Folie' },
        { topic: 'F.194!', status: 'focus', details: 'Wichtige Folie' },
        { topic: 'Gestrichelte Linien', status: 'focus', details: 'Wartezeiten müssen erkennbar sein!' }
      ]
    },
    memory: {
      title: 'Speicherverwaltung',
      items: [
        { topic: 'Grundlagen', status: 'included', details: 'Überblick wichtig' },
        { topic: 'F.18!!', status: 'focus', details: 'Sehr wichtige Folie' },
        { topic: 'Speicherhierarchie', status: 'included', details: 'Lokalitätsprinzip wichtig, nichts malen' },
        { topic: 'Caching', status: 'included', details: 'Warum wichtig, Kohärenz' },
        { topic: 'Adressraumnutzung F.39-52', status: 'excluded', details: 'Nicht relevant' },
        { topic: 'Reelle + Virtuelle Adressierung', status: 'included', details: 'Bis zum Ende relevant' }
      ]
    },
    filesystems: {
      title: 'Dateisysteme',
      items: [
        { topic: 'Grundlagen', status: 'included', details: 'Parat haben' },
        { topic: 'F.45 F.48 Verständnis', status: 'included', details: 'Verstehen wichtig' },
        { topic: 'FAT F.52-62', status: 'excluded', details: 'Komplett raus' },
        { topic: 'F.66 MBR vs GPT', status: 'included', details: 'Wissensfrage, zeichnen können' },
        { topic: 'UFS F.48 Fokus', status: 'focus', details: 'Schwerpunkt-Thema' },
        { topic: 'F.54 Fokus', status: 'focus', details: 'Wichtige Details' }
      ]
    },
    architectures: {
      title: 'Betriebssystem-Architekturen',
      items: [
        { topic: 'F.57 Architekturen', status: 'included', details: 'Grundlagen verstehen' },
        { topic: 'F.59-63', status: 'excluded', details: 'Nicht relevant' },
        { topic: 'F.64!', status: 'focus', details: 'Wichtige Folie' },
        { topic: 'F.65! Vor-/Nachteile', status: 'focus', details: 'Vergleiche können' },
        { topic: 'macOS und Android', status: 'excluded', details: 'Kann raus' },
        { topic: '2-3 BS-Arten erläutern', status: 'included', details: 'F.48 irgendwo' }
      ]
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'focus': return 'red';
      case 'included': return 'green';
      case 'limited': return 'yellow';
      case 'excluded': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'focus': return Target;
      case 'included': return CheckCircle;
      case 'limited': return AlertTriangle;
      case 'excluded': return XCircle;
      default: return XCircle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'focus': return 'FOKUS!';
      case 'included': return 'Relevant';
      case 'limited': return 'Eingeschränkt';
      case 'excluded': return 'Ausgeschlossen';
      default: return 'Unbekannt';
    }
  };

  const categories = [
    { id: 'overview', label: 'Übersicht' },
    { id: 'processes', label: 'Prozesse' },
    { id: 'scheduling', label: 'Scheduling' },
    { id: 'memory', label: 'Speicher' },
    { id: 'filesystems', label: 'Dateisysteme' },
    { id: 'architectures', label: 'Architekturen' }
  ];

  const importantFormulas = [
    {
      name: 'CPU-Ausnutzung',
      formula: 'CPU-Ausnutzung = 1 - p^n',
      description: 'p = I/O-Wartezeit, n = Anzahl Prozesse',
      importance: 'Muss berechnet werden können!'
    },
    {
      name: 'Wartezeit',
      formula: 'Wartezeit = Startzeit - Ankunftszeit',
      description: 'Für Scheduling-Algorithmen',
      importance: 'Gantt-Diagramme zeichnen'
    },
    {
      name: 'Umlaufzeit',
      formula: 'Umlaufzeit = Endzeit - Ankunftszeit',
      description: 'Gesamte Zeit im System',
      importance: 'Durchschnittswerte berechnen'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="h-8 w-8 text-red-600 mr-3" />
          Klausur-Fokus
        </h2>

        {/* Category Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">{examTopics[selectedCategory].title}</h3>
            
            <div className="space-y-3">
              {examTopics[selectedCategory].items.map((item, index) => {
                const StatusIcon = getStatusIcon(item.status);
                const statusColor = getStatusColor(item.status);
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 border-${statusColor}-500 bg-${statusColor}-50`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <StatusIcon className={`h-5 w-5 text-${statusColor}-600 mr-2`} />
                          <h4 className="font-medium text-gray-900">{item.topic}</h4>
                          <span className={`ml-2 px-2 py-1 text-xs rounded bg-${statusColor}-200 text-${statusColor}-800`}>
                            {getStatusText(item.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Important Formulas */}
          {selectedCategory === 'overview' && (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-4">Wichtige Formeln</h3>
              <div className="space-y-4">
                {importantFormulas.map((formula, index) => (
                  <div key={index} className="bg-white p-4 rounded border">
                    <h4 className="font-medium text-gray-900 mb-1">{formula.name}</h4>
                    <p className="font-mono text-lg text-blue-600 mb-1">{formula.formula}</p>
                    <p className="text-sm text-gray-600 mb-1">{formula.description}</p>
                    <p className="text-sm font-medium text-red-600">{formula.importance}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study Tips */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h3 className="text-lg font-semibold text-green-800 mb-4">Lernstrategie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-green-700 mb-2">Priorität 1 (FOKUS!):</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• CPU-Effizienz berechnen</li>
                  <li>• Scheduling-Algorithmen durchrechnen</li>
                  <li>• Gantt-Diagramme mit gestrichelten Linien</li>
                  <li>• UFS Struktur verstehen</li>
                  <li>• Kernel-Architekturen vergleichen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-green-700 mb-2">Priorität 2:</h4>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Prozesszustände und Übergänge</li>
                  <li>• Speicherhierarchie und Lokalität</li>
                  <li>• MBR vs GPT unterscheiden</li>
                  <li>• Betriebssystemarten erläutern</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Warning */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h3 className="text-lg font-semibold text-red-800 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Achtung - Nicht lernen!
            </h3>
            <p className="text-red-700 mb-2">Diese Themen sind explizit ausgeschlossen:</p>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Geschichte (außer 3. Generation, Spooling, MULTICS)</li>
              <li>• Prozessbeendigung</li>
              <li>• Copy-on-Write</li>
              <li>• Interprozess-Kommunikation</li>
              <li>• FAT Dateisystem</li>
              <li>• macOS und Android Architekturen</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamFocus;
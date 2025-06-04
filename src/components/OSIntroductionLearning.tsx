import React, { useState } from 'react';
import { Monitor, AlertCircle, CheckCircle, Book, Calculator } from 'lucide-react';
import LearningSection from './LearningSection';
import InteractiveQuiz from './InteractiveQuiz';

interface OSIntroductionLearningProps {
  onTopicComplete: (topicId: string) => void;
  onStepComplete: (stepId: string) => void;
  completedSteps: string[];
}

const OSIntroductionLearning: React.FC<OSIntroductionLearningProps> = ({
  onTopicComplete,
  onStepComplete,
  completedSteps
}) => {
  const [showDefinitionComparison, setShowDefinitionComparison] = useState(false);

  // Quiz questions for this topic
  const quizQuestions = [
    {
      id: 'q1',
      question: 'Welche Aussage beschreibt den Kernel-Modus am besten?',
      options: [
        'Modus für Benutzerprogramme mit eingeschränkten Rechten',
        'Exklusiv für das Betriebssystem mit vollem Hardware-Zugriff',
        'Modus für Netzwerk-Kommunikation',
        'Speicher-Verwaltungsmodus'
      ],
      correct: 1,
      explanation: 'Der Kernel-Modus ist exklusiv für das Betriebssystem reserviert und bietet vollständigen Zugriff auf alle Hardware-Ressourcen und Maschinenbefehle.',
      difficulty: 'easy' as const,
      topic: 'Operationsmodi'
    },
    {
      id: 'q2',
      question: 'Was ist der Hauptunterschied zwischen der "erweiterten Maschine" und "Ressourcenverwalter" Sicht?',
      options: [
        'Erweiterte Maschine ist Hardware, Ressourcenverwalter ist Software',
        'Top-down vs. Bottom-up Betrachtungsweise',
        'Abstraktion vs. konkrete Implementierung',
        'Beide sind identisch'
      ],
      correct: 1,
      explanation: 'Die erweiterte Maschine ist eine Top-down-Sicht (Abstraktion), während der Ressourcenverwalter eine Bottom-up-Sicht (Verwaltung der Hardware) darstellt.',
      difficulty: 'medium' as const,
      topic: 'BS-Sichten'
    },
    {
      id: 'q3',
      question: 'Welche ist KEINE Hauptaufgabe eines Betriebssystems?',
      options: [
        'Speicherverwaltung',
        'Prozessverwaltung',
        'Dateisystemverwaltung',
        'Webserver-Hosting'
      ],
      correct: 3,
      explanation: 'Webserver-Hosting ist eine Anwendungsaufgabe, keine Grundfunktion des Betriebssystems. Die anderen sind zentrale BS-Aufgaben.',
      difficulty: 'easy' as const,
      topic: 'BS-Aufgaben'
    }
  ];

  // Learning steps for structured learning
  const learningSteps = [
    {
      id: 'step1-definition',
      title: 'Was ist ein Betriebssystem?',
      type: 'theory' as const,
      estimatedTime: 8,
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Definition (Kursdefinition)</h4>
            <p className="text-blue-700 text-lg">
              Software zur <strong>Überwachung und Steuerung</strong> der Hardwareressourcen eines Rechners, 
              sowie zur <strong>Abstraktion von Komplexität</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h5 className="font-medium text-green-800 mb-2">🎯 Kernfunktionen</h5>
              <ul className="text-green-700 space-y-1 text-sm">
                <li>• Hardware abstrahieren</li>
                <li>• Ressourcen verwalten</li>
                <li>• Prozesse koordinieren</li>
                <li>• Sicherheit gewährleisten</li>
              </ul>
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h5 className="font-medium text-yellow-800 mb-2">💡 Warum wichtig?</h5>
              <ul className="text-yellow-700 space-y-1 text-sm">
                <li>• Vereinfacht Programmierung</li>
                <li>• Ermöglicht Multitasking</li>
                <li>• Schützt vor Hardware-Details</li>
                <li>• Stellt einheitliche APIs bereit</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium mb-2">🔍 Weitere Definitionen zum Vergleich:</h5>
            <button
              onClick={() => setShowDefinitionComparison(!showDefinitionComparison)}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              {showDefinitionComparison ? 'Ausblenden' : 'DIN 44300 & Tanenbaum Definitionen anzeigen'}
            </button>
            
            {showDefinitionComparison && (
              <div className="mt-4 space-y-3">
                <div className="p-3 bg-white rounded border">
                  <h6 className="font-medium text-gray-800">DIN 44300:</h6>
                  <p className="text-gray-700 text-sm">
                    "Die Programme eines digitalen Rechensystems, die zusammen mit den Eigenschaften dieser 
                    Rechenanlage die Basis der möglichen Betriebsarten bilden."
                  </p>
                </div>
                <div className="p-3 bg-white rounded border">
                  <h6 className="font-medium text-gray-800">Tanenbaum & Bos:</h6>
                  <p className="text-gray-700 text-sm">
                    "Software, die im Kernmodus läuft und Anwendungsprogrammen saubere Abstraktionen 
                    anstelle der unschönen Hardware zur Verfügung stellt."
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'step2-views',
      title: 'Zwei Sichten auf Betriebssysteme',
      type: 'theory' as const,
      estimatedTime: 10,
      content: (
        <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <AlertCircle className="h-5 w-5 text-amber-600 mb-2" />
            <p className="text-amber-800">
              <strong>Wichtig:</strong> Verstehen Sie beide Sichtweisen - sie ergänzen sich und erklären 
              verschiedene Aspekte der BS-Funktionalität!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* View 1: Extended Machine */}
            <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-4">
                <Monitor className="h-6 w-6 text-blue-600 mr-2" />
                <h4 className="font-semibold text-blue-800">1. Erweiterte Maschine</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-blue-700 mb-2">🎯 Fokus: Abstraktion</h5>
                  <p className="text-blue-600 text-sm mb-3">
                    Top-down-Sicht: Das BS verbirgt komplexe Hardware vor dem Programmierer
                  </p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <h6 className="font-medium text-sm mb-2">Beispiel: Dateizugriff</h6>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="bg-blue-100 p-2 rounded">
                      <strong>Anwendung sieht:</strong> file.open("dokument.txt")
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>BS verwaltet:</strong> Festplatte, Sektor-Zugriff, Puffer, Fehlerbehandlung
                    </div>
                  </div>
                </div>

                <ul className="text-blue-700 space-y-1 text-sm">
                  <li>✓ Vereinfacht Programmierung</li>
                  <li>✓ Portabilität zwischen Systemen</li>
                  <li>✓ Konsistente APIs</li>
                </ul>
              </div>
            </div>

            {/* View 2: Resource Manager */}
            <div className="p-6 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-green-600 mr-2" />
                <h4 className="font-semibold text-green-800">2. Ressourcenverwalter</h4>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-green-700 mb-2">🎯 Fokus: Verwaltung</h5>
                  <p className="text-green-600 text-sm mb-3">
                    Bottom-up-Sicht: Das BS koordiniert und teilt Hardware-Ressourcen zu
                  </p>
                </div>

                <div className="bg-white p-3 rounded border">
                  <h6 className="font-medium text-sm mb-2">Beispiel: Mehrere Programme</h6>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div className="bg-green-100 p-2 rounded">
                      <strong>Programm A:</strong> Braucht 2GB RAM, 30% CPU
                    </div>
                    <div className="bg-green-100 p-2 rounded">
                      <strong>Programm B:</strong> Braucht 1GB RAM, 50% CPU
                    </div>
                    <div className="bg-gray-100 p-2 rounded">
                      <strong>BS entscheidet:</strong> Wer bekommt wann welche Ressourcen?
                    </div>
                  </div>
                </div>

                <ul className="text-green-700 space-y-1 text-sm">
                  <li>✓ Faire Ressourcenverteilung</li>
                  <li>✓ Konfliktauflösung</li>
                  <li>✓ Multiplexing (zeitlich/räumlich)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-medium text-purple-800 mb-2">🤝 Zusammenspiel beider Sichten</h5>
            <p className="text-purple-700 text-sm">
              Beide Sichten beschreiben dasselbe System aus verschiedenen Blickwinkeln. 
              Die Abstraktion (Sicht 1) funktioniert nur durch effektive Ressourcenverwaltung (Sicht 2)!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'step3-modes',
      title: 'Operationsmodi verstehen',
      type: 'theory' as const,
      estimatedTime: 6,
      content: (
        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-3">⚠️ Warum Operationsmodi?</h4>
            <p className="text-red-700">
              Ohne Trennung könnten Anwendungen das gesamte System zum Absturz bringen oder 
              auf fremde Daten zugreifen. Operationsmodi sind ein <strong>Sicherheitsmechanismus</strong>!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-red-50 rounded-lg border border-red-300">
              <h4 className="font-semibold text-red-800 mb-4">🔴 Kernel-Modus (Supervisor)</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Wer:</h5>
                  <p className="text-gray-700 text-sm">Nur das Betriebssystem</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Kann:</h5>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Vollständiger Hardware-Zugriff</li>
                    <li>• Alle Maschinenbefehle ausführen</li>
                    <li>• I/O-Operationen durchführen</li>
                    <li>• Speicher anderer Prozesse zugreifen</li>
                  </ul>
                </div>

                <div className="bg-red-100 p-3 rounded">
                  <h6 className="font-medium text-red-800 text-sm">Beispiele:</h6>
                  <p className="text-red-700 text-xs">
                    Festplatte lesen, Netzwerk-Pakete senden, Hardware-Interrupts verarbeiten
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg border border-blue-300">
              <h4 className="font-semibold text-blue-800 mb-4">🔵 Benutzermodus (User Mode)</h4>
              
              <div className="space-y-4">
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Wer:</h5>
                  <p className="text-gray-700 text-sm">Alle Anwendungsprogramme</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <h5 className="font-medium text-sm mb-2">Kann:</h5>
                  <ul className="text-gray-700 text-sm space-y-1">
                    <li>• Nur eingeschränkte Befehle</li>
                    <li>• Keine direkten I/O-Operationen</li>
                    <li>• Nur eigenen Speicherbereich</li>
                    <li>• System-Calls für BS-Services</li>
                  </ul>
                </div>

                <div className="bg-blue-100 p-3 rounded">
                  <h6 className="font-medium text-blue-800 text-sm">Beispiele:</h6>
                  <p className="text-blue-700 text-xs">
                    Berechnungen, eigene Variablen ändern, System-Calls aufrufen
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h5 className="font-medium text-yellow-800 mb-2">🔄 Moduswechsel</h5>
            <div className="text-yellow-700 text-sm space-y-2">
              <p><strong>User → Kernel:</strong> System-Call, Interrupt, Exception</p>
              <p><strong>Kernel → User:</strong> Return-Anweisung nach System-Call</p>
              <p><strong>Overhead:</strong> Moduswechsel kosten Zeit (Context-Switch)</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'step4-tasks',
      title: 'Aufgaben des Betriebssystems',
      type: 'example' as const,
      estimatedTime: 8,
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Book className="h-5 w-5 text-green-600 mb-2" />
            <p className="text-green-800">
              <strong>Lernziel:</strong> Verstehen Sie die 6 Hauptaufgaben und können Sie 
              für jede ein konkretes Beispiel nennen!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: '1. Abstraktion',
                description: 'Vereinfachung komplexer Hardware',
                example: 'Datei öffnen statt Festplatten-Sektoren ansprechen',
                color: 'blue'
              },
              {
                title: '2. Prozessverwaltung',
                description: 'Verwaltung laufender Programme',
                example: 'Browser und Word gleichzeitig ausführen',
                color: 'green'
              },
              {
                title: '3. Speicherverwaltung',
                description: 'Effiziente RAM-Nutzung',
                example: 'Jedes Programm bekommt eigenen Speicherbereich',
                color: 'purple'
              },
              {
                title: '4. Dateisystem',
                description: 'Verwaltung persistenter Daten',
                example: 'Ordner und Dateien organisieren',
                color: 'yellow'
              },
              {
                title: '5. Sicherheit',
                description: 'Schutz und Zugriffskontrolle',
                example: 'Benutzer-Login und Dateiberechtigungen',
                color: 'red'
              },
              {
                title: '6. Benutzeroberfläche',
                description: 'Schnittstelle zum Anwender',
                example: 'Desktop-GUI oder Terminal/Kommandozeile',
                color: 'indigo'
              }
            ].map((task, index) => (
              <div key={index} className={`p-4 bg-${task.color}-50 rounded-lg border border-${task.color}-200`}>
                <h5 className={`font-semibold text-${task.color}-800 mb-2`}>{task.title}</h5>
                <p className={`text-${task.color}-700 text-sm mb-3`}>{task.description}</p>
                <div className="bg-white p-2 rounded text-xs">
                  <strong>Beispiel:</strong> {task.example}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-800 mb-3">🎯 Klausur-Tipp</h5>
            <p className="text-gray-700 text-sm mb-2">
              <strong>Häufige Frage:</strong> "Nennen Sie die wesentlichen Aufgaben eines Betriebssystems 
              und erläutern Sie diese kurz."
            </p>
            <p className="text-gray-600 text-xs">
              Merksatz: <strong>A-P-S-D-S-B</strong> (Abstraktion, Prozesse, Speicher, Dateien, Sicherheit, Benutzeroberfläche)
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'step5-quiz',
      title: 'Wissenstest: Grundlagen',
      type: 'quiz' as const,
      estimatedTime: 5,
      content: (
        <InteractiveQuiz
          questions={quizQuestions}
          topic="Betriebssystem-Grundlagen"
          onComplete={(score) => {
            console.log(`Quiz abgeschlossen mit ${score}/${quizQuestions.length} Punkten`);
            onStepComplete('step5-quiz');
          }}
        />
      )
    }
  ];

  return (
    <div>
      <LearningSection
        title="Einführung & Grundlagen"
        description="Verstehen Sie die fundamentalen Konzepte von Betriebssystemen: Definition, Sichtweisen, Operationsmodi und Hauptaufgaben."
        steps={learningSteps}
        onStepComplete={onStepComplete}
        completedSteps={completedSteps}
      />
    </div>
  );
};

export default OSIntroductionLearning;
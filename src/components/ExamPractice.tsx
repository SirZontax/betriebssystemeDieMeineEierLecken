import React, { useState, useEffect } from 'react';
import { Clock, Award, FileText, CheckCircle, AlertCircle, BookOpen, Timer, Target, Lightbulb } from 'lucide-react';

interface ExamQuestion {
  id: string;
  title: string;
  points: number;
  parts: Array<{
    id: string;
    question: string;
    points: number;
    solution: string;
    type: 'text' | 'diagram' | 'calculation' | 'list';
  }>;
}

interface ExamSession {
  startTime: Date;
  answers: { [key: string]: string };
  timeSpent: number;
  isCompleted: boolean;
}

const ExamPractice: React.FC = () => {
  const [examSession, setExamSession] = useState<ExamSession | null>(null);
  const [showSolutions, setShowSolutions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (examSession && !examSession.isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examSession]);

  const sampleExam: ExamQuestion[] = [
    {
      id: 'task1',
      title: 'Einordnung in die Informatik',
      points: 10,
      parts: [
        {
          id: 'task1a',
          question: 'Stellen Sie die Zusammenhänge zwischen technischer und angewandter Informatik graphisch dar. Wo ist dabei das Betriebssystem einzuordnen?',
          points: 4,
          solution: 'Graphische Darstellung mit drei Schichten: Angewandte Informatik (oben) → Betriebssystem (Mitte) → Technische Informatik/Hardware (unten). Das Betriebssystem fungiert als Vermittlungsschicht zwischen angewandter Informatik (Anwendungsprogramme, Hochsprachen) und technischer Informatik (Hardware, Maschinensprache).',
          type: 'diagram'
        },
        {
          id: 'task1b',
          question: 'Inwiefern abstrahiert ein Betriebssystem Komplexität der Hardware?',
          points: 3,
          solution: 'Das Betriebssystem verbirgt die Komplexität der Hardware vor Anwendungen durch: Einheitliche APIs für verschiedene Hardware, Abstraktion von Gerätezugriffen, Vereinfachung komplexer Hardware-Operationen, Bereitstellung standardisierter Schnittstellen unabhängig vom Hardware-Hersteller.',
          type: 'text'
        },
        {
          id: 'task1c',
          question: 'Erläutern Sie den Maschinenbegriff nach Coy.',
          points: 3,
          solution: 'Coy unterscheidet drei Abstraktionsebenen: 1) Reale Maschine: Physische Hardware (CPU, Speicher, Geräte), 2) Abstrakte Maschine: Hardware + Betriebssystem, 3) Benutzermaschine: Hardware + Betriebssystem + Anwendungsprogramme. Jede Ebene baut auf der vorherigen auf und abstrahiert weitere Komplexität.',
          type: 'text'
        }
      ]
    },
    {
      id: 'task2',
      title: 'Prozessverwaltung - Grundlagen',
      points: 8,
      parts: [
        {
          id: 'task2a',
          question: 'Erklären Sie die Begriffe Prozess und Thread und deren Unterschiede.',
          points: 4,
          solution: 'Prozess: Laufende Instanz eines Programms mit eigenem Adressraum, Ressourcen und Kontext. Thread: Leichtgewichtiger Ausführungsstrang innerhalb eines Prozesses. Unterschiede: Prozesse haben isolierte Adressräume, Threads teilen Adressraum. Prozess-Wechsel ist aufwendiger als Thread-Wechsel. Threads eines Prozesses teilen Code, Daten und Dateien.',
          type: 'text'
        },
        {
          id: 'task2b',
          question: 'Welche Ressourcen teilen sich Threads innerhalb eines Prozesses?',
          points: 2,
          solution: 'Threads teilen: Code-Segment, Daten-Segment, Heap, geöffnete Dateien, Signale, Arbeitsverzeichnis. Jeder Thread hat eigenen: Stack, Register, Programmzähler.',
          type: 'list'
        },
        {
          id: 'task2c',
          question: 'Nennen Sie einen konkreten Anwendungsfall für Threads (z.B. Webbrowser).',
          points: 2,
          solution: 'Webbrowser: Ein Thread für Benutzeroberfläche, andere Threads für Laden von Webseiten, Downloads, JavaScript-Ausführung. Background-Updates: Hauptprogramm läuft weiter, während Thread im Hintergrund Updates herunterlädt.',
          type: 'text'
        }
      ]
    },
    {
      id: 'task3',
      title: 'Prozess-Scheduling',
      points: 12,
      parts: [
        {
          id: 'task3a',
          question: 'Gegeben sind 4 Prozesse mit Ankunftszeiten und Ausführungszeiten: P1(0,8), P2(1,4), P3(2,9), P4(3,5). Erstellen Sie ein Zeitdiagramm für FIFO-Scheduling.',
          points: 4,
          solution: 'FIFO-Zeitdiagramm: P1: 0-8, P2: 8-12, P3: 12-21, P4: 21-26. Wartezeiten: P1=0, P2=7, P3=10, P4=18. Durchschnittliche Wartezeit: 8.75',
          type: 'diagram'
        },
        {
          id: 'task3b',
          question: 'Erstellen Sie das Zeitdiagramm für Round-Robin mit Zeitscheibe 3.',
          points: 4,
          solution: 'Round-Robin (Zeitscheibe=3): P1: 0-3, 6-9, 12-15, 18-20; P2: 3-6, 9-10; P3: 10-12, 15-18, 20-23, 24-26; P4: 23-24, 26-30. Prozesse werden nach 3 Zeiteinheiten unterbrochen und hinten eingereiht.',
          type: 'diagram'
        },
        {
          id: 'task3c',
          question: 'Vergleichen Sie preemptive und non-preemptive Scheduling-Strategien.',
          points: 4,
          solution: 'Non-preemptive: Prozess läuft bis Ende oder blockiert (FIFO, SJF). Einfach zu implementieren, aber schlechte Reaktionszeit. Preemptive: Prozess kann unterbrochen werden (Round-Robin, Priority). Bessere Reaktionszeit und Fairness, aber mehr Overhead durch Kontextwechsel.',
          type: 'text'
        }
      ]
    },
    {
      id: 'task4',
      title: 'Speicherverwaltung - Assoziativspeicher',
      points: 8,
      parts: [
        {
          id: 'task4a',
          question: 'Vervollständigen Sie die Assoziativspeicher-Tabelle mit Maske 10011100 und Pattern 00110100 für die Datensätze 5641, 3822, 7234, 5821.',
          points: 6,
          solution: 'Maske 10011100 mit Pattern 00110100: Datensatz 5641 (binär: 00010110 00101001) → Hit=1, Datensatz 3822 (binär: 00001110 11101110) → Hit=0, Datensatz 7234 (binär: 00011100 01000010) → Hit=0, Datensatz 5821 (binär: 00010110 10111101) → Hit=1. Nur Datensätze 5641 und 5821 haben Treffer.',
          type: 'calculation'
        },
        {
          id: 'task4b',
          question: 'Erklären Sie das Prinzip des Assoziativspeichers.',
          points: 2,
          solution: 'Assoziativspeicher ermöglicht inhaltsbasierte Suche statt adressbasierte. Mit Maske werden relevante Bits definiert, Pattern gibt Sollwert vor. Alle Einträge werden parallel verglichen, Hit-Bit zeigt Übereinstimmung. Verwendung z.B. in TLB (Translation Lookaside Buffer) für Adressübersetzung.',
          type: 'text'
        }
      ]
    },
    {
      id: 'task5',
      title: 'Dateisysteme',
      points: 12,
      parts: [
        {
          id: 'task5a',
          question: 'Nennen Sie die drei logischen Bestandteile einer Datei.',
          points: 3,
          solution: 'Die drei logischen Bestandteile einer Datei sind: 1) Dateiinhalt (die eigentlichen Daten), 2) Dateiattribute (Metadaten wie Größe, Zeitstempel, Berechtigungen), 3) Dateiname (Identifikation der Datei im Dateisystem).',
          type: 'list'
        },
        {
          id: 'task5b',
          question: 'Beschreiben Sie die Windows-Datenstrukturen zur Dateiverwaltung.',
          points: 4,
          solution: 'Windows verwendet: File Objects (repräsentieren geöffnete Dateien), Handle Tables (Zuordnung Handle zu File Object pro Prozess), File Control Blocks (FCB, Metadaten auf Datenträger), Master File Table (MFT bei NTFS für Datei-Metadaten). Handle → File Object → FCB-Hierarchie.',
          type: 'text'
        },
        {
          id: 'task5c',
          question: 'Nennen Sie drei grundlegende Dateisystem-Operationen.',
          points: 3,
          solution: 'Drei grundlegende Dateisystem-Operationen: 1) Create/Open (Datei erstellen/öffnen), 2) Read/Write (Daten lesen/schreiben), 3) Close/Delete (Datei schließen/löschen). Weitere: Seek (Position ändern), Rename (umbenennen), Chmod (Berechtigungen ändern).',
          type: 'list'
        },
        {
          id: 'task5d',
          question: 'Erklären Sie die Organisation eines hierarchischen Dateisystems.',
          points: 2,
          solution: 'Hierarchisches Dateisystem: Baumstruktur mit Wurzelverzeichnis, Verzeichnisse als Knoten, Dateien als Blätter. Pfade beschreiben Weg vom Root. Vorteile: Logische Gruppierung, Namensräume, Strukturierung. Navigation über absolute/relative Pfade.',
          type: 'text'
        }
      ]
    }
  ];

  const startExam = () => {
    setExamSession({
      startTime: new Date(),
      answers: {},
      timeSpent: 0,
      isCompleted: false
    });
    setTimeElapsed(0);
    setAnswers({});
    setCurrentQuestion(0);
    setShowSolutions(false);
  };

  const completeExam = () => {
    if (examSession) {
      setExamSession({
        ...examSession,
        isCompleted: true,
        answers: answers,
        timeSpent: timeElapsed
      });
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    // Simple scoring based on answer completeness
    let totalPoints = 0;
    let earnedPoints = 0;
    
    sampleExam.forEach(question => {
      question.parts.forEach(part => {
        totalPoints += part.points;
        const answer = answers[part.id];
        if (answer && answer.trim().length > 10) { // Basic completeness check
          earnedPoints += Math.round(part.points * 0.7); // Assume 70% for completed answers
        }
      });
    });
    
    return { earnedPoints, totalPoints };
  };

  const totalQuestions = sampleExam.reduce((sum, q) => sum + q.parts.length, 0);
  const answeredQuestions = Object.keys(answers).filter(key => answers[key]?.trim()).length;

  if (!examSession) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Beispielklausur Betriebssysteme</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bearbeiten Sie die Beispielklausur unter realistischen Bedingungen. 
            Die Klausur umfasst 5 Aufgaben mit insgesamt 50 Punkten.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg border shadow-sm max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Klausur starten</h2>
            <p className="text-gray-600">Empfohlene Bearbeitungszeit: 90 Minuten</p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Aufgaben:</span>
              <span>5 Hauptaufgaben, {totalQuestions} Teilaufgaben</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Punkte:</span>
              <span>50 Punkte total</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">Format:</span>
              <span>Textaufgaben, Diagramme, Berechnungen</span>
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Clock className="h-5 w-5 mr-2" />
            Klausur beginnen
          </button>
        </div>

        <div className="bg-yellow-50 p-6 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div>
              <h3 className="font-medium text-yellow-900 mb-2">Hinweise zur Bearbeitung</h3>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Bearbeiten Sie alle Aufgaben sorgfältig</li>
                <li>• Achten Sie auf die Punkteverteilung</li>
                <li>• Zeichnungen und Diagramme sind erwünscht</li>
                <li>• Lösungen werden nach Abschluss angezeigt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (examSession.isCompleted) {
    const { earnedPoints, totalPoints } = calculateScore();
    const percentage = Math.round((earnedPoints / totalPoints) * 100);

    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Klausur abgeschlossen!</h1>
          <p className="text-gray-600">Ihre Ergebnisse und die Musterlösungen</p>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Ihre Ergebnisse</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{formatTime(timeElapsed)}</div>
              <div className="text-sm text-blue-800">Bearbeitungszeit</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{earnedPoints}/{totalPoints}</div>
              <div className="text-sm text-green-800">Geschätzte Punkte</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Beantwortet: {answeredQuestions}/{totalQuestions}</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showSolutions ? 'Lösungen ausblenden' : 'Lösungen anzeigen'}
            </button>
            <button
              onClick={() => setExamSession(null)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Neue Klausur
            </button>
          </div>
        </div>

        {showSolutions && (
          <div className="space-y-6">
            {sampleExam.map((question, qIndex) => (
              <div key={question.id} className="bg-white p-6 rounded-lg border shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Aufgabe {qIndex + 1}: {question.title}
                  </h3>
                  <span className="text-lg font-medium text-blue-600">{question.points} Punkte</span>
                </div>

                <div className="space-y-4">
                  {question.parts.map((part, pIndex) => (
                    <div key={part.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          {String.fromCharCode(97 + pIndex)}) {part.question}
                        </h4>
                        <span className="text-sm text-blue-600 ml-4">{part.points}P</span>
                      </div>

                      {answers[part.id] && (
                        <div className="mb-3 p-3 bg-gray-50 rounded border-l-4 border-gray-400">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">Ihre Antwort:</h5>
                          <p className="text-gray-700 whitespace-pre-wrap">{answers[part.id]}</p>
                        </div>
                      )}

                      <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                        <div className="flex items-start">
                          <Lightbulb className="h-4 w-4 text-green-600 mt-0.5 mr-2" />
                          <div>
                            <h5 className="text-sm font-medium text-green-800 mb-1">Musterlösung:</h5>
                            <p className="text-green-700 whitespace-pre-wrap">{part.solution}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const currentExamQuestion = sampleExam[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Header with Timer and Progress */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Timer className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Zeit: {formatTime(timeElapsed)}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">Aufgabe {currentQuestion + 1} von {sampleExam.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{answeredQuestions}/{totalQuestions} beantwortet</span>
            <button
              onClick={completeExam}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Klausur beenden
            </button>
          </div>
        </div>
      </div>

      {/* Question Navigation */}
      <div className="bg-white p-4 rounded-lg border shadow-sm">
        <div className="flex space-x-2 overflow-x-auto">
          {sampleExam.map((question, index) => (
            <button
              key={question.id}
              onClick={() => setCurrentQuestion(index)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                currentQuestion === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Aufgabe {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Current Question */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Aufgabe {currentQuestion + 1}: {currentExamQuestion.title}
          </h2>
          <span className="text-xl font-medium text-blue-600">{currentExamQuestion.points} Punkte</span>
        </div>

        <div className="space-y-6">
          {currentExamQuestion.parts.map((part, index) => (
            <div key={part.id} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {String.fromCharCode(97 + index)}) {part.question}
                </h3>
                <span className="text-blue-600 font-medium ml-4">{part.points} Punkte</span>
              </div>

              <textarea
                value={answers[part.id] || ''}
                onChange={(e) => handleAnswerChange(part.id, e.target.value)}
                placeholder="Ihre Antwort hier eingeben..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />

              {part.type === 'diagram' && (
                <p className="text-sm text-gray-600 mt-2">
                  💡 Tipp: Beschreiben Sie Ihr Diagramm textlich oder skizzieren Sie es auf Papier.
                </p>
              )}
              {part.type === 'calculation' && (
                <p className="text-sm text-gray-600 mt-2">
                  💡 Tipp: Zeigen Sie Ihren Rechenweg Schritt für Schritt.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            ← Vorherige
          </button>
          
          {currentQuestion < sampleExam.length - 1 ? (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nächste →
            </button>
          ) : (
            <button
              onClick={completeExam}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Klausur beenden
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPractice;
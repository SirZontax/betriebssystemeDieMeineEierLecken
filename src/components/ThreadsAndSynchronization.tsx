import React, { useState } from 'react';
import { Zap, Lock, AlertTriangle, Users, Code, Shield } from 'lucide-react';

const ThreadsAndSynchronization: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('basics');

  const threadBasics = [
    {
      concept: 'Thread Definition',
      description: 'Leichtgewichtige Prozesse innerhalb eines Prozess-Kontexts',
      details: [
        'Eigener Ausführungsfaden (Thread of Control)',
        'Teilen sich Adressraum mit anderen Threads',
        'Ermöglichen quasi-parallele Verarbeitung',
        'Geringerer Overhead als Prozesse'
      ]
    },
    {
      concept: 'Thread vs. Prozess',
      description: 'Unterschiede zwischen Threads und Prozessen',
      details: [
        'Threads: Gemeinsamer Adressraum, schneller Kontext-Switch',
        'Prozesse: Isolierte Adressräume, langsamerer Kontext-Switch',
        'Threads: Gemeinsame Ressourcen (Heap, Dateien)',
        'Prozesse: Separate Ressourcen'
      ]
    }
  ];

  const threadTypes = [
    {
      type: 'User-Level Threads',
      description: 'Threads werden von der Anwendung verwaltet',
      advantages: [
        'Schnelle Thread-Wechsel (kein Kernel-Aufruf)',
        'Anwendungsspezifische Scheduling-Algorithmen',
        'Portabel zwischen Betriebssystemen',
        'Geringer Kernel-Overhead'
      ],
      disadvantages: [
        'Blocking System Calls blockieren alle Threads',
        'Keine echte Parallelität auf Multicore',
        'Kernel sieht nur einen Prozess',
        'Komplexere Programmierung'
      ],
      color: 'blue'
    },
    {
      type: 'Kernel-Level Threads',
      description: 'Threads werden vom Betriebssystem verwaltet',
      advantages: [
        'Echte Parallelität auf Multicore-Systemen',
        'Blocking Calls blockieren nur einen Thread',
        'Kernel kann Threads auf CPUs verteilen',
        'Preemptive Scheduling möglich'
      ],
      disadvantages: [
        'Langsamere Thread-Wechsel (Kernel-Aufrufe)',
        'Höherer Kernel-Overhead',
        'Weniger Kontrolle über Scheduling',
        'Begrenzte Anzahl von Threads'
      ],
      color: 'green'
    },
    {
      type: 'Hybrid-Threads',
      description: 'Kombination aus User- und Kernel-Level Threads',
      advantages: [
        'Balance zwischen Performance und Funktionalität',
        'M:N Threading-Modell',
        'Flexible Thread-Verwaltung'
      ],
      disadvantages: [
        'Komplexe Implementierung',
        'Schwierige Synchronisation'
      ],
      color: 'purple'
    }
  ];

  const synchronizationProblems = [
    {
      problem: 'Race Condition',
      description: 'Mehrere Threads greifen gleichzeitig auf gemeinsame Ressourcen zu',
      example: 'counter++ von zwei Threads gleichzeitig → Datenverlust',
      solution: 'Mutual Exclusion (Mutex), Locks',
      color: 'red'
    },
    {
      problem: 'Critical Section',
      description: 'Codeabschnitt, der nur von einem Thread gleichzeitig ausgeführt werden darf',
      example: 'Banküberweisung: Kontostand lesen, ändern, zurückschreiben',
      solution: 'Locks, Semaphoren, Monitore',
      color: 'orange'
    },
    {
      problem: 'Deadlock',
      description: 'Zwei oder mehr Threads warten gegenseitig aufeinander',
      example: 'Thread A wartet auf Lock von Thread B, Thread B wartet auf Lock von Thread A',
      solution: 'Lock-Ordering, Timeouts, Deadlock Detection',
      color: 'yellow'
    }
  ];

  const atomicOperations = [
    {
      operation: 'Test-and-Set',
      description: 'Liest einen Wert und setzt ihn atomisch',
      pseudocode: 'boolean test_and_set(boolean *lock) {\n  boolean old = *lock;\n  *lock = true;\n  return old;\n}',
      usage: 'Basis für Spin-Locks'
    },
    {
      operation: 'Compare-and-Swap',
      description: 'Vergleicht und tauscht Werte atomisch',
      pseudocode: 'boolean cas(int *ptr, int expected, int new) {\n  if (*ptr == expected) {\n    *ptr = new;\n    return true;\n  }\n  return false;\n}',
      usage: 'Lock-freie Datenstrukturen'
    },
    {
      operation: 'Fetch-and-Add',
      description: 'Addiert atomisch einen Wert',
      pseudocode: 'int fetch_and_add(int *ptr, int value) {\n  int old = *ptr;\n  *ptr += value;\n  return old;\n}',
      usage: 'Atomare Zähler, Referenzzählung'
    }
  ];

  const ThreadBasicsComponent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {threadBasics.map((concept, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <h4 className="font-semibold text-blue-800 mb-3">{concept.concept}</h4>
            <p className="text-gray-700 mb-4">{concept.description}</p>
            <ul className="space-y-2">
              {concept.details.map((detail, idx) => (
                <li key={idx} className="text-sm text-gray-600 flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 mt-1.5 flex-shrink-0"></div>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          Klausur-Fokus: Thread-Grundlagen bis F.82/87
        </h4>
        <p className="text-yellow-700">
          Verstehen Sie den Unterschied zwischen Threads und Prozessen! 
          Threads ermöglichen parallele Verarbeitung innerhalb eines Prozess-Kontexts.
        </p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-3">Praktisches Beispiel: GUI-Anwendung</h4>
        <div className="space-y-2 text-blue-700">
          <p><strong>Problem:</strong> Aufwändige Berechnung lässt UI einfrieren</p>
          <p><strong>Lösung:</strong> UI-Thread + Berechnungs-Thread</p>
          <ul className="text-sm mt-2 space-y-1">
            <li>• UI-Thread: Verwaltet Events und Benutzereingaben</li>
            <li>• Worker-Thread: Führt aufwändige Berechnung durch</li>
            <li>• Kommunikation: Fortschrittsbalken-Updates</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const ThreadTypesComponent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {threadTypes.map((type, index) => (
          <div key={index} className={`border-l-4 border-${type.color}-500 bg-${type.color}-50 p-6 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{type.type}</h4>
            <p className="text-sm text-gray-700 mb-4">{type.description}</p>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-green-700 mb-1 text-sm">Vorteile:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {type.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1 h-1 bg-green-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 mb-1 text-sm">Nachteile:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {type.disadvantages.map((dis, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-1 h-1 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SynchronizationComponent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {synchronizationProblems.map((problem, index) => (
          <div key={index} className={`border-l-4 border-${problem.color}-500 bg-${problem.color}-50 p-4 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{problem.problem}</h4>
            <p className="text-sm text-gray-700 mb-3">{problem.description}</p>
            
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border">
                <h5 className="font-medium text-xs mb-1">Beispiel:</h5>
                <p className="text-xs text-gray-600">{problem.example}</p>
              </div>
              
              <div className="bg-white p-2 rounded border">
                <h5 className="font-medium text-xs mb-1">Lösung:</h5>
                <p className="text-xs text-gray-600">{problem.solution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2 flex items-center">
          <Lock className="h-5 w-5 mr-2" />
          Wichtig: Beide Synchronisations-Szenarien verstehen!
        </h4>
        <div className="text-red-700 space-y-2">
          <p><strong>Szenario 1:</strong> Race Conditions verhindern - Was ist das Problem?</p>
          <p><strong>Szenario 2:</strong> Critical Sections schützen - Wie löse ich das?</p>
          <p><strong>Atomare Operationen:</strong> Wie mache ich Operationen unteilbar?</p>
        </div>
      </div>
    </div>
  );

  const AtomicOperationsComponent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {atomicOperations.map((op, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <h4 className="font-semibold text-purple-800 mb-3">{op.operation}</h4>
            <p className="text-gray-700 mb-4">{op.description}</p>
            
            <div className="space-y-3">
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs overflow-x-auto">
                <pre>{op.pseudocode}</pre>
              </div>
              
              <div className="bg-purple-50 p-2 rounded border">
                <h5 className="font-medium text-purple-800 text-xs mb-1">Verwendung:</h5>
                <p className="text-xs text-purple-700">{op.usage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h4 className="font-semibold text-green-800 mb-2">Hardware-Unterstützung für Synchronisation</h4>
        <div className="text-green-700 space-y-2">
          <p>Moderne Prozessoren bieten atomare Operationen auf Hardware-Ebene:</p>
          <ul className="text-sm space-y-1 ml-4">
            <li>• <strong>x86:</strong> LOCK-Präfix, CMPXCHG, XADD</li>
            <li>• <strong>ARM:</strong> Load-Link/Store-Conditional (LDREX/STREX)</li>
            <li>• <strong>Speicher-Barrieren:</strong> Verhindern Compiler/CPU-Optimierungen</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Users className="h-8 w-8 text-blue-600 mr-3" />
          Threads & Synchronisation
        </h2>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'basics', label: 'Thread-Grundlagen', icon: Users },
            { id: 'types', label: 'Thread-Arten', icon: Zap },
            { id: 'synchronization', label: 'Synchronisation', icon: Lock },
            { id: 'atomic', label: 'Atomare Operationen', icon: Code }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTopic(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedTopic === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {selectedTopic === 'basics' && <ThreadBasicsComponent />}
        {selectedTopic === 'types' && <ThreadTypesComponent />}
        {selectedTopic === 'synchronization' && <SynchronizationComponent />}
        {selectedTopic === 'atomic' && <AtomicOperationsComponent />}

        {/* Key Takeaways */}
        <div className="mt-8 bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-2 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Klausur-Kernpunkte
          </h4>
          <ul className="text-indigo-700 space-y-1 text-sm">
            <li>• Thread vs. Prozess: Gemeinsamer Adressraum, leichtgewichtig</li>
            <li>• User-Level vs. Kernel-Level Threads: Vor- und Nachteile</li>
            <li>• Race Conditions erkennen und Critical Sections identifizieren</li>
            <li>• Atomare Operationen verstehen: Test-and-Set, Compare-and-Swap</li>
            <li>• Synchronisationsprobleme lösen: Mutex, Semaphoren, Monitore</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThreadsAndSynchronization;
import React, { useState } from 'react';
import { Cpu, Play, Pause, Square } from 'lucide-react';
import CPUEfficiencyCalculator from './CPUEfficiencyCalculator';

const ProcessManagement: React.FC = () => {
  const [selectedProcess, setSelectedProcess] = useState<number | null>(null);
  const [currentExample, setCurrentExample] = useState('states');

  const processStates = [
    {
      state: 'Running',
      description: 'Prozess verarbeitet Befehle auf dem Prozessor',
      color: 'green',
      icon: Play,
      transitions: ['Ready (Zeitscheibe abgelaufen)', 'Blocked (I/O-Anfrage)']
    },
    {
      state: 'Ready',
      description: 'Befehlsverarbeitung pausiert, wartet auf CPU-Zuteilung',
      color: 'blue',
      icon: Pause,
      transitions: ['Running (CPU zugeteilt)']
    },
    {
      state: 'Blocked',
      description: 'Wartet auf externes Signal/Ereignis (z.B. I/O)',
      color: 'red',
      icon: Square,
      transitions: ['Ready (I/O abgeschlossen)']
    }
  ];

  const processCreationMethods = [
    {
      method: 'System-Initialisierung',
      description: 'Prozess wird beim Systemstart erzeugt und ausgeführt',
      example: 'Init-Prozess, System-Daemons'
    },
    {
      method: 'Systemaufruf durch anderen Prozess',
      description: 'Laufender Prozess erzeugt neue Prozesse',
      example: 'fork() unter UNIX, CreateProcess() unter Windows'
    },
    {
      method: 'Benutzeranfrage',
      description: 'Start durch Benutzer via Kommandozeile oder GUI',
      example: 'Anwendung per Doppelklick starten'
    },
    {
      method: 'Stapelverarbeitung',
      description: 'Batch-Jobs bei Großrechnern',
      example: 'Automatisierte Routineaufgaben'
    }
  ];

  const processTerminationTypes = [
    {
      type: 'Normales Beenden',
      description: 'Ordnungsgemäße Programmabarbeitung',
      syscalls: 'UNIX: exit(), Windows: exitProcess()',
      color: 'green'
    },
    {
      type: 'Freiwilliges Beenden (Fehler)',
      description: 'Programm erkennt Fehler und beendet sich selbst',
      syscalls: 'Logging, Konsolenausgabe',
      color: 'yellow'
    },
    {
      type: 'Unfreiwilliges Beenden (Fehler)',
      description: 'Schwerwiegender Fehler führt zum Abbruch',
      syscalls: 'Speicherzugriffsverletzung, Division durch null',
      color: 'orange'
    },
    {
      type: 'Beendigung durch anderen Prozess',
      description: 'Externer Prozess beendet den Prozess',
      syscalls: 'UNIX: kill(), Windows: TerminateProcess()',
      color: 'red'
    }
  ];

  const processExamples = [
    { id: 1, name: 'Browser', state: 'Running', pid: 1234 },
    { id: 2, name: 'TextEditor', state: 'Ready', pid: 5678 },
    { id: 3, name: 'FileDownload', state: 'Blocked', pid: 9012 },
    { id: 4, name: 'Calculator', state: 'Ready', pid: 3456 }
  ];

  const programmingTypes = [
    {
      type: 'Einprogrammbetrieb',
      description: 'Nur ein Programm zur Zeit im Speicher',
      advantages: ['Einfache Verwaltung', 'Keine Konflikte', 'Einfache Speicherverwaltung'],
      disadvantages: ['Ineffiziente CPU-Nutzung', 'Keine Parallelität'],
      color: 'red'
    },
    {
      type: 'Mehrprogrammbetrieb',
      description: 'Mehrere Programme gleichzeitig im Speicher',
      advantages: ['Effiziente CPU-Nutzung', 'Quasi-Parallelität', 'Bessere Ressourcennutzung'],
      disadvantages: ['Komplexe Verwaltung', 'Kontextwechsel-Overhead'],
      color: 'green'
    }
  ];


  const ProcessStateVisualizer = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Prozesszustände Visualisierung</h4>
      <div className="flex justify-center">
        <div className="relative">
          {/* States */}
          <div className="flex space-x-8 mb-8">
            {processStates.map((state, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 border-${state.color}-300 bg-${state.color}-50 text-center`}
              >
                <state.icon className={`h-8 w-8 text-${state.color}-600 mx-auto mb-2`} />
                <h5 className="font-medium">{state.state}</h5>
                <p className="text-xs text-gray-600 mt-1">{state.description}</p>
              </div>
            ))}
          </div>
          
          {/* Transitions */}
          <div className="text-center text-sm text-gray-600">
            <p>Ready → Running: Prozess erhält CPU</p>
            <p>Running → Ready: Zeitscheibe abgelaufen</p>
            <p>Running → Blocked: I/O-Anfrage</p>
            <p>Blocked → Ready: I/O abgeschlossen</p>
          </div>
        </div>
      </div>
    </div>
  );

  const MultithreadingComparison = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <h5 className="font-semibold text-red-800 mb-2">Singlethreading</h5>
        <p className="text-sm text-red-700">Ein Task zur Zeit, sequenzielle Abarbeitung</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-semibold text-blue-800 mb-2">Multithreading</h5>
        <p className="text-sm text-blue-700">Quasi-parallele Verarbeitung innerhalb einer Anwendung</p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h5 className="font-semibold text-green-800 mb-2">Multiprocessing</h5>
        <p className="text-sm text-green-700">Echte Parallelität auf Multicore-Systemen</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Cpu className="h-8 w-8 text-blue-600 mr-3" />
          Prozessverwaltung
        </h2>

        {/* Navigation */}
        <div className="flex space-x-4 mb-6">
          {[
            { id: 'states', label: 'Prozesszustände' },
            { id: 'programming', label: 'Ein-/Mehrprogrammbetrieb' },
            { id: 'efficiency', label: 'CPU-Effizienz' },
            { id: 'threading', label: 'Threading-Konzepte' },
            { id: 'creation', label: 'Prozess-Erzeugung' },
            { id: 'termination', label: 'Prozess-Beendigung' },
            { id: 'hierarchies', label: 'Prozess-Hierarchien' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentExample(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentExample === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on selected tab */}
        {currentExample === 'states' && (
          <div className="space-y-6">
            <ProcessStateVisualizer />
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Beispiel-Prozesse</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {processExamples.map((process) => (
                  <div
                    key={process.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedProcess === process.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProcess(process.id)}
                  >
                    <h4 className="font-medium">{process.name}</h4>
                    <p className="text-sm text-gray-600">PID: {process.pid}</p>
                    <span className={`process-state ${process.state.toLowerCase()}`}>
                      {process.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentExample === 'programming' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programmingTypes.map((type, index) => (
                <div key={index} className={`border-l-4 border-${type.color}-500 bg-${type.color}-50 p-6 rounded-r-lg`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.type}</h3>
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium text-green-700">Vorteile:</h4>
                      <ul className="text-sm text-gray-600">
                        {type.advantages.map((adv, idx) => (
                          <li key={idx}>+ {adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700">Nachteile:</h4>
                      <ul className="text-sm text-gray-600">
                        {type.disadvantages.map((dis, idx) => (
                          <li key={idx}>- {dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentExample === 'efficiency' && (
          <div className="space-y-6">
            <CPUEfficiencyCalculator />
          </div>
        )}

        {currentExample === 'threading' && (
          <div className="space-y-6">
            <MultithreadingComparison />
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Klausur-Fokus: Hyperthreading</h4>
              <p className="text-yellow-700">
                Verstehen Sie den Unterschied zwischen logischen und physikalischen Prozessoren!
                Ein 4-Kern-Prozessor mit Hyperthreading erscheint dem OS als 8 logische Prozessoren.
              </p>
            </div>
          </div>
        )}

        {currentExample === 'creation' && (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">AUSGESCHLOSSEN aus der Klausur</h4>
              <div className="text-red-700 space-y-1">
                <p><strong>F.13 raus:</strong> Detaillierte Prozesserzeugung</p>
                <p><strong>Copy-on-Write raus:</strong> Spezifische Implementierungsdetails</p>
                <p><strong>Prozessbeendigung raus:</strong> Nicht klausurrelevant</p>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mb-4">Grundlagen der Prozesserzeugung (bis F.12)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processCreationMethods.slice(0, 2).map((method, index) => (
                <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{method.method}</h4>
                  <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                  <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                    <strong>Beispiel:</strong> {method.example}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentExample === 'termination' && (
          <div className="space-y-6">
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h4 className="font-semibold text-red-800 mb-2">Nicht klausurrelevant</h4>
              <p className="text-red-700">
                Prozessbeendigung ist laut Klausureinschränkung "raus" - 
                Konzentrieren Sie sich auf andere Themen.
              </p>
            </div>
          </div>
        )}

        {currentExample === 'hierarchies' && (
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">Relevanz: Hierarchie bis F.32!</h4>
              <p className="text-green-700">
                Prozesshierarchien sind bis Folie 32 relevant - konzentrieren Sie sich auf die Grundlagen.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border">
              <h4 className="font-semibold mb-4">Prozesshierarchien (bis F.32)</h4>
              <p className="text-gray-700 mb-4">
                Aus Eltern- und Kind-Prozessen ergibt sich eine hierarchische Struktur.
                Ein Kind-Prozess hat nur einen Elternteil!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">UNIX-Hierarchien</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Init-Prozess ist Wurzel aller Prozesse</li>
                    <li>• Signale werden an Prozessfamilie gesendet</li>
                    <li>• Strikte Hierarchie-Einhaltung</li>
                    <li>• Prozessbaum mit Root-Element (init)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Windows-Hierarchien</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Alle Prozesse gleichwertig</li>
                    <li>• Implizite Hierarchie durch Tokens/Handles</li>
                    <li>• Token kann weitergegeben werden</li>
                    <li>• Flexiblere Prozess-"Vererbung"</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Signale und Kommunikation (Grundlagen)</h4>
              <div className="text-yellow-700 space-y-2">
                <p><strong>Signale:</strong> Software-Interrupts für Interprozess-Kommunikation</p>
                <p><strong>Prozess-Sicherheit:</strong> Nur an eigene Prozessgruppe/Familie</p>
                <p><strong>Verhalten:</strong> Signal ignorieren, abfangen, Prozess beenden</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessManagement;
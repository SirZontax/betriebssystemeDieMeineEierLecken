import React, { useState } from 'react';
import { Clock, BarChart3, Zap, List } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ProcessScheduling: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('fcfs');
  const [processes, setProcesses] = useState([
    { id: 'P1', arrival: 0, burst: 8, priority: 3 },
    { id: 'P2', arrival: 1, burst: 4, priority: 1 },
    { id: 'P3', arrival: 2, burst: 9, priority: 2 },
    { id: 'P4', arrival: 3, burst: 5, priority: 4 }
  ]);

  const algorithms = {
    fcfs: {
      name: 'First Come First Served (FCFS)',
      description: 'Prozesse werden in der Reihenfolge ihrer Ankunft abgearbeitet',
      nonPreemptive: true,
      focus: 'F.182 FIFO!!'
    },
    sjf: {
      name: 'Shortest Job First (SJF)',
      description: 'Kürzeste Prozesse werden zuerst ausgeführt',
      nonPreemptive: true,
      focus: 'F.188!'
    },
    rr: {
      name: 'Round Robin (RR)',
      description: 'Prozesse erhalten zyklisch gleiche Zeitscheiben',
      nonPreemptive: false,
      focus: 'F.191!'
    },
    priority: {
      name: 'Priority Scheduling',
      description: 'Prozesse mit höchster Priorität werden zuerst ausgeführt (niedrigere Zahl = höhere Priorität)',
      nonPreemptive: true,
      focus: 'F.194!'
    }
  };

  const calculateFCFS = () => {
    const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
    let currentTime = 0;
    const schedule = [];
    
    for (const process of sorted) {
      const startTime = Math.max(currentTime, process.arrival);
      const endTime = startTime + process.burst;
      
      schedule.push({
        ...process,
        startTime,
        endTime,
        waitingTime: startTime - process.arrival,
        turnaroundTime: endTime - process.arrival
      });
      
      currentTime = endTime;
    }
    
    return schedule;
  };

  const calculateSJF = () => {
    // SJF berücksichtigt Ankunftszeiten - wählt kürzesten Job aus verfügbaren
    const schedule = [];
    let currentTime = 0;
    const remaining = [...processes];
    
    while (remaining.length > 0) {
      // Verfügbare Prozesse (bereits angekommen)
      const available = remaining.filter(p => p.arrival <= currentTime);
      
      if (available.length === 0) {
        // Springe zur nächsten Ankunftszeit
        currentTime = Math.min(...remaining.map(p => p.arrival));
        continue;
      }
      
      // Wähle kürzesten verfügbaren Job
      const shortest = available.reduce((min, p) => p.burst < min.burst ? p : min);
      
      const startTime = currentTime;
      const endTime = startTime + shortest.burst;
      
      schedule.push({
        ...shortest,
        startTime,
        endTime,
        waitingTime: startTime - shortest.arrival,
        turnaroundTime: endTime - shortest.arrival
      });
      
      currentTime = endTime;
      remaining.splice(remaining.indexOf(shortest), 1);
    }
    
    return schedule;
  };

  const calculateRoundRobin = (quantum = 3) => {
    const schedule = [];
    let currentTime = 0;
    let readyQueue = [];
    const remaining = [...processes].map(p => ({ ...p, remainingTime: p.burst, waitingTime: 0, firstStart: -1 }));
    let completed = [];
    
    while (completed.length < processes.length) {
      // Add newly arrived processes to ready queue
      remaining.forEach(p => {
        if (p.arrival <= currentTime && !readyQueue.includes(p) && !completed.includes(p)) {
          readyQueue.push(p);
        }
      });
      
      if (readyQueue.length === 0) {
        // No process ready, advance time to next arrival
        const nextArrival = Math.min(...remaining.filter(p => !completed.includes(p)).map(p => p.arrival));
        currentTime = nextArrival;
        continue;
      }
      
      // Get next process from ready queue
      const currentProcess = readyQueue.shift();
      const executeTime = Math.min(quantum, currentProcess.remainingTime);
      
      // Record first start time for waiting time calculation
      if (currentProcess.firstStart === -1) {
        currentProcess.firstStart = currentTime;
        currentProcess.waitingTime = currentTime - currentProcess.arrival;
      }
      
      schedule.push({
        ...currentProcess,
        startTime: currentTime,
        endTime: currentTime + executeTime,
        executeTime,
        waitingTime: currentProcess.waitingTime,
        turnaroundTime: 0 // Will be calculated for completed processes
      });
      
      currentTime += executeTime;
      currentProcess.remainingTime -= executeTime;
      
      // Check if process is completed
      if (currentProcess.remainingTime === 0) {
        currentProcess.turnaroundTime = currentTime - currentProcess.arrival;
        // Update the schedule entry with final turnaround time
        schedule[schedule.length - 1].turnaroundTime = currentProcess.turnaroundTime;
        completed.push(currentProcess);
      } else {
        // Add back to ready queue if not completed
        readyQueue.push(currentProcess);
      }
    }
    
    return schedule;
  };

  const calculatePriority = () => {
    // Priority Scheduling - niedrigere Zahl = höhere Priorität
    const schedule = [];
    let currentTime = 0;
    const remaining = [...processes];
    
    while (remaining.length > 0) {
      // Verfügbare Prozesse
      const available = remaining.filter(p => p.arrival <= currentTime);
      
      if (available.length === 0) {
        currentTime = Math.min(...remaining.map(p => p.arrival));
        continue;
      }
      
      // Wähle Prozess mit höchster Priorität (niedrigste Zahl)
      const highest = available.reduce((min, p) => p.priority < min.priority ? p : min);
      
      const startTime = currentTime;
      const endTime = startTime + highest.burst;
      
      schedule.push({
        ...highest,
        startTime,
        endTime,
        waitingTime: startTime - highest.arrival,
        turnaroundTime: endTime - highest.arrival
      });
      
      currentTime = endTime;
      remaining.splice(remaining.indexOf(highest), 1);
    }
    
    return schedule;
  };

  const getScheduleData = () => {
    switch (selectedAlgorithm) {
      case 'fcfs':
        return calculateFCFS();
      case 'sjf':
        return calculateSJF();
      case 'rr':
        return calculateRoundRobin();
      case 'priority':
        return calculatePriority();
      default:
        return calculateFCFS();
    }
  };

  const scheduleData = getScheduleData();

  const TimelineChart = ({ data, algorithm }) => {
    const maxTime = Math.max(...data.map(d => d.endTime));
    const processIds = [...new Set(data.map(d => d.id))].sort();
    
    // Create full timeline for each process
    const createProcessTimeline = (processId) => {
      const processEvents = data.filter(d => d.id === processId).sort((a, b) => a.startTime - b.startTime);
      const originalProcess = processes.find(p => p.id === processId);
      const timeline = [];
      let currentTime = originalProcess.arrival;
      
      processEvents.forEach((event, idx) => {
        // Add waiting period before this execution
        if (currentTime < event.startTime) {
          timeline.push({
            type: 'waiting',
            start: currentTime,
            duration: event.startTime - currentTime,
            process: processId
          });
        }
        
        // Add execution period
        timeline.push({
          type: 'running',
          start: event.startTime,
          duration: event.executeTime || event.burst,
          process: processId
        });
        
        currentTime = event.endTime;
      });
      
      return timeline;
    };

    return (
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Ablaufdiagramm: {algorithms[algorithm].name}</h4>
        <div className="mb-6">
          {/* Legend */}
          <div className="flex items-center space-x-6 text-sm mb-6">
            <div className="flex items-center">
              <div className="w-6 h-3 bg-blue-500 mr-2 border border-gray-400"></div>
              <span>Prozess läuft</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-3 border-2 border-dashed border-red-500 bg-red-100 mr-2"></div>
              <span>Prozess wartet</span>
            </div>
            {algorithm === 'rr' && (
              <div className="text-xs text-gray-600 bg-yellow-100 px-2 py-1 rounded">
                Quantum = 3 Zeiteinheiten
              </div>
            )}
          </div>
          
          {/* Timeline Chart */}
          <div className="space-y-4">
            {processIds.map(processId => {
              const timeline = createProcessTimeline(processId);
              const originalProcess = processes.find(p => p.id === processId);
              
              return (
                <div key={processId} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-right pr-4">{processId}</div>
                  <div className="flex-1 relative">
                    {/* Process timeline */}
                    <div className="flex border border-gray-400 h-10 bg-gray-50" style={{ width: `${maxTime * 10}px` }}>
                      {timeline.map((segment, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-center text-xs font-medium border-r border-gray-300 ${
                            segment.type === 'running'
                              ? 'bg-blue-500 text-white'
                              : 'border-2 border-dashed border-red-500 bg-red-100 text-red-700'
                          }`}
                          style={{ 
                            width: `${segment.duration * 10}px`,
                            marginLeft: idx === 0 ? `${(segment.start - originalProcess.arrival) * 10}px` : '0'
                          }}
                        >
                          {segment.type === 'running' ? processId : '···'}
                        </div>
                      ))}
                    </div>
                    
                    {/* Arrival time marker */}
                    {originalProcess.arrival > 0 && (
                      <div 
                        className="absolute top-0 h-10 w-0.5 bg-green-600"
                        style={{ left: `${originalProcess.arrival * 10}px` }}
                      >
                        <div className="absolute -top-5 -left-8 text-xs text-green-600 font-medium">
                          Ereignis ↓
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Time axis */}
          <div className="mt-6 flex items-center">
            <div className="w-24 pr-4"></div>
            <div className="flex-1 relative">
              <div className="flex text-xs text-gray-600 border-t border-gray-400 pt-1">
                {Array.from({ length: Math.ceil(maxTime / 5) + 1 }, (_, i) => (
                  <div key={i} style={{ width: '50px' }} className="text-center">
                    {i * 5}
                  </div>
                ))}
              </div>
              <div className="absolute right-0 -top-6">
                <span className="text-sm text-gray-600 font-medium">Zeit →</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Algorithm-specific explanations */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium mb-3">Algorithmus-Details:</h5>
          {algorithm === 'fcfs' && (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>FIFO/FCFS Prinzip:</strong> First In, First Out - Prozesse werden in Ankunftsreihenfolge abgearbeitet</p>
              <p><strong>Eigenschaften:</strong> Non-preemptive, einfach zu implementieren, kann zu Convoy-Effekt führen</p>
              <p><strong>Vorteil:</strong> Faire Behandlung aller Prozesse, keine Starvation</p>
              <p><strong>Nachteil:</strong> Kurze Jobs warten hinter langen Jobs → hohe durchschnittliche Wartezeit</p>
              <p><strong>Beobachtung:</strong> Die gestrichelten Linien zeigen Wartezeiten - besonders deutlich bei kurzen Prozessen hinter langen</p>
            </div>
          )}
          {algorithm === 'sjf' && (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>SJF Prinzip:</strong> Shortest Job First - kürzeste verfügbare Jobs werden zuerst ausgeführt</p>
              <p><strong>Eigenschaften:</strong> Non-preemptive, optimal für minimale durchschnittliche Wartezeit</p>
              <p><strong>Vorteil:</strong> Minimiert durchschnittliche Wartezeit (mathematisch beweisbar optimal)</p>
              <p><strong>Nachteil:</strong> Starvation möglich für lange Jobs, Burst-Zeit muss im Voraus bekannt sein</p>
              <p><strong>Beobachtung:</strong> Kurze Jobs werden bevorzugt, lange Jobs können lange warten (gestrichelte Bereiche)</p>
            </div>
          )}
          {algorithm === 'rr' && (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Round Robin Prinzip:</strong> Jeder Prozess erhält gleiche Zeitscheiben (Quantum = 3)</p>
              <p><strong>Eigenschaften:</strong> Preemptive, zyklische Zuteilung, Time-Sharing</p>
              <p><strong>Vorteil:</strong> Faire Verteilung, gute Antwortzeiten für interaktive Systeme</p>
              <p><strong>Nachteil:</strong> Context-Switch Overhead, Quantum-Wahl kritisch für Performance</p>
              <p><strong>Beobachtung:</strong> Prozesse wechseln sich ab - mehrere Ausführungsperioden pro Prozess sichtbar</p>
            </div>
          )}
          {algorithm === 'priority' && (
            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Priority Prinzip:</strong> Prozesse mit höchster Priorität werden zuerst ausgeführt</p>
              <p><strong>Eigenschaften:</strong> Non-preemptive, niedrigere Zahl = höhere Priorität</p>
              <p><strong>Vorteil:</strong> Wichtige Prozesse werden bevorzugt behandelt</p>
              <p><strong>Nachteil:</strong> Starvation möglich für niedrig-prioritäre Prozesse</p>
              <p><strong>Beobachtung:</strong> Reihenfolge richtet sich nach Priorität, nicht nach Ankunftszeit oder Burst-Zeit</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const GanttChart = ({ data }) => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Gantt-Diagramm (Klassische Darstellung)</h4>
      <div className="overflow-x-auto">
        <div className="flex border border-gray-300 min-w-max">
          {data.map((item, index) => (
            <div
              key={index}
              className="border-r border-gray-300 p-2 text-center min-w-16"
              style={{
                backgroundColor: `hsl(${(item.id.charCodeAt(1) - 48) * 60}, 70%, 85%)`,
                width: `${item.executeTime || item.burst}rem`
              }}
            >
              <div className="font-medium">{item.id}</div>
              <div className="text-xs text-gray-600">
                {item.executeTime || item.burst}
              </div>
            </div>
          ))}
        </div>
        <div className="flex min-w-max mt-1">
          {data.map((item, index) => (
            <div
              key={index}
              className="text-xs text-center min-w-16 border-r border-gray-200"
              style={{ width: `${item.executeTime || item.burst}rem` }}
            >
              {item.startTime}
            </div>
          ))}
          <div className="text-xs">{data[data.length - 1]?.endTime || 0}</div>
        </div>
      </div>
    </div>
  );

  const ProcessTable = ({ data }) => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Prozess-Details</h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Prozess</th>
              <th className="text-left p-2">Ankunft</th>
              <th className="text-left p-2">Burst</th>
              <th className="text-left p-2">Start</th>
              <th className="text-left p-2">Ende</th>
              <th className="text-left p-2">Wartezeit</th>
              <th className="text-left p-2">Umlaufzeit</th>
            </tr>
          </thead>
          <tbody>
            {data.map((process, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 font-medium">{process.id}</td>
                <td className="p-2">{process.arrival}</td>
                <td className="p-2">{process.burst}</td>
                <td className="p-2">{process.startTime}</td>
                <td className="p-2">{process.endTime}</td>
                <td className="p-2">{process.waitingTime}</td>
                <td className="p-2">{process.turnaroundTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h5 className="font-medium mb-2">Durchschnittswerte:</h5>
        <p>Ø Wartezeit: {(data.reduce((sum, p) => sum + (p.waitingTime || 0), 0) / data.length).toFixed(2)}</p>
        <p>Ø Umlaufzeit: {(data.reduce((sum, p) => sum + (p.turnaroundTime || 0), 0) / data.length).toFixed(2)}</p>
      </div>
    </div>
  );

  const ProcessEditor = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Prozesse bearbeiten</h4>
      <div className="space-y-4">
        {processes.map((process, index) => (
          <div key={process.id} className="flex space-x-4 items-center">
            <span className="w-8 font-medium">{process.id}</span>
            <div>
              <label className="block text-xs text-gray-600">Ankunft</label>
              <input
                type="number"
                value={process.arrival}
                onChange={(e) => {
                  const newProcesses = [...processes];
                  newProcesses[index].arrival = parseInt(e.target.value) || 0;
                  setProcesses(newProcesses);
                }}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Burst</label>
              <input
                type="number"
                value={process.burst}
                onChange={(e) => {
                  const newProcesses = [...processes];
                  newProcesses[index].burst = parseInt(e.target.value) || 1;
                  setProcesses(newProcesses);
                }}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600">Priorität</label>
              <input
                type="number"
                value={process.priority}
                onChange={(e) => {
                  const newProcesses = [...processes];
                  newProcesses[index].priority = parseInt(e.target.value) || 1;
                  setProcesses(newProcesses);
                }}
                className="w-16 px-2 py-1 border rounded"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="h-8 w-8 text-blue-600 mr-3" />
          Prozess-Scheduling
        </h2>

        {/* Algorithm Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Scheduling-Algorithmen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(algorithms).map(([key, alg]) => (
              <button
                key={key}
                onClick={() => setSelectedAlgorithm(key)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAlgorithm === key
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{alg.name}</h4>
                  {alg.focus && (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      {alg.focus}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{alg.description}</p>
                <span className={`text-xs px-2 py-1 rounded ${
                  alg.nonPreemptive ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {alg.nonPreemptive ? 'Non-preemptive' : 'Preemptive'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Process Editor */}
        <div className="mb-6">
          <ProcessEditor />
        </div>

        {/* Visualization */}
        <div className="space-y-6">
          <TimelineChart data={scheduleData} algorithm={selectedAlgorithm} />
          <GanttChart data={scheduleData} />
          <ProcessTable data={scheduleData} />
        </div>

        {/* Important Notes */}
        <div className="mt-8 bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            KRITISCH: Gestrichelte Linien in Gantt-Diagrammen!
          </h4>
          <div className="text-yellow-700 space-y-2">
            <p><strong>Gestrichelte Linien = Wartezeit!</strong> Nicht nichts!</p>
            <p>Die gestrichelten Linien sind wichtig und müssen erkennbar sein, dass der Prozess wartet.</p>
            <p><strong>F.180 FOKUS!! F.182 FIFO!! F.188! F.191! F.194!</strong></p>
            <p>Sie müssen die Algorithmen durchrechnen können und die Diagramme korrekt zeichnen.</p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-blue-800 mb-2">Berechnungen durchführen</h4>
          <p className="text-blue-700 mb-2">
            Für die Klausur wichtig: Können Sie die Algorithmen von Hand durchrechnen!
          </p>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Wartezeit = Startzeit - Ankunftszeit</li>
            <li>• Umlaufzeit = Endzeit - Ankunftszeit</li>
            <li>• Antwortzeit = Erste CPU-Zuteilung - Ankunftszeit</li>
          </ul>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <h4 className="font-semibold text-purple-800 mb-3">Scheduling-Kriterien & Ziele</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Performance-Kriterien:</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>Durchsatz (Throughput):</strong> Anzahl abgearbeiteter Prozesse pro Zeiteinheit</li>
                <li>• <strong>CPU-Auslastung:</strong> Prozentuale Nutzung der CPU</li>
                <li>• <strong>Warteschlangen-Länge:</strong> Anzahl wartender Prozesse</li>
                <li>• <strong>Fairness:</strong> Gleiche Behandlung aller Prozesse</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-800 mb-2">Zeit-Kriterien:</h5>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• <strong>Wartezeit minimieren:</strong> Zeit in Ready-Queue</li>
                <li>• <strong>Umlaufzeit minimieren:</strong> Gesamtzeit im System</li>
                <li>• <strong>Antwortzeit minimieren:</strong> Zeit bis erste Reaktion</li>
                <li>• <strong>Vorhersagbarkeit:</strong> Konstante Ausführungszeiten</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-3">Preemptive vs. Non-Preemptive Scheduling</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-green-800 mb-2">Non-Preemptive (Kooperativ):</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Prozess läuft bis zur Beendigung oder Blockierung</li>
                <li>• Keine Unterbrechung durch Scheduler</li>
                <li>• Beispiele: FCFS, SJF, Priority</li>
                <li>• Einfacher zu implementieren</li>
                <li>• Kann zu Starvation führen</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-800 mb-2">Preemptive (Verdrängend):</h5>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Scheduler kann laufende Prozesse unterbrechen</li>
                <li>• Zeitscheiben oder Prioritätsänderungen</li>
                <li>• Beispiele: Round Robin, Preemptive SJF, SRTF</li>
                <li>• Bessere Reaktionszeiten</li>
                <li>• Context-Switch Overhead</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <h4 className="font-semibold text-orange-800 mb-3">Häufige Scheduling-Probleme</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h5 className="font-medium text-orange-800 mb-2">Starvation:</h5>
              <p className="text-sm text-orange-700 mb-2">
                Prozesse warten unendlich lange auf CPU-Zuteilung
              </p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Tritt bei Priority Scheduling auf</li>
                <li>• Lösung: Aging (Priorität steigt mit Wartezeit)</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-800 mb-2">Convoy-Effekt:</h5>
              <p className="text-sm text-orange-700 mb-2">
                Kurze Prozesse warten hinter langen Prozessen
              </p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Typisch bei FCFS</li>
                <li>• Hohe durchschnittliche Wartezeit</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-orange-800 mb-2">Time Slice Issues:</h5>
              <p className="text-sm text-orange-700 mb-2">
                Probleme bei Round Robin Zeitscheiben
              </p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Zu kurz: Hoher Context-Switch Overhead</li>
                <li>• Zu lang: Schlechte Antwortzeiten</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <h4 className="font-semibold text-indigo-800 mb-4">📖 Wie lese ich das Ablaufdiagramm?</h4>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h5 className="font-medium text-indigo-800 mb-3">Diagramm-Struktur verstehen:</h5>
              <div className="space-y-3 text-sm text-indigo-700">
                <div className="flex items-start">
                  <span className="font-bold mr-2">Y-Achse:</span>
                  <span>Jede Zeile = Ein Prozess (P1, P2, P3, P4)</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">X-Achse:</span>
                  <span>Zeit in Zeiteinheiten (0, 5, 10, 15, ...)</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">Blaue Blöcke:</span>
                  <span>Prozess läuft auf der CPU</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">Gestrichelte Bereiche:</span>
                  <span>Prozess wartet in der Ready-Queue</span>
                </div>
                <div className="flex items-start">
                  <span className="font-bold mr-2">Grüne Linie "Ereignis":</span>
                  <span>Ankunftszeit des Prozesses im System</span>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-indigo-800 mb-3">Was passiert wann?</h5>
              <div className="space-y-2 text-sm text-indigo-700">
                <div className="bg-white p-3 rounded border">
                  <p><strong>Vor dem Ereignis:</strong> Prozess existiert noch nicht im System</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p><strong>Gestrichelte Phase:</strong> Prozess ist da, wartet aber auf CPU-Zuteilung</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p><strong>Blaue Phase:</strong> Prozess hat CPU und führt Berechnungen aus</p>
                </div>
                <div className="bg-white p-3 rounded border">
                  <p><strong>Nach blauer Phase:</strong> Prozess ist fertig und verlässt das System</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded border">
            <h5 className="font-medium text-indigo-800 mb-3">🔍 Detailliertes Beispiel (FCFS):</h5>
            <div className="text-sm text-indigo-700 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Gegeben:</strong></p>
                  <ul className="text-xs mt-1 space-y-1">
                    <li>• P1: Ankunft=0, Burst=8</li>
                    <li>• P2: Ankunft=1, Burst=4</li>
                    <li>• P3: Ankunft=2, Burst=9</li>
                    <li>• P4: Ankunft=3, Burst=5</li>
                  </ul>
                </div>
                <div>
                  <p><strong>FCFS-Regel:</strong></p>
                  <p className="text-xs mt-1">First Come First Served - Wer zuerst kommt, wird zuerst bedient!</p>
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-3">
                <p><strong>⏰ Zeit 0:</strong> P1 kommt an (grüne Linie) → CPU ist frei → P1 startet sofort (blauer Block)</p>
                <p><strong>⏰ Zeit 1:</strong> P2 kommt an (grüne Linie) → P1 läuft noch → P2 muss warten (gestrichelte Linie beginnt)</p>
                <p><strong>⏰ Zeit 2:</strong> P3 kommt an (grüne Linie) → P1 läuft noch → P3 muss auch warten (gestrichelte Linie)</p>
                <p><strong>⏰ Zeit 3:</strong> P4 kommt an (grüne Linie) → P1 läuft noch → P4 muss auch warten (gestrichelte Linie)</p>
                <p><strong>⏰ Zeit 8:</strong> P1 fertig → P2 aus Ready-Queue holen → P2 startet (gestrichelte Linie wird blau)</p>
                <p><strong>⏰ Zeit 12:</strong> P2 fertig → P3 aus Ready-Queue holen → P3 startet (gestrichelte Linie wird blau)</p>
                <p><strong>⏰ Zeit 21:</strong> P3 fertig → P4 aus Ready-Queue holen → P4 startet (gestrichelte Linie wird blau)</p>
                <p><strong>⏰ Zeit 26:</strong> P4 fertig → Alle Prozesse abgearbeitet</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 p-6 rounded-lg border border-rose-200">
          <h4 className="font-semibold text-rose-800 mb-4">🎯 Was passiert genau beim Warten und bei Ereignissen?</h4>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-rose-800 mb-3">🚩 Ereignis (Grüne Linie):</h5>
                <div className="space-y-2 text-sm text-rose-700">
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Was passiert:</strong> Prozess wird vom Betriebssystem "geboren"</p>
                    <p className="text-xs mt-1">→ Benutzer startet Programm, fork() wird aufgerufen, etc.</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>System-Aktion:</strong> PCB (Process Control Block) wird erstellt</p>
                    <p className="text-xs mt-1">→ PID vergeben, Speicher reservieren, in Ready-Queue einreihen</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Zustand:</strong> NEW → READY</p>
                    <p className="text-xs mt-1">→ Prozess ist bereit zur Ausführung, wartet auf CPU</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-rose-800 mb-3">⏳ Wartephase (Gestrichelte Linie):</h5>
                <div className="space-y-2 text-sm text-rose-700">
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Was passiert:</strong> Prozess steht in der Ready-Queue</p>
                    <p className="text-xs mt-1">→ Wie in einer Warteschlange im Supermarkt</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>System-Aktion:</strong> Scheduler prüft regelmäßig die Queue</p>
                    <p className="text-xs mt-1">→ "Wer ist als nächstes dran?" - je nach Algorithmus</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Zustand:</strong> READY (bereit, aber wartend)</p>
                    <p className="text-xs mt-1">→ Prozess kann sofort laufen, wenn CPU frei wird</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-rose-800 mb-3">🔵 Ausführungsphase (Blauer Block):</h5>
                <div className="space-y-2 text-sm text-rose-700">
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Was passiert:</strong> Prozess "besitzt" die CPU</p>
                    <p className="text-xs mt-1">→ Befehle werden nacheinander abgearbeitet</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>System-Aktion:</strong> Context-Switch wird durchgeführt</p>
                    <p className="text-xs mt-1">→ Register laden, MMU umschalten, Ausführung starten</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Zustand:</strong> RUNNING (laufend)</p>
                    <p className="text-xs mt-1">→ Nur EIN Prozess kann gleichzeitig RUNNING sein!</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-rose-800 mb-3">✅ Ende der Ausführung:</h5>
                <div className="space-y-2 text-sm text-rose-700">
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Was passiert:</strong> Prozess beendet sich (exit())</p>
                    <p className="text-xs mt-1">→ Alle Berechnungen abgeschlossen</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>System-Aktion:</strong> Ressourcen werden freigegeben</p>
                    <p className="text-xs mt-1">→ Speicher freigeben, PCB löschen, CPU für nächsten Prozess</p>
                  </div>
                  <div className="bg-white p-3 rounded border">
                    <p><strong>Zustand:</strong> TERMINATED (beendet)</p>
                    <p className="text-xs mt-1">→ Prozess existiert nicht mehr im System</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
          <h4 className="font-semibold text-amber-800 mb-4">🔄 Spezielle Situationen beim Scheduling</h4>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-amber-800 mb-2">🔄 Round Robin - Unterbrechung:</h5>
                <div className="text-sm text-amber-700 space-y-2">
                  <p><strong>Zeit-Interrupt:</strong> Timer läuft ab nach Quantum (z.B. 3 Zeiteinheiten)</p>
                  <p><strong>Was passiert:</strong> RUNNING → READY (zurück in Queue)</p>
                  <p><strong>Im Diagramm:</strong> Blauer Block wird unterbrochen → gestrichelte Linie → später wieder blau</p>
                  <p><strong>Context-Switch:</strong> Register sichern, nächsten Prozess laden</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium text-amber-800 mb-2">🛑 I/O-Ereignis (später im Kurs):</h5>
                <div className="text-sm text-amber-700 space-y-2">
                  <p><strong>I/O-Request:</strong> Prozess braucht Festplatte/Netzwerk</p>
                  <p><strong>Was passiert:</strong> RUNNING → BLOCKED (warten auf I/O)</p>
                  <p><strong>Im Diagramm:</strong> Würde andere gestrichelte Farbe haben</p>
                  <p><strong>I/O fertig:</strong> BLOCKED → READY → warten auf CPU</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h5 className="font-medium text-amber-800 mb-2">📊 Wartezeit-Berechnung Schritt für Schritt:</h5>
              <div className="text-sm text-amber-700">
                <p><strong>Beispiel P2:</strong> Ankunft bei Zeit 1, Ausführung startet bei Zeit 8</p>
                <p><strong>Wartezeit = Startzeit - Ankunftszeit = 8 - 1 = 7 Zeiteinheiten</strong></p>
                <p><strong>Im Diagramm:</strong> Gestrichelte Linie von Zeit 1 bis Zeit 8 = 7 Einheiten lang</p>
                <p className="mt-2 font-medium">💡 Die Länge der gestrichelten Linie = Wartezeit!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
          <h4 className="font-semibold text-emerald-800 mb-4">⚙️ Wie funktionieren die Scheduling-Algorithmen?</h4>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium text-emerald-800 mb-2">🔄 FCFS/FIFO Ablauf:</h5>
                <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                  <li>Prozesse kommen der Reihe nach an</li>
                  <li>Ready-Queue = Warteschlange (First In, First Out)</li>
                  <li>CPU wird dem ersten Prozess in der Queue gegeben</li>
                  <li>Prozess läuft bis zum Ende (non-preemptive)</li>
                  <li>Nächster Prozess aus Queue bekommt CPU</li>
                </ol>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium text-emerald-800 mb-2">⚡ SJF Ablauf:</h5>
                <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                  <li>Prozesse kommen an und werden in Ready-Queue eingereiht</li>
                  <li>CPU wird frei → Wähle kürzesten verfügbaren Job</li>
                  <li>Prozess läuft komplett durch (non-preemptive)</li>
                  <li>Wieder kürzesten verfügbaren Job wählen</li>
                  <li>Problem: Lange Jobs können "verhungern"</li>
                </ol>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium text-emerald-800 mb-2">🔄 Round Robin Ablauf:</h5>
                <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                  <li>Jeder Prozess bekommt Zeitscheibe (Quantum = 3)</li>
                  <li>Nach Quantum → Prozess wird unterbrochen (preemptive)</li>
                  <li>Prozess kommt ans Ende der Ready-Queue</li>
                  <li>Nächster Prozess aus Queue bekommt CPU</li>
                  <li>Zyklus wiederholt sich bis alle fertig</li>
                </ol>
              </div>
              
              <div className="bg-white p-4 rounded border">
                <h5 className="font-medium text-emerald-800 mb-2">🎯 Priority Ablauf:</h5>
                <ol className="text-sm text-emerald-700 space-y-1 list-decimal list-inside">
                  <li>Jeder Prozess hat Prioritätszahl (niedrig = hoch)</li>
                  <li>CPU wird frei → Wähle höchste verfügbare Priorität</li>
                  <li>Prozess läuft komplett durch (non-preemptive)</li>
                  <li>Niedrig-prioritäre Jobs können lange warten</li>
                  <li>Lösung: Aging (Priorität steigt mit Wartezeit)</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 p-6 rounded-lg border border-cyan-200">
          <h4 className="font-semibold text-cyan-800 mb-3">📊 Schritt-für-Schritt Berechnung</h4>
          <p className="text-cyan-700 mb-4">
            Verstehen Sie, wie die Berechnungen für jeden Algorithmus durchgeführt werden:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h5 className="font-medium text-cyan-800 mb-2">Formeln (klausurrelevant!):</h5>
              <div className="space-y-2 text-sm font-mono bg-white p-3 rounded border">
                <p><strong>Wartezeit:</strong> Startzeit - Ankunftszeit</p>
                <p><strong>Umlaufzeit:</strong> Endzeit - Ankunftszeit</p>
                <p><strong>Antwortzeit:</strong> Erste CPU-Zuteilung - Ankunftszeit</p>
                <p><strong>Ø Wartezeit:</strong> Summe(Wartezeiten) / Anzahl_Prozesse</p>
                <p><strong>Ø Umlaufzeit:</strong> Summe(Umlaufzeiten) / Anzahl_Prozesse</p>
              </div>
            </div>
            <div>
              <h5 className="font-medium text-cyan-800 mb-2">Vorgehen in der Klausur:</h5>
              <ol className="text-sm text-cyan-700 space-y-1">
                <li>1. Prozesse nach Algorithmus sortieren</li>
                <li>2. Timeline zeichnen mit gestrichelten Wartezeiten</li>
                <li>3. Start- und Endzeiten notieren</li>
                <li>4. Wartezeit und Umlaufzeit berechnen</li>
                <li>5. Durchschnittswerte berechnen</li>
                <li>6. Gantt-Diagramm zeichnen</li>
              </ol>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-4 rounded border">
            <h5 className="font-medium text-cyan-800 mb-2">⚠️ Häufige Klausur-Fehler vermeiden:</h5>
            <ul className="text-sm text-cyan-700 space-y-1">
              <li>• <strong>Gestrichelte Linien vergessen:</strong> Wartezeiten MÜSSEN sichtbar sein!</li>
              <li>• <strong>Ankunftszeiten ignorieren:</strong> Prozesse können nicht vor ihrer Ankunft starten</li>
              <li>• <strong>Falsche Prioritäten:</strong> Niedrige Zahl = Hohe Priorität</li>
              <li>• <strong>Round Robin Quantum:</strong> Exakt nach Zeitscheibe unterbrechen</li>
              <li>• <strong>Durchschnitt falsch:</strong> Summe durch Anzahl Prozesse, nicht durch Zeit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessScheduling;
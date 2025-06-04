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
    const queue = [...processes].sort((a, b) => a.arrival - b.arrival);
    const schedule = [];
    let currentTime = 0;
    let processQueue = [];
    let completed = [];
    
    // Simplified RR simulation
    queue.forEach(p => {
      const remainingTime = p.burst;
      const cycles = Math.ceil(remainingTime / quantum);
      
      for (let i = 0; i < cycles; i++) {
        const executeTime = Math.min(quantum, remainingTime - (i * quantum));
        schedule.push({
          ...p,
          startTime: currentTime,
          endTime: currentTime + executeTime,
          slice: i + 1,
          executeTime
        });
        currentTime += executeTime;
      }
    });
    
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

  const GanttChart = ({ data }) => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Gantt-Diagramm</h4>
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
      </div>
    </div>
  );
};

export default ProcessScheduling;
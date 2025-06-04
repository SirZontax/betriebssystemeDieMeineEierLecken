import React, { useState } from 'react';
import { Cpu, Zap, Database, AlertTriangle, Layers } from 'lucide-react';

const HardwareComponents: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState('processor');

  const processorFeatures = {
    singlecore: {
      name: 'Einkern-Prozessoren',
      stages: ['Befehl holen', 'Befehl decodieren', 'Befehl ausführen'],
      description: '3-stufige Pipeline für sequenzielle Befehlsverarbeitung',
      color: 'blue'
    },
    multicore: {
      name: 'Mehrkern-Prozessoren',
      description: 'Tatsächliche Parallelität durch mehrere physikalische Kerne',
      features: ['4-16 Kerne typisch', 'Isolierte Verarbeitung', 'Verschiedene Cache-Architekturen'],
      color: 'green'
    },
    hyperthreading: {
      name: 'Hyperthreading/Multithreading',
      description: 'Ein Prozessor verwaltet zwei Threads gleichzeitig',
      formula: 'Logische Prozessoren = Physikalische Kerne × Thread-Anzahl',
      example: 'Intel Core i7-4790: 4 physikalische Kerne → 8 logische Prozessoren',
      color: 'purple'
    }
  };

  const memoryHierarchy = [
    { level: 'CPU Register', size: '< 1 KB', speed: '< 1 ns', cost: 'Sehr hoch' },
    { level: 'L1 Cache', size: '32-64 KB', speed: '1-2 ns', cost: 'Hoch' },
    { level: 'L2 Cache', size: '256 KB - 1 MB', speed: '3-10 ns', cost: 'Hoch' },
    { level: 'L3 Cache', size: '8-32 MB', speed: '10-20 ns', cost: 'Mittel' },
    { level: 'Hauptspeicher (RAM)', size: '4-64 GB', speed: '50-100 ns', cost: 'Niedrig' },
    { level: 'SSD', size: '128 GB - 4 TB', speed: '0.1-1 ms', cost: 'Sehr niedrig' },
    { level: 'Festplatte', size: '500 GB - 10 TB', speed: '5-20 ms', cost: 'Sehr niedrig' }
  ];

  const walls = [
    {
      name: 'Frequency Wall',
      description: 'Erhöhung der Taktfrequenz geht mit Erhöhung der Betriebsspannung einher',
      problem: 'Überproportionaler Anstieg des Stromverbrauchs, sehr hohe Verlustleistung',
      color: 'red'
    },
    {
      name: 'Power Wall',
      description: 'Die durch Frequency Wall entstehende Wärme lässt sich nicht mit vertretbarem Aufwand abführen',
      problem: 'Thermische Grenzen der Prozessortechnologie',
      color: 'orange'
    },
    {
      name: 'Memory Wall',
      description: 'Wachsendes Ungleichgewicht zwischen CPU- und Speicher-Geschwindigkeit',
      problem: 'Limitierte Kommunikations-Bandbreite über Chipgrenzen (Bandwidth Wall)',
      color: 'yellow'
    }
  ];

  const ProcessorArchitecture = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(processorFeatures).map(([key, feature]) => (
          <div key={key} className={`border-l-4 border-${feature.color}-500 bg-${feature.color}-50 p-4 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{feature.name}</h4>
            <p className="text-sm text-gray-700 mb-3">{feature.description}</p>
            
            {feature.stages && (
              <div className="space-y-1">
                {feature.stages.map((stage, idx) => (
                  <div key={idx} className="text-xs bg-white px-2 py-1 rounded border">
                    {idx + 1}. {stage}
                  </div>
                ))}
              </div>
            )}
            
            {feature.features && (
              <ul className="text-xs text-gray-600 space-y-1">
                {feature.features.map((feat, idx) => (
                  <li key={idx}>• {feat}</li>
                ))}
              </ul>
            )}
            
            {feature.formula && (
              <div className="mt-3 p-2 bg-white rounded border">
                <p className="text-xs font-mono">{feature.formula}</p>
                {feature.example && (
                  <p className="text-xs text-gray-600 mt-1">{feature.example}</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2">AUSGESCHLOSSEN: Mehrkernchips Details</h4>
        <p className="text-red-700">
          Laut Klausureinschränkung: "keine mehrkernchips" - Details zu Multicore-Architekturen sind nicht relevant.
        </p>
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          FOKUS: Hyperthreading!
        </h4>
        <div className="text-yellow-700 space-y-2">
          <p><strong>Wichtig:</strong> Ein Prozessor verwaltet zwei Threads gleichzeitig</p>
          <p><strong>Formel:</strong> Logische Prozessoren = Physikalische Kerne × Thread-Anzahl</p>
          <p><strong>Beispiel:</strong> Intel Core i7-4790: 4 physikalische → 8 logische Prozessoren</p>
          <p><strong>Jeder Thread erscheint dem OS wie ein eigenständiger Prozessor!</strong></p>
        </div>
      </div>
    </div>
  );

  const MemoryHierarchyComponent = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Speicherhierarchie mit Performance-Daten</h4>
        <div className="space-y-2">
          {memoryHierarchy.map((level, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg border bg-gray-50">
              <div className="flex-1">
                <h5 className="font-medium">{level.level}</h5>
                <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-1">
                  <span>Größe: {level.size}</span>
                  <span>Geschwindigkeit: {level.speed}</span>
                  <span>Kosten: {level.cost}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Tradeoff-Prinzip</h4>
        <p className="text-blue-700">
          Schneller Zugriff ↔ Hoher Preis ↔ Kleiner Speicher
        </p>
        <p className="text-sm text-blue-600 mt-2">
          Die langsamste Hierarchiestufe bestimmt die Speicherzugriffszeit der CPU!
        </p>
      </div>
    </div>
  );

  const TechnicalWalls = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {walls.map((wall, index) => (
          <div key={index} className={`border-l-4 border-${wall.color}-500 bg-${wall.color}-50 p-4 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{wall.name}</h4>
            <p className="text-sm text-gray-700 mb-2">{wall.description}</p>
            <div className="text-xs text-gray-600 bg-white p-2 rounded border">
              <strong>Problem:</strong> {wall.problem}
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2">Auswirkungen auf Betriebssysteme</h4>
        <ul className="text-red-700 space-y-2 text-sm">
          <li>• <strong>Frequency Wall:</strong> Übergang zu Mehrkern-Prozessoren statt höherer Taktfrequenzen</li>
          <li>• <strong>Memory Wall:</strong> Notwendigkeit effizienter Speicherverwaltung und Caching-Strategien</li>
          <li>• <strong>Lösung:</strong> Parallelisierung durch Multiprogrammierung und Multithreading</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Cpu className="h-8 w-8 text-blue-600 mr-3" />
          Hardware-Komponenten
        </h2>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'processor', label: 'Prozessor-Architekturen', icon: Cpu },
            { id: 'memory', label: 'Speicherhierarchie', icon: Database },
            { id: 'walls', label: 'Technische Grenzen', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedComponent(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedComponent === tab.id
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
        {selectedComponent === 'processor' && <ProcessorArchitecture />}
        {selectedComponent === 'memory' && <MemoryHierarchyComponent />}
        {selectedComponent === 'walls' && <TechnicalWalls />}

        {/* Key Takeaways */}
        <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-2 flex items-center">
            <Layers className="h-5 w-5 mr-2" />
            Klausur-Kernpunkte (F.28 Hardware-Komponenten)
          </h4>
          <ul className="text-green-700 space-y-1 text-sm">
            <li>• <strong>Hyperthreading:</strong> Logische vs. physikalische Prozessoren verstehen</li>
            <li>• <strong>Speicherhierarchie:</strong> Tradeoff zwischen Geschwindigkeit, Größe, Kosten</li>
            <li>• <strong>Technical Walls:</strong> Frequency Wall, Power Wall, Memory Wall</li>
            <li>• <strong>Pipeline:</strong> 3-stufige Pipeline (Holen, Decodieren, Ausführen)</li>
            <li>• <strong>Keine Details:</strong> Mehrkernchips-Architekturen ausgeschlossen</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HardwareComponents;
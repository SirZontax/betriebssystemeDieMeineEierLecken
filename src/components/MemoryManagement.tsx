import React, { useState } from 'react';
import { HardDrive, Layers, Zap, AlertTriangle, Database, Settings } from 'lucide-react';

const MemoryManagement: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('hierarchy');

  const memoryPrinciples = [
    {
      principle: 'Direkt adressierter Speicher',
      description: 'Über eine Adresse wird die gewünschte Speicherstelle direkt angesprochen',
      features: ['Wahlfreier Speicher', 'Einfach zu verwalten', 'Keine MMU nötig'],
      application: 'Hauptspeicheradressierung',
      color: 'blue'
    },
    {
      principle: 'FIFO-Speicher',
      description: 'Arbeitet nach dem Senioritätsprinzip: Längste Daten werden zuerst ausgelesen',
      features: ['First In, First Out', 'Zwischenpufferung', 'Queue-Verhalten'],
      application: 'Datenpufferung zwischen Komponenten',
      color: 'green'
    },
    {
      principle: 'Stapelspeicher (Stack)',
      description: 'Arbeitet nach dem LIFO-Prinzip: Zuletzt gespeicherte Daten werden als erstes ausgelesen',
      features: ['Last In, First Out', 'Push/Pop Operationen', 'Stackpointer'],
      application: 'Funktionsaufrufe, lokale Variablen',
      color: 'purple'
    },
    {
      principle: 'Assoziativspeicher (CAM)',
      description: 'Inhaltsadressierter Speicher: Mit Teilinformation wird gesamter Eintrag abgefragt',
      features: ['Content Addressable Memory', 'Muster & Masken', 'Mehrfachtreffer möglich'],
      application: 'Cache-Hardware, Adresstransformation',
      color: 'orange'
    }
  ];

  const realMemoryTechniques = [
    {
      technique: 'Partitionen fester Größe',
      description: 'Speicher wird in feste Bereiche unterteilt',
      approaches: ['Verteilte Warteschlange (1:1)', 'Zentrale Warteschlange (n:1)'],
      advantages: ['Einfache Verwaltung', 'Vorhersagbare Größen'],
      disadvantages: ['Interne Fragmentierung', 'Wenig flexibel'],
      color: 'blue'
    },
    {
      technique: 'Partitionen variabler Größe',
      description: 'Partitionsgrößen entsprechend der Bedürfnisse',
      approaches: ['Best Fit', 'First Fit', 'Worst Fit'],
      advantages: ['Flexible Größen', 'Bessere Speichernutzung'],
      disadvantages: ['Externe Fragmentierung', 'Kompaktierung nötig'],
      color: 'green'
    },
    {
      technique: 'Overlay-Technik',
      description: 'Nur aktuell benötigte Programmteile werden geladen',
      approaches: ['Manuelle Overlay-Definition', 'Automatische Verwaltung'],
      advantages: ['Große Programme möglich', 'Geringer Speicherbedarf'],
      disadvantages: ['Komplex zu programmieren', 'Langsam'],
      color: 'yellow'
    },
    {
      technique: 'Swapping',
      description: 'Prozesse werden zwischen Haupt- und Sekundärspeicher verschoben',
      approaches: ['Feste Partitionen + Swapping', 'Variable Partitionen + Swapping'],
      advantages: ['Mehr Prozesse als Speicher', 'Flexibel'],
      disadvantages: ['I/O-Overhead', 'Swap-Area Management'],
      color: 'red'
    }
  ];

  const memoryHierarchy = [
    { level: 'CPU Register', size: '< 1 KB', speed: '< 1 ns', cost: 'Sehr hoch', color: 'red' },
    { level: 'L1 Cache', size: '32-64 KB', speed: '1-2 ns', cost: 'Hoch', color: 'orange' },
    { level: 'L2 Cache', size: '256 KB - 1 MB', speed: '3-10 ns', cost: 'Hoch', color: 'yellow' },
    { level: 'L3 Cache', size: '8-32 MB', speed: '10-20 ns', cost: 'Mittel', color: 'green' },
    { level: 'Hauptspeicher (RAM)', size: '4-64 GB', speed: '50-100 ns', cost: 'Niedrig', color: 'blue' },
    { level: 'SSD', size: '128 GB - 4 TB', speed: '0.1-1 ms', cost: 'Sehr niedrig', color: 'purple' },
    { level: 'Festplatte', size: '500 GB - 10 TB', speed: '5-20 ms', cost: 'Sehr niedrig', color: 'gray' }
  ];

  const localityPrinciples = [
    {
      type: 'Räumliche Lokalität',
      description: 'Wenn auf eine Speicherstelle zugegriffen wird, ist die Wahrscheinlichkeit hoch, dass bald auf benachbarte Stellen zugegriffen wird.',
      example: 'Array-Durchlauf: for(int i=0; i<n; i++) array[i]...',
      color: 'blue'
    },
    {
      type: 'Zeitliche Lokalität',
      description: 'Wenn auf eine Speicherstelle zugegriffen wird, ist die Wahrscheinlichkeit hoch, dass bald wieder darauf zugegriffen wird.',
      example: 'Schleifenvariablen, häufig aufgerufene Funktionen',
      color: 'green'
    }
  ];

  const addressingModes = [
    {
      mode: 'Reelle Adressierung',
      description: 'Physikalische Adressen werden direkt verwendet',
      advantages: ['Einfach', 'Schnell', 'Direkter Zugriff'],
      disadvantages: ['Keine Isolation', 'Sicherheitsprobleme', 'Schwierige Verwaltung'],
      color: 'red'
    },
    {
      mode: 'Virtuelle Adressierung',
      description: 'Logische Adressen werden auf physikalische abgebildet',
      advantages: ['Prozess-Isolation', 'Mehr Flexibilität', 'Sicherheit'],
      disadvantages: ['Overhead durch Übersetzung', 'Komplexer'],
      color: 'green'
    }
  ];

  const MemoryHierarchyVisualizer = () => (
    <div className="bg-white p-6 rounded-lg border">
      <h4 className="font-semibold mb-4">Speicherhierarchie</h4>
      <div className="space-y-2">
        {memoryHierarchy.map((level, index) => (
          <div
            key={index}
            className="flex items-center p-3 rounded-lg border"
            style={{ backgroundColor: `var(--${level.color}-50)` }}
          >
            <div className="flex-1">
              <h5 className="font-medium">{level.level}</h5>
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mt-1">
                <span>Größe: {level.size}</span>
                <span>Geschwindigkeit: {level.speed}</span>
                <span>Kosten: {level.cost}</span>
              </div>
            </div>
            <div className="w-8 h-8 flex items-center justify-center">
              <div 
                className={`w-${8-index} h-6 bg-${level.color}-400 rounded`}
                style={{ width: `${(8-index) * 4}px` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-gray-50 rounded">
        <h5 className="font-medium mb-2">Tradeoff-Prinzip:</h5>
        <p className="text-sm text-gray-600">
          Schneller Zugriff ↔ Hoher Preis ↔ Kleiner Speicher
        </p>
      </div>
    </div>
  );

  const LocalityVisualizer = () => (
    <div className="space-y-6">
      {localityPrinciples.map((principle, index) => (
        <div key={index} className={`border-l-4 border-${principle.color}-500 bg-${principle.color}-50 p-6 rounded-r-lg`}>
          <h4 className="font-semibold text-gray-900 mb-2">{principle.type}</h4>
          <p className="text-gray-700 mb-3">{principle.description}</p>
          <div className="bg-white p-3 rounded border">
            <h5 className="font-medium text-sm mb-1">Beispiel:</h5>
            <code className="text-sm text-gray-800 font-mono">{principle.example}</code>
          </div>
        </div>
      ))}
      
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Warum ist Caching wichtig?
        </h4>
        <p className="text-yellow-700">
          Das Lokalitätsprinzip macht Caching effektiv! Ohne Lokalität wären Caches nutzlos,
          da ständig neue Daten geladen werden müssten.
        </p>
      </div>
    </div>
  );

  const AddressingComparison = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addressingModes.map((mode, index) => (
          <div key={index} className={`border-l-4 border-${mode.color}-500 bg-${mode.color}-50 p-6 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{mode.mode}</h4>
            <p className="text-gray-700 mb-4">{mode.description}</p>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-green-700 mb-1">Vorteile:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {mode.advantages.map((adv, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 mb-1">Nachteile:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {mode.disadvantages.map((dis, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">Klausur-Fokus: Virtuelle Speicherverwaltung</h4>
        <p className="text-blue-700 mb-2">Wichtige Konzepte:</p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Memory Management Unit (MMU)</li>
          <li>• Page Tables (Seitentabellen)</li>
          <li>• Translation Lookaside Buffer (TLB)</li>
          <li>• Segmentierung vs. Paging</li>
        </ul>
      </div>
    </div>
  );

  const MemoryPrinciplesComponent = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Sechs grundlegende Speicherprinzipien</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memoryPrinciples.map((principle, index) => (
          <div key={index} className={`border-l-4 border-${principle.color}-500 bg-${principle.color}-50 p-6 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{principle.principle}</h4>
            <p className="text-sm text-gray-700 mb-3">{principle.description}</p>
            
            <div className="space-y-2">
              <div>
                <h5 className="font-medium text-gray-800 mb-1">Merkmale:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {principle.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white p-2 rounded border">
                <h5 className="font-medium text-gray-800 text-xs mb-1">Anwendung:</h5>
                <p className="text-xs text-gray-600">{principle.application}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">Assoziativspeicher (CAM) - Details</h4>
        <div className="text-sm text-yellow-700 space-y-2">
          <p><strong>Funktionsweise:</strong> (Muster & Maske) == (Maske & Wort)</p>
          <p><strong>Anwendungen:</strong> Cache-Hardware, Adresstransformation, Datenbankabfragen</p>
          <p><strong>Nachteile:</strong> Mehrfachtreffer, aufwendige Hardware, problematische Verwaltung freier Plätze</p>
        </div>
      </div>
    </div>
  );

  const RealMemoryTechniques = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">Reale Speicherverwaltung</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {realMemoryTechniques.map((technique, index) => (
          <div key={index} className={`border-l-4 border-${technique.color}-500 bg-${technique.color}-50 p-6 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{technique.technique}</h4>
            <p className="text-sm text-gray-700 mb-3">{technique.description}</p>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-gray-800 mb-1">Ansätze:</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  {technique.approaches.map((approach, idx) => (
                    <li key={idx}>• {approach}</li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <h5 className="font-medium text-green-700 text-xs mb-1">Vorteile:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {technique.advantages.map((adv, idx) => (
                      <li key={idx}>+ {adv}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-700 text-xs mb-1">Nachteile:</h5>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {technique.disadvantages.map((dis, idx) => (
                      <li key={idx}>- {dis}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h4 className="font-semibold text-red-800 mb-2">Speicherverdichtung / Kompaktierung</h4>
        <div className="text-sm text-red-700 space-y-2">
          <p><strong>Problem:</strong> Externe Fragmentierung - viele kleine, nicht verwendbare Lücken</p>
          <p><strong>Lösung:</strong> Verschiebung der Programme im Speicher, sodass sie lückenlos hintereinander liegen</p>
          <p><strong>Nachteil:</strong> Hoher Aufwand durch Relokationen, zeitaufwendig</p>
        </div>
      </div>
    </div>
  );

  const CacheCoherency = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">Cache-Kohärenz</h4>
        <p className="text-gray-700 mb-4">
          Bei Multicore-Systemen müssen die verschiedenen Caches konsistent gehalten werden.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded border border-red-200">
            <h5 className="font-medium text-red-800">Problem</h5>
            <p className="text-sm text-red-700 mt-1">
              Unterschiedliche Werte derselben Speicherstelle in verschiedenen Caches
            </p>
          </div>
          
          <div className="p-4 bg-yellow-50 rounded border border-yellow-200">
            <h5 className="font-medium text-yellow-800">Protokolle</h5>
            <p className="text-sm text-yellow-700 mt-1">
              MESI, MOESI - Zustände: Modified, Exclusive, Shared, Invalid
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded border border-green-200">
            <h5 className="font-medium text-green-800">Lösung</h5>
            <p className="text-sm text-green-700 mt-1">
              Automatische Synchronisation zwischen Caches durch Hardware
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <HardDrive className="h-8 w-8 text-blue-600 mr-3" />
          Speicherverwaltung
        </h2>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'hierarchy', label: 'Speicherhierarchie', icon: Layers },
            { id: 'locality', label: 'Lokalitätsprinzip', icon: Zap },
            { id: 'addressing', label: 'Adressierung', icon: HardDrive },
            { id: 'principles', label: 'Speicherprinzipien', icon: Settings },
            { id: 'real-memory', label: 'Realer Speicher', icon: Database },
            { id: 'coherency', label: 'Cache-Kohärenz', icon: AlertTriangle }
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
        {selectedTopic === 'hierarchy' && <MemoryHierarchyVisualizer />}
        {selectedTopic === 'locality' && <LocalityVisualizer />}
        {selectedTopic === 'addressing' && <AddressingComparison />}
        {selectedTopic === 'principles' && <MemoryPrinciplesComponent />}
        {selectedTopic === 'real-memory' && <RealMemoryTechniques />}
        {selectedTopic === 'coherency' && <CacheCoherency />}

        {/* Virtual Memory Section */}
        <div className="mt-8 space-y-6">
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Virtuelle Speicherverwaltung (FOKUS!)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-700 mb-2">Paging-Konzept:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Adressraum in gleich große Seiten (Pages) unterteilt</li>
                  <li>• Physischer Speicher in Rahmen (Frames) unterteilt</li>
                  <li>• Seitentabelle (Page Table) mappt Pages auf Frames</li>
                  <li>• Translation Lookaside Buffer (TLB) für schnelle Übersetzung</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-700 mb-2">Paging-Algorithmen:</h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• FIFO (First In, First Out)</li>
                  <li>• LRU (Least Recently Used)</li>
                  <li>• Clock/Second Chance</li>
                  <li>• Working Set</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">Swapping & Overlay (Relevant bis zum Ende!)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Swapping:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Prozesse zwischen Haupt- und Sekundärspeicher verschieben</li>
                  <li>• Swap Area auf Festplatte reserviert</li>
                  <li>• Ermöglicht mehr Prozesse als physischer Speicher</li>
                  <li>• I/O-Overhead beim Ein-/Auslagern</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-purple-700 mb-2">Overlay-Technik:</h5>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Nur aktuell benötigte Programmteile laden</li>
                  <li>• Overlay-Manager verwaltet Programmteile</li>
                  <li>• Historisch wichtig bei kleinem Hauptspeicher</li>
                  <li>• Heute in modifizierter Form: Dynamic Loading</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Memory Wall
            </h4>
            <p className="text-orange-700 mb-3">
              Das wachsende Ungleichgewicht zwischen CPU- und Speicher-Geschwindigkeit. 
              Grund: Limitierte Bandbreite über Chipgrenzen hinweg (Bandwidth Wall).
              Bei Von-Neumann-Architektur verschärft, da Daten und Befehle sich den Bus teilen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Ursachen:</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• CPU-Geschwindigkeit steigt exponentiell</li>
                  <li>• Speicher-Latenz verbessert sich nur linear</li>
                  <li>• Bus-Bandbreite ist physikalisch limitiert</li>
                  <li>• Pin-Count-Beschränkungen bei Chips</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-800 mb-2">Lösungsansätze:</h5>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Mehrstufige Cache-Hierarchien</li>
                  <li>• Prefetching und Prediction</li>
                  <li>• Parallelisierung (Multicore)</li>
                  <li>• Harvard-Architektur (getrennte Busse)</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 p-6 rounded-lg border border-teal-200">
            <h4 className="font-semibold text-teal-800 mb-3">Page Replacement Algorithmen (Klausurrelevant!)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-teal-800 mb-2">FIFO (First-In-First-Out):</h5>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Älteste Seite wird ersetzt</li>
                  <li>• Einfach zu implementieren</li>
                  <li>• Kann zu Belady's Anomaly führen</li>
                  <li>• Mehr Frames → mehr Page Faults möglich</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-teal-800 mb-2">LRU (Least Recently Used):</h5>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Am längsten unbenutzte Seite wird ersetzt</li>
                  <li>• Näherung an optimalen Algorithmus</li>
                  <li>• Aufwändiger zu implementieren</li>
                  <li>• Kein Belady's Anomaly</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-teal-800 mb-2">Optimal (OPT):</h5>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Ersetzt Seite, die am längsten nicht gebraucht wird</li>
                  <li>• Theoretisch optimal</li>
                  <li>• Praktisch nicht umsetzbar (Zukunft unbekannt)</li>
                  <li>• Vergleichsstandard für andere Algorithmen</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-teal-800 mb-2">Clock/Second Chance:</h5>
                <ul className="text-sm text-teal-700 space-y-1">
                  <li>• Approximation von LRU mit Reference Bit</li>
                  <li>• Zirkulare Liste mit Zeiger</li>
                  <li>• Prakt. implementierbar</li>
                  <li>• Guter Kompromiss Performance/Aufwand</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryManagement;
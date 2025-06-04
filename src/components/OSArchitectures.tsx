import React, { useState } from 'react';
import { Database, Layers, Shield, AlertTriangle } from 'lucide-react';

const OSArchitectures: React.FC = () => {
  const [selectedArchitecture, setSelectedArchitecture] = useState('monolithic');

  const architectures = {
    monolithic: {
      name: 'Monolithischer Kernel',
      description: 'Alle Betriebssystemdienste laufen im Kernel-Modus',
      advantages: [
        'Hohe Performance durch direkte Aufrufe',
        'Effizienter Zugriff auf Hardware',
        'Weniger Kontext-Switches',
        'Einfache Kommunikation zwischen Komponenten'
      ],
      disadvantages: [
        'Fehler können gesamtes System zum Absturz bringen',
        'Schwierige Wartung und Erweiterung',
        'Sicherheitsrisiken',
        'Große, komplexe Codebasis'
      ],
      examples: ['Linux', 'Windows (teilweise)', 'FreeBSD'],
      color: 'blue',
      focus: true
    },
    microkernel: {
      name: 'Mikrokernel',
      description: 'Minimaler Kernel, Services laufen im User-Space',
      advantages: [
        'Hohe Stabilität (Fehler-Isolation)',
        'Bessere Sicherheit',
        'Modularer Aufbau',
        'Einfachere Wartung'
      ],
      disadvantages: [
        'Performance-Overhead durch IPC',
        'Komplexe Kommunikation',
        'Mehr Kontext-Switches',
        'Schwierigere Entwicklung'
      ],
      examples: ['MINIX', 'QNX', 'L4'],
      color: 'green',
      focus: true
    },
    hybrid: {
      name: 'Hybrid-Kernel',
      description: 'Kombination aus Monolitisch und Mikrokernel',
      advantages: [
        'Balance zwischen Performance und Stabilität',
        'Flexibilität in der Architektur',
        'Kritische Services im Kernel'
      ],
      disadvantages: [
        'Komplexität',
        'Kompromiss-Lösung',
        'Architektur-Entscheidungen schwierig'
      ],
      examples: ['Windows NT', 'macOS', 'BeOS'],
      color: 'purple',
      focus: false
    }
  };

  const osTypes = [
    {
      type: 'Großrechner-Betriebssysteme',
      characteristics: [
        'Sehr hohe Ein- und Ausgabeleistung',
        '> 1.000 Festplatten, > 1.000.000 GB Daten',
        '3 Arten: Stapel-, Dialog-, Timesharing-Verarbeitung',
        'Hohe Kapazität an Ressourcen'
      ],
      examples: ['OS/360', 'OS/390', 'IBM z/OS', 'Linux (Mainframe)'],
      color: 'red',
      focus: true
    },
    {
      type: 'Server-Betriebssysteme',
      characteristics: [
        'Gleichzeitige Abarbeitung vieler Benutzeranfragen',
        'Verteilung von Hard-/Software-Ressourcen über Netzwerk',
        'Anwendungen: Druck-, Datei-, Webserver',
        'Hohe Stabilität und Verfügbarkeit'
      ],
      examples: ['Solaris', 'FreeBSD', 'Linux', 'Windows Server 20xx'],
      color: 'blue',
      focus: true
    },
    {
      type: 'Multiprozessor-Betriebssysteme',
      characteristics: [
        'Mehrere Hardware-Prozessoren zu einem System',
        'Besondere Anforderungen: Kommunikation, Konsistenz',
        'Komplexe Speicherverwaltung',
        'Prozess-/Prozessor-Kommunikation'
      ],
      examples: ['Windows', 'Linux', 'Solaris'],
      color: 'purple',
      focus: true
    },
    {
      type: 'PC-Betriebssysteme',
      characteristics: [
        'Universelle Gruppe privater/geschäftlicher Anwender',
        'Umfangreiches Tooling (Browser, Office, Media Player)',
        'Robust und fehlertolerant in Bedienung',
        'Multiprogrammiersysteme (parallele Apps)'
      ],
      examples: ['Windows', 'Linux', 'MacOS'],
      color: 'green',
      focus: false
    },
    {
      type: 'Mobile Betriebssysteme',
      characteristics: [
        'Kleinere, mobile, leistungsfähige Hardware',
        'Vielzahl kleiner Apps von Drittanbietern',
        'Energieeffizienz, Touch-Unterstützung',
        'Apps können jederzeit unterbrochen werden'
      ],
      examples: ['Android', 'iOS'],
      color: 'indigo',
      focus: true
    },
    {
      type: 'Embedded-Betriebssysteme',
      characteristics: [
        'Rechensysteme, die Geräte steuern (nicht als Computer wahrgenommen)',
        'Benutzer können keine eigene Software installieren',
        'Vorinstallierte Applikationen im ROM',
        'Beispiele: Mikrowellen, TVs, Autos, MP3-Player'
      ],
      examples: ['Embedded Linux', 'QNX', 'VxWorks', 'Windows IoT'],
      color: 'orange',
      focus: true
    },
    {
      type: 'Sensorknoten-Betriebssysteme',
      characteristics: [
        'Netzwerke winziger Sensorknoten',
        'Anwendungen: Gebäudeschutz, Grenzüberwachung, Wettersensoren',
        'Ereignisorientiert oder periodische Messungen',
        'Datenübertragung via Netzwerk'
      ],
      examples: ['TinyOS'],
      color: 'teal',
      focus: false
    },
    {
      type: 'Echtzeit-Betriebssysteme (RTOS)',
      characteristics: [
        'Erfüllung zeitkritischer Aufgaben',
        'Reaktionszeit wichtiger als Durchsatz',
        'Weiche Echtzeit: Deadlines tolerierbar (Audio/Video)',
        'Harte Echtzeit: Deadlines nicht tolerierbar (Medizin, Airbag)'
      ],
      examples: ['eCos', 'FreeRTOS', 'VxWorks (Luft-/Raumfahrt)'],
      color: 'red',
      focus: true
    },
    {
      type: 'Smartcard-Betriebssysteme',
      characteristics: [
        'Laufen auf Smartcards (Kreditkartengröße)',
        'Eigener Prozessor auf der Karte',
        'Anwendungen: Bezahlvorgänge, Authentifizierung',
        'Minimale Rechenleistung und Speicherkapazität'
      ],
      examples: ['BasicCard', 'CardOS', 'Java Card', 'Proprietäre Systeme'],
      color: 'gray',
      focus: false
    }
  ];

  const ArchitectureVisualizer = ({ arch }) => (
    <div className="bg-white p-6 rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-lg">{arch.name}</h4>
        {arch.focus && (
          <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
            FOKUS!
          </span>
        )}
      </div>
      
      <p className="text-gray-700 mb-6">{arch.description}</p>
      
      {/* Simplified architecture diagram */}
      <div className="mb-6">
        {arch.name === 'Monolithischer Kernel' && (
          <div className="space-y-2">
            <div className="bg-gray-100 p-2 text-center rounded">User Applications</div>
            <div className="bg-blue-100 p-4 text-center rounded border-2 border-blue-300">
              <div className="font-medium mb-2">Kernel Space</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-blue-200 p-1 rounded">Process Mgmt</div>
                <div className="bg-blue-200 p-1 rounded">Memory Mgmt</div>
                <div className="bg-blue-200 p-1 rounded">File System</div>
                <div className="bg-blue-200 p-1 rounded">Device Drivers</div>
              </div>
            </div>
            <div className="bg-gray-300 p-2 text-center rounded">Hardware</div>
          </div>
        )}
        
        {arch.name === 'Mikrokernel' && (
          <div className="space-y-2">
            <div className="bg-gray-100 p-2 text-center rounded">User Applications</div>
            <div className="bg-green-100 p-2 text-center rounded border border-green-300">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-green-200 p-1 rounded">File Server</div>
                <div className="bg-green-200 p-1 rounded">Device Drivers</div>
                <div className="bg-green-200 p-1 rounded">Process Server</div>
                <div className="bg-green-200 p-1 rounded">Memory Server</div>
              </div>
            </div>
            <div className="bg-green-300 p-2 text-center rounded border-2 border-green-400">
              <div className="font-medium">Mikrokernel</div>
              <div className="text-sm">IPC • Scheduling • Basic Memory</div>
            </div>
            <div className="bg-gray-300 p-2 text-center rounded">Hardware</div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-medium text-green-700 mb-2">Vorteile:</h5>
          <ul className="space-y-1">
            {arch.advantages.map((adv, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                {adv}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-red-700 mb-2">Nachteile:</h5>
          <ul className="space-y-1">
            {arch.disadvantages.map((dis, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                {dis}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded">
        <h5 className="font-medium text-gray-800 mb-1">Beispiele:</h5>
        <p className="text-sm text-gray-600">{arch.examples.join(', ')}</p>
      </div>
    </div>
  );

  const OSTypesOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {osTypes.map((type, index) => (
          <div key={index} className={`border-l-4 border-${type.color}-500 bg-${type.color}-50 p-4 rounded-r-lg relative`}>
            {type.focus && (
              <span className="absolute top-2 right-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                FOKUS!
              </span>
            )}
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">{type.type}</h4>
            
            <div className="mb-3">
              <h5 className="font-medium text-gray-800 mb-2 text-xs">Charakteristika:</h5>
              <ul className="space-y-1">
                {type.characteristics.map((char, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-start">
                    <div className="w-1 h-1 bg-gray-400 rounded-full mr-1 mt-1.5 flex-shrink-0"></div>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-medium text-gray-800 mb-1 text-xs">Beispiele:</h5>
              <p className="text-xs text-gray-600">{type.examples.join(', ')}</p>
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
          <Database className="h-8 w-8 text-blue-600 mr-3" />
          Betriebssystem-Architekturen
        </h2>

        {/* Architecture Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Kernel-Architekturen</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(architectures).map(([key, arch]) => (
              <button
                key={key}
                onClick={() => setSelectedArchitecture(key)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedArchitecture === key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {arch.name}
                {arch.focus && (
                  <span className="ml-2 bg-red-200 text-red-800 text-xs px-1 py-0.5 rounded">
                    !
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <ArchitectureVisualizer arch={architectures[selectedArchitecture]} />
        </div>

        {/* OS Types */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Betriebssystemarten</h3>
          <OSTypesOverview />
        </div>

        {/* Important Notes */}
        <div className="space-y-4">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Klausur-Fokus
            </h4>
            <div className="text-yellow-700 space-y-2">
              <p>• Monolithischer Kernel vs. Mikrokernel: Vor- und Nachteile erläutern können</p>
              <p>• Mindestens 5-6 Betriebssystemarten mit Charakteristika und Beispielen beschreiben</p>
              <p>• Unterschiede zwischen Großrechner-, Server-, Mobile-, Embedded-, Echtzeit-BS erklären</p>
              <p>• Architektur-Diagramme zeichnen und erklären können</p>
            </div>
          </div>
          
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">AUSGESCHLOSSEN aus der Klausur</h4>
            <div className="text-red-700 space-y-2">
              <p><strong>Nicht relevant:</strong> macOS und Android Architekturen können raus</p>
              <p><strong>Nicht relevant:</strong> F.59-63 (spezifische Implementierungen)</p>
              <p><strong>FOKUS:</strong> F.57, F.64!, F.65! - Grundlegende Vor- und Nachteile</p>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">Klausur-Fokus: Betriebssystemarten</h4>
            <p className="text-green-700">
              "Zwei bis drei Betriebssystemarten erläutern können" - 
              Konzentrieren Sie sich auf die markierten Fokus-Arten mit ihren spezifischen Charakteristika.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSArchitectures;
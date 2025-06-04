import React, { useState } from 'react';
import { Lightbulb, Cpu, Settings, Shield, Users, Monitor, Database } from 'lucide-react';

const OSIntroduction: React.FC = () => {
  const [activeDefinition, setActiveDefinition] = useState('');

  const osDefinitions = [
    {
      id: 'din',
      title: 'DIN 44300',
      content: 'Die Programme eines digitalen Rechensystems, die zusammen mit den Eigenschaften dieser Rechenanlage die Basis der möglichen Betriebsarten des digitalen Rechensystems bilden.',
      color: 'blue'
    },
    {
      id: 'tanenbaum',
      title: 'Tanenbaum & Bos',
      content: 'Software, die im Kernmodus läuft und Anwendungsprogrammen saubere Abstraktionen anstelle der unschönen Hardware zur Verfügung stellt.',
      color: 'green'
    },
    {
      id: 'course',
      title: 'Kursdefinition',
      content: 'Software zur Überwachung und Steuerung der Hardwareressourcen eines Rechners, sowie zur Abstraktion von Komplexität.',
      color: 'purple'
    }
  ];

  const osViews = [
    {
      title: 'Erweiterte Maschine',
      description: 'Top-down-Sicht: Abstraktion von Hardware',
      icon: Monitor,
      details: [
        'Vereinfachung komplexer Hardware',
        'Bereitstellung einfacher Schnittstellen',
        'Mehrere Abstraktionsschichten möglich'
      ]
    },
    {
      title: 'Ressourcenverwalter',
      description: 'Bottom-up-Sicht: Verwaltung aller Systembestandteile',
      icon: Settings,
      details: [
        'Kontrolle über Hardware-Ressourcen',
        'Geordnete Zuteilung bei konkurrierenden Zugriffen',
        'Einsatz von Multiplexing (zeitlich/räumlich)'
      ]
    }
  ];

  const operationModes = [
    {
      mode: 'Kernel-Modus',
      description: 'Exklusiv für Betriebssystem',
      features: [
        'Vollständiger Hardware-Zugriff',
        'Alle Maschinenbefehle verfügbar',
        'Auch Supervisormodus genannt'
      ],
      color: 'red'
    },
    {
      mode: 'Benutzermodus',
      description: 'Für Benutzerprogramme',
      features: [
        'Eingeschränkter Hardware-Zugriff',
        'Nur Teilmenge des Befehlssatzes',
        'Keine I/O-Operationen'
      ],
      color: 'blue'
    }
  ];

  const osTasks = [
    { 
      title: 'Abstraktion', 
      icon: Shield, 
      description: 'Vereinfachung der Hardware-Ansteuerung',
      details: 'Bereitstellung einfacher APIs, Maschinenbegriff nach Coy'
    },
    { 
      title: 'Prozessverwaltung', 
      icon: Cpu, 
      description: 'Verwaltung laufender Programme',
      details: 'Scheduling, Erzeugung/Beendigung, Kommunikation/Synchronisation'
    },
    { 
      title: 'Speicherverwaltung', 
      icon: Settings, 
      description: 'Effiziente Speichernutzung',
      details: 'Adressräume, Speicherzugriffs-Sicherheit, Abstraktion der Hierarchie'
    },
    { 
      title: 'Dateisystemverwaltung', 
      icon: Database, 
      description: 'Verwaltung persistenter Daten',
      details: 'CRUD-Operationen, Caching, Zugriffssicherheit, RAID-Verwaltung'
    },
    { 
      title: 'Sicherheit & Rechteverwaltung', 
      icon: Shield, 
      description: 'Authentifizierung und Autorisierung',
      details: 'Ressourcenzugriff, Kryptografie, Malware-Schutz, Backup & Recovery'
    },
    { 
      title: 'Benutzerschnittstelle', 
      icon: Users, 
      description: 'Kommandozeile oder GUI',
      details: 'Shell, Geräteverwaltung, Konfiguration, Programm-Ausführung'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="section-card">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <Lightbulb className="h-8 w-8 text-yellow-500 mr-3" />
          Betriebssystem-Grundlagen
        </h2>
        
        {/* Definitionen */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Was ist ein Betriebssystem?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {osDefinitions.map((def) => (
              <div
                key={def.id}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  activeDefinition === def.id
                    ? `border-${def.color}-500 bg-${def.color}-50`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setActiveDefinition(activeDefinition === def.id ? '' : def.id)}
              >
                <h4 className="font-medium text-gray-900">{def.title}</h4>
                {activeDefinition === def.id && (
                  <p className="mt-2 text-sm text-gray-600">{def.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Zwei Sichten */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Zwei Sichten auf Betriebssysteme</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {osViews.map((view, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <view.icon className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-900">{view.title}</h4>
                </div>
                <p className="text-gray-600 mb-3">{view.description}</p>
                <ul className="space-y-1">
                  {view.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Operationsmodi */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Operationsmodi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {operationModes.map((mode, index) => (
              <div key={index} className={`border-l-4 border-${mode.color}-500 bg-${mode.color}-50 p-4 rounded-r-lg`}>
                <h4 className="font-semibold text-gray-900 mb-2">{mode.mode}</h4>
                <p className="text-gray-600 mb-3">{mode.description}</p>
                <ul className="space-y-1">
                  {mode.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Aufgaben des Betriebssystems */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Wesentliche Aufgaben des Betriebssystems</h3>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 mb-4">
            <p className="text-yellow-800 text-sm">
              <strong>Klausur-Hinweis:</strong> "wesentliche aufgaben des betriebssystems, kurz drüber gucken" - 
              Überblick genügt, keine Details erforderlich.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {osTasks.map((task, index) => (
              <div key={index} className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <task.icon className="h-5 w-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                </div>
                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                <p className="text-xs text-gray-500">{task.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Maschinenbegriff nach Coy */}
        <div className="mt-8 bg-indigo-50 p-6 rounded-lg border border-indigo-200">
          <h3 className="text-lg font-semibold mb-4 text-indigo-800">Maschinenbegriff nach Coy</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 px-4 py-2 rounded font-medium">Reale Maschine</div>
              <span className="text-gray-600">=</span>
              <div className="text-gray-700">Zentraleinheit (CPU) + Geräte (Hardware)</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-200 px-4 py-2 rounded font-medium">Abstrakte Maschine</div>
              <span className="text-gray-600">=</span>
              <div className="text-gray-700">Reale Maschine + Betriebssystem</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-200 px-4 py-2 rounded font-medium">Benutzermaschine</div>
              <span className="text-gray-600">=</span>
              <div className="text-gray-700">Abstrakte Maschine + Anwendungsprogramm</div>
            </div>
            <div className="mt-4 text-center text-sm text-indigo-700 font-medium">
              Reale Maschine ⊂ Abstrakte Maschine ⊂ Benutzermaschine
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OSIntroduction;
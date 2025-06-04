import React, { useState } from 'react';
import { HardDrive, FileText, Folder, Settings } from 'lucide-react';

const FileSystems: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState('basics');
  const [selectedFileSystem, setSelectedFileSystem] = useState('ufs');

  const fileSystemBasics = [
    {
      concept: 'Datei',
      description: 'Benannte Sammlung zusammengehöriger Daten',
      attributes: ['Name', 'Typ', 'Größe', 'Erstelldatum', 'Berechtigungen']
    },
    {
      concept: 'Verzeichnis',
      description: 'Container für Dateien und andere Verzeichnisse',
      attributes: ['Hierarchische Struktur', 'Pfadangaben', 'Zugriffsrechte']
    },
    {
      concept: 'Pfad',
      description: 'Eindeutige Adresse einer Datei im Dateisystem',
      attributes: ['Absolut (/home/user/file.txt)', 'Relativ (../file.txt)']
    }
  ];

  const partitioningSchemes = [
    {
      name: 'MBR (Master Boot Record)',
      description: 'Traditionelles Partitionierungsschema',
      features: [
        'Bis zu 4 primäre Partitionen',
        'Erweiterte Partitionen für mehr als 4',
        'Max. 2 TB Festplattengröße',
        'Legacy BIOS kompatibel'
      ],
      limitations: ['Nur 4 primäre Partitionen', 'Größenbegrenzung auf 2TB'],
      color: 'red'
    },
    {
      name: 'GPT (GUID Partition Table)',
      description: 'Modernes Partitionierungsschema',
      features: [
        'Bis zu 128 Partitionen',
        'Unterstützt > 2TB',
        'Redundante Partitionstabelle',
        'UEFI kompatibel'
      ],
      limitations: ['Benötigt UEFI', 'Komplexer als MBR'],
      color: 'green'
    }
  ];

  const ufsStructure = {
    superblock: {
      name: 'Superblock',
      description: 'Metadaten über das Dateisystem',
      content: ['Dateisystem-Typ', 'Größe', 'Anzahl Inodes', 'Freie Blöcke']
    },
    inodes: {
      name: 'Inode-Tabelle',
      description: 'Informationen über jede Datei',
      content: ['Dateigröße', 'Berechtigungen', 'Zeitstempel', 'Zeiger auf Datenblöcke']
    },
    dataBlocks: {
      name: 'Datenblöcke',
      description: 'Tatsächlicher Dateiinhalt',
      content: ['Dateiinhalt', 'Verzeichniseinträge']
    }
  };

  const UFSVisualizer = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <h4 className="font-semibold mb-4">UFS (Unix File System) Struktur</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(ufsStructure).map((component, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">{component.name}</h5>
              <p className="text-sm text-gray-600 mb-3">{component.description}</p>
              <ul className="space-y-1">
                {component.content.map((item, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center">
                    <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h5 className="font-medium text-blue-800 mb-2">Inode-Struktur (Fokus!)</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h6 className="font-medium mb-1">Direkte Zeiger (10-12 Stück):</h6>
              <p className="text-gray-600">Zeigen direkt auf Datenblöcke</p>
            </div>
            <div>
              <h6 className="font-medium mb-1">Indirekte Zeiger:</h6>
              <ul className="text-gray-600 space-y-1">
                <li>• Einfach indirekt</li>
                <li>• Doppelt indirekt</li>
                <li>• Dreifach indirekt</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PartitioningComparison = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {partitioningSchemes.map((scheme, index) => (
          <div key={index} className={`border-l-4 border-${scheme.color}-500 bg-${scheme.color}-50 p-6 rounded-r-lg`}>
            <h4 className="font-semibold text-gray-900 mb-2">{scheme.name}</h4>
            <p className="text-gray-700 mb-4">{scheme.description}</p>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-green-700 mb-1">Features:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h5 className="font-medium text-red-700 mb-1">Limitierungen:</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  {scheme.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center">
                      <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                      {limitation}
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

  const FileSystemBasics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fileSystemBasics.map((basic, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border">
            <h4 className="font-semibold text-blue-800 mb-3">{basic.concept}</h4>
            <p className="text-gray-700 mb-4">{basic.description}</p>
            <div>
              <h5 className="font-medium text-gray-800 mb-2">Eigenschaften:</h5>
              <ul className="space-y-1">
                {basic.attributes.map((attr, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    {attr}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-gray-50 p-6 rounded-lg">
        <h4 className="font-semibold mb-4">Dateisystem-Aufgaben</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-green-700 mb-2">Grundfunktionen:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Dateien erstellen, lesen, schreiben, löschen</li>
              <li>• Verzeichnisse verwalten</li>
              <li>• Metadaten speichern</li>
              <li>• Speicherplatz verwalten</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-blue-700 mb-2">Erweiterte Funktionen:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Zugriffsrechte verwalten</li>
              <li>• Caching für Performance</li>
              <li>• Journaling für Konsistenz</li>
              <li>• Defragmentierung</li>
            </ul>
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
          Dateisysteme
        </h2>

        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { id: 'basics', label: 'Grundlagen', icon: FileText },
            { id: 'partitioning', label: 'MBR vs GPT', icon: Settings },
            { id: 'ufs', label: 'UFS Struktur', icon: Folder }
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
        {selectedTopic === 'basics' && <FileSystemBasics />}
        {selectedTopic === 'partitioning' && <PartitioningComparison />}
        {selectedTopic === 'ufs' && <UFSVisualizer />}

        {/* Important Notes */}
        <div className="mt-8 space-y-4">
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h4 className="font-semibold text-red-800 mb-2">AUSGESCHLOSSEN: FAT Dateisystem</h4>
            <p className="text-red-700">
              FAT RAUS F.52-62 raus - FAT-Dateisystem ist explizit nicht klausurrelevant.
            </p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">FOKUS: UFS (F.48, F.54)</h4>
            <div className="text-yellow-700 space-y-2">
              <p><strong>F.48:</strong> UFS-Struktur verstehen - Verständnisfrage</p>
              <p><strong>F.54 fokus:</strong> Inode-Struktur mit direkten und indirekten Zeigern</p>
              <p>Wichtig: Superblock, Inode-Tabelle, Datenblöcke</p>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">MBR vs GPT - Wissensfrage (F.66)</h4>
            <div className="text-blue-700 space-y-2">
              <p>F.66 nicht praktisch aber Wissensfrage - zeichnen Sie auf MBR vs GPT</p>
              <p><strong>MBR:</strong> Bis 4 Partitionen, max 2TB, Legacy BIOS</p>
              <p><strong>GPT:</strong> Bis 128 Partitionen, >2TB, UEFI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSystems;
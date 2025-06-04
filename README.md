# Betriebssysteme - Interaktive Lernplattform

Eine umfassende, interaktive Lernplattform zur optimalen Vorbereitung auf die Betriebssysteme-Klausur. Strukturiert nach bewährten Lernprinzipien mit Schritt-für-Schritt-Anleitungen, interaktiven Übungen und sofortigem Feedback.

## 🎯 Lernfunktionen

### 📚 **Strukturiertes Lernen**
- **Schritt-für-Schritt Tutorials**: Jedes Thema in logische Lernschritte unterteilt
- **Lernfortschritt-Tracking**: Automatische Speicherung des Fortschritts im Browser
- **Geschätzte Lernzeiten**: Realistische Zeiteinschätzungen für jeden Abschnitt
- **Schwierigkeitsgrade**: Einfach → Mittel → Schwer Progression

### 🧠 **Interaktive Lernelemente**
- **Live-Quizzes**: Sofortiges Feedback mit detaillierten Erklärungen
- **Praktische Berechnungen**: CPU-Effizienz-Rechner mit Übungsaufgaben
- **Visualisierungen**: Gantt-Diagramme, Prozesszustände, Speicherhierarchie
- **Beispiel-Szenarien**: Realitätsnahe Anwendungsfälle

### 🏆 **Gamification**
- **Erfolgs-System**: Sammeln Sie Achievements beim Lernen
- **Fortschritts-Balken**: Visueller Lernfortschritt pro Thema
- **Lernpfad**: Strukturierter Weg durch alle Themen

## 📚 Abgedeckte Themen

### ✅ Klausurrelevant
- **Einführung & Grundlagen**: Definitionen, Operationsmodi, BS-Aufgaben
- **Prozessverwaltung**: Prozesszustände, Ein-/Mehrprogrammbetrieb, CPU-Effizienz
- **Scheduling**: FCFS, SJF, Round Robin, Priority Scheduling
- **Speicherverwaltung**: Hierarchie, Lokalitätsprinzip, virtuelle Adressierung
- **Dateisysteme**: UFS-Struktur, MBR vs GPT
- **BS-Architekturen**: Monolithisch vs Mikrokernel

### ❌ Explizit ausgeschlossen
- Detaillierte BS-Geschichte (außer 3. Generation)
- Prozessbeendigung und Copy-on-Write
- Interprozess-Kommunikation
- FAT-Dateisystem
- macOS und Android Architekturen

## 🚀 Installation & Start

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev

# Build für Produktion
npm run build
```

Die Anwendung läuft dann unter `http://localhost:5173`

## 📖 Verwendung

### 🚀 **Schnellstart**
1. **Lernfortschritt verfolgen**: Der obere Balken zeigt Ihren Gesamtfortschritt
2. **Thema auswählen**: Beginnen Sie mit "Einführung & Grundlagen"
3. **Schritt-für-Schritt lernen**: Folgen Sie den strukturierten Lernschritten
4. **Quizzes absolvieren**: Testen Sie Ihr Wissen nach jedem Abschnitt
5. **Berechnungen üben**: Nutzen Sie interaktive Rechner und Übungsaufgaben

### 📱 **Lernmodi**
- **📖 Theorie**: Detaillierte Erklärungen mit Beispielen
- **💡 Beispiele**: Praktische Anwendungsfälle und Szenarien  
- **🧮 Übungen**: Interaktive Berechnungen und Aufgaben
- **❓ Quizzes**: Wissenstests mit sofortigem Feedback

### 💾 **Fortschritt speichern**
- Ihr Lernfortschritt wird automatisch im Browser gespeichert
- Kehren Sie jederzeit zurück und setzen Sie dort fort, wo Sie aufgehört haben
- Achievements und abgeschlossene Schritte bleiben erhalten

## 🎓 Besonders wichtig für die Klausur

- **CPU-Effizienz berechnen**: `CPU-Ausnutzung = 1 - p^n`
- **Scheduling-Algorithmen durchrechnen**: Gantt-Diagramme mit gestrichelten Linien
- **UFS-Struktur verstehen**: Inode-Aufbau mit direkten/indirekten Zeigern
- **Kernel-Architekturen vergleichen**: Vor-/Nachteile erläutern können

## 🛠 Technologie-Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Diagramme**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📄 Lizenz

Entwickelt für Studenten der Betriebssysteme-Vorlesung zur Klausurvorbereitung.

import React, { useState } from 'react';
import { BookOpen, PlayCircle, Trophy, Clock, CheckCircle, Target } from 'lucide-react';
import InteractiveQuiz from './InteractiveQuiz';

interface ExerciseData {
  id: string;
  title: string;
  description: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
    points: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
  quizQuestions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    difficulty: 'easy' | 'medium' | 'hard';
    topic: string;
  }>;
}

const Exercises: React.FC = () => {
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [scores, setScores] = useState<{[key: string]: number}>({});

  const exercises: ExerciseData[] = [
    {
      id: '01',
      title: 'Einführung und Geschichte',
      description: 'Grundlagen der Betriebssysteme, Historie und Entwicklung der Rechnerarchitekturen',
      questions: [
        {
          id: '1a',
          question: 'Nennen Sie zwei in der Vorlesung behandelte Teilgebiete der Informatik, die für Betriebssysteme von Bedeutung sind',
          answer: 'Technische Informatik, Angewandte Informatik',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '1b',
          question: 'Erläutern Sie, inwiefern die beiden Teilgebiete in einem Betriebssystem zusammenhängen',
          answer: 'Die technische Informatik beschäftigt sich mit hardwarenahen Themen, die komplex und aufwändig sind. Beispielsweise gilt es in diesem Zusammenhang, Gerätezugriffe auszuführen und hierfür vereinfachte Zugriffs-Schnittstellen für Software-Applikationen bereitzustellen. Diese Software-Applikationen werden mit Mitteln der Angewandten Informatik (z. B. Hochsprachen wie C#, Java, …) implementiert und betrachten Gerätezugriffe als transparent / kennen keine Details. Allgemein ausgedrückt besteht der Zusammenhang zwischen Technischer und Angewandter Informatik also darin, dass die Angewandte Informatik auf den Konzepten der Technischen Informatik aufbaut. Das Betriebssystem vermittelt dabei zwischen beiden Teilgebieten. Somit wird Komplexität abstrahiert und Zugriffe auf unterschiedlichste Hardware werden vereinheitlicht.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1c',
          question: 'Inwiefern besteht ein Zusammenhang zwischen digitaler Transformation und Betriebssystemen? Begründen Sie Ihre Aussage anhand eines praktischen Beispiels.',
          answer: 'Digitalisierung und digitale Transformation erhöhen insbesondere die Nachfrage an (Smart) Devices, die über speziell angepasste und vernetzungsfähige Betriebssysteme verfügen. Damit tragen letztere dazu bei, die für digitale Infrastrukturen erforderlichen Vernetzungs- und Konnektivitäts-Anforderungen zu erfüllen. Ein praktisches Beispiel hierfür stellen z. B. Smartwatches dar, welche inzwischen relativ präzise Gesundheitsdaten erfassen und auswerten können und (sofern erwünscht) zum sogenannten „Digital Me" beitragen können.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1d',
          question: 'Cloud Computing kann als „großes Betriebssystem" angesehen werden. Begründen Sie, warum dem so ist und nennen Sie 3 Gemeinsamkeiten von Cloud Computing und Betriebssystemen.',
          answer: 'Dies ist durch den konzeptionellen Aufbau und die Organisation beider Systeme gegeben, welche sich stark ähneln. Erste Gemeinsamkeit: „unendliche" Rechenressourcen - Cloud durch Hyperscaler, BS durch CPU-Scheduling und virtuellen Speicher. Zweite Gemeinsamkeit: Automatische Skalierbarkeit - Cloud je nach Bereitstellungsmodell, BS durch Zuteilung weiterer Speicherbereiche/CPU-Kerne. Dritte Gemeinsamkeit: Self-Service Portal - Cloud für Ressourcenbereitstellung, BS durch grafische Benutzeroberfläche.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '2a',
          question: 'Erläutern Sie zwei Merkmale der ersten Rechnergeneration',
          answer: 'In dieser Zeit kümmerten sich ein- und dieselben Menschen um Entwurf, Bau, Programmierung, Betrieb und Wartung der Rechner. Eine Teilung der Zuständigkeiten gab es nicht, sodass es eine hohe Abhängigkeit von Einzelpersonen gab. Damalige Programme wurden auf verdrahteten Steckkarten oder Lochkarten niedergeschrieben. Diese Programme bestanden aus einfachen Rechenoperationen, ein Betriebssysteme benötigte man noch nicht.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: '2b',
          question: 'Erläutern Sie zwei Merkmale der vierten Rechnergeneration',
          answer: 'Zeitalter der Personal Computer wird eingeläutet. LSI-Schaltungen sorgen dafür, dass PCs zu günstigen Preisen in hohen Stückzahlen gefertigt werden können. Einführung der grafischen Benutzeroberflächen, die zunächst im Projekt Lisa fehlschlägt. Ein weiterer Anlauf mit dem Apple Macintosh führt dann jedoch aufgrund der hohen Benutzerfreundlichkeit zum Erfolg.',
          points: 3,
          difficulty: 'easy'
        },
        {
          id: '2c',
          question: 'In der dritten Rechnergeneration kam unter Anderem das Feature MULTICS (Multiplexed Information and Computing Service) auf den Markt. Inwiefern kann man dieses Feature mit dem heute existierenden Cloud Computing vergleichen?',
          answer: 'Bei MULTICS handelte es sich um eine große, leistungsstarke Rechenmaschine, die für alle Einwohner von Boston Rechenkapazität zu Verfügung stellte. Das heutige Cloud-Computing basiert auf genau derselben Idee, indem leistungsstarke Server in großen Rechenzentren ihre Leistung für unterschiedlich viele Kunden (sog. Tenants) und verschiedene Zwecke zur Verfügung stellen. So kann Rechenleistung effizienter ausgenutzt werden, da i.d.R. nur geringe Leerlaufzeiten (Idle) auf den Servern entstehen.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '2d',
          question: 'Nennen und erläutern Sie drei neuartige Anforderungen beim Entwurf mobiler Betriebssysteme',
          answer: '1. Energiesparende Ausgestaltung: da mobile Betriebssysteme i.d.R. auf kompakten, akkubetriebenen Endgeräten zur Ausführung kommen und eine unterbrechungsfreie Stromversorgung nicht gewährleistet ist, müssen die besonders ressourcenschonend und energiesparend ausgestaltet werden. 2. Geringer Festspeicher: aufgrund der kompakten Bauweise mobiler Endgeräte sind diese zumeist mit einem sehr viel kleineren Festspeicher ausgestattet. 3. Usability: Die bisher verwendeten Usability-Konzepte für Betriebssysteme finden in mobilen Betriebssystemen nur noch bedingt Anwendung, da mobile Endgeräte zumeist über Gesten-, Touch- und andere Eingabemöglichkeiten verfügen.',
          points: 4,
          difficulty: 'medium'
        }
      ],
      quizQuestions: [
        {
          id: 'q1',
          question: 'Welche zwei Teilgebiete der Informatik sind für Betriebssysteme besonders wichtig?',
          options: [
            'Theoretische Informatik und Praktische Informatik',
            'Technische Informatik und Angewandte Informatik',
            'Software Engineering und Datenbanken',
            'Künstliche Intelligenz und Machine Learning'
          ],
          correct: 1,
          explanation: 'Technische Informatik behandelt hardwarenahe Themen, während Angewandte Informatik höhere Programmiersprachen verwendet. Das Betriebssystem vermittelt zwischen beiden.',
          difficulty: 'easy',
          topic: 'Einführung'
        },
        {
          id: 'q2',
          question: 'Was war ein charakteristisches Merkmal der ersten Rechnergeneration?',
          options: [
            'Verwendung von grafischen Benutzeroberflächen',
            'Dieselben Menschen kümmerten sich um alle Aspekte',
            'Verwendung von Multiprogramming',
            'Einsatz von Netzwerktechnologien'
          ],
          correct: 1,
          explanation: 'In der ersten Rechnergeneration gab es keine Spezialisierung - dieselben Personen waren für Entwurf, Bau, Programmierung und Wartung zuständig.',
          difficulty: 'easy',
          topic: 'Geschichte'
        }
      ]
    },
    {
      id: '02',
      title: 'Grundlagen der Betriebssysteme',
      description: 'Definition von Betriebssystemen, Hardware-Komponenten und grundlegende Aufgaben',
      questions: [
        {
          id: '2a',
          question: 'Definieren Sie den Begriff des Betriebssystems anhand einer Definition aus der Vorlesung',
          answer: 'Software zur Überwachung und Steuerung der Hardwareressourcen eines Rechners, sowie zur Abstraktion von Komplexität.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '2b',
          question: 'Erläutern Sie die zwei Sichten auf Betriebssysteme. Stellen Sie dabei klar den Fokus der jeweiligen Sichtweise heraus',
          answer: 'Betriebssystem als erweiterte Maschine: „Man blickt von oben auf die Hardware" und hat mit dem Betriebssystem eine Zwischenschicht, die Komplexität abstrahiert und einfache Schnittstellen für Anwenderprogramme in höheren Schichten bereitstellt. Betriebssystem als Ressourcenverwalter: „Man blickt aus Hardwaresicht auf die darüberliegenden Schichten" und verwaltet Systembestandteile / Hardware für diese. Das BS stellt im allgemeinen Verwaltungsdienste für höher liegende Zugriffsschichten bereit.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1c',
          question: 'Erklären Sie die Zusammenhänge zwischen Hardware, Betriebssystem und Benutzerprogramm. Stellen Sie die Begriffe in einem Schichtendiagramm dar.',
          answer: 'Das Betriebssystem ist die Komponente, die sich zwischen Benutzerprogrammen und Hardware einfügt. Vor diesem Hintergrund kommt dem Betriebssystem die Aufgabe zu, HW-Zugriffe eines Benutzerprogrammes zu koordinieren / synchronisieren und mit Hilfe von Treiber-Software durchzuführen. Dabei abstrahiert das BS die zugrundeliegende Komplexität und stellt den Anwenderprogrammen und Anwenders ein einfaches / klares Modell des Rechners zur Verfügung.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1d',
          question: 'Erläutern Sie die beiden Operationsmodi. Geben Sie an, in welchem Modus Betriebssystem und Benutzerprogramme jeweils ausgeführt werden.',
          answer: 'Kernel-Modus: gilt exklusiv für das Betriebssystem und hat vollständigen Zugriff auf die gesamte Hardware sowie den verfügbaren Befehlssatz. Benutzer-Modus: Ausführmodus für Benutzerprogramme, der nur eingeschränkten Zugriff auf Hardware und Befehlssatz bietet. Eine Anwendung A hat z. B. in diesem Modus nicht die Berechtigung, den isolierten Speicherbereich von Anwendung B einzusehen.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '2a',
          question: 'Erläutern Sie, welche Auswirkungen der Übergang von Einkern- zu Mehrkern-Prozessoren auf Betriebssysteme hat.',
          answer: 'Das Betriebssystem muss Mechanismen bereitstellen, um die Arbeit von mehreren Ausführungsfäden bzw. Threads auf physikalisch verfügbare Rechenkerne zu verteilen. Zudem müssen Mechanismen für Thread-Synchronisation und –Kommunikation bereitgestellt werden.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2b',
          question: 'Erklären Sie den Begriff des Multithreading.',
          answer: 'Multithreading ermöglicht eine parallele bzw. quasi-parallele Verarbeitung von Programmen, indem der Prozessor innerhalb eines Prozess-Zustandes zwischen mehreren Arbeits-Threads hin- und herschalten kann. Blockiert z. B. Thread A, weil er auf eine Anwender-Eingabe wartet, kann in der Zwischenzeit Thread B weiterarbeiten. Dadurch kann der Verarbeitungs-Durchsatz einer Anwendung erhöht werden.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2c',
          question: 'Inwiefern wird dem Betriebssystem beim Multithreading etwas vorgetäuscht?',
          answer: 'Dem Betriebssystem wird mit Hilfe des Multithreading dann etwas vorgetäuscht, wenn durch den verwendeten Prozessor ein hardwareseitiges Multithreading durchgeführt wird. Die hierfür zugrundeliegende Technologie wird oft synonym zum Multithreading verwendet und bei Intel-Prozessoren als sog. Hyperthreading bezeichnet, wohingegen bei AMD-Prozessoren der Begriff des Simultaneous Multithreading (SMT) verwendet wird. Hierbei wird dem BS gegenüber vorgetäuscht, dass physikalisch mehr als ein Prozessorkern auf dem zugrundeliegenden System existiert.',
          points: 3,
          difficulty: 'hard'
        },
        {
          id: '2d',
          question: 'Wird mit Multithreading echte Parallelität ermöglicht? Begründen Sie Ihre Aussage.',
          answer: 'Dies hängt von der zugrundeliegenden Hardware ab. Auf einem System mit mehreren physikalisch vorhandenen Prozessorkernen kann mit Multithreading echte Parallelität ermöglicht werden. In Systemen mit einem einzigen Rechenkern wird das Multithreading durch schnelles hin- und her schalten zwischen den Threads ermöglicht, sodass Aufgaben nur quasi-parallel abgearbeitet werden.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2e',
          question: 'Nennen Sie die vier Arten von Speicher in absteigender Reihenfolge von schnell nach langsam anhand der Zugriffsgeschwindigkeit.',
          answer: 'Register, Cache, Arbeitsspeicher (RAM), Festplatte',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '2f',
          question: 'Weshalb ist beim Zugriff auf die beiden langsamsten Speicherarten mit erhöhten Zugriffszeiten zu rechnen? Wie kann dies durch ein Betriebssystem optimiert werden?',
          answer: 'Dies ist darin zu begründen, dass im Gegensatz zum CPU-Register und –Cache der Arbeitsspeicher und die Festplatte über den Datenbus erreicht werden müssen. Dabei stellt der Datenbus einen Flaschenhals dar, da er mit anderen Komponenten wie z. B. Grafikkarte, USB-Controller usw. geteilt wird. CPU-Register und –Cache hingegen sind direkt in der CPU verbaut und damit sehr schnell zugreifbar. Zudem sorgt der mechanische Aufbau einer Magnetplatte aufgrund der Verschiebungen des Schreib-/Lesekopfes für erhöhte Zugriffszeiten. Hier kann mit modernen Solid State Disks Abhilfe geschaffen werden.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '3a',
          question: 'Eine zentrale Aufgabe eines Betriebssystems besteht in der Abstraktion. Erklären Sie, was damit gemeint ist.',
          answer: 'Das Betriebssystem abstrahiert insbesondere Komplexität im Zugriff auf Hardware. Dabei wird gegenüber Anwendungsentwicklern und End-Anwendern Detailwissen verborgen und Zugriffe mit APIs vereinheitlicht. Vor diesem Hintergrund spielt es z. B. für Anwender keine Rolle, welche Festplatte im System verbaut ist / von welchem Hersteller diese ist.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '3b',
          question: 'Erläutern Sie den zur Abstraktion hilfreichen Maschinenbegriff nach Coy.',
          answer: 'Coy betrachtet ein Rechensystem auf drei verschiedenen Abstraktions-Ebenen. Dabei stellt die Reale Maschine den niedrigsten Abstraktionsgrad dar. Hierunter versteht man ausschließlich CPU und Hardware-Geräte. Ein Abstraktionsniveau höher steht die sog. Abstrakte Maschine. Zu dieser Perspektive zählt zusätzlich zu den oben genannten noch das Betriebssystem. Das höchste Abstraktionsniveau betrachtet ergänzend noch Anwendungsprogramme und wird als Benutzermaschine bezeichnet.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '3c',
          question: 'Erklären Sie, welche Aufgaben das Betriebssystem im Sinne der Prozessverwaltung übernimmt.',
          answer: 'Überwachung der Prozesse während deren Ausführung → Z. B. Unterbinden von Speicherzugriffs-Verletzungen. Verwaltung von Prozess-Ressourcen, wie z. B. Dateien, Geräte-Zugriffe und anschließende Freigabe dieser, sodass sie durch andere Prozesse zugegriffen werden können. Ermöglichung des Prozess-Scheduling, sodass sich mehrere Prozesse eine CPU teilen können. Zudem Verwaltung des Multithreading zur Ermöglichung (quasi-) paralleler Programmausführung.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '3d',
          question: 'Nennen und erläutern Sie zwei weitere Aufgaben eines Betriebssystems.',
          answer: 'Speicherverwaltung: Abstraktion der Speicherhierarchie, sodass Speicherzugriffe schnellstmöglich erfolgen können, Herstellen von Speicherzugriffs-Sicherheit, Effiziente Speicherplatzverwaltung und Nutzung entstehender Freiräume / Defragmentierung. Dateisystemverwaltung: Verwaltung aller angeschlossenen physikalischen und logischen Laufwerke, Partitionierung von Datenträgern, Bereitstellung von Caching-Mechanismen.',
          points: 4,
          difficulty: 'medium'
        }
      ],
      quizQuestions: [
        {
          id: 'q3',
          question: 'Was ist die Definition eines Betriebssystems?',
          options: [
            'Eine Anwendung für Büroarbeiten',
            'Software zur Überwachung und Steuerung der Hardwareressourcen',
            'Ein Computerspiel',
            'Eine Datenbank'
          ],
          correct: 1,
          explanation: 'Ein Betriebssystem ist Software zur Überwachung und Steuerung der Hardwareressourcen eines Rechners sowie zur Abstraktion von Komplexität.',
          difficulty: 'easy',
          topic: 'Grundlagen'
        },
        {
          id: 'q4',
          question: 'In welchem Modus wird das Betriebssystem ausgeführt?',
          options: [
            'Benutzer-Modus',
            'Kernel-Modus',
            'Grafik-Modus',
            'Netzwerk-Modus'
          ],
          correct: 1,
          explanation: 'Das Betriebssystem läuft im Kernel-Modus und hat vollständigen Zugriff auf Hardware und Befehlssatz.',
          difficulty: 'easy',
          topic: 'Operationsmodi'
        }
      ]
    },
    {
      id: '03',
      title: 'Prozessverwaltung',
      description: 'Prozess-Grundlagen, Prozesserzeugung, Prozesszustände und deren Verwaltung',
      questions: [
        {
          id: '3a',
          question: 'Erklären Sie, weshalb Prozesse ein zentrales Betriebssystem-Konzept darstellen',
          answer: 'Prozesse bilden die Grundlage zur Ausführung von Programmen jeglicher Art. Ein Prozess kann dabei als die laufende Instanz eines Benutzerprogrammes betrachtet werden. Erst durch die Verwendung von Prozessen können Multiprogrammiersysteme und damit Quasi-Parallelität bei Einkern-Prozessorsystemen umgesetzt werden.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1b',
          question: 'Erläutern Sie den Unterschied zwischen CPU-Rechenzeit und I/O-Wartezeit hinsichtlich eines Prozesses',
          answer: 'Erhält ein Prozess in einem einfachen Multiprogrammiersystem die CPU zugeteilt, so steht ihm diese für einen fest definierten Zeitslot zur Verfügung. Man bezeichnet den Zeitanteil, in dem der Prozess innerhalb des Zeitslots Berechnungen durchführt, als CPU-Rechenzeit. Den Rest der Zeit verbringt der Prozess mit z. B. dem Warten auf eine Tastatureingabe, oder auf Daten von der Festplatte. Diesen Anteil bezeichnet man als I/O-Wartezeit. Der Prozess „blockiert" währenddessen die CPU für andere rechenwillige Prozesse, obwohl er keine Berechnungen durchführt → ineffiziente CPU-Nutzung.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1c',
          question: 'Wie kann ein Betriebssystem die Prozessor-Ausnutzung effizient gestalten, sodass die Gesamt-CPU-Rechenzeit erhöht wird?',
          answer: 'Indem wartenden / blockierenden Prozessen die CPU entzogen wird und dem nächsten rechenbereiten Prozess die CPU zugeteilt wird. Dadurch erhalten ausschließlich rechenbereite Prozesse die CPU zugeteilt, sodass Leerlaufzeiten auf ein Minimum reduziert werden',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1d',
          question: 'Stellen Sie die Begriffe Prozess und Programm anhand von drei Merkmalen einander gegenüber',
          answer: 'Ein Prozess stellt eine Aktivität dar, das Programm ist das „Rezept" / die Ausführungsbeschreibung für diese Aktivität. Ein Programm / eine Applikation wird i. d. R. auf dem Festspeicher abgelegt. Der Prozess hingegen ist flüchtig, d. h. seine benötigten Ressourcen werden im Hauptspeicher abgelegt, bis sie auf den Festspeicher niedergeschrieben werden. Beziehung (Programm, Prozess) = 1 : (1 … *)',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1e',
          question: 'Nennen Sie drei Prozess-Ressourcen',
          answer: 'Register, Befehlszähler, Stackpointer, offene Fehlersignale, verbundene Prozesse',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '2a',
          question: 'Nennen Sie zwei verschiedene Möglichkeiten zur Prozesserzeugung und erklären Sie diese mit jeweils einem Beispiel',
          answer: 'Bei System-Initialisierung: z. B. ein Systemtreiber für ein Peripheriegerät. Systemaufruf durch anderen Prozess: Z. B. wenn ein Tabellenverarbeitungsprogramm aus einer Benutzeranwendung heraus gestartet werden soll. Mittels Benutzeranfrage zur Prozesserzeugung: z. B. Klick auf ein Anwendungssymbol',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2b',
          question: 'Nennen Sie zwei verschiedene Möglichkeiten zur Prozessbeendigung und erklären Sie diese mit jeweils einem Beispiel',
          answer: 'Normales Beenden: z. B. ein Programm, das nach Gebrauch durch den Benutzer beendet wird. Freiwilliges Beenden aufgrund eines Fehlers: z. B. wenn ein Timeout für eine Verarbeitungsroutine erreicht wurde und Ressourcen für andere Applikationen freigegeben werden müssen. Unfreiwilliges Beenden aufgrund eines Fehlers: z. B. wenn das Betriebssystem die weitere Programmausführung beendet, weil eine Speicherzugriffsverletzung erfolgt ist',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2c',
          question: 'Erläutern Sie, inwiefern sich die Adressraumverwaltung auf einem UNIX-Betriebssystem von der eines Windows-Betriebssystems nach der Prozesserzeugung unterscheidet (Stichwort: Copy-on-Write Prinzip)',
          answer: 'Das Copy-on-Write Prinzip ist eine Möglichkeit zur Separierung bestimmter Speicherbereiche, wenn sich Eltern- und Kind-Prozesse denselben Adressraum teilen. Bei der Veränderung eines Speicherblocks durch einen der Prozesse wird dabei der betreffende Speicherblock in einen privaten, dem Prozess zugeordneten Bereich kopiert. Anschließend werden die gewünschten Änderungen in diesem isolierten Speicherbereich vorgenommen, der nur für den entsprechenden Prozess einsehbar ist. Der andere Prozess hingegen sieht nach wie vor die Ursprungsdaten. Auf diese Art und Weise erfolgt die Adressraumverwaltung unter UNIX-basierten Betriebssystemen. Unter Windows-Systemen hingegen wird bei der Erzeugung eines Kind-Prozesses der komplette Adressraum dupliziert und separiert vom Eltern-Prozess für den Kind-Prozess bereitgestellt.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: '3a',
          question: 'Zeichnen Sie einen Graphen, in dem Sie alle möglichen Prozesszustände als Knoten und mögliche Prozessübergänge als Kanten darstellen und beschriften Sie sowohl Knoten als auch Kanten aussagekräftig',
          answer: 'Prozesszustände-Graph: Neu → (Prozess erzeugt) → Bereit → (Scheduler wählt aus) → Laufend → (Zeitscheibe abgelaufen) → Bereit. Laufend → (wartet auf I/O) → Blockiert → (I/O abgeschlossen) → Bereit. Laufend → (Prozess beendet) → Beendet. Zusätzliche Übergänge: Neu → Beendet (Prozess kann nicht gestartet werden), Blockiert → Beendet (Prozess wird terminiert während blockiert).',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '3b',
          question: 'In welchem Zustand befindet sich ein Prozess, wenn er nicht rechenbereit ist, weil er z. B. auf ankommende Netzwerkdaten oder eine Tastatureingabe wartet?',
          answer: 'Der Prozess befindet sich in diesem Fall im Zustand „Blockiert".',
          points: 2,
          difficulty: 'easy'
        }
      ],
      quizQuestions: [
        {
          id: 'q5',
          question: 'Was ist der Unterschied zwischen einem Prozess und einem Programm?',
          options: [
            'Kein Unterschied - das ist dasselbe',
            'Ein Prozess ist die laufende Instanz eines Programms',
            'Ein Programm ist schneller als ein Prozess',
            'Programme laufen nur auf Windows'
          ],
          correct: 1,
          explanation: 'Ein Prozess ist eine Aktivität (laufende Instanz), während ein Programm das "Rezept" oder die Ausführungsbeschreibung ist.',
          difficulty: 'easy',
          topic: 'Prozesse'
        },
        {
          id: 'q6',
          question: 'In welchem Zustand ist ein Prozess, der auf Tastatureingabe wartet?',
          options: [
            'Bereit',
            'Laufend',
            'Blockiert',
            'Beendet'
          ],
          correct: 2,
          explanation: 'Ein Prozess, der auf I/O-Operationen wie Tastatureingaben wartet, befindet sich im blockierten Zustand.',
          difficulty: 'easy',
          topic: 'Prozesszustände'
        }
      ]
    },
    {
      id: '04',
      title: 'Threads und Synchronisation',
      description: 'Thread-Konzepte, Multithreading-Implementierung und praktische Anwendung',
      questions: [
        {
          id: '4a',
          question: 'Erklären Sie, was ein Thread ist',
          answer: 'Ein Thread ist Ausführungsfaden / Verarbeitungsstrang innerhalb eines Prozesses. Da ein Thread in seinem Aufbau einem Prozess ähnelt, jedoch weniger Ressourcen verwaltet, wird er häufig auch als leichtgewichtiger Prozess bezeichnet.',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '1b',
          question: 'Nennen Sie drei Vorteile von Threads',
          answer: 'Es muss kein thread-eigener Prozessraum bereitgestellt werden. Beim Kontextwechsel keine MMU-Umprogrammierung notwendig → schnellerer Kontextwechsel. Daten können relativ einfach über Thread-Grenzen hinweg geteilt werden.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1c',
          question: 'Weshalb muss ein Betriebssystem neben dem Thread-Modell auch das Prozess-Modell unterstützen?',
          answer: 'Da ein Thread ohne einen umgebenden Prozess nicht existieren kann → Prozess stellt Ressourcen bereit und verwaltet diese. Das Prozess-Modell sorgt dafür, dass die Threads zweier unterschiedlicher Prozesse keine gegenseitige Dateneinsicht / Datenmanipulation vornehmen können.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1d',
          question: 'Nennen Sie die wesentlichen Unterschiede zwischen dem Thread-Modell und dem Prozess-Modell',
          answer: 'Beim Prozess-Modell werden Prozess-Daten voneinander isoliert betrachtet, wohingegen Threads sich Daten innerhalb desselben Prozesses teilen. Bezgl. der Parallelität: Prozess-Parallelität bedeutet, dass mehrere Benutzerprogramme parallel ablaufen, Thread-Parallelität meint die parallele Ausführung von Aufgaben innerhalb eines Benutzerprogrammes. Der Kontextwechsel (CPU-Scheduling) eines Prozesses ist wesentlich aufwändiger und dauert länger als der eines Threads (keine Notwendigkeit der MMU-Umprogrammierung).',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '1e',
          question: 'Aus welchen Bestandteilen besteht: a) Ein Prozess? b) Ein Thread?',
          answer: 'a) Ein Prozess: Code, Daten, Dateiverweise, Threads. b) Ein Thread: Stack, PC, PSW, Register.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '1f',
          question: 'Was sind Prozess-Ressourcen, die Threads innerhalb eines Prozesses gemeinsam teilen?',
          answer: 'Code, Daten, Dateiverweise',
          points: 2,
          difficulty: 'easy'
        },
        {
          id: '1g',
          question: 'Inwiefern bringt die gemeinsame Nutzung von Ressourcen innerhalb eines Prozesses Vorteile, und inwiefern Nachteile?',
          answer: 'Vorteile sind: schneller Kontextwechsel, effiziente Speichernutzung. Nachteile sind: Ressourcenzugriff muss synchronisiert erfolgen (vgl. VL später), je nach Anwendungsfall erhöhter Programmieraufwand bei der Verwendung von Threads (zeitliches Verhalten, Debugging, …)',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2a',
          question: 'Unterscheiden Sie die Begriffe User-Level-Thread und Kernel-Level-Thread',
          answer: 'User-Level-Threads werden entsprechend ihrem Namen auf Benutzerprogramm-Ebene verwaltet, also z. B. durch eine Programmier-Laufzeitumgebung verwaltet. Kernel-Level-Threads hingegen werden auf Betriebssystem-Ebene verwaltet. Je nachdem, welches Betriebssystem eingesetzt wird, kann das Betriebssystem unterschiedlich viele KL-Threads bereitstellen, auf die UL-Threads abgebildet werden. Den KL-Threads werden CPU-Kerne und damit Rechenzeit zugeteilt.',
          points: 4,
          difficulty: 'medium'
        },
        {
          id: '2b',
          question: 'Nennen Sie drei grundsätzliche Möglichkeiten zur Implementierung des Multithreading und erklären Sie, wie dabei UL-Threads auf KL-Threads abgebildet werden',
          answer: '1:1-Abbildung: Jeder UL-Thread wird auf einen eigenen KL-Thread abgebildet. m:1-Abbildung: Viele UL-Threads werden auf einen KL-Thread abgebildet. m:n-Abbildung: Viele UL-Threads werden auf wenige KL-Threads abgebildet.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: '2c',
          question: 'Bei einer der Implementierungs-Varianten blockieren bei einem Warten auf I/O innerhalb eines KL-Threads alle Threads eines UL-Threads. a) Um welche Implementierungs-Variante handelt es sich? b) Weshalb kann mit dieser Implementierungs-Variante dennoch eine parallele Verarbeitung erreicht werden?',
          answer: 'a) Um die m:1-Abbildung. Hierbei „kennt" das Betriebssystem nur den sich aktuell in Ausführung befindlichen KL-Thread und teilt damit keinem der anderen UL-Threads Rechenzeit zu. b) Wenn die zugrundeliegende Hardware mehr als einen Rechenkern besitzt, können mehrere KL-Threads jeweils auf die physikalisch existenten CPU-Kerne aufgeteilt werden. Dadurch ist applikationsübergreifend eine parallele Verarbeitung möglich.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: '2d',
          question: 'Bei einer m:n-Abbildung wird für die KL-Threads ein Thread-Pool verwendet. Welche Vorteile ergeben sich dadurch?',
          answer: 'Unter der Verwendung eines Thread-Pools können Threads wiederverwendet werden, was eine schnellere Performance ermöglicht. Der Thread-Pool hat eine obere Grenze an zur Verfügung stehenden Threads. Wird diese erreicht, beginnen sich alle weiteren Threads in einer Warteschlage einzureihen. Dadurch wird der Verwaltungsaufwand der Threads in Grenzen gehalten.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '2e',
          question: 'Wie unterscheidet sich bei einer m:n-Abbildung der Ansatz der Scheduler Activation von dem der Pop-up-Threads?',
          answer: 'Bei der Scheduler Activation wird ein Thread-Pool zur Abbildung vorhandener UL-Threads auf KL-Threads bereitgestellt, sodass Threads wiederverwendet werden können. Pop-Up Threads verfolgen das gegenteilige Ziel, indem sie Threads für kurze Zeit erzeugen und direkt im Anschluss wieder beendigen. Des Weiteren werden Pop-Up Threads im Allgemeinen dazu verwendet, einkommende Nachrichten / Signale auf z. B. Netzwerkebene zu verarbeiten. Bei der Scheduler Activation hingegen werden Threads auf Benutzerebene erzeugt.',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: '3a',
          question: 'Welche Probleme können sich bei der Verdrängung eines Threads ergeben, wenn sich dieser mit anderen Threads gemeinsam Ressourcen teilt?',
          answer: 'Es kann sowohl beim Lesen als auch beim Schreiben von gemeinsamen Daten zu Problem kommen. Inkonsistente Daten / unvollständige Datenstände können dabei die Folgen sein: Der Thread kann während des Zurückschreibens von Daten unterbrochen werden (Lost Update). Ein Thread kann fehlerhafte / unvollständige Daten eines anderen Threads wiederverwenden (Inconsistent Read).',
          points: 4,
          difficulty: 'hard'
        },
        {
          id: '3b',
          question: 'Erklären Sie das Task-Konzept moderner Programmiersprachen',
          answer: 'Ein Task bildet eine Aufgabe ab, nicht den dazu notwendigen Thread. Dadurch: Fokussierung auf die eigentliche Aufgabe und nicht auf technische Implementierungsdetails des Multithreading. Für das effiziente Erstellen und Verwalten von Threads sorgt die entsprechende Laufzeit-Umgebung.',
          points: 3,
          difficulty: 'medium'
        },
        {
          id: '3c',
          question: 'Welche Vorteile bietet die Arbeit mit Tasks gegenüber der direkten Verwendung von Threads?',
          answer: 'Fokussierung auf eigentliche Aufgabe, einfache Veröffentlichung des Task-Fortschrittes, unkompliziertes Unterbrechen / abbrechen eines bereits gestarteten Tasks, einfache Verkettung von Aufgaben bzw. Fortsetzungsaufgaben → Continuation Tasks. Allgemein ausgedrückt: Abstraktion von Komplexität beim Erzeugen und Verwalten von parallelen Aufgaben.',
          points: 3,
          difficulty: 'medium'
        }
      ],
      quizQuestions: [
        {
          id: 'q7',
          question: 'Was ist ein Thread?',
          options: [
            'Ein separater Prozess',
            'Ein Ausführungsfaden innerhalb eines Prozesses',
            'Ein Betriebssystem',
            'Eine Hardware-Komponente'
          ],
          correct: 1,
          explanation: 'Ein Thread ist ein Ausführungsfaden oder Verarbeitungsstrang innerhalb eines Prozesses und wird oft als leichtgewichtiger Prozess bezeichnet.',
          difficulty: 'easy',
          topic: 'Threads'
        },
        {
          id: 'q8',
          question: 'Was ist ein Vorteil von Threads gegenüber Prozessen?',
          options: [
            'Threads sind langsamer',
            'Schnellerer Kontextwechsel',
            'Threads brauchen mehr Speicher',
            'Threads sind komplizierter'
          ],
          correct: 1,
          explanation: 'Beim Kontextwechsel zwischen Threads ist keine MMU-Umprogrammierung nötig, was zu schnelleren Wechseln führt.',
          difficulty: 'medium',
          topic: 'Thread-Vorteile'
        }
      ]
    }
  ];

  const handleQuizComplete = (exerciseId: string, score: number) => {
    setScores(prev => ({ ...prev, [exerciseId]: score }));
    setCompletedExercises(prev => [...prev.filter(id => id !== exerciseId), exerciseId]);
    setShowQuiz(false);
    setActiveExercise(null);
  };

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
    }
  };

  const getDifficultyText = (difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy': return 'Einfach';
      case 'medium': return 'Mittel';
      case 'hard': return 'Schwer';
    }
  };

  if (showQuiz && activeExercise) {
    const exercise = exercises.find(ex => ex.id === activeExercise);
    if (exercise) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setShowQuiz(false);
                setActiveExercise(null);
              }}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Zurück zu den Übungen
            </button>
          </div>
          
          <InteractiveQuiz
            questions={exercise.quizQuestions}
            topic={exercise.title}
            onComplete={(score) => handleQuizComplete(exercise.id, score)}
          />
        </div>
      );
    }
  }

  if (activeExercise) {
    const exercise = exercises.find(ex => ex.id === activeExercise);
    if (exercise) {
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setActiveExercise(null)}
              className="text-blue-600 hover:text-blue-800 flex items-center"
            >
              ← Zurück zur Übersicht
            </button>
            <button
              onClick={() => setShowQuiz(true)}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Quiz starten
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border shadow-sm">
            <div className="flex items-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold">Übung {exercise.id}: {exercise.title}</h2>
            </div>
            
            <p className="text-gray-600 mb-6">{exercise.description}</p>

            <div className="space-y-6">
              {exercise.questions.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Aufgabe {index + 1} ({question.points} Punkte)
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(question.difficulty)}`}>
                      {getDifficultyText(question.difficulty)}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {question.question}
                  </p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Musterlösung:</h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {question.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Gesamt:</h4>
              <p className="text-blue-800">
                {exercise.questions.reduce((sum, q) => sum + q.points, 0)} Punkte • 
                {exercise.questions.length} Aufgaben • 
                Quiz verfügbar ({exercise.quizQuestions.length} Fragen)
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Betriebssysteme Übungen</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Bearbeiten Sie die Übungen zu den verschiedenen Kapiteln. Jede Übung enthält Musterlösungen und ein interaktives Quiz.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {exercises.map((exercise) => {
          const isCompleted = completedExercises.includes(exercise.id);
          const score = scores[exercise.id];
          const totalQuestions = exercise.questions.length;
          const totalPoints = exercise.questions.reduce((sum, q) => sum + q.points, 0);

          return (
            <div key={exercise.id} className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Übung {exercise.id}</h3>
                </div>
                {isCompleted && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-1" />
                    <span className="text-sm">Abgeschlossen</span>
                  </div>
                )}
              </div>

              <h4 className="text-lg font-medium text-gray-900 mb-2">{exercise.title}</h4>
              <p className="text-gray-600 mb-4">{exercise.description}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Target className="h-4 w-4 mr-1" />
                    {totalQuestions} Aufgaben
                  </span>
                  <span className="flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    {totalPoints} Punkte
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    ~{Math.ceil(totalQuestions * 5)} Min
                  </span>
                </div>
              </div>

              {score !== undefined && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 text-sm">
                    Quiz-Ergebnis: {score} / {exercise.quizQuestions.length} richtig 
                    ({Math.round((score / exercise.quizQuestions.length) * 100)}%)
                  </p>
                </div>
              )}

              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveExercise(exercise.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Übung öffnen
                </button>
                <button
                  onClick={() => {
                    setActiveExercise(exercise.id);
                    setShowQuiz(true);
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Quiz
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Hinweise zu den Übungen</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Jede Übung enthält die Originalaufgaben aus der Vorlesung mit Musterlösungen</li>
          <li>• Die Quizzes testen Ihr Verständnis der wichtigsten Konzepte</li>
          <li>• Schwierigkeitsgrade: <span className="text-green-600">Einfach</span>, <span className="text-yellow-600">Mittel</span>, <span className="text-red-600">Schwer</span></li>
          <li>• Nutzen Sie die Musterlösungen als Orientierung für die Klausurvorbereitung</li>
        </ul>
      </div>
    </div>
  );
};

export default Exercises;
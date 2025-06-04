import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Star, Trophy, BookOpen, Target } from 'lucide-react';

interface LearningProgressProps {
  completedTopics: string[];
  totalTopics: number;
  currentTopic: string;
}

const LearningProgress: React.FC<LearningProgressProps> = ({ 
  completedTopics, 
  totalTopics, 
  currentTopic 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((completedTopics.length / totalTopics) * 100);
  }, [completedTopics, totalTopics]);

  const learningPath = [
    { id: 'introduction', title: 'Grundlagen', icon: BookOpen, difficulty: 'Einfach' },
    { id: 'processes', title: 'Prozesse', icon: Circle, difficulty: 'Mittel' },
    { id: 'scheduling', title: 'Scheduling', icon: Target, difficulty: 'Schwer' },
    { id: 'memory', title: 'Speicher', icon: Star, difficulty: 'Mittel' },
    { id: 'filesystems', title: 'Dateisysteme', icon: BookOpen, difficulty: 'Mittel' },
    { id: 'architectures', title: 'Architekturen', icon: Trophy, difficulty: 'Schwer' }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Einfach': return 'green';
      case 'Mittel': return 'yellow';
      case 'Schwer': return 'red';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
        Lernfortschritt
      </h3>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Fortschritt</span>
          <span>{Math.round(progress)}% abgeschlossen</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Learning Path */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-800">Lernpfad:</h4>
        {learningPath.map((topic, index) => {
          const isCompleted = completedTopics.includes(topic.id);
          const isCurrent = currentTopic === topic.id;
          const Icon = topic.icon;
          const difficultyColor = getDifficultyColor(topic.difficulty);
          
          return (
            <div
              key={topic.id}
              className={`flex items-center p-3 rounded-lg transition-all ${
                isCurrent ? 'bg-blue-50 border-2 border-blue-300' : 
                isCompleted ? 'bg-green-50' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center flex-1">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-400 mr-3" />
                )}
                <Icon className="h-4 w-4 text-gray-600 mr-2" />
                <span className={`font-medium ${isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                  {topic.title}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded bg-${difficultyColor}-100 text-${difficultyColor}-700`}>
                {topic.difficulty}
              </span>
            </div>
          );
        })}
      </div>

      {/* Achievements */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">Erfolge:</h4>
        <div className="flex space-x-2">
          {progress >= 25 && (
            <div className="bg-yellow-100 p-2 rounded-lg flex items-center">
              <Star className="h-4 w-4 text-yellow-600 mr-1" />
              <span className="text-xs text-yellow-700">Erste Schritte</span>
            </div>
          )}
          {progress >= 50 && (
            <div className="bg-blue-100 p-2 rounded-lg flex items-center">
              <BookOpen className="h-4 w-4 text-blue-600 mr-1" />
              <span className="text-xs text-blue-700">Halbzeit</span>
            </div>
          )}
          {progress >= 100 && (
            <div className="bg-green-100 p-2 rounded-lg flex items-center">
              <Trophy className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-xs text-green-700">Meister</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningProgress;
import React, { useState } from 'react';
import { Book, FileText, Calculator, CheckSquare, Lightbulb, ArrowRight, Clock } from 'lucide-react';

interface LearningStep {
  id: string;
  title: string;
  type: 'theory' | 'example' | 'exercise' | 'quiz';
  content: React.ReactNode;
  estimatedTime: number; // in minutes
}

interface LearningSectionProps {
  title: string;
  description: string;
  steps: LearningStep[];
  onStepComplete: (stepId: string) => void;
  completedSteps: string[];
}

const LearningSection: React.FC<LearningSectionProps> = ({
  title,
  description,
  steps,
  onStepComplete,
  completedSteps
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showStepList, setShowStepList] = useState(false);

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'theory': return Book;
      case 'example': return Lightbulb;
      case 'exercise': return Calculator;
      case 'quiz': return CheckSquare;
      default: return FileText;
    }
  };

  const getStepTypeLabel = (type: string) => {
    switch (type) {
      case 'theory': return 'Theorie';
      case 'example': return 'Beispiel';
      case 'exercise': return 'Übung';
      case 'quiz': return 'Quiz';
      default: return 'Inhalt';
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'theory': return 'blue';
      case 'example': return 'yellow';
      case 'exercise': return 'green';
      case 'quiz': return 'purple';
      default: return 'gray';
    }
  };

  const handleNextStep = () => {
    const currentStepData = steps[currentStep];
    onStepComplete(currentStepData.id);
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepSelect = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setShowStepList(false);
  };

  const currentStepData = steps[currentStep];
  const StepIcon = getStepIcon(currentStepData.type);
  const stepColor = getStepTypeColor(currentStepData.type);
  const isStepCompleted = completedSteps.includes(currentStepData.id);
  const totalTime = steps.reduce((sum, step) => sum + step.estimatedTime, 0);
  const completedTime = steps
    .filter(step => completedSteps.includes(step.id))
    .reduce((sum, step) => sum + step.estimatedTime, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{totalTime} Min. geschätzt</span>
              </div>
              <div className="flex items-center">
                <CheckSquare className="h-4 w-4 mr-1" />
                <span>{completedSteps.length} / {steps.length} abgeschlossen</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setShowStepList(!showStepList)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Übersicht
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedTime / totalTime) * 100}%` }}
          />
        </div>
      </div>

      {/* Step List Overlay */}
      {showStepList && (
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h3 className="text-lg font-semibold mb-4">Lernschritte</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {steps.map((step, index) => {
              const StepListIcon = getStepIcon(step.type);
              const stepListColor = getStepTypeColor(step.type);
              const isCompleted = completedSteps.includes(step.id);
              const isCurrent = index === currentStep;
              
              return (
                <button
                  key={step.id}
                  onClick={() => handleStepSelect(index)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    isCurrent 
                      ? 'border-blue-500 bg-blue-50' 
                      : isCompleted 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <StepListIcon className={`h-4 w-4 mr-2 text-${stepListColor}-600`} />
                      <span className="font-medium text-sm">{step.title}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded bg-${stepListColor}-100 text-${stepListColor}-700`}>
                        {getStepTypeLabel(step.type)}
                      </span>
                      {isCompleted && (
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    ~{step.estimatedTime} Min.
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Current Step */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        {/* Step Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg bg-${stepColor}-100 mr-3`}>
              <StepIcon className={`h-5 w-5 text-${stepColor}-600`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentStepData.title}</h3>
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span className={`px-2 py-1 rounded bg-${stepColor}-100 text-${stepColor}-700`}>
                  {getStepTypeLabel(currentStepData.type)}
                </span>
                <span>Schritt {currentStep + 1} von {steps.length}</span>
                <span>~{currentStepData.estimatedTime} Min.</span>
              </div>
            </div>
          </div>
          
          {isStepCompleted && (
            <div className="text-green-600 flex items-center">
              <CheckSquare className="h-5 w-5 mr-1" />
              <span className="text-sm font-medium">Abgeschlossen</span>
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="mb-6">
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                ← Vorheriger Schritt
              </button>
            )}
          </div>
          
          <div className="space-x-2">
            {!isStepCompleted && (
              <button
                onClick={handleNextStep}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Als erledigt markieren
                <CheckSquare className="h-4 w-4 ml-2" />
              </button>
            )}
            
            {currentStep < steps.length - 1 && (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Weiter
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
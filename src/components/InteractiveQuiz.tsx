import React, { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Lightbulb, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface InteractiveQuizProps {
  questions: Question[];
  topic: string;
  onComplete: (score: number) => void;
}

const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ questions, topic, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false));

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      onComplete(score);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'green';
      case 'medium': return 'yellow';
      case 'hard': return 'red';
      default: return 'gray';
    }
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Quiz: {topic}</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded bg-${getDifficultyColor(currentQ.difficulty)}-100 text-${getDifficultyColor(currentQ.difficulty)}-700`}>
              {currentQ.difficulty === 'easy' ? 'Einfach' : currentQ.difficulty === 'medium' ? 'Mittel' : 'Schwer'}
            </span>
            <span className="text-sm text-gray-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>

        {/* Score */}
        <div className="text-right text-sm text-gray-600 mb-4">
          Punkte: {score} / {questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          {currentQ.question}
        </h4>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left border-2 rounded-lg transition-all ";
            
            if (showResult) {
              if (index === currentQ.correct) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && index !== currentQ.correct) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-blue-500 bg-blue-50 text-blue-800";
              } else {
                buttonClass += "border-gray-200 hover:border-gray-300 hover:bg-gray-50";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center mr-3 text-sm font-medium">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {showResult && index === currentQ.correct && (
                    <CheckCircle className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                  {showResult && index === selectedAnswer && index !== currentQ.correct && (
                    <XCircle className="h-5 w-5 text-red-600 ml-auto" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <div className="flex items-start">
            <Lightbulb className={`h-5 w-5 mt-0.5 mr-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`} />
            <div>
              <h5 className={`font-medium mb-1 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Richtig!' : 'Falsch!'}
              </h5>
              <p className={`text-sm ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {currentQ.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={resetQuiz}
          className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Neu starten
        </button>

        <div className="space-x-2">
          {!showResult && (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Antworten
            </button>
          )}
          
          {showResult && (
            <button
              onClick={handleNextQuestion}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {currentQuestion < questions.length - 1 ? 'Weiter' : 'Abschließen'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;
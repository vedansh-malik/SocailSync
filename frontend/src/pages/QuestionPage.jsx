// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ChevronLeft, User, Briefcase, Heart, Trophy, Target, Globe, Sparkles, Check } from 'lucide-react';

// const InfluencerQuestionnaire = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const questions = [
//     {
//       id: 'personal_intro',
//       title: "Let's get to know you better!",
//       subtitle: "Tell us about yourself",
//       icon: <User className="w-8 h-8" />,
//       type: 'text',
//       question: "How would you describe yourself in a few words?",
//       placeholder: "e.g., Creative entrepreneur, Tech enthusiast, Fitness coach..."
//     },
//     {
//       id: 'profession',
//       title: "What's your profession?",
//       subtitle: "Your expertise matters",
//       icon: <Briefcase className="w-8 h-8" />,
//       type: 'select',
//       question: "What best describes your professional field?",
//       options: [
//         'Technology & Software',
//         'Marketing & Sales',
//         'Finance & Business',
//         'Healthcare & Medicine',
//         'Education & Training',
//         'Creative & Design',
//         'Fitness & Wellness',
//         'Food & Lifestyle',
//         'Travel & Adventure',
//         'Other'
//       ]
//     },
//     {
//       id: 'content_focus',
//       title: "What do you love sharing?",
//       subtitle: "Your content pillars",
//       icon: <Heart className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "What topics do you enjoy posting about? (Select all that apply)",
//       options: [
//         'Industry insights',
//         'Personal experiences',
//         'Tips & tutorials',
//         'Behind the scenes',
//         'Motivational content',
//         'Product reviews',
//         'Team achievements',
//         'Thought leadership'
//       ]
//     },
//     {
//       id: 'hobbies',
//       title: "What are your hobbies?",
//       subtitle: "Your personal interests",
//       icon: <Sparkles className="w-8 h-8" />,
//       type: 'text',
//       question: "What do you enjoy doing in your free time?",
//       placeholder: "e.g., Reading, Photography, Cooking, Gaming..."
//     },
//     {
//       id: 'sports',
//       title: "Sports & Activities",
//       subtitle: "Stay active, stay inspired",
//       icon: <Trophy className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "Which sports or activities do you follow or participate in?",
//       options: [
//         'Football/Soccer',
//         'Basketball',
//         'Tennis',
//         'Cricket',
//         'Baseball',
//         'Running/Marathon',
//         'Gym/Fitness',
//         'Yoga',
//         'Swimming',
//         'Cycling',
//         'None'
//       ]
//     },
//     {
//       id: 'goals',
//       title: "What are your goals?",
//       subtitle: "Your aspirations drive your content",
//       icon: <Target className="w-8 h-8" />,
//       type: 'select',
//       question: "What's your primary goal with social media?",
//       options: [
//         'Build personal brand',
//         'Generate leads for business',
//         'Share knowledge & teach',
//         'Network with professionals',
//         'Showcase portfolio/work',
//         'Inspire and motivate others'
//       ]
//     },
//     {
//       id: 'audience',
//       title: "Who's your audience?",
//       subtitle: "Know your tribe",
//       icon: <Globe className="w-8 h-8" />,
//       type: 'text',
//       question: "Describe your ideal audience or who you want to reach",
//       placeholder: "e.g., Young entrepreneurs, Working professionals, Students..."
//     }
//   ];

//   useEffect(() => {
//     setProgress(((currentStep + 1) / questions.length) * 100);
//   }, [currentStep]);

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < questions.length - 1) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev + 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev - 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const handleSubmit = () => {
//     console.log('Questionnaire completed:', answers);
//     // Here you would typically send the data to your backend
//     alert('Questionnaire completed! Moving to demo post generation...');
//   };

//   const currentQuestion = questions[currentStep];
//   const currentAnswer = answers[currentQuestion.id];
//   const canProceed = currentAnswer && (
//     (Array.isArray(currentAnswer) && currentAnswer.length > 0) ||
//     (!Array.isArray(currentAnswer) && currentAnswer.trim().length > 0)
//   );

//   const QuestionComponent = ({ question }) => {
//     switch (question.type) {
//       case 'text':
//         return (
//           <textarea
//             className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none bg-white/50 backdrop-blur-sm"
//             rows="4"
//             placeholder={question.placeholder}
//             value={currentAnswer || ''}
//             onChange={(e) => handleAnswer(question.id, e.target.value)}
//           />
//         );
      
//       case 'select':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                   currentAnswer === option
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                 }`}
//                 onClick={() => handleAnswer(question.id, option)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span>{option}</span>
//                   {currentAnswer === option && <Check className="w-5 h-5" />}
//                 </div>
//               </button>
//             ))}
//           </div>
//         );
      
//       case 'multiselect':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => {
//               const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
//               return (
//                 <button
//                   key={index}
//                   className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                     selected
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                   }`}
//                   onClick={() => {
//                     const newAnswer = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
//                     if (selected) {
//                       const filtered = newAnswer.filter(item => item !== option);
//                       handleAnswer(question.id, filtered);
//                     } else {
//                       handleAnswer(question.id, [...newAnswer, option]);
//                     }
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{option}</span>
//                     {selected && <Check className="w-5 h-5" />}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-600">
//               Step {currentStep + 1} of {questions.length}
//             </span>
//             <span className="text-sm font-medium text-gray-600">
//               {Math.round(progress)}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300 ${
//           isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
//         }`}>
//           {/* Header */}
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white">
//               {currentQuestion.icon}
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               {currentQuestion.title}
//             </h2>
//             <p className="text-gray-600">{currentQuestion.subtitle}</p>
//           </div>

//           {/* Question */}
//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">
//               {currentQuestion.question}
//             </h3>
//             <QuestionComponent question={currentQuestion} />
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
//               currentStep === 0
//                 ? 'text-gray-400 cursor-not-allowed'
//                 : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5" />
//             <span>Previous</span>
//           </button>

//           {currentStep === questions.length - 1 ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!canProceed}
//               className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 canProceed
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Complete Setup
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!canProceed}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 canProceed
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <span>Next</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           )}
//         </div>

//         {/* Question Indicators */}
//         <div className="flex justify-center space-x-2 mt-8">
//           {questions.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentStep
//                   ? 'bg-blue-500 scale-125'
//                   : index < currentStep
//                   ? 'bg-green-500'
//                   : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfluencerQuestionnaire;

// import React, { useState, useRef, useEffect } from 'react';
// import { Check } from 'lucide-react';

// const InfluencerQuestionnaire = ({ question, currentAnswer, handleAnswer }) => {
//   const textareaRef = useRef(null);
//   const [inputValue, setInputValue] = useState(currentAnswer || '');

//   // Update local inputValue when prop changes (e.g., navigating questions)
//   useEffect(() => {
//     setInputValue(currentAnswer || '');
//   }, [currentAnswer]);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (question.type === 'text' && textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
//     }
//   }, [inputValue]);

//   if (!question) return null;

//   switch (question.type) {
//     case 'text':
//       return (
//         <textarea
//           ref={textareaRef}
//           className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none bg-white/70 backdrop-blur-sm text-gray-800 text-base leading-relaxed"
//           rows="1"
//           placeholder={question.placeholder}
//           value={inputValue}
//           onChange={(e) => {
//             setInputValue(e.target.value);
//             handleAnswer(question.id, e.target.value);
//           }}
//         />
//       );

//     case 'select':
//       return (
//         <div className="space-y-3">
//           {question.options.map((option, index) => (
//             <button
//               key={index}
//               className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                 currentAnswer === option
//                   ? 'border-blue-500 bg-blue-50 text-blue-700'
//                   : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//               }`}
//               onClick={() => handleAnswer(question.id, option)}
//             >
//               <div className="flex items-center justify-between">
//                 <span>{option}</span>
//                 {currentAnswer === option && <Check className="w-5 h-5" />}
//               </div>
//             </button>
//           ))}
//         </div>
//       );

//     case 'multiselect':
//       return (
//         <div className="space-y-3">
//           {question.options.map((option, index) => {
//             const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
//             return (
//               <button
//                 key={index}
//                 className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                   selected
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                 }`}
//                 onClick={() => {
//                   let newAnswer = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
//                   if (selected) {
//                     newAnswer = newAnswer.filter(item => item !== option);
//                   } else {
//                     newAnswer.push(option);
//                   }
//                   handleAnswer(question.id, newAnswer);
//                 }}
//               >
//                 <div className="flex items-center justify-between">
//                   <span>{option}</span>
//                   {selected && <Check className="w-5 h-5" />}
//                 </div>
//               </button>
//             );
//           })}
//         </div>
//       );

//     default:
//       return null;
//   }
// };



// export default InfluencerQuestionnaire;

// import React, { useState, useEffect } from 'react';
// import { ChevronRight, ChevronLeft, User, Briefcase, Heart, Trophy, Target, Globe, Sparkles, Check } from 'lucide-react';

// const InfluencerQuestionnaire = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState('');
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const questions = [
//     {
//       id: 'personal_intro',
//       title: "Let's get to know you better!",
//       subtitle: "Tell us about yourself",
//       icon: <User className="w-8 h-8" />,
//       type: 'text',
//       question: "How would you describe yourself in a few words?",
//       placeholder: "e.g., Creative entrepreneur, Tech enthusiast, Fitness coach..."
//     },
//     {
//       id: 'profession',
//       title: "What's your profession?",
//       subtitle: "Your expertise matters",
//       icon: <Briefcase className="w-8 h-8" />,
//       type: 'select',
//       question: "What best describes your professional field?",
//       options: [
//         'Technology & Software',
//         'Marketing & Sales',
//         'Finance & Business',
//         'Healthcare & Medicine',
//         'Education & Training',
//         'Creative & Design',
//         'Fitness & Wellness',
//         'Food & Lifestyle',
//         'Travel & Adventure',
//         'Other'
//       ]
//     },
//     {
//       id: 'content_focus',
//       title: "What do you love sharing?",
//       subtitle: "Your content pillars",
//       icon: <Heart className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "What topics do you enjoy posting about? (Select all that apply)",
//       options: [
//         'Industry insights',
//         'Personal experiences',
//         'Tips & tutorials',
//         'Behind the scenes',
//         'Motivational content',
//         'Product reviews',
//         'Team achievements',
//         'Thought leadership'
//       ]
//     },
//     {
//       id: 'hobbies',
//       title: "What are your hobbies?",
//       subtitle: "Your personal interests",
//       icon: <Sparkles className="w-8 h-8" />,
//       type: 'text',
//       question: "What do you enjoy doing in your free time?",
//       placeholder: "e.g., Reading, Photography, Cooking, Gaming..."
//     },
//     {
//       id: 'sports',
//       title: "Sports & Activities",
//       subtitle: "Stay active, stay inspired",
//       icon: <Trophy className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "Which sports or activities do you follow or participate in?",
//       options: [
//         'Football/Soccer',
//         'Basketball',
//         'Tennis',
//         'Cricket',
//         'Baseball',
//         'Running/Marathon',
//         'Gym/Fitness',
//         'Yoga',
//         'Swimming',
//         'Cycling',
//         'None'
//       ]
//     },
//     {
//       id: 'goals',
//       title: "What are your goals?",
//       subtitle: "Your aspirations drive your content",
//       icon: <Target className="w-8 h-8" />,
//       type: 'select',
//       question: "What's your primary goal with social media?",
//       options: [
//         'Build personal brand',
//         'Generate leads for business',
//         'Share knowledge & teach',
//         'Network with professionals',
//         'Showcase portfolio/work',
//         'Inspire and motivate others'
//       ]
//     },
//     {
//       id: 'audience',
//       title: "Who's your audience?",
//       subtitle: "Know your tribe",
//       icon: <Globe className="w-8 h-8" />,
//       type: 'text',
//       question: "Describe your ideal audience or who you want to reach",
//       placeholder: "e.g., Young entrepreneurs, Working professionals, Students..."
//     }
//   ];

//   useEffect(() => {
//     setProgress(((currentStep + 1) / questions.length) * 100);
//   }, [currentStep]);

//   const currentQuestion = questions[currentStep];
//   const currentAnswer = answers[currentQuestion.id];

//   const isAnswerValid = (answer) => {
//     return answer && (
//       (Array.isArray(answer) && answer.length > 0) ||
//       (!Array.isArray(answer) && answer.trim().length > 0)
//     );
//   };

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < questions.length - 1) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev + 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev - 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const handleSubmit = () => {
//     console.log('Questionnaire completed:', answers);
//     alert('Questionnaire completed! Moving to demo post generation...');
//   };

//   const QuestionComponent = ({ question }) => {
//     switch (question.type) {
//       case 'text':
//         return (
//           <textarea
//             className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none bg-white/50 backdrop-blur-sm"
//             rows="4"
//             placeholder={question.placeholder}
//             autoFocus
//             value={currentAnswer || ''}
//             onChange={(e) => handleAnswer(question.id, e.target.value)}
//             onFocus={(e) => e.stopPropagation()}
//           />
//         );

//       case 'select':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                   currentAnswer === option
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                 }`}
//                 onClick={() => handleAnswer(question.id, option)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span>{option}</span>
//                   {currentAnswer === option && <Check className="w-5 h-5" />}
//                 </div>
//               </button>
//             ))}
//           </div>
//         );

//       case 'multiselect':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => {
//               const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
//               return (
//                 <button
//                   key={index}
//                   className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                     selected
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                   }`}
//                   onClick={() => {
//                     const newAnswer = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
//                     if (selected) {
//                       handleAnswer(question.id, newAnswer.filter(item => item !== option));
//                     } else {
//                       handleAnswer(question.id, [...newAnswer, option]);
//                     }
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{option}</span>
//                     {selected && <Check className="w-5 h-5" />}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-600">
//               Step {currentStep + 1} of {questions.length}
//             </span>
//             <span className="text-sm font-medium text-gray-600">
//               {Math.round(progress)}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         {/* Question Card */}
//         <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300 ${
//           isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
//         }`}>
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white">
//               {currentQuestion.icon}
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               {currentQuestion.title}
//             </h2>
//             <p className="text-gray-600">{currentQuestion.subtitle}</p>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">
//               {currentQuestion.question}
//             </h3>
//             <QuestionComponent question={currentQuestion} />
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
//               currentStep === 0
//                 ? 'text-gray-400 cursor-not-allowed'
//                 : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5" />
//             <span>Previous</span>
//           </button>

//           {currentStep === questions.length - 1 ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!isAnswerValid(currentAnswer)}
//               className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 isAnswerValid(currentAnswer)
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Complete Setup
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!isAnswerValid(currentAnswer)}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 isAnswerValid(currentAnswer)
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <span>Next</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           )}
//         </div>

//         {/* Indicators */}
//         <div className="flex justify-center space-x-2 mt-8">
//           {questions.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentStep
//                   ? 'bg-blue-500 scale-125'
//                   : index < currentStep
//                   ? 'bg-green-500'
//                   : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfluencerQuestionnaire;


// import React, { useState, useEffect } from 'react';
// import {
//   ChevronRight,
//   ChevronLeft,
//   User,
//   Briefcase,
//   Heart,
//   Trophy,
//   Target,
//   Globe,
//   Sparkles,
//   Check
// } from 'lucide-react';

// const InfluencerQuestionnaire = () => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const questions = [
//     {
//       id: 'personal_intro',
//       title: "Let's get to know you better!",
//       subtitle: "Tell us about yourself",
//       icon: <User className="w-8 h-8" />,
//       type: 'text',
//       question: "How would you describe yourself in a few words?",
//       placeholder: "e.g., Creative entrepreneur, Tech enthusiast, Fitness coach..."
//     },
//     {
//       id: 'profession',
//       title: "What's your profession?",
//       subtitle: "Your expertise matters",
//       icon: <Briefcase className="w-8 h-8" />,
//       type: 'select',
//       question: "What best describes your professional field?",
//       options: [
//         'Technology & Software',
//         'Marketing & Sales',
//         'Finance & Business',
//         'Healthcare & Medicine',
//         'Education & Training',
//         'Creative & Design',
//         'Fitness & Wellness',
//         'Food & Lifestyle',
//         'Travel & Adventure',
//         'Other'
//       ]
//     },
//     {
//       id: 'content_focus',
//       title: "What do you love sharing?",
//       subtitle: "Your content pillars",
//       icon: <Heart className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "What topics do you enjoy posting about? (Select all that apply)",
//       options: [
//         'Industry insights',
//         'Personal experiences',
//         'Tips & tutorials',
//         'Behind the scenes',
//         'Motivational content',
//         'Product reviews',
//         'Team achievements',
//         'Thought leadership'
//       ]
//     },
//     {
//       id: 'hobbies',
//       title: "What are your hobbies?",
//       subtitle: "Your personal interests",
//       icon: <Sparkles className="w-8 h-8" />,
//       type: 'text',
//       question: "What do you enjoy doing in your free time?",
//       placeholder: "e.g., Reading, Photography, Cooking, Gaming..."
//     },
//     {
//       id: 'sports',
//       title: "Sports & Activities",
//       subtitle: "Stay active, stay inspired",
//       icon: <Trophy className="w-8 h-8" />,
//       type: 'multiselect',
//       question: "Which sports or activities do you follow or participate in?",
//       options: [
//         'Football/Soccer',
//         'Basketball',
//         'Tennis',
//         'Cricket',
//         'Baseball',
//         'Running/Marathon',
//         'Gym/Fitness',
//         'Yoga',
//         'Swimming',
//         'Cycling',
//         'None'
//       ]
//     },
//     {
//       id: 'goals',
//       title: "What are your goals?",
//       subtitle: "Your aspirations drive your content",
//       icon: <Target className="w-8 h-8" />,
//       type: 'select',
//       question: "What's your primary goal with social media?",
//       options: [
//         'Build personal brand',
//         'Generate leads for business',
//         'Share knowledge & teach',
//         'Network with professionals',
//         'Showcase portfolio/work',
//         'Inspire and motivate others'
//       ]
//     },
//     {
//       id: 'audience',
//       title: "Who's your audience?",
//       subtitle: "Know your tribe",
//       icon: <Globe className="w-8 h-8" />,
//       type: 'text',
//       question: "Describe your ideal audience or who you want to reach",
//       placeholder: "e.g., Young entrepreneurs, Working professionals, Students..."
//     }
//   ];

//   useEffect(() => {
//     setProgress(((currentStep + 1) / questions.length) * 100);
//   }, [currentStep]);

//   const currentQuestion = questions[currentStep];
//   const currentAnswer = answers[currentQuestion.id] || (currentQuestion.type === 'multiselect' ? [] : '');

//   const isAnswerValid = (answer) => {
//     return answer && (
//       (Array.isArray(answer) && answer.length > 0) ||
//       (!Array.isArray(answer) && answer.trim().length > 0)
//     );
//   };

//   const handleAnswer = (questionId, answer) => {
//     setAnswers(prev => ({
//       ...prev,
//       [questionId]: answer
//     }));
//   };

//   const nextStep = () => {
//     if (currentStep < questions.length - 1) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev + 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 0) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setCurrentStep(prev => prev - 1);
//         setIsAnimating(false);
//       }, 300);
//     }
//   };

//   const handleSubmit = () => {
//     // console.log('Questionnaire completed:', answers);
//       fetch('http://localhost:5000/api/auth/questions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(answers)
//       })
//       .then(res => res.json())
//       .then(data => {
//         console.log('✅ Submitted:', data);
//         alert('Submitted successfully!');
//       })
//       .catch(err => {
//         console.error('❌ Submit failed:', err);
//       });

//     alert('Questionnaire completed! Moving to demo post generation...');
//   };

//   const QuestionComponent = ({ question }) => {
//     switch (question.type) {
//       case 'text':
//         return (
//           <textarea
//             className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none bg-white/50 backdrop-blur-sm"
//             rows="4"
//             placeholder={question.placeholder}
//             value={answers[question.id] || ''}
//             onChange={(e) => handleAnswer(question.id, e.target.value)}
//           />
//         );

//       case 'select':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => (
//               <button
//                 key={index}
//                 className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                   currentAnswer === option
//                     ? 'border-blue-500 bg-blue-50 text-blue-700'
//                     : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                 }`}
//                 onClick={() => handleAnswer(question.id, option)}
//               >
//                 <div className="flex items-center justify-between">
//                   <span>{option}</span>
//                   {currentAnswer === option && <Check className="w-5 h-5" />}
//                 </div>
//               </button>
//             ))}
//           </div>
//         );

//       case 'multiselect':
//         return (
//           <div className="space-y-3">
//             {question.options.map((option, index) => {
//               const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
//               return (
//                 <button
//                   key={index}
//                   className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
//                     selected
//                       ? 'border-blue-500 bg-blue-50 text-blue-700'
//                       : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
//                   }`}
//                   onClick={() => {
//                     const newAnswer = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
//                     if (selected) {
//                       handleAnswer(question.id, newAnswer.filter(item => item !== option));
//                     } else {
//                       handleAnswer(question.id, [...newAnswer, option]);
//                     }
//                   }}
//                 >
//                   <div className="flex items-center justify-between">
//                     <span>{option}</span>
//                     {selected && <Check className="w-5 h-5" />}
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
//       <div className="max-w-2xl mx-auto">
//         <div className="mb-8">
//           <div className="flex justify-between items-center mb-2">
//             <span className="text-sm font-medium text-gray-600">
//               Step {currentStep + 1} of {questions.length}
//             </span>
//             <span className="text-sm font-medium text-gray-600">
//               {Math.round(progress)}% Complete
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2">
//             <div
//               className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         </div>

//         <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300 ${
//           isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
//         }`}>
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white">
//               {currentQuestion.icon}
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800 mb-2">
//               {currentQuestion.title}
//             </h2>
//             <p className="text-gray-600">{currentQuestion.subtitle}</p>
//           </div>

//           <div className="mb-8">
//             <h3 className="text-lg font-semibold text-gray-800 mb-6">
//               {currentQuestion.question}
//             </h3>
//             <QuestionComponent question={currentQuestion} />
//           </div>
//         </div>

//         <div className="flex justify-between items-center">
//           <button
//             onClick={prevStep}
//             disabled={currentStep === 0}
//             className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
//               currentStep === 0
//                 ? 'text-gray-400 cursor-not-allowed'
//                 : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
//             }`}
//           >
//             <ChevronLeft className="w-5 h-5" />
//             <span>Previous</span>
//           </button>

//           {currentStep === questions.length - 1 ? (
//             <button
//               onClick={handleSubmit}
//               disabled={!isAnswerValid(currentAnswer)}
//               className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 isAnswerValid(currentAnswer)
//                   ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               Complete Setup
//             </button>
//           ) : (
//             <button
//               onClick={nextStep}
//               disabled={!isAnswerValid(currentAnswer)}
//               className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
//                 isAnswerValid(currentAnswer)
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
//                   : 'bg-gray-300 text-gray-500 cursor-not-allowed'
//               }`}
//             >
//               <span>Next</span>
//               <ChevronRight className="w-5 h-5" />
//             </button>
//           )}
//         </div>

//         <div className="flex justify-center space-x-2 mt-8">
//           {questions.map((_, index) => (
//             <div
//               key={index}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentStep
//                   ? 'bg-blue-500 scale-125'
//                   : index < currentStep
//                   ? 'bg-green-500'
//                   : 'bg-gray-300'
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InfluencerQuestionnaire;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosInstance';
import {
  ChevronRight,
  ChevronLeft,
  User,
  Briefcase,
  Heart,
  Trophy,
  Target,
  Globe,
  Sparkles,
  Check
} from 'lucide-react';


const InfluencerQuestionnaire = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const questions = [
    {
      id: 'personalIntro',
      title: "Let's get to know you better!",
      subtitle: "Tell us about yourself",
      icon: <User className="w-8 h-8" />,
      type: 'text',
      question: "How would you describe yourself in a few words?",
      placeholder: "e.g., Creative entrepreneur, Tech enthusiast, Fitness coach..."
    },
    {
      id: 'whatYouDo',
      title: "What's your profession?",
      subtitle: "Your expertise matters",
      icon: <Briefcase className="w-8 h-8" />,
      type: 'select',
      question: "What best describes your professional field?",
      options: [
        'Technology & Software',
        'Marketing & Sales',
        'Finance & Business',
        'Healthcare & Medicine',
        'Education & Training',
        'Creative & Design',
        'Fitness & Wellness',
        'Food & Lifestyle',
        'Travel & Adventure',
        'Other'
      ]
    },
    {
      id: 'wantToBeKnownFor',
      title: "What do you love sharing?",
      subtitle: "Your content pillars",
      icon: <Heart className="w-8 h-8" />,
      type: 'multiselect',
      question: "What topics do you enjoy posting about? (Select all that apply)",
      options: [
        'Industry insights',
        'Personal experiences',
        'Tips & tutorials',
        'Behind the scenes',
        'Motivational content',
        'Product reviews',
        'Team achievements',
        'Thought leadership'
      ]
    },
    {
      id: 'hobbies',
      title: "What are your hobbies?",
      subtitle: "Your personal interests",
      icon: <Sparkles className="w-8 h-8" />,
      type: 'text',
      question: "What do you enjoy doing in your free time?",
      placeholder: "e.g., Reading, Photography, Cooking, Gaming..."
    },
    {
      id: 'sports',
      title: "Sports & Activities",
      subtitle: "Stay active, stay inspired",
      icon: <Trophy className="w-8 h-8" />,
      type: 'multiselect',
      question: "Which sports or activities do you follow or participate in?",
      options: [
        'Football/Soccer',
        'Basketball',
        'Tennis',
        'Cricket',
        'Baseball',
        'Running/Marathon',
        'Gym/Fitness',
        'Yoga',
        'Swimming',
        'Cycling',
        'None'
      ]
    },
    {
      id: 'goal',
      title: "What are your goals?",
      subtitle: "Your aspirations drive your content",
      icon: <Target className="w-8 h-8" />,
      type: 'select',
      question: "What's your primary goal with social media?",
      options: [
        'Build personal brand',
        'Generate leads for business',
        'Share knowledge & teach',
        'Network with professionals',
        'Showcase portfolio/work',
        'Inspire and motivate others'
      ]
    },
    {
      id: 'audience',
      title: "Who's your audience?",
      subtitle: "Know your tribe",
      icon: <Globe className="w-8 h-8" />,
      type: 'text',
      question: "Describe your ideal audience or who you want to reach",
      placeholder: "e.g., Young entrepreneurs, Working professionals, Students..."
    }
  ];

  useEffect(() => {
    setProgress(((currentStep + 1) / questions.length) * 100);
  }, [currentStep]);

  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id] || (currentQuestion.type === 'multiselect' ? [] : '');

  const isAnswerValid = (answer) => {
    return answer && (
      (Array.isArray(answer) && answer.length > 0) ||
      (!Array.isArray(answer) && answer.trim().length > 0)
    );
  };

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/auth/questions', answers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });      
      console.log('✅ Submitted:', res.data);
      alert('Questionnaire submitted! Redirecting to demo post generation...');
      navigate('/demo');
    } catch (err) {
      console.error('❌ Submit failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  const QuestionComponent = ({ question }) => {
    switch (question.type) {
      case 'text':
        return (
          <textarea
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none bg-white/50 backdrop-blur-sm"
            rows="4"
            placeholder={question.placeholder}
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswer(question.id, e.target.value)}
          />
        );

      case 'select':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  currentAnswer === option
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
                }`}
                onClick={() => handleAnswer(question.id, option)}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {currentAnswer === option && <Check className="w-5 h-5" />}
                </div>
              </button>
            ))}
          </div>
        );

      case 'multiselect':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const selected = Array.isArray(currentAnswer) && currentAnswer.includes(option);
              return (
                <button
                  key={index}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                    selected
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white/50 backdrop-blur-sm hover:border-gray-300'
                  }`}
                  onClick={() => {
                    const newAnswer = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
                    if (selected) {
                      handleAnswer(question.id, newAnswer.filter(item => item !== option));
                    } else {
                      handleAnswer(question.id, [...newAnswer, option]);
                    }
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selected && <Check className="w-5 h-5" />}
                  </div>
                </button>
              );
            })}
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className={`bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-6 transition-all duration-300 ${
          isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
        }`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 text-white">
              {currentQuestion.icon}
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {currentQuestion.title}
            </h2>
            <p className="text-gray-600">{currentQuestion.subtitle}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {currentQuestion.question}
            </h3>
            <QuestionComponent question={currentQuestion} />
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {currentStep === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isAnswerValid(currentAnswer)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isAnswerValid(currentAnswer)
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Complete Setup
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isAnswerValid(currentAnswer)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isAnswerValid(currentAnswer)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'bg-blue-500 scale-125'
                  : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfluencerQuestionnaire;

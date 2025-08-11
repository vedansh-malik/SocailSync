// import React, { useState, useEffect } from 'react';
// import { 
//   Sparkles, 
//   RefreshCw, 
//   Copy, 
//   Check, 
//   Heart, 
//   MessageCircle, 
//   Share2, 
//   Eye,
//   User,
//   Briefcase,
//   Target,
//   Zap,
//   TrendingUp,
//   Calendar,
//   Settings,
//   ThumbsUp,
//   Linkedin,
//   Clock,
//   AlertCircle,
//   Wand2
// } from 'lucide-react';

// const PostGenerator = () => {
//   const [userData, setUserData] = useState({
//     personalIntro: "Passionate software developer and tech enthusiast",
//     profession: "Full Stack Developer",
//     contentFocus: ["Technology", "Career Growth", "Web Development"],
//     hobbies: "Reading tech blogs, contributing to open source",
//     sports: ["Basketball", "Swimming"],
//     goals: "Help other developers grow their careers",
//     audience: "Software developers and tech professionals"
//   });

//   const [currentPost, setCurrentPost] = useState(null);
//   const [currentStyle, setCurrentStyle] = useState('professional');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [error, setError] = useState(null);
//   const [generationHistory, setGenerationHistory] = useState([]);

//   const styles = [
//     { 
//       id: 'professional', 
//       name: 'Professional', 
//       icon: Briefcase,
//       description: 'Industry insights & expert advice',
//       color: 'bg-blue-500'
//     },
//     { 
//       id: 'casual', 
//       name: 'Casual', 
//       icon: User,
//       description: 'Conversational & relatable',
//       color: 'bg-green-500'
//     },
//     { 
//       id: 'storytelling', 
//       name: 'Storytelling', 
//       icon: Zap,
//       description: 'Compelling narratives & lessons',
//       color: 'bg-purple-500'
//     }
//   ];

//   const generatePost = async (style = currentStyle) => {
//     setIsGenerating(true);
//     setError(null);
    
//     try {
//       const response = await fetch('/api/generate-post', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('authToken') || ''}` // Optional auth
//         },
//         body: JSON.stringify({
//           userData: userData,
//           style: style,
//           platform: 'linkedin'
//         })
//       });

//       const data = await response.json();

//       if (data.success) {
//         setCurrentPost(data.data);
//         setCurrentStyle(style);
//         // Add to history
//         setGenerationHistory(prev => [{
//           ...data.data,
//           id: Date.now(),
//           timestamp: new Date().toISOString()
//         }, ...prev.slice(0, 4)]);
//       } else {
//         setError(data.message || 'Failed to generate post');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//       console.error('Generation error:', err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const copyToClipboard = async () => {
//     if (currentPost?.content) {
//       try {
//         await navigator.clipboard.writeText(currentPost.content);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       } catch (err) {
//         console.error('Failed to copy:', err);
//       }
//     }
//   };

//   const formatNumber = (num) => {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toString();
//   };

//   const handleSatisfied = () => {
//     // Save user approval
//     fetch('/api/save-demo-approval', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         postId: currentPost?.id || Date.now(),
//         approved: true,
//         content: currentPost?.content,
//         style: currentStyle,
//         timestamp: new Date().toISOString()
//       })
//     }).catch(console.error);

//     alert('Great! Moving to scheduling page...');
//     // In real app, navigate to scheduling component
//     // router.push('/schedule') or similar
//   };

//   const LoadingAnimation = () => (
//     <div className="flex flex-col items-center justify-center py-16">
//       <div className="relative">
//         <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500"></div>
//         <Wand2 className="w-8 h-8 text-blue-500 absolute top-4 left-4 animate-pulse" />
//       </div>
//       <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">AI is Creating Your Perfect Post</h3>
//       <p className="text-gray-600 text-center max-w-md">
//         Our AI is analyzing your profile and crafting personalized content that matches your <span className="font-medium capitalize text-blue-600">{currentStyle}</span> style...
//       </p>
//       <div className="flex items-center space-x-2 mt-4 text-sm text-gray-500">
//         <div className="flex space-x-1">
//           <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
//           <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//           <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//         </div>
//         <span>Generating with Gemini AI...</span>
//       </div>
//     </div>
//   );

//   const LinkedInPostPreview = () => (
//     <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
//       <div className="p-6">
//         <div className="flex items-start gap-4 mb-4">
//           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
//             {userData.personalIntro.charAt(0).toUpperCase()}
//           </div>
//           <div className="flex-1">
//             <div className="flex items-center gap-2">
//               <h3 className="font-semibold text-gray-900">Your Name</h3>
//               <span className="text-sm text-gray-500">• 1st</span>
//             </div>
//             <p className="text-sm text-gray-600">{userData.profession}</p>
//             <div className="flex items-center text-xs text-gray-500 mt-1">
//               <Clock className="w-3 h-3 mr-1" />
//               <span>Just now</span>
//               <span className="mx-1">•</span>
//               <Linkedin className="w-3 h-3 mr-1" />
//             </div>
//           </div>
//         </div>
        
//         <div className="text-gray-800 whitespace-pre-wrap leading-relaxed mb-4">
//           {currentPost.content}
//         </div>
//       </div>
      
//       <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-6 text-gray-600">
//             <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors group">
//               <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//                 <Heart className="w-5 h-5" />
//               </div>
//               <span className="text-sm font-medium">{formatNumber(currentPost.metrics.likes)}</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors group">
//               <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//                 <MessageCircle className="w-5 h-5" />
//               </div>
//               <span className="text-sm font-medium">{currentPost.metrics.comments}</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-blue-600 transition-colors group">
//               <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//                 <Share2 className="w-5 h-5" />
//               </div>
//               <span className="text-sm font-medium">{currentPost.metrics.shares}</span>
//             </button>
//           </div>
//           <div className="text-sm text-gray-500">
//             {formatNumber(currentPost.metrics.views)} views
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   useEffect(() => {
//     // Load initial post
//     generatePost();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8 max-w-6xl">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="flex items-center justify-center gap-3 mb-6">
//             <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
//               <Sparkles className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Your AI-Generated Demo Post
//             </h1>
//           </div>
//           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//             Powered by Gemini AI - Creating personalized content that matches your unique style and resonates with your audience
//           </p>
//         </div>

//         {/* User Profile Summary */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
//           <div className="flex items-center gap-3 mb-6">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <User className="w-5 h-5 text-blue-600" />
//             </div>
//             <h2 className="text-xl font-semibold text-gray-800">Your Profile Summary</h2>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
//             <div className="bg-white/50 rounded-lg p-4">
//               <span className="font-medium text-gray-600 flex items-center gap-2 mb-2">
//                 <Briefcase className="w-4 h-4" />
//                 Profession
//               </span>
//               <span className="text-gray-800 font-medium">{userData.profession}</span>
//             </div>
//             <div className="bg-white/50 rounded-lg p-4">
//               <span className="font-medium text-gray-600 flex items-center gap-2 mb-2">
//                 <Target className="w-4 h-4" />
//                 Goal
//               </span>
//               <span className="text-gray-800 font-medium">{userData.goals}</span>
//             </div>
//             <div className="bg-white/50 rounded-lg p-4">
//               <span className="font-medium text-gray-600 flex items-center gap-2 mb-2">
//                 <User className="w-4 h-4" />
//                 Audience
//               </span>
//               <span className="text-gray-800 font-medium">{userData.audience}</span>
//             </div>
//             <div className="bg-white/50 rounded-lg p-4">
//               <span className="font-medium text-gray-600 flex items-center gap-2 mb-2">
//                 <Zap className="w-4 h-4" />
//                 Style
//               </span>
//               <span className="text-gray-800 font-medium capitalize">{currentStyle}</span>
//             </div>
//           </div>

//           <div className="mt-4">
//             <span className="font-medium text-gray-600 mb-2 block">Focus Areas:</span>
//             <div className="flex flex-wrap gap-2">
//               {userData.contentFocus.map((focus, index) => (
//                 <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                   {focus}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-center space-x-3">
//             <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
//             <div className="text-red-700">{error}</div>
//           </div>
//         )}

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Left Sidebar - Recent History */}
//           <div className="lg:col-span-1">
//             {generationHistory.length > 0 && (
//               <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
//                   <Calendar className="w-5 h-5" />
//                   Recent Posts
//                 </h3>
//                 <div className="space-y-3">
//                   {generationHistory.slice(0, 3).map((post, index) => (
//                     <div key={post.id} className="p-3 bg-white/60 rounded-lg border border-gray-200">
//                       <p className="text-sm text-gray-600 line-clamp-2 mb-2">
//                         {post.content.substring(0, 80)}...
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">{post.style}</span>
//                         <div className="flex items-center gap-3 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Heart className="w-3 h-3" />
//                             {formatNumber(post.metrics.likes)}
//                           </span>
//                           <span className="flex items-center gap-1">
//                             <MessageCircle className="w-3 h-3" />
//                             {post.metrics.comments}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Main Content */}
//           <div className="lg:col-span-3 space-y-8">
//             {/* Style Selection */}
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
//                 <TrendingUp className="w-5 h-5" />
//                 Choose Your Style
//               </h2>
              
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                 {styles.map((style) => {
//                   const IconComponent = style.icon;
//                   const isActive = currentStyle === style.id;
                  
//                   return (
//                     <button
//                       key={style.id}
//                       onClick={() => generatePost(style.id)}
//                       disabled={isGenerating}
//                       className={`p-4 rounded-xl border-2 transition-all duration-200 ${
//                         isActive 
//                           ? 'border-blue-500 bg-blue-50 shadow-md' 
//                           : 'border-gray-200 bg-white/50 hover:border-gray-300 hover:shadow-sm'
//                       } ${isGenerating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
//                     >
//                       <div className="flex flex-col items-center text-center">
//                         <div className={`p-3 rounded-lg mb-3 ${style.color} ${isActive ? 'opacity-100' : 'opacity-70'}`}>
//                           <IconComponent className="w-6 h-6 text-white" />
//                         </div>
//                         <h3 className={`font-semibold mb-1 ${isActive ? 'text-blue-700' : 'text-gray-800'}`}>
//                           {style.name}
//                         </h3>
//                         <p className="text-sm text-gray-600">{style.description}</p>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Generated Post */}
//             <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//               <div className="p-6 border-b border-gray-100">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
//                     <Sparkles className="w-5 h-5 text-purple-500" />
//                     Preview Your AI-Generated Post
//                   </h2>
                  
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => generatePost(currentStyle)}
//                       disabled={isGenerating}
//                       className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 disabled:opacity-50"
//                     >
//                       <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
//                       {isGenerating ? 'Generating...' : 'Try Different Style'}
//                     </button>
                    
//                     {currentPost && (
//                       <button
//                         onClick={copyToClipboard}
//                         className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200"
//                       >
//                         {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
//                         {copied ? 'Copied!' : 'Copy'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {isGenerating ? (
//                   <LoadingAnimation />
//                 ) : currentPost ? (
//                   <div>
//                     {/* Platform Preview */}
//                     <div className="flex space-x-2 mb-4">
//                       <div className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
//                         <Linkedin className="w-4 h-4" />
//                         <span>LinkedIn Preview</span>
//                       </div>
//                       <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
//                         <span className="capitalize">{currentStyle} Style</span>
//                       </div>
//                     </div>

//                     <LinkedInPostPreview />

//                     {/* Post Stats */}
//                     <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-200">
//                       <div className="flex items-center gap-4 text-sm text-gray-600">
//                         <span className="flex items-center gap-1">
//                           <span className="font-medium">Words:</span>
//                           <span>{currentPost.wordCount}</span>
//                         </span>
//                         <span className="flex items-center gap-1">
//                           <span className="font-medium">Generated:</span>
//                           <span>{new Date(currentPost.generatedAt).toLocaleTimeString()}</span>
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center justify-center py-12">
//                     <div className="text-center">
//                       <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                       <p className="text-gray-600 text-lg">Click a style above to generate your first post!</p>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Action Buttons */}
//             {currentPost && (
//               <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6">
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">What's next?</h3>
//                 <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//                   <button
//                     onClick={() => generatePost(currentStyle)}
//                     disabled={isGenerating}
//                     className="flex items-center justify-center gap-2 px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 disabled:opacity-50"
//                   >
//                     <RefreshCw className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
//                     <span>Generate New Post</span>
//                   </button>
                  
//                   <button
//                     onClick={handleSatisfied}
//                     className="flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
//                   >
//                     <ThumbsUp className="w-5 h-5" />
//                     <span>I'm Satisfied - Continue</span>
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Features Preview */}
//             {currentPost && (
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                     <Calendar className="w-6 h-6 text-blue-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Smart Scheduling</h3>
//                   <p className="text-sm text-gray-600">Post at optimal times for maximum engagement</p>
//                 </div>
                
//                 <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
//                   <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                     <Sparkles className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Gemini AI Powered</h3>
//                   <p className="text-sm text-gray-600">Advanced AI creates content tailored to your voice</p>
//                 </div>
                
//                 <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 text-center">
//                   <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//                     <Share2 className="w-6 h-6 text-green-600" />
//                   </div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Multi-Platform</h3>
//                   <p className="text-sm text-gray-600">Post simultaneously on LinkedIn and Twitter</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-12 py-8 border-t border-gray-200">
//           <p className="text-gray-600">
//             Powered by <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Gemini AI</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PostGenerator;

// import React, { useState, useEffect } from 'react';
// import {
//   Sparkles,
//   RefreshCw,
//   Copy,
//   Check,
//   Heart,
//   MessageCircle,
//   Share2,
//   Eye,
//   User,
//   Briefcase,
//   Target,
//   Zap,
//   TrendingUp,
//   Calendar,
//   Settings,
//   ThumbsUp,
//   Linkedin,
//   Clock,
//   AlertCircle,
//   Wand2
// } from 'lucide-react';
// import axios from '../utils/axiosInstance';

// const PostGenerator = () => {
//   const [currentPost, setCurrentPost] = useState(null);
//   const [currentStyle, setCurrentStyle] = useState('professional');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [error, setError] = useState(null);
//   const [generationHistory, setGenerationHistory] = useState([]);

//   const styles = [
//     {
//       id: 'professional',
//       name: 'Professional',
//       icon: Briefcase,
//       description: 'Industry insights & expert advice',
//       color: 'bg-blue-500'
//     },
//     {
//       id: 'casual',
//       name: 'Casual',
//       icon: User,
//       description: 'Conversational & relatable',
//       color: 'bg-green-500'
//     },
//     {
//       id: 'storytelling',
//       name: 'Storytelling',
//       icon: Zap,
//       description: 'Compelling narratives & lessons',
//       color: 'bg-purple-500'
//     }
//   ];

//   const generatePost = async (style = currentStyle) => {
//     setIsGenerating(true);
//     setError(null);
  
//     try {
//       const response = await axios.post('/generate-post', {
//         style: style
//       });
  
//       const data = response.data;
  
//       if (data.success) {
//         setCurrentPost(data.data);
//         setCurrentStyle(style);
//         setGenerationHistory(prev => [
//           {
//             ...data.data,
//             id: Date.now(),
//             timestamp: new Date().toISOString()
//           },
//           ...prev.slice(0, 4)
//         ]);
//       } else {
//         setError(data.message || 'Failed to generate post');
//       }
//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//       console.error('Generation error:', err);
//     } finally {
//       setIsGenerating(false);
//     }
//   };
  

//   const copyToClipboard = async () => {
//     if (currentPost?.content) {
//       try {
//         await navigator.clipboard.writeText(currentPost.content);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//       } catch (err) {
//         console.error('Failed to copy:', err);
//       }
//     }
//   };

//   useEffect(() => {
//     generatePost();
//   }, []);

//   if (!currentPost?.userData) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="text-center">
//           <Wand2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
//           <p className="text-gray-600">Generating post...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold text-center mb-6">AI Generated LinkedIn Post</h1>

//       <div className="mb-4">
//         <h2 className="font-semibold text-lg">Profile Info:</h2>
//         <p><strong>Profession:</strong> {currentPost.userData.profession}</p>
//         <p><strong>Goal:</strong> {currentPost.userData.goals}</p>
//         <p><strong>Audience:</strong> {currentPost.userData.audience}</p>
//         <p><strong>Content Focus:</strong> {currentPost.userData.contentFocus?.join(', ')}</p>
//       </div>

//       <div className="mb-4 p-4 border rounded bg-white shadow">
//         <h2 className="font-semibold text-lg mb-2">Generated Post</h2>
//         <p className="whitespace-pre-wrap text-gray-800">{currentPost.content}</p>
//         <p className="mt-2 text-sm text-gray-500">Generated at: {new Date(currentPost.generatedAt).toLocaleString()}</p>
//       </div>

//       <div className="flex gap-4">
//         <button onClick={() => generatePost(currentStyle)} disabled={isGenerating} className="px-4 py-2 bg-blue-600 text-white rounded">
//           {isGenerating ? 'Generating...' : 'Regenerate'}
//         </button>
//         <button onClick={copyToClipboard} className="px-4 py-2 bg-gray-200 rounded">
//           {copied ? 'Copied!' : 'Copy to Clipboard'}
//         </button>
//       </div>

//       {error && <p className="text-red-500 mt-4">{error}</p>}
//     </div>
//   );
// };

// export default PostGenerator;


import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Wand2
} from 'lucide-react';
import axios from '../utils/axiosInstance';

const DemoPage = () => {
  const [post, setPost] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [style, setStyle] = useState('professional'); // default style

  const fetchGeneratedPost = async () => {
    setIsGenerating(true);
    setError('');
    try {
      const response = await axios.post('/auth/postgenerate', { style });
      const data = response.data;
      if (data.success) {
        setPost(data.data);
      } else {
        setError(data.message || 'Failed to generate post.');
      }
    } catch (err) {
      setError('Something went wrong while generating the post.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    if (post?.content) {
      try {
        await navigator.clipboard.writeText(post.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Copy failed:', err);
      }
    }
  };

  useEffect(() => {
    fetchGeneratedPost();
  }, []);

  if (isGenerating || !post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <Wand2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Generating your personalized post...</p>
        </div>
      </div>
    );
  }

  const { userData, content, generatedAt, engagement } = post;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Your AI-Generated LinkedIn Post</h1>

      <div className="mb-6 bg-white shadow rounded p-5">
        <h2 className="text-xl font-semibold mb-3">🔍 Profile Summary</h2>
        <p><strong>👨‍💼 Profession:</strong> {userData.profession}</p>
        <p><strong>🎯 Goal:</strong> {userData.goals}</p>
        <p><strong>🧑‍🤝‍🧑 Audience:</strong> {userData.audience}</p>
        <p><strong>🔥 Focus Areas:</strong> {userData.contentFocus?.join(', ')}</p>
      </div>

      <div className="mb-6 bg-white shadow rounded p-5">
        <h2 className="text-xl font-semibold mb-3">📝 Generated Post</h2>
        <p className="whitespace-pre-wrap text-gray-800">{content}</p>
        <p className="mt-3 text-sm text-gray-500">Generated at: {new Date(generatedAt).toLocaleString()}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={fetchGeneratedPost}
          disabled={isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
          {isGenerating ? 'Generating...' : 'Regenerate'}
        </button>

        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {engagement && (
        <div className="mt-8 bg-gray-50 border border-gray-200 rounded p-4">
          <h3 className="font-semibold mb-2 text-gray-700">📊 Predicted Engagement</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>👍 Likes: {engagement.likes}</li>
            <li>💬 Comments: {engagement.comments}</li>
            <li>🔄 Shares: {engagement.shares}</li>
            <li>👀 Views: {engagement.views}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DemoPage;

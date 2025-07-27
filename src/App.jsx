import React, { useState, useEffect, useRef } from 'react';

// --- Curriculum Data ---
// RESTRUCTURED: Topics now contain a full lesson structure with pages, a quiz, and a deeper dive section.
const curriculumData = {
    mathematics: {
        grade6: {
            title: "Grade 6 Mathematics",
            topics: {
                commonFractions: {
                    name: "Common Fractions",
                    lesson: {
                        pages: [
                            { type: 'content', title: 'What is a Fraction?', content: "A fraction is a part of a whole. Think of a pizza! The top number (numerator) tells you how many slices you have, and the bottom number (denominator) tells you how many slices the pizza was cut into in total. So, 1/8 means you have one slice of a pizza that was cut into eight equal pieces." },
                            { type: 'content', title: 'Equivalent Fractions', content: "Sometimes, different fractions can mean the same amount. These are called equivalent fractions. For example, 1/2 is the same as 2/4 and 4/8. It's like having one big slice or two smaller slices—it's still the same amount of pizza! You can find an equivalent fraction by multiplying (or dividing) the top and bottom number by the same amount." },
                            { type: 'content', title: 'Adding Fractions', content: "You can only add fractions when they have the same denominator (the bottom number). If they do, you just add the top numbers together! For example, 1/5 + 2/5 = 3/5. Imagine you have 1 fifth of a chocolate bar and someone gives you 2 more fifths. Now you have 3 fifths! Easy, right?" }
                        ],
                        quiz: [
                            { question: "Which fraction is equivalent to 2/3?", options: ["3/4", "4/6", "2/5", "3/2"], correctAnswer: 1, explanation: "That's it! If you multiply both the top and bottom of 2/3 by 2, you get 4/6. They represent the same amount." },
                            { question: "What is 3/8 + 4/8?", options: ["7/16", "1/8", "7/8", "12/64"], correctAnswer: 2, explanation: "Awesome! Since the denominators are the same (8), we just add the numerators: 3 + 4 = 7. So the answer is 7/8." },
                            { question: "In the fraction 5/9, what is the number 9 called?", options: ["The Numerator", "The Denominator", "The Equalizer", "The Fractionator"], correctAnswer: 1, explanation: "You got it! The bottom number is the denominator. It tells us how many equal parts the whole is divided into." }
                        ],
                        deeperDive: { question: "Isn't it fascinating how fractions are used everywhere, from recipes in the kitchen to music and even building houses? If you had to explain to a younger student why fractions are important in real life, what's the most creative example you could think of?" }
                    }
                },
                geometry: { 
                    name: "Space & Shape (Geometry)",
                    lesson: {
                        pages: [{ type: 'content', title: 'Coming Soon!', content: 'We are building exciting lessons for this topic. Check back soon!' }],
                        quiz: [],
                        deeperDive: { question: '' }
                    }
                },
            }
        },
    },
    naturalSciences: {
        grade6: {
            title: "Grade 6 Natural Sciences & Technology",
            topics: {
                matterAndMaterials: {
                    name: "Matter & Materials",
                    lesson: {
                        pages: [
                            { type: 'content', title: 'What are Mixtures?', content: "A mixture is when you combine two or more substances, but they don't chemically change. Think about a salad! You have lettuce, tomatoes, and cucumbers all in one bowl. You can still see all the different parts, and you could even pick them out again." },
                            { type: 'content', title: 'Solutions: A Special Mixture', content: "A solution is a special type of mixture where one substance dissolves into another. When you stir sugar into water, the sugar seems to disappear, right? It has dissolved to create a sugar solution. The substance that dissolves is the 'solute' (sugar), and the substance it dissolves in is the 'solvent' (water)." },
                            { type: 'content', title: 'Separating Mixtures', content: "Scientists and engineers need to separate mixtures all the time! We can use different methods based on the properties of the substances. For example, you can use a sieve to separate pebbles from sand, or a magnet to pull iron filings out of sand. For a salt water solution, you can evaporate the water to leave the salt behind!" }
                        ],
                        quiz: [
                            { question: "If you mix sand and water, what have you made?", options: ["A solution", "A new element", "A mixture", "A chemical reaction"], correctAnswer: 2, explanation: "Exactly! It's a mixture because the sand doesn't dissolve, and you can still see the separate parts." },
                            { question: "In a cup of sweet tea, what is the sugar called?", options: ["The solvent", "The solute", "The solution", "The mixture"], correctAnswer: 1, explanation: "You've got it! The sugar is the 'solute' because it's the substance that dissolves in the water (the solvent)." },
                            { question: "What is the best way to separate cooked pasta from the water?", options: ["Evaporation", "Filtering (or sieving)", "Using a magnet", "Dissolving"], correctAnswer: 1, explanation: "Perfect! Using a colander or sieve is a type of filtering. It lets the water pass through but keeps the pasta behind. Great thinking!" }
                        ],
                        deeperDive: { question: "Imagine you've found a treasure chest filled with gold coins, sand, and saltwater. What creative, step-by-step process would you use to separate everything and get your clean, shiny gold coins?" }
                    }
                }
            }
        },
    },
    socialSciences: {
        grade6: {
            title: "Grade 6 Social Sciences",
            topics: {
                history: { 
                    name: "History", 
                    lesson: {
                        pages: [{ type: 'content', title: 'Coming Soon!', content: 'We are building exciting lessons for this topic. Check back soon!' }],
                        quiz: [],
                        deeperDive: { question: '' }
                    }
                }
            }
        },
    },
    lifeOrientation: {
        grade6: {
            title: "Grade 6 Life Orientation",
            topics: {
                animalWelfare: {
                    name: "Project: Caring for Animals",
                    lesson: {
                        pages: [
                            { type: 'content', title: 'Project Overview', content: "This is a big project about 'Animals: caring & cruelty to animals'. It has a compulsory Section A and a Section B where you choose one of two options. Let's break down what you need to do for each part." },
                            { type: 'content', title: 'Section A: Animal Freedoms', content: "You need to list all five animal freedoms. These are internationally accepted standards of care. They are: Freedom from hunger and thirst; Freedom from discomfort; Freedom from pain, injury or disease; Freedom to express normal behaviour; and Freedom from fear and distress." },
                            { type: 'content', title: 'Section A: Animal Cruelty & The Law', content: "This part is about understanding what animal cruelty is and the laws against it. You'll need to explain two types of cruelty (like neglect or intentional harm) and the consequences. Also, look up the Animal Protection Act in South Africa and what it covers." },
                            { type: 'content', title: 'Section A: Farming', content: "Here, you'll compare 'free range' and 'factory' farming. Think about the differences in how the animals live. You'll need to list two benefits and two challenges of free-range farming." },
                            { type: 'content', title: 'Section B: Option 1', content: "If you choose this option, you'll focus on animal welfare, products, services, and your personal feelings. You'll need to explain what animal welfare means and give examples of services like vets or shelters." },
                            { type: 'content', title: 'Section B: Option 2', content: "This option is about practical animal care. You'll research sterilising animals, pet needs, a local animal charity (like the SPCA in the Western Cape), and why fireworks can be harmful to animals." }
                        ],
                        quiz: [
                            { question: "How many Animal Freedoms are there?", options: ["Three", "Ten", "Five", "Seven"], correctAnswer: 2, explanation: "That's right, there are five internationally recognised freedoms that describe the basic needs of animals." },
                            { question: "Which of these is a special type of mixture where something dissolves?", options: ["A solution", "A suspension", "A salad", "An element"], correctAnswer: 0, explanation: "Exactly! A solution, like salt water, is a mixture where the solute (salt) dissolves completely into the solvent (water)." },
                        ],
                        deeperDive: { question: "This project asks for your personal feelings on whether animals deserve rights. That's a really deep question! Beyond just a 'yes' or 'no', what experience in your own life has shaped your view on how we should treat animals?" }
                    }
                }
            }
        }
    }
};


// Helper to combine CSS classes
const classNames = (...classes) => classes.filter(Boolean).join(' ');

// --- Icon Components ---
const BookOpenIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8zm8 2a2 2 0 0 0-2-2h-1v16h1a2 2 0 0 0 2-2V4z"/></svg>);
const FlaskConicalIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.78 18.22a2 2 0 0 1-1.42 1.42L12 22l-6.36-2.36a2 2 0 0 1-1.42-1.42L2 9.86V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1.86l-2.22 8.36zM12 2a1 1 0 0 1 1 1v3h-2V3a1 1 0 0 1 1-1z"/></svg>);
const GlobeIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20zm0 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1z"/></svg>);
const HeartIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>);
const TimerIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>);
const CheckCircleIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>);
const ChevronLeftIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>);
const MessageSquareIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const SendIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>);
const XIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>);
const LightbulbIcon = ({ className = "w-6 h-6" }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 18h6v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2Z"></path><path d="M12 10V2"></path><path d="M12 2l3.5 3.5"></path><path d="M12 2 8.5 5.5"></path></svg>);

// --- Reusable UI Components ---
const Card = ({ children, className, onClick }) => (<div onClick={onClick} className={classNames("bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1", className)}>{children}</div>);
const Button = ({ onClick, children, className = 'bg-blue-600 hover:bg-blue-700', disabled = false }) => (<button onClick={onClick} disabled={disabled} className={classNames("text-white font-bold py-2 px-5 rounded-lg shadow-md transition-transform transform hover:scale-105", className, disabled && "opacity-50 cursor-not-allowed")}>{children}</button>);
const Modal = ({ isOpen, onClose, title, children }) => { if (!isOpen) return null; return (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"><div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full"><h3 className="text-xl font-bold mb-4">{title}</h3><div className="mb-4">{children}</div><Button onClick={onClose} className="w-full bg-gray-500 hover:bg-gray-600">Close</Button></div></div>); };

// --- Pomodoro Timer Component ---
const PomodoroTimer = ({ onTimerEnd }) => { const [minutes, setMinutes] = useState(20); const [seconds, setSeconds] = useState(0); const [isActive, setIsActive] = useState(false); const [isBreak, setIsBreak] = useState(false); const intervalRef = useRef(null); useEffect(() => { if (isActive) { intervalRef.current = setInterval(() => { if (seconds > 0) setSeconds(s => s - 1); if (seconds === 0) { if (minutes === 0) { clearInterval(intervalRef.current); setIsActive(false); const nextIsBreak = !isBreak; const nextMins = nextIsBreak ? 5 : 20; onTimerEnd(nextIsBreak ? "Great work! Time for a 5-minute break." : "Break's over! Time to get back to work."); resetTimer(nextMins, nextIsBreak); } else { setMinutes(m => m - 1); setSeconds(59); } } }, 1000); } else { clearInterval(intervalRef.current); } return () => clearInterval(intervalRef.current); }, [isActive, seconds, minutes, isBreak, onTimerEnd]); const toggleTimer = () => setIsActive(!isActive); const resetTimer = (mins, breakState) => { clearInterval(intervalRef.current); setIsActive(false); setIsBreak(breakState); setMinutes(mins); setSeconds(0); }; return (<div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-200 w-64 z-20"><h3 className="text-lg font-bold text-gray-800 flex items-center mb-2"><TimerIcon className="mr-2" /> {isBreak ? 'Break Time' : 'Focus Time'}</h3><div className="text-5xl font-mono text-center text-gray-900 mb-3">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</div><div className="flex justify-around"><Button onClick={toggleTimer} className={isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'}>{isActive ? 'Pause' : 'Start'}</Button><Button onClick={() => resetTimer(isBreak ? 5 : 20, isBreak)} className="bg-red-500 hover:bg-red-600">Reset</Button></div></div>); };

// --- AI Buddy Chat Component ---
const AiBuddyChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { from: 'buddy', text: "Hi Aliza! I'm your study buddy. Ask me anything if you get stuck or just feel curious!" }
    ]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const getBuddyResponse = (userInput) => {
        const lowerInput = userInput.toLowerCase();
        if (lowerInput.includes('stuck') || lowerInput.includes('help') || lowerInput.includes("don't get it")) {
            return "I hear you, this can feel a bit sticky at first, can't it? It's totally okay to feel a bit stuck. Would it help to see this explained in a different way, like with a short video or an interactive diagram?";
        }
        if (lowerInput.includes('fraction')) {
            return "Fractions! Great topic. Beyond just getting the answer, what's one thing about fractions that you find the most confusing or interesting?";
        }
        if (lowerInput.includes('history')) {
            return "That's a fascinating topic! Considering what was happening at that time, what different points of view might people have had? I'm curious what you think.";
        }
        if (lowerInput.includes('boring')) {
            return "I get that, sometimes topics can feel a bit dry. But isn't it fascinating how even this idea connects to bigger things in the world? What's one part of this, even a tiny part, that sparks a little curiosity for you?";
        }
        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hey there! What are we diving into today? I'm excited to learn with you!";
        }
        if (lowerInput.includes('ai')) {
            return "Wow, you're asking about AI! I love this topic. It's all about teaching computers to learn and solve problems. What part of AI makes you the most curious?";
        }
        return "That's a great question. Tell me more about what you're thinking.";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        const userMessage = { from: 'user', text: inputText };
        const buddyResponse = { from: 'buddy', text: getBuddyResponse(inputText) };

        setMessages(prev => [...prev, userMessage]);
        
        // Simulate buddy thinking time
        setTimeout(() => {
            setMessages(prev => [...prev, buddyResponse]);
        }, 800);

        setInputText('');
    };

    if (!isOpen) {
        return (
            <button onClick={() => setIsOpen(true)} className="fixed bottom-5 left-5 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-transform transform hover:scale-110 z-30">
                <MessageSquareIcon className="w-8 h-8" />
            </button>
        );
    }

    return (
        <div className="fixed bottom-5 left-5 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col z-30">
            <header className="bg-indigo-600 text-white p-3 flex justify-between items-center rounded-t-2xl">
                <h3 className="font-bold">Your AI Study Buddy</h3>
                <button onClick={() => setIsOpen(false)}><XIcon className="w-6 h-6" /></button>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex mb-3 ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg py-2 px-3 max-w-xs ${msg.from === 'user' ? 'bg-indigo-100 text-gray-800' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                 <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t flex">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask me anything..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="ml-2 p-2 text-indigo-600 hover:text-indigo-800">
                    <SendIcon className="w-6 h-6" />
                </button>
            </form>
        </div>
    );
};


// --- Content Components ---
const HomeScreen = ({ setView, setGrade, grade }) => (
    <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-2">Welcome, Aliza!</h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-2xl mx-auto">Your learning adventure starts now. I'm here to help you explore, understand, and have fun along the way.</p>
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-3">Which grade are we studying today?</h2>
            <div className="inline-flex rounded-lg shadow-sm">
                <button onClick={() => setGrade(6)} className={classNames("px-6 py-3 text-lg font-medium border border-gray-200 rounded-l-lg", grade === 6 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-50')}>Grade 6</button>
                <button onClick={() => setGrade(7)} className={classNames("px-6 py-3 text-lg font-medium border-t border-b border-r border-gray-200 rounded-r-lg", grade === 7 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-indigo-50')}>Grade 7</button>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <Card className="cursor-pointer group" onClick={() => setView('math')}>
                <div className="p-8"><div className="w-20 h-20 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white"><BookOpenIcon className="w-10 h-10" /></div><h2 className="text-2xl font-bold mt-6 mb-2">Mathematics</h2></div>
            </Card>
            <Card className="cursor-pointer group" onClick={() => setView('science')}>
                 <div className="p-8"><div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white"><FlaskConicalIcon className="w-10 h-10" /></div><h2 className="text-2xl font-bold mt-6 mb-2">Natural Sciences</h2></div>
            </Card>
            <Card className="cursor-pointer group" onClick={() => setView('social')}>
                 <div className="p-8"><div className="w-20 h-20 mx-auto bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-600 group-hover:text-white"><GlobeIcon className="w-10 h-10" /></div><h2 className="text-2xl font-bold mt-6 mb-2">Social Sciences</h2></div>
            </Card>
            <Card className="cursor-pointer group" onClick={() => setView('lifeOrientation')}>
                 <div className="p-8"><div className="w-20 h-20 mx-auto bg-pink-100 text-pink-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white"><HeartIcon className="w-10 h-10" /></div><h2 className="text-2xl font-bold mt-6 mb-2">Life Orientation</h2></div>
            </Card>
        </div>
    </div>
);

const QuizComponent = ({ quiz, openModal }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    const question = quiz[currentQuestionIndex];
    const isCorrect = selectedAnswer === question.correctAnswer;

    const handleAnswer = (index) => {
        setSelectedAnswer(index);
        setShowFeedback(true);
        if (index === question.correctAnswer) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.length - 1) {
            setCurrentQuestionIndex(i => i + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            setQuizFinished(true);
        }
    };

    if (quizFinished) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <h3 className="text-2xl font-bold text-indigo-600">Quiz Complete!</h3>
                <p className="text-lg my-4">You scored {score} out of {quiz.length}. Fantastic effort!</p>
                <Button onClick={() => {
                    setQuizFinished(false);
                    setCurrentQuestionIndex(0);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                    setScore(0);
                }}>Try Again</Button>
            </div>
        )
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-semibold text-gray-500">Question {currentQuestionIndex + 1} of {quiz.length}</p>
            <h3 className="text-xl font-bold my-2">{question.question}</h3>
            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showFeedback}
                        className={classNames(
                            "w-full text-left p-3 rounded-lg border-2 transition-colors",
                            showFeedback && index === question.correctAnswer ? "bg-green-100 border-green-400 text-green-800 font-semibold" : "",
                            showFeedback && index === selectedAnswer && !isCorrect ? "bg-red-100 border-red-400 text-red-800 font-semibold" : "",
                            !showFeedback ? "hover:bg-indigo-50 border-gray-300" : "cursor-not-allowed"
                        )}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {showFeedback && (
                <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    <h4 className="font-bold">{isCorrect ? "You got it!" : "Good try!"}</h4>
                    <p>{isCorrect ? question.explanation : "That's a common mix-up. Let's look at why the right answer is correct."}</p>
                    { !isCorrect && <p className="mt-2"><span className="font-semibold">Explanation:</span> {question.explanation}</p> }
                    <Button onClick={handleNext} className="mt-4 bg-indigo-600 hover:bg-indigo-700">
                        {currentQuestionIndex < quiz.length - 1 ? "Next Question" : "Finish Quiz"}
                    </Button>
                </div>
            )}
        </div>
    );
};


const TopicDetailScreen = ({ topic, onBack, openModal }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);

    if (!topic || !topic.lesson) {
        return <div className="text-center p-8">Loading lesson...</div>;
    }
    
    const { pages, quiz, deeperDive } = topic.lesson;
    const totalPages = pages.length;

    const isQuizAvailable = quiz && quiz.length > 0;

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 font-semibold transition-colors">
                <ChevronLeftIcon className="w-5 h-5 mr-1" /> Back to Topics
            </button>
            <h2 className="text-5xl font-extrabold text-gray-800 mb-8">{topic.name}</h2>

            {/* Lesson Content */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-6">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-3xl font-bold text-gray-700 mb-2">{pages[currentPageIndex].title}</h3>
                    <p className="text-sm font-semibold text-gray-400">Lesson {currentPageIndex + 1} of {totalPages}</p>
                </div>
                <hr className="my-4"/>
                <p className="text-lg leading-relaxed text-gray-600">{pages[currentPageIndex].content}</p>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mb-12">
                <Button onClick={() => setCurrentPageIndex(i => i - 1)} disabled={currentPageIndex === 0} className="bg-gray-300 text-gray-800 hover:bg-gray-400">Previous</Button>
                <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${((currentPageIndex + 1) / totalPages) * 100}%` }}></div>
                    </div>
                </div>
                <Button onClick={() => setCurrentPageIndex(i => i + 1)} disabled={currentPageIndex === totalPages - 1}>Next</Button>
            </div>

            {/* Quiz Section */}
            {isQuizAvailable && (
                <div className="mb-12">
                    <h3 className="text-4xl font-bold mb-4 text-gray-800">Check Your Knowledge</h3>
                    <QuizComponent quiz={quiz} openModal={openModal} />
                </div>
            )}
            
            {/* Deeper Dive Section */}
            {deeperDive && deeperDive.question && (
                <div className="p-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl text-white shadow-xl">
                    <div className="flex items-center mb-3">
                        <LightbulbIcon className="w-10 h-10 mr-4"/>
                        <h3 className="text-3xl font-bold">Let's Dig Deeper...</h3>
                    </div>
                    <p className="text-lg text-indigo-100">{deeperDive.question}</p>
                </div>
            )}
        </div>
    );
};

const SubjectScreen = ({ subjectKey, grade, openModal }) => {
    const [activeTopicKey, setActiveTopicKey] = useState(null);
    const gradeData = curriculumData[subjectKey]?.[`grade${grade}`];

    if (!gradeData) {
        return <div className="text-center p-8 font-semibold text-red-500">Error: Curriculum data could not be loaded for this section.</div>;
    }

    const { title, topics } = gradeData;
    
    const subjectNameMap = {
        mathematics: 'Mathematics',
        naturalSciences: 'Natural Sciences & Technology',
        socialSciences: 'Social Sciences',
        lifeOrientation: 'Life Orientation'
    };

    if (activeTopicKey) {
        const activeTopic = topics[activeTopicKey];
        return <TopicDetailScreen topic={activeTopic} onBack={() => setActiveTopicKey(null)} openModal={openModal} />;
    }

    return (
        <div>
            <h2 className={`text-5xl font-extrabold text-gray-800`}>{subjectNameMap[subjectKey]}</h2>
            <p className="text-xl text-gray-500 mb-8">{title}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.keys(topics).map(key => (
                    <Card key={key} className="cursor-pointer group" onClick={() => setActiveTopicKey(key)}>
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{topics[key].name}</h3>
                            <p className="text-gray-500 mt-2 text-sm">Click to start this lesson</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

// --- Main App Component ---
export default function App() {
    const [view, setView] = useState('home'); // 'home', 'math', 'science', 'social', 'lifeOrientation'
    const [grade, setGrade] = useState(6);
    const [modal, setModal] = useState({ isOpen: false, title: '', message: '' });

    const openModal = (title, message) => {
        setModal({ isOpen: true, title, message });
    };
    
    const closeModal = () => {
        setModal({ isOpen: false, title: '', message: '' });
    };

    const renderView = () => {
        switch (view) {
            case 'math': return <SubjectScreen subjectKey="mathematics" grade={grade} openModal={openModal} />;
            case 'science': return <SubjectScreen subjectKey="naturalSciences" grade={grade} openModal={openModal} />;
            case 'social': return <SubjectScreen subjectKey="socialSciences" grade={grade} openModal={openModal} />;
            case 'lifeOrientation': return <SubjectScreen subjectKey="lifeOrientation" grade={grade} openModal={openModal} />;
            case 'home': default: return <HomeScreen setView={setView} setGrade={setGrade} grade={grade} />;
        }
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-indigo-100 min-h-screen font-sans text-gray-900" style={{fontFamily: "'Inter', sans-serif"}}>
            <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-200">
                <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <div className="text-2xl font-bold text-indigo-600 cursor-pointer" onClick={() => setView('home')}>
                        Aliza
                    </div>
                    <div className="flex items-center space-x-2 md:space-x-4">
                         <span className="text-sm font-semibold text-gray-500 hidden md:block">Grade: {grade}</span>
                        <button onClick={() => setView('math')} className={classNames("px-3 py-2 rounded-md text-sm font-medium transition-colors", view === 'math' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')}>Mathematics</button>
                        <button onClick={() => setView('science')} className={classNames("px-3 py-2 rounded-md text-sm font-medium transition-colors", view === 'science' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')}>Science & Tech</button>
                        <button onClick={() => setView('social')} className={classNames("px-3 py-2 rounded-md text-sm font-medium transition-colors", view === 'social' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')}>Social Sciences</button>
                        <button onClick={() => setView('lifeOrientation')} className={classNames("px-3 py-2 rounded-md text-sm font-medium transition-colors", view === 'lifeOrientation' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100')}>Life Orientation</button>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-6 py-12 pb-24">
                {renderView()}
            </main>
            
            <PomodoroTimer onTimerEnd={(message) => openModal("Pomodoro Timer", message)} />
            <AiBuddyChat />
            <Modal isOpen={modal.isOpen} onClose={closeModal} title={modal.title}>
                <p>{modal.message}</p>
            </Modal>
        </div>
    );
}

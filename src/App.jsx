import React, { useState, useEffect, useRef } from 'react';

// --- Educational Framework: South African CAPS Curriculum ---
// This object holds all the educational content, structured by subject.
const SUBJECT_DATA = {
    'Mathematics': {
        icon: '🧮',
        content: [
            { type: 'text', fact: 'When you multiply two negative numbers, the result is always a positive number. For example, -5 x -3 = 15.', challenge: 'What would -7 multiplied by -4 be? And can you explain why the answer is positive?' },
            { type: 'text', fact: 'The "BODMAS" rule helps us remember the order of operations in math: Brackets, Orders (like powers), Division, Multiplication, Addition, Subtraction.', challenge: 'Using BODMAS, what is the answer to 10 + 2 x 5?' },
        ]
    },
    'English (HL)': {
        icon: '📚',
        content: [
            { type: 'text', fact: 'A "protagonist" is the main character in a story, while the "antagonist" is the character who opposes them.', challenge: 'In the story of The Three Little Pigs, who is the protagonist and who is the antagonist?' },
            { type: 'text', fact: 'An "adjective" is a word that describes a noun. For example, in "the beautiful Cape Town sunset," the word "beautiful" is the adjective.', challenge: 'Write a sentence about your favourite food and include at least one adjective.' },
        ]
    },
    'Afrikaans (FAL)': {
        icon: '🗣️',
        content: [
            { type: 'text', fact: 'In Afrikaans, we use "verkleinwoorde" (diminutives) to show something is small by adding suffixes like "-ie" or "-tjie". For example, a small dog ("hond") becomes a "hondjie".', challenge: 'What would the "verkleinwoord" for "kat" (cat) be?' },
        ]
    },
    'Natural Sciences & Tech': {
        icon: '🔬',
        content: [
            { type: 'text', fact: 'Photosynthesis is the process where plants use sunlight, water, and carbon dioxide to create their own food (glucose) and release oxygen into the air.', challenge: 'What are the three main "ingredients" a plant needs for photosynthesis?' },
        ]
    },
    'Social Sciences': {
        icon: '🌍',
        content: [
            { type: 'text', fact: 'Democracy in South Africa began in 1994 with the first democratic election where all citizens, regardless of race, could vote.', challenge: 'Why was the 1994 election so important for South Africa?' },
        ]
    },
    'Life Skills (Project)': {
        icon: '❤️',
        content: [
            { type: 'text', fact: 'Let\'s start with the Five Animal Freedoms. The first is Freedom from Hunger and Thirst. This means animals must always have fresh water and a healthy diet.', challenge: 'In your own words, what does "Freedom from Hunger and Thirst" mean for a pet?' },
            { type: 'text', fact: 'The second freedom is Freedom from Discomfort. This means animals need a suitable place to live, with shelter and a comfy resting area.', challenge: 'How could you provide "Freedom from Discomfort" for a dog that lives outside?' },
            { type: 'text', fact: 'The third freedom is Freedom from Pain, Injury, or Disease. This means animals should be prevented from getting sick, and if they do, they must be treated by a vet quickly.', challenge: 'What is the owner\'s responsibility according to this freedom if their cat seems sick?' },
            { type: 'text', fact: 'The fourth freedom is Freedom to Express Normal Behaviour. This means animals need enough space and the company of their own kind to act naturally.', challenge: 'Why is it important for a social animal, like a dog, to have "company of their own kind"?' },
            { type: 'text', fact: 'The fifth freedom is Freedom from Fear and Distress. This means an animal\'s living conditions shouldn\'t cause them to be scared or anxious.', challenge: 'What is one thing that could cause a pet to feel fear or distress in a home?' },
        ]
    }
};


// --- Reusable Hooks for Browser APIs ---

/**
 * A custom hook to manage Text-to-Speech functionality for Aliza's voice.
 * It handles speaking, stopping, and provides a component for word-by-word highlighting.
 */
const useSpeechSynthesis = (text) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
    const utteranceRef = useRef(null);
    const words = text.split(/(\s+)/);

    useEffect(() => {
        const utterance = new SpeechSynthesisUtterance(text);
        const setVoice = () => {
            const voices = window.speechSynthesis.getVoices();
            let selectedVoice = voices.find(voice => voice.lang === 'en-ZA' && voice.name.includes('Female'));
            if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Female'));
            if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
            
            utterance.voice = selectedVoice;
            utterance.lang = selectedVoice?.lang || 'en-ZA';
        };

        setVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = setVoice;
        }

        utterance.pitch = 1.1;
        utterance.rate = 1;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => {
            setIsSpeaking(false);
            setHighlightedWordIndex(-1);
        };
        utterance.onerror = () => {
             setIsSpeaking(false);
             setHighlightedWordIndex(-1);
        };
        utterance.onboundary = (event) => {
            if (event.name === 'word') {
                const wordCount = text.substring(0, event.charIndex).split(/(\s+)/).filter(Boolean).length;
                setHighlightedWordIndex(wordCount);
            }
        };
        utteranceRef.current = utterance;

        return () => {
            window.speechSynthesis.cancel();
        };
    }, [text]);

    const speak = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        } else if (utteranceRef.current) {
            window.speechSynthesis.speak(utteranceRef.current);
        }
    };

    const SpokenText = () => (
        <span>
            {words.map((word, index) => (
                <span key={index} className={index === highlightedWordIndex ? 'bg-yellow-300 rounded' : ''}>{word}</span>
            ))}
        </span>
    );

    return { speak, isSpeaking, SpokenText };
};


/**
 * A custom hook to manage Speech-to-Text for the user's voice input.
 */
const useSpeechRecognition = ({ onTranscript }) => {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-ZA';

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) onTranscript(finalTranscript);
        };

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognitionRef.current = recognition;
    }, [onTranscript]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    return { isListening, toggleListening };
};

// --- UI Components ---

/**
 * Renders a single chat message bubble.
 */
const ChatMessage = ({ message }) => {
    const { speak, isSpeaking, SpokenText } = useSpeechSynthesis(message.text);
    const isAliza = message.sender === 'aliza';
    const isUser = message.sender === 'user';
    
    const bubbleClasses = {
        base: 'max-w-[85%] rounded-2xl px-4 py-3 shadow-sm',
        aliza: 'bg-indigo-100 text-gray-800 rounded-bl-lg',
        alizaChallenge: 'bg-amber-100 border border-amber-300 text-gray-800 rounded-bl-lg',
        user: 'bg-blue-500 text-white self-end rounded-br-lg'
    };
    
    let specificBubbleClass = bubbleClasses.aliza;
    if (isUser) {
        specificBubbleClass = bubbleClasses.user;
    } else if (message.isChallenge) {
        specificBubbleClass = bubbleClasses.alizaChallenge;
    }

    return (
        <div className={`${bubbleClasses.base} ${specificBubbleClass}`}>
            <div className="flex items-center gap-2">
                <div className="flex-1 text-base leading-relaxed">
                    {message.isCorrect && '⭐ '}
                    <SpokenText />
                </div>
                {isAliza && <button onClick={speak} className="text-2xl shrink-0">{isSpeaking ? '🤫' : '🔊'}</button>}
            </div>
        </div>
    );
};

/**
 * Renders the list of chat messages.
 */
const MessageList = ({ chatHistory, isLoading }) => {
    const scrollRef = useRef();

    useEffect(() => {
        setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100);
    }, [chatHistory, isLoading]);

    return (
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col gap-4 bg-gray-50">
            {chatHistory.map((msg, index) => <ChatMessage key={index} message={msg} />)}
            {isLoading && (
                <div className="max-w-[85%] rounded-2xl px-4 py-3 shadow-sm bg-indigo-100 text-gray-800 rounded-bl-lg">
                    <p className="text-base leading-relaxed animate-pulse">Thinking...</p>
                </div>
            )}
            <div ref={scrollRef} />
        </div>
    );
};

/**
 * Renders the input area with text field and buttons.
 */
const ChatInput = ({ onSend, isListening, onToggleListening, isLoading, showNextButton }) => {
    const [userInput, setUserInput] = useState('');
    const handleTranscript = (transcript) => setUserInput(prev => prev + transcript);
    const { isListening: micIsListening, toggleListening } = useSpeechRecognition({ onTranscript: handleTranscript });

    useEffect(() => {
        if (isListening !== micIsListening) {
             onToggleListening(micIsListening);
        }
    }, [micIsListening, isListening, onToggleListening]);


    const handleSendClick = () => {
        if (!userInput.trim()) return;
        onSend(userInput);
        setUserInput('');
    };

    const isDisabled = isLoading || showNextButton;

    return (
        <div className="p-3 sm:p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2 sm:gap-3">
                <input
                    type="text"
                    className="flex-1 w-full border border-gray-300 rounded-full px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
                    placeholder={micIsListening ? "Listening..." : "Type or speak your answer..."}
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendClick()}
                    disabled={isDisabled}
                />
                <button 
                    className={`shrink-0 w-12 h-12 text-2xl rounded-full flex items-center justify-center transition-colors ${micIsListening ? 'bg-red-200 text-red-600' : 'bg-gray-200 text-gray-600'} disabled:bg-gray-100 disabled:text-gray-400`}
                    onClick={toggleListening} 
                    disabled={isDisabled}
                >
                    🎙️
                </button>
                <button 
                    className="shrink-0 w-12 h-12 text-2xl rounded-full flex items-center justify-center bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
                    onClick={handleSendClick} 
                    disabled={isDisabled}
                >
                    ➤
                </button>
            </div>
        </div>
    );
};


/**
 * The initial screen where the user selects a subject to study.
 */
const SubjectSelectionScreen = ({ onSubjectSelect }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-blue-800">Aliza</h1>
                <p className="text-xl text-gray-600 mt-2">Your friendly study buddy!</p>
                <p className="text-xl text-gray-600 mt-8 mb-10">Which subject are we diving into today?</p>
                <div className="flex flex-wrap justify-center gap-5">
                    {Object.entries(SUBJECT_DATA).map(([subject, data]) => (
                        <button key={subject} onClick={() => onSubjectSelect(subject)} className="bg-white border-2 border-blue-100 rounded-2xl w-36 h-36 flex flex-col justify-center items-center cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg hover:transform hover:-translate-y-1">
                            <span className="text-5xl">{data.icon}</span>
                            <span className="text-base font-semibold text-blue-800 mt-2 text-center">{subject}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/**
 * The main chat screen, combining the header, chat area, and input controls.
 */
const ChatScreen = ({ subject, onBack }) => {
    const [contentIndex, setContentIndex] = useState(0);
    const [chatHistory, setChatHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
    const [showNextButton, setShowNextButton] = useState(false);

    // Initialize chat when subject changes
    useEffect(() => {
        const firstContent = SUBJECT_DATA[subject].content[0];
        setChatHistory([
            { sender: 'aliza', text: `Howzit! Ready to tackle some ${subject}? Let's start with this one.` },
            { sender: 'aliza', text: firstContent.fact },
            { sender: 'aliza', text: firstContent.challenge, isChallenge: true }
        ]);
        setContentIndex(0);
        setConsecutiveMistakes(0);
        setShowNextButton(false);
    }, [subject]);

    const getAlizaResponse = async (userMessage, currentChallenge, intent = 'answer') => {
        setIsLoading(true);
        setShowNextButton(false);

        let promptType;
        if (intent === 'explain_differently') {
            promptType = `The user is stuck on this challenge: "${currentChallenge}". Explain the core concept in a completely new and simple way. Use a fun analogy.`;
        } else if (intent === 'frustrated') {
            promptType = `The user is feeling frustrated or confused, saying: "${userMessage}". Respond with extra empathy and encouragement. Then, give a simple hint for the challenge: "${currentChallenge}".`;
        } else {
            promptType = `The user is working on this challenge: "${currentChallenge}". Their answer is: "${userMessage}". They have made ${consecutiveMistakes} mistakes in a row. Based on their answer, determine if it is correct. If correct, praise them enthusiastically. If wrong, be gentle and give a hint.`;
        }

        const alizaPrompt = `You are Aliza, a compassionate, empathetic, and super encouraging AI study buddy for a 10-13 year old learner in Cape Town. Your Persona: - Tone: ALWAYS patient, kind, and positive, like a best friend helping with homework. - Language: Use natural, conversational English and friendly South African slang like "Lekker!", "Howzit!", "Eish!". - Explanation Style: Explain things in a simple, fun way. Use easy-to-understand analogies. ${promptType}`;
        
        // IMPORTANT: This payload asks the model for a JSON object.
        const payload = {
            contents: [{ role: "user", parts: [{ text: alizaPrompt }] }],
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: "OBJECT",
                    properties: {
                        isCorrect: { type: "BOOLEAN" },
                        responseText: { type: "STRING" }
                    },
                    required: ["isCorrect", "responseText"]
                }
            }
        };
        
        // NOTE: In a real application, the API key should be stored securely and not exposed in the client-side code.
        // This is left as an empty string because the execution environment will provide it.
        const apiKey = ""; 
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }
            const result = await response.json();
            
            const rawJsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!rawJsonText) throw new Error("No content in API response.");

            const parsedResponse = JSON.parse(rawJsonText);
            const { isCorrect, responseText } = parsedResponse;
            
            setChatHistory(prev => [...prev, { sender: 'aliza', text: responseText, isCorrect }]);

            if (isCorrect && intent === 'answer') {
                setShowNextButton(true);
                setConsecutiveMistakes(0);
            } else if (intent === 'answer') {
                setConsecutiveMistakes(prev => prev + 1);
            }
        } catch (error) {
            console.error("Error fetching or parsing Aliza's response:", error);
            setChatHistory(prev => [...prev, { sender: 'aliza', text: "Eish, my circuits are a bit tangled! Let's try that again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserSend = (userInput) => {
        if (!userInput.trim()) return;
        const currentChallenge = [...chatHistory].reverse().find(msg => msg.isChallenge)?.text;
        setShowNextButton(false);
        setChatHistory(prev => [...prev, { sender: 'user', text: userInput }]);

        const frustrationKeywords = ['don\'t understand', 'don\'t get it', 'too hard', 'confused'];
        if (frustrationKeywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
            getAlizaResponse(userInput, currentChallenge, 'frustrated');
        } else {
            getAlizaResponse(userInput, currentChallenge, 'answer');
        }
    };

    const handleNextQuestion = () => {
        setShowNextButton(false);
        const subjectContent = SUBJECT_DATA[subject].content;
        const nextIndex = (contentIndex + 1) % subjectContent.length;
        setContentIndex(nextIndex);
        const nextContent = subjectContent[nextIndex];
        setChatHistory(prev => [
            ...prev,
            { sender: 'aliza', text: `Sharp sharp! Here is the next one.` },
            { sender: 'aliza', text: nextContent.fact },
            { sender: 'aliza', text: nextContent.challenge, isChallenge: true }
        ]);
    };

    const handlePresetClick = (type) => {
        const currentChallenge = [...chatHistory].reverse().find(msg => msg.isChallenge)?.text;
        if (type === 'explain_differently') {
            getAlizaResponse("I'm a bit stuck", currentChallenge, 'explain_differently');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans">
            <div className="flex flex-col w-full max-w-2xl h-screen sm:h-[95vh] sm:max-h-[800px] bg-white shadow-2xl sm:rounded-2xl overflow-hidden">
                <header className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 border-b border-blue-200 shrink-0">
                    <button onClick={onBack} className="font-bold text-blue-600 hover:text-blue-800 transition-colors">← Back</button>
                    <h2 className="text-xl font-bold text-blue-800">{subject}</h2>
                    <div className="w-14" /> {/* Spacer */}
                </header>

                <MessageList chatHistory={chatHistory} isLoading={isLoading} />

                {showNextButton && !isLoading && (
                    <div className="p-3 bg-gray-50 flex justify-center">
                        <button onClick={handleNextQuestion} className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors shadow-md">
                            Next Question ➤
                        </button>
                    </div>
                )}

                <div className="p-2 sm:p-3 border-t border-gray-200 bg-white">
                     <button onClick={() => handlePresetClick('explain_differently')} className="w-full text-left bg-gray-100 border border-gray-200 text-blue-600 rounded-lg px-4 py-2 text-sm font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50" disabled={isLoading || showNextButton}>
                        🤔 Explain it differently
                    </button>
                </div>

                <ChatInput 
                    onSend={handleUserSend} 
                    isLoading={isLoading} 
                    showNextButton={showNextButton}
                    isListening={false} // dummy props, internal state is used
                    onToggleListening={() => {}} // dummy props
                />
            </div>
        </div>
    );
};

/**
 * The main App component. It acts as a controller to show either the
 * subject selection screen or the main chat screen.
 */
export default function App() {
    const [currentSubject, setCurrentSubject] = useState(null);

    // Pre-load voices for the speech synthesis API
    useEffect(() => {
        const triggerVoices = () => window.speechSynthesis.getVoices();
        triggerVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = triggerVoices;
        }
    }, []);

    if (!currentSubject) {
        return <SubjectSelectionScreen onSubjectSelect={setCurrentSubject} />;
    }

    return <ChatScreen subject={currentSubject} onBack={() => setCurrentSubject(null)} />;
}

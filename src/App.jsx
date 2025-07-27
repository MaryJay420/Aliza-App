import React, { useState, useEffect, useRef } from 'react';

// --- Educational Framework: South African CAPS Curriculum for Grades 6 & 7 ---
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
      { type: 'text', fact: 'Now let\'s look at Animal Cruelty. One type is Neglect, which is when an owner fails to provide basic care, like enough food or water.', challenge: 'Give your own example of what animal neglect might look like.' },
      { type: 'text', fact: 'Another type of cruelty is Direct Abuse, which is when a person intentionally hurts an animal, like hitting it or forcing it to fight.', challenge: 'What is the main difference between neglect and direct abuse?' },
      { type: 'text', fact: 'According to the Animals Protection Act 71 of 1962 in South Africa, a person found guilty of animal cruelty can face a large fine and up to 12 months in prison.', challenge: 'What are the two main consequences for animal cruelty under South African law?' },
      { type: 'text', fact: 'The Animals Protection Act of 1962 protects all domestic animals. Breeds that are often victims of cruelty in SA include Pit Bull Terriers (used for fighting), Greyhounds (used for illegal hunting), and Donkeys (often overworked).', challenge: 'The act protects all domestic animals, but can you name one of the breeds often affected by cruelty and why?' },
      { type: 'text', fact: 'Let\'s compare farming methods. Factory Farming is where many animals are kept in small, confined spaces like cages to produce food cheaply.', challenge: 'In your own words, what is the main goal of factory farming?' },
      { type: 'text', fact: 'Free-Range Farming is when animals are given access to the outdoors and have more space to move around naturally.', challenge: 'What is the biggest difference for the animal between factory farming and free-range farming?' },
      { type: 'text', fact: 'A benefit of free-range farming is better animal welfare, as the animals are less stressed. A challenge is that it costs more, making the food more expensive.', challenge: 'Name one good thing and one challenging thing about free-range farming.' },
      { type: 'text', fact: 'Sterilisation (spaying or neutering) is a vet operation that stops an animal from having babies. Its main benefit is preventing unwanted puppies and kittens, which reduces the number of stray animals.', challenge: 'Why is sterilising your pet a good idea for the community?' },
      { type: 'text', fact: 'All household pets have basic needs. Two important ones are: Proper Nutrition (the right food and fresh water) and Safe Shelter (a warm, dry place to sleep).', challenge: 'Besides food and shelter, what is another important need a household pet has?' },
      { type: 'text', fact: 'The Cape of Good Hope SPCA in Grassy Park, Cape Town, helps all kinds of animals, from dogs and cats to farm animals and wildlife.', challenge: 'What makes the SPCA different from a normal vet?' },
      { type: 'text', fact: 'People can support the SPCA by donating money, food, or blankets, by volunteering their time, or by choosing to adopt a rescue animal.', challenge: 'If you couldn\'t give money, what is another way you could help the SPCA?' },
      { type: 'text', fact: 'When you adopt an animal from the SPCA, the adoption fee often helps cover the cost of their sterilisation and their first vaccinations.', challenge: 'What are two important health-related things an adoption fee usually pays for?' },
      { type: 'text', fact: 'Fireworks can be a form of animal cruelty because the loud bangs cause extreme fear and stress. Animals have very sensitive hearing and can panic and run away.', challenge: 'Explain in your own words why fireworks are so scary for animals.' },
    ]
  }
};

// --- Custom Hook for Text-to-Speech (Aliza's Voice) ---
const useSpeechSynthesis = (text) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [highlightedWordIndex, setHighlightedWordIndex] = useState(-1);
  const words = text.split(/(\s+)/);

  const speak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setHighlightedWordIndex(-1);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.lang === 'en-ZA' && voice.name.includes('Female'));
    if (!selectedVoice) selectedVoice = voices.find(voice => voice.lang.startsWith('en') && voice.name.includes('Female'));
    utterance.voice = selectedVoice;
    utterance.lang = selectedVoice?.lang || 'en-ZA';
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => { setIsSpeaking(false); setHighlightedWordIndex(-1); };
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const wordCount = text.substring(0, event.charIndex).split(/(\s+)/).filter(Boolean).length;
        setHighlightedWordIndex(wordCount);
      }
    };
    window.speechSynthesis.speak(utterance);
  };

  const SpokenText = () => (
    <span>
      {words.map((word, index) => (
        <span key={index} style={index === highlightedWordIndex ? { backgroundColor: '#FCD34D', color: '#1E3A8A', borderRadius: '3px' } : {}}>{word}</span>
      ))}
    </span>
  );
  return { speak, isSpeaking, SpokenText };
};

// --- Custom Hook for Speech-to-Text (User's Voice) ---
const useSpeechRecognition = (onTranscript) => {
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
            if (finalTranscript) {
                onTranscript(finalTranscript);
            }
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


// --- UI Component for a single chat message ---
const ChatMessage = ({ message }) => {
  const styles = getStyles();
  const { speak, isSpeaking, SpokenText } = useSpeechSynthesis(message.text);
  const isAliza = message.sender === 'aliza';
  
  let bubbleStyle = styles.userBubble;
  if(isAliza) {
      bubbleStyle = message.isChallenge ? styles.alizaChallengeBubble : styles.alizaBubble;
  }

  return (
    <div style={bubbleStyle}>
      <div style={styles.chatTextContainer}>
        <div style={styles.chatText}>
            {message.isCorrect && '⭐ '}
            <SpokenText />
        </div>
        {isAliza && <button onClick={speak} style={styles.speakerButton}>{isSpeaking ? '🤫' : '🔊'}</button>}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [contentIndex, setContentIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [consecutiveMistakes, setConsecutiveMistakes] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

  const scrollRef = useRef();

  // Handle updates from the speech recognition hook
  const handleTranscript = (transcript) => {
    setUserInput(prev => prev + transcript);
  };
  const { isListening, toggleListening } = useSpeechRecognition(handleTranscript);

  useEffect(() => { window.speechSynthesis.getVoices(); }, []);
  useEffect(() => { setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }), 100); }, [chatHistory]);

  const getAlizaResponse = async (userMessage, currentChallenge, intent = 'answer') => {
    setIsLoading(true);
    setShowNextButton(false); // Hide button while Aliza is thinking
    
    let promptType;
    if (intent === 'explain_differently') {
        promptType = `The user is stuck on this challenge: "${currentChallenge}". Explain the core concept in a completely new and simple way. Use a fun analogy.`;
    } else if (intent === 'frustrated') {
        promptType = `The user is feeling frustrated or confused, saying: "${userMessage}". Respond with extra empathy and encouragement. Then, give a simple hint for the challenge: "${currentChallenge}".`;
    } else {
        promptType = `The user is working on this challenge: "${currentChallenge}". Their answer is: "${userMessage}". They have made ${consecutiveMistakes} mistakes in a row. If they get it right, praise them enthusiastically. If wrong, be gentle and give a hint.`;
    }

    const alizaPrompt = `You are Aliza, a compassionate, empathetic, and super encouraging AI study buddy for a 10-13 year old learner in Cape Town. Your Persona: - Tone: ALWAYS patient, kind, and positive, like a best friend helping with homework. - Language: Use natural, conversational English and friendly South African slang like "Lekker!", "Howzit!", "Eish!". - Explanation Style: Explain things in a simple, fun way. Use easy-to-understand analogies. ${promptType}`;
    const apiPayload = { contents: [{ role: "user", parts: [{ text: alizaPrompt }] }] };
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    try {
      const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(apiPayload) });
      const result = await response.json();
      const alizaResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm a bit stuck, let's try that again!";
      const isCorrect = (alizaResponse.toLowerCase().includes('lekker') || alizaResponse.toLowerCase().includes('awesome') || alizaResponse.toLowerCase().includes('nailed it')) && intent === 'answer';
      
      setChatHistory(prev => [...prev, { sender: 'aliza', text: alizaResponse, isCorrect }]);
      
      if (isCorrect) {
          setShowNextButton(true); // Show button on correct answer
          setConsecutiveMistakes(0);
      } else if (intent === 'answer') {
          setConsecutiveMistakes(prev => prev + 1);
      }

    } catch (error) {
      setChatHistory(prev => [...prev, { sender: 'aliza', text: "Eish, my circuits are a bit tangled! Let's try again." }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUserSend = () => {
    if (!userInput.trim()) return;
    const currentChallenge = [...chatHistory].reverse().find(msg => msg.isChallenge)?.text;
    setShowNextButton(false); // Hide button when user sends a new message
    setChatHistory(prev => [...prev, { sender: 'user', text: userInput }]);
    const frustrationKeywords = ['don\'t understand', 'don\'t get it', 'too hard', 'confused'];
    if (frustrationKeywords.some(keyword => userInput.toLowerCase().includes(keyword))) {
        getAlizaResponse(userInput, currentChallenge, 'frustrated');
    } else {
        getAlizaResponse(userInput, currentChallenge, 'answer');
    }
    setUserInput('');
  };

  const handleNextQuestion = () => {
    setShowNextButton(false); // Hide button after clicking
    const subjectContent = SUBJECT_DATA[currentSubject].content;
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

  const startSubject = (subject) => {
    setCurrentSubject(subject);
    setContentIndex(0);
    const firstContent = SUBJECT_DATA[subject].content[0];
    setChatHistory([
        { sender: 'aliza', text: `Howzit! Ready to tackle some ${subject}? Let's start with this one.` }, 
        { sender: 'aliza', text: firstContent.fact },
        { sender: 'aliza', text: firstContent.challenge, isChallenge: true }
    ]);
  };
  
  const handlePresetClick = (type) => {
     const currentChallenge = [...chatHistory].reverse().find(msg => msg.isChallenge)?.text;
     if (type === 'hint') setChatHistory(prev => [...prev, { sender: 'aliza', text: `Okay, let's think... For "${currentChallenge}", try to focus on the key words in the first sentence.` }]);
     else if (type === 'explain_differently') getAlizaResponse(userInput, currentChallenge, 'explain_differently');
  };

  const styles = getStyles();

  if (!currentSubject) {
    return (
      <div style={styles.container}>
        <div style={styles.subjectSelectionContainer}>
          <h1 style={styles.appName}>Aliza</h1>
          <p style={styles.introText}>Your friendly study buddy!</p>
          <p style={styles.introText}>Which subject are we diving into today?</p>
          <div style={styles.subjectGrid}>
            {Object.keys(SUBJECT_DATA).map(subject => (
              <button key={subject} style={styles.subjectButton} onClick={() => startSubject(subject)}>
                <span style={styles.subjectIcon}>{SUBJECT_DATA[subject].icon}</span>
                <span style={styles.subjectName}>{subject}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer}>
        <div style={styles.header}>
            <button style={styles.backButton} onClick={() => setCurrentSubject(null)}>← Back</button>
            <h2 style={styles.headerTitle}>{currentSubject}</h2>
            <div style={{width: 50}}/>
        </div>
        <div style={styles.chatArea}>
          {chatHistory.map((msg, index) => <ChatMessage key={index} message={msg} />)}
          {isLoading && <div style={styles.alizaBubble}><p style={styles.chatText}>Thinking...</p></div>}
          <div ref={scrollRef} />
        </div>
        
        {showNextButton && !isLoading && (
            <div style={styles.nextQuestionContainer}>
                <button style={styles.nextQuestionButton} onClick={handleNextQuestion}>
                    Next Question ➤
                </button>
            </div>
        )}

        <div style={styles.presetReplies}>
            <button style={styles.presetButton} onClick={() => handlePresetClick('hint')}>Give me a hint</button>
            <button style={styles.presetButton} onClick={() => handlePresetClick('explain_differently')}>Explain it differently</button>
        </div>
        <div style={styles.inputContainer}>
          <input
            style={styles.textInput}
            placeholder={isListening ? "Listening..." : "Type or speak your answer..."}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUserSend()}
            disabled={isLoading || showNextButton}
          />
          <button style={{...styles.micButton, ...(isListening ? styles.micButtonListening : {})}} onClick={toggleListening} disabled={isLoading || showNextButton}>🎙️</button>
          <button style={styles.sendButton} onClick={handleUserSend} disabled={isLoading || showNextButton}>➤</button>
        </div>
      </div>
    </div>
  );
}

// --- Styles ---
const getStyles = () => ({
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#F0F4F8', fontFamily: 'sans-serif' },
  subjectSelectionContainer: { textAlign: 'center', padding: 20 },
  appName: { fontSize: 56, fontWeight: 'bold', color: '#1E3A8A', margin: 0 },
  introText: { fontSize: 20, color: '#4A5568', marginTop: 8 },
  subjectGrid: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: 40 },
  subjectButton: { backgroundColor: '#fff', border: '2px solid #DBEAFE', borderRadius: 20, width: 140, height: 140, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  subjectIcon: { fontSize: 48 },
  subjectName: { fontSize: 16, color: '#1E3A8A', fontWeight: '600', marginTop: 10 },
  chatContainer: { display: 'flex', flexDirection: 'column', width: '100%', maxWidth: 600, height: '100%', backgroundColor: '#fff', boxShadow: '0 0 20px rgba(0,0,0,0.1)', borderRadius: '20px', overflow: 'hidden' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#DBEAFE' },
  backButton: { background: 'none', border: 'none', fontSize: 16, color: '#1E3A8A', cursor: 'pointer', fontWeight: 'bold' },
  headerTitle: { color: '#1E3A8A', fontSize: 20, fontWeight: 'bold' },
  chatArea: { flex: 1, padding: '10px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#F9FAFB' },
  alizaBubble: { alignSelf: 'flex-start', backgroundColor: '#E0E7FF', borderRadius: '20px 20px 20px 5px', padding: '12px 18px', maxWidth: '85%' },
  alizaChallengeBubble: { alignSelf: 'flex-start', backgroundColor: '#FFFBEB', border: '2px solid #FBBF24', borderRadius: '20px 20px 20px 5px', padding: '12px 18px', maxWidth: '85%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#3B82F6', color: '#fff', borderRadius: '20px 20px 5px 20px', padding: '12px 18px', maxWidth: '80%' },
  chatTextContainer: { display: 'flex', alignItems: 'center', gap: '10px' },
  chatText: { margin: 0, fontSize: 16, lineHeight: 1.5, flex: 1 },
  speakerButton: { background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', padding: '0 5px' },
  nextQuestionContainer: { padding: '10px 20px', backgroundColor: '#F9FAFB', display: 'flex', justifyContent: 'center' },
  nextQuestionButton: { backgroundColor: '#10B981', color: 'white', border: 'none', borderRadius: 20, padding: '10px 25px', cursor: 'pointer', fontSize: 16, fontWeight: 'bold' },
  presetReplies: { display: 'flex', gap: '10px', padding: '10px 20px', borderTop: '1px solid #E5E7EB' },
  presetButton: { backgroundColor: '#E0E7FF', border: '1px solid #C7D2FE', color: '#3B82F6', borderRadius: 20, padding: '8px 16px', cursor: 'pointer', fontSize: 14, fontWeight: '600' },
  inputContainer: { display: 'flex', padding: '15px 20px', borderTop: '1px solid #E5E7EB', backgroundColor: '#fff', gap: '10px' },
  textInput: { flex: 1, border: '1px solid #D1D5DB', borderRadius: 20, padding: '12px 18px', fontSize: 16 },
  micButton: { backgroundColor: '#F3F4F6', color: '#1F2937', border: '1px solid #D1D5DB', borderRadius: '50%', width: 48, height: 48, fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  micButtonListening: { backgroundColor: '#FECACA', border: '1px solid #F87171' },
  sendButton: { backgroundColor: '#3B82F6', color: '#fff', border: 'none', borderRadius: '50%', width: 48, height: 48, fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
});

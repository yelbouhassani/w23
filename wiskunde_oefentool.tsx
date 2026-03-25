import { useState, useEffect, useRef, useCallback } from "react";

// ===== CONTENT PLACEHOLDER - TOPICS =====
// Replace this section with topic definitions
// Structure: { id: "topic_id", label: "Display Name", points: number }
const TOPICS = [
  // INSERT TOPICS HERE
  // Expected structure:
  // { id: "topic_id", label: "Display Name", points: total_points },
  // { id: "other_topic", label: "Other Topic", points: total_points },
  // etc.
];

const r = String.raw;

// ===== CONTENT PLACEHOLDER - PREDEFINED EXERCISES =====
// Replace this section with exercise content per topic
// Structure: topic_id: [{ points, criteria, question, answer }, ...]
const PREDEFINED = {
  // INSERT TOPIC EXERCISES HERE
  // Expected structure per topic:
  // "topic_id": [
  //   {
  //     points: number,
  //     criteria: [{ label: "Description", points: number }, ...],
  //     question: r`Question content with LaTeX using $ and $$ syntax`,
  //     answer: r`Answer content with LaTeX using $ and $$ syntax`
  //   },
  //   ... more exercises for this topic
  // ],
  // "other_topic_id": [...],
  // etc.
};

// ===== CONTENT PLACEHOLDER - REFERENCE STYLES =====
// Replace this section with reference styles per topic  
// Structure: topic_id: "Reference style description"
const REFERENCE = {
  // INSERT REFERENCE STYLES HERE
  // Expected structure:
  // "topic_id": "Description of reference style for this topic",
  // "other_topic": "Reference style for other topic",
  // etc.
};

const buildSystemPrompt = (topicLabel, ref, prevQuestions) => {
  const prevBlock = prevQuestions.length > 0
    ? "\n\nAL GEBRUIKTE VRAGEN:\n" + prevQuestions.map((q, i) => `${i+1}. ${q.slice(0,200)}`).join("\n")
    : "";
  return `Je bent een wiskundeexaminator voor toegepaste wiskunde op hbo/universitair niveau.\n\nGenereer EEN originele examenvraag over: "${topicLabel}".\n\nReferentiestijl:\n${ref}${prevBlock}\n\nOpmaakregel: gebruik $...$ voor inline wiskunde, $$...$$ voor display-formules. Schrijf in Markdown met ## voor titels en puntwaarden als (Xp).\nStructuur: vraag, dan ---ANTWOORD---, dan oplossing. Schrijf in het Nederlands.`;
};

function useKaTeX() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/katex@0.16.9/dist/katex.min.js";
    script.onload = () => setReady(true);
    document.head.appendChild(script);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/katex@0.16.9/dist/katex.min.css";
    document.head.appendChild(link);
  }, []);
  return ready;
}

function KaTeX({ children, block = false }) {
  const katexReady = useKaTeX();
  const ref = useRef(null);

  useEffect(() => {
    if (katexReady && ref.current && window.katex) {
      try {
        window.katex.render(children, ref.current, { 
          displayMode: block,
          throwOnError: false,
          strict: false,
          trust: true,
          macros: {
            "\\sinc": "\\text{sinc}",
            "\\rect": "\\text{rect}"
          }
        });
      } catch (error) {
        console.warn("KaTeX rendering error:", error);
        ref.current.textContent = children;
      }
    }
  }, [children, block, katexReady]);

  if (!katexReady) return <span style={{ color: '#666' }}>{children}</span>;
  return <span ref={ref} />;
}

function parseMarkdownWithMath(text) {
  if (!text) return [];
  
  const parts = [];
  let current = 0;
  
  while (current < text.length) {
    const dollardouble = text.indexOf('$$', current);
    const dollarsingle = text.indexOf('$', current);
    
    let nextMath, nextMathEnd, isBlock;
    
    if (dollardouble !== -1 && (dollarsingle === -1 || dollardouble <= dollarsingle)) {
      nextMath = dollardouble;
      nextMathEnd = text.indexOf('$$', nextMath + 2);
      isBlock = true;
    } else if (dollarsingle !== -1) {
      nextMath = dollarsingle;
      nextMathEnd = text.indexOf('$', nextMath + 1);
      isBlock = false;
    } else {
      parts.push({ type: 'text', content: text.slice(current) });
      break;
    }
    
    if (nextMathEnd === -1) {
      parts.push({ type: 'text', content: text.slice(current) });
      break;
    }
    
    if (nextMath > current) {
      parts.push({ type: 'text', content: text.slice(current, nextMath) });
    }
    
    const mathContent = text.slice(nextMath + (isBlock ? 2 : 1), nextMathEnd);
    parts.push({ type: 'math', content: mathContent, block: isBlock });
    
    current = nextMathEnd + (isBlock ? 2 : 1);
  }
  
  return parts;
}

function MarkdownRenderer({ children }) {
  const parts = parseMarkdownWithMath(children);
  
  return (
    <div>
      {parts.map((part, i) => {
        if (part.type === 'math') {
          return <KaTeX key={i} block={part.block}>{part.content}</KaTeX>;
        }
        
        const lines = part.content.split('\n');
        const elements = [];
        let currentParagraph = [];
        
        lines.forEach((line, lineIndex) => {
          if (line.startsWith('## ')) {
            if (currentParagraph.length > 0) {
              elements.push(<p key={`p-${i}-${elements.length}`}>{currentParagraph.join('\n')}</p>);
              currentParagraph = [];
            }
            elements.push(<h2 key={`h2-${i}-${lineIndex}`} style={{marginTop:20,marginBottom:10}}>{line.slice(3)}</h2>);
          } else if (line.startsWith('# ')) {
            if (currentParagraph.length > 0) {
              elements.push(<p key={`p-${i}-${elements.length}`}>{currentParagraph.join('\n')}</p>);
              currentParagraph = [];
            }
            elements.push(<h1 key={`h1-${i}-${lineIndex}`} style={{marginTop:20,marginBottom:10}}>{line.slice(2)}</h1>);
          } else if (line.trim() === '') {
            if (currentParagraph.length > 0) {
              elements.push(<p key={`p-${i}-${elements.length}`}>{currentParagraph.join('\n')}</p>);
              currentParagraph = [];
            }
          } else if (line.startsWith('<pre>') && line.endsWith('</pre>')) {
            if (currentParagraph.length > 0) {
              elements.push(<p key={`p-${i}-${elements.length}`}>{currentParagraph.join('\n')}</p>);
              currentParagraph = [];
            }
            elements.push(<pre key={`pre-${i}-${lineIndex}`} style={{background:'#f5f5f5',padding:10,borderRadius:5,overflow:'auto'}}><code>{line.slice(5, -6)}</code></pre>);
          } else {
            currentParagraph.push(line);
          }
        });
        
        if (currentParagraph.length > 0) {
          elements.push(<p key={`p-${i}-${elements.length}`}>{currentParagraph.join('\n')}</p>);
        }
        
        return elements;
      })}
    </div>
  );
}

export default function WiskundeOefentool() {
  const [selectedIds, setSelectedIds] = useState([]);
  const [exerciseCount, setExerciseCount] = useState(5);
  const [phase, setPhase] = useState("");
  const [questionQueue, setQuestionQueue] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionResults, setSessionResults] = useState([]);
  const [progress, setProgress] = useState({ current: 0, total: 0 });

  const generateQuestion = useCallback(async (topicId) => {
    const topic = TOPICS.find(t => t.id === topicId);
    if (!topic) return null;

    const predefined = PREDEFINED[topicId] || [];
    if (predefined.length > 0) {
      const randomEx = predefined[Math.floor(Math.random() * predefined.length)];
      return {
        id: Date.now() + Math.random(),
        topicId,
        topicLabel: topic.label,
        points: randomEx.points,
        criteria: randomEx.criteria,
        question: randomEx.question,
        answer: randomEx.answer,
        source: "predefined"
      };
    }

    return null;
  }, []);

  const handleStart = useCallback(async () => {
    if (selectedIds.length === 0) return;
    
    setPhase("loading");
    const allQuestions = [];
    
    for (let i = 0; i < exerciseCount; i++) {
      for (const topicId of selectedIds) {
        const q = await generateQuestion(topicId);
        if (q) allQuestions.push(q);
      }
    }
    
    setQuestionQueue(allQuestions);
    setProgress({ current: 0, total: allQuestions.length });
    setPhase("active");
    setCurrentQ(allQuestions[0] || null);
  }, [selectedIds, exerciseCount, generateQuestion]);

  const handleNext = useCallback(() => {
    if (currentQ && !showAnswer) {
      setShowAnswer(true);
      return;
    }
    
    const updatedQueue = questionQueue.slice(1);
    const newProgress = { current: progress.current + 1, total: progress.total };
    
    if (currentQ) {
      setSessionResults(prev => [...prev, {
        ...currentQ,
        completed: true,
        timestamp: new Date().toISOString()
      }]);
    }
    
    setQuestionQueue(updatedQueue);
    setProgress(newProgress);
    setShowAnswer(false);
    
    if (updatedQueue.length > 0) {
      setCurrentQ(updatedQueue[0]);
    } else {
      setCurrentQ(null);
      setPhase("");
    }
  }, [currentQ, showAnswer, questionQueue, progress]);

  const handleEnd = useCallback(() => {
    setPhase("");
    setCurrentQ(null);
    setQuestionQueue([]);
    setShowAnswer(false);
    setSessionResults([]);
    setProgress({ current: 0, total: 0 });
  }, []);

  const handleGenerate = phase === "active" ? handleEnd : handleStart;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "20px", fontFamily: "system-ui" }}>
      <h1 style={{ textAlign: "center", color: "#1e293b", marginBottom: 30 }}>Wiskunde Oefentool</h1>
      
      {phase === "active" && currentQ ? (
        <div style={{ background: "#f8fafc", borderRadius: 15, padding: 25, marginBottom: 20, border: "1px solid #e2e8f0" }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
              <span style={{ background: "#3b82f6", color: "white", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>{currentQ.topicLabel}</span>
              <span style={{ color: "#64748b", fontSize: 14 }}>Vraag {progress.current + 1} van {progress.total}</span>
            </div>
            <div style={{ background: "#e0f2fe", borderRadius: 10, height: 8, marginBottom: 15 }}>
              <div style={{ background: "#0ea5e9", height: "100%", borderRadius: 10, width: `${((progress.current / progress.total) * 100)}%`, transition: "width 0.3s ease" }}></div>
            </div>
          </div>
          
          <div style={{ marginBottom: 20 }}>
            <MarkdownRenderer>{currentQ.question}</MarkdownRenderer>
          </div>
          
          {showAnswer && (
            <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 20, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
                <h3 style={{ margin: 0, color: "#15803d" }}>Uitwerking</h3>
                <span style={{ color: "#059669", fontWeight: 600, fontSize: 14 }}>Max: {currentQ.points} punten</span>
              </div>
              <MarkdownRenderer>{currentQ.answer}</MarkdownRenderer>
              
              {currentQ.criteria && (
                <div style={{ marginTop: 20, padding: 15, background: "white", borderRadius: 8, border: "1px solid #d1fae5" }}>
                  <h4 style={{ margin: 0, marginBottom: 10, color: "#059669", fontSize: 14 }}>Beoordelingscriteria:</h4>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {currentQ.criteria.map((criterion, i) => (
                      <li key={i} style={{ color: "#374151", fontSize: 13, marginBottom: 5 }}>
                        {criterion.label} ({criterion.points}p)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <button onClick={handleNext}
            style={{ width: "100%", padding: "12px", borderRadius: 10, border: "none", background: showAnswer ? "#059669" : "#0ea5e9", color: "white", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: showAnswer ? "0 4px 15px rgba(5,150,105,0.4)" : "0 4px 15px rgba(14,165,233,0.4)" }}>
            {showAnswer ? (progress.current + 1 >= progress.total ? "Beëindig sessie" : "Volgende vraag") : "Toon uitwerking"}
          </button>
        </div>
      ) : (
        <div style={{ background: "#ffffff", borderRadius: 15, padding: 25, border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)" }}>
          <h2 style={{ marginTop: 0, color: "#1e293b", marginBottom: 20 }}>Selecteer onderwerpen</h2>
          
          {phase === "" && (
            <>
              <div style={{ display: "grid", gap: 10, marginBottom: 25 }}>
                {TOPICS.map(topic => (
                  <div key={topic.id}
                    onClick={() => setSelectedIds(prev => prev.includes(topic.id) ? prev.filter(id => id !== topic.id) : [...prev, topic.id])}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 15, border: "2px solid", borderColor: selectedIds.includes(topic.id) ? "#3b82f6" : "#e2e8f0", borderRadius: 10, cursor: "pointer", background: selectedIds.includes(topic.id) ? "#dbeafe" : "#f8fafc", transition: "all 0.2s ease" }}>
                    <span style={{ fontWeight: 500, color: "#374151" }}>{topic.label}</span>
                    <span style={{ color: "#6b7280", fontSize: 12, background: "white", padding: "2px 8px", borderRadius: 12 }}>{topic.points}p</span>
                  </div>
                ))}
              </div>
              
              <div style={{ marginBottom: 25 }}>
                <label style={{ display: "block", marginBottom: 8, fontWeight: 500, color: "#374151" }}>Aantal oefeningen per onderwerp:</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[1, 2, 3, 5, 8, 10].map(n => (
                    <button key={n}
                      onClick={() => setExerciseCount(n)}
                      style={{ padding: "8px 16px", border: "2px solid", borderColor: exerciseCount === n ? "#3b82f6" : "#d1d5db", borderRadius: 8, background: exerciseCount === n ? "#3b82f6" : "white", color: exerciseCount === n ? "white" : "#374151", fontWeight: exerciseCount === n ? 600 : 400, cursor: "pointer", transition: "all 0.2s ease" }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
          <button onClick={handleGenerate} disabled={phase==="loading"||selectedIds.length===0}
            style={{ width:"100%", padding:"12px", borderRadius:10, border:"none", background:phase==="active"?"#ef4444":(phase==="loading"||selectedIds.length===0)?"#4338ca":"#6366f1", color:"white", fontWeight:700, fontSize:15, cursor:(phase==="loading"||selectedIds.length===0)?"not-allowed":"pointer", opacity:selectedIds.length===0?0.5:1, boxShadow:phase==="active"?"0 4px 15px rgba(239,68,68,0.4)":"0 4px 15px rgba(99,102,241,0.4)" }}>
            {phase==="loading"?"Bezig…":phase==="active"?"Beëindig oefensessie":selectedIds.length===0?"Selecteer een onderwerp":`Start oefensessie (${selectedIds.length} onderwerp${selectedIds.length!==1?"en":""} × ${exerciseCount} = ${selectedIds.length*exerciseCount} oefeningen)`}
          </button>
        </div>
      )}
    </div>
  );
}
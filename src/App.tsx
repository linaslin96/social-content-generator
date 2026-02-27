import { useState } from 'react'
import './App.css'

interface GeneratedContent {
  platform: string;
  content: string;
  hashtags: string[];
}

const platforms = [
  { id: 'twitter', name: 'Twitter/X', icon: '𝕏', maxLength: 280, color: '#000000' },
  { id: 'linkedin', name: 'LinkedIn', icon: '💼', maxLength: 3000, color: '#0A66C2' },
  { id: 'instagram', name: 'Instagram', icon: '📸', maxLength: 2200, color: '#E4405F' },
  { id: 'facebook', name: 'Facebook', icon: '👥', maxLength: 63206, color: '#1877F2' },
];

const tones = [
  { id: 'professional', name: 'Professional', emoji: '💼' },
  { id: 'casual', name: 'Casual', emoji: '😊' },
  { id: 'humorous', name: 'Humorous', emoji: '😄' },
  { id: 'inspirational', name: 'Inspirational', emoji: '🚀' },
  { id: 'educational', name: 'Educational', emoji: '📚' },
];

const sampleTopics = [
  'AI and the future of work',
  'Building a startup from scratch',
  'Productivity tips for developers',
  'Learning to code in 2026',
  'Remote work best practices',
];

function App() {
  const [topic, setTopic] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [selectedTone, setSelectedTone] = useState('professional');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPricing, setShowPricing] = useState(false);

  const generateContent = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const platformData = platforms.find(p => p.id === selectedPlatform);
    
    // Generate content based on platform and tone
    const templates = getContentTemplates(selectedPlatform, selectedTone);
    const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
    
    const content: GeneratedContent = {
      platform: platformData?.name || 'Twitter',
      content: randomTemplate.replace('{topic}', topic),
      hashtags: generateHashtags(topic),
    };
    
    setGeneratedContent([content]);
    setIsGenerating(false);
  };

  const getContentTemplates = (platform: string, tone: string): string[] => {
    const templates: Record<string, Record<string, string[]>> = {
      twitter: {
        professional: [
          `🧵 Let's talk about {topic} and why it matters for your career. 👇`,
          `5 key insights on {topic} that every professional should know:`,
          `{topic} is reshaping the industry. Here's what you need to know:`,
        ],
        casual: [
          `Just been thinking about {topic} 🤯`,
          `Hot take: {topic} is underrated`,
          `Anyone else excited about {topic}? 🙋`,
        ],
        humorous: [
          `{topic} - when you finally get it, you realize... 😅`,
          `Me: "I'll learn about {topic}" Also me: *scrolls Twitter for 3 hours*`,
          `{topic} be like: *exists* and I'm here for it ✨`,
        ],
        inspirational: [
          `Your journey with {topic} starts with a single step. 🚀`,
          `The best time to understand {topic} was yesterday. The second best time is NOW. ⭐`,
          `Dream big. Start with {topic}. 🦋`,
        ],
        educational: [
          `Understanding {topic} in 5 minutes: 🧵`,
          `Here's everything you need to know about {topic} 👇`,
          `Let's break down {topic} together: 🧵`,
        ],
      },
      linkedin: {
        professional: [
          `{topic} - A thread on what I've learned after years of experience in this space.`,
          `As someone who's been deeply involved with {topic}, here are my thoughts on where we're headed.`,
          `The intersection of {topic} and professional growth is fascinating. Let me share some insights.`,
        ],
        casual: [
          `Quick thoughts on {topic} this morning ☕`,
          `Been meaning to share my thoughts on {topic} for a while now.`,
          `Sometimes the best insights come from unexpected places. Like {topic}.`,
        ],
        humorous: [
          `{topic} - my journey from "what?" to "wow!" 🚀`,
          `Plot twist: {topic} is actually fun once you get it 😄`,
          `{topic} but make it LinkedIn ✨`,
        ],
        inspirational: [
          `Your potential is unlimited. Start with {topic} today. 🌟`,
          `Every expert was once a beginner. Start your journey with {topic}. ⭐`,
          `The future belongs to those who embrace {topic}. Will you be one of them? 🚀`,
        ],
        educational: [
          `A comprehensive guide to {topic} for professionals at all levels.`,
          `Let's explore {topic} together - from basics to advanced concepts.`,
          `Everything you need to know about {topic}, condensed into one post.`,
        ],
      },
      instagram: {
        professional: [
          `✨ {topic} - everything you need to know ✨\n.\n.\n.\n#learning #growth #professional`,
          `Save this for later! 📌 {topic}\n.\n.\n#education #development`,
        ],
        casual: [
          `lowkey obsessed with {topic} 😍\n.\n.\n#lifestyle #trending`,
          `tell me you're learning about {topic} without telling me 🔍\n.\n.\n#curious`,
        ],
        humorous: [
          `me when {topic}: 🤡\n.\n.\n#relatable #funny`,
          `{topic} hit different at 2am 😂\n.\n.\n#nightowl #truth`,
        ],
        inspirational: [
          `✨ You are capable of understanding {topic} ✨\n.\n.\n.\n#motivation #believe`,
          `Start where you are. Use what you have. Do what you can. - {topic} 📍\n.\n.\n#inspiration`,
        ],
        educational: [
          `📚 Learning about {topic}? Save this! 📚\n.\n.\n#study #learning`,
        ],
      },
    };
    
    return templates[platform]?.[tone] || templates.twitter.professional;
  };

  const generateHashtags = (topic: string): string[] => {
    const base = topic.toLowerCase().split(' ').slice(0, 2);
    return [
      `#${base.join('')}`,
      `#${base[0]}`,
      '#' + topic.split(' ').find(w => w.length > 3)?.toLowerCase() || 'tech',
    ];
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">✍️</div>
        <h1>Social Content Generator</h1>
        <p>AI-powered content for every platform</p>
        <button className="pricing-btn" onClick={() => setShowPricing(true)}>
          💎 Pro
        </button>
      </header>

      <main className="main">
        <div className="input-section">
          <div className="form-group">
            <label>What do you want to post about?</label>
            <div className="input-wrapper">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your topic..."
                onKeyDown={(e) => e.key === 'Enter' && generateContent()}
              />
              <button className="sample-btn" onClick={() => setTopic(sampleTopics[Math.floor(Math.random() * sampleTopics.length)])}>
                🎲 Random
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Platform</label>
            <div className="platform-grid">
              {platforms.map(platform => (
                <button
                  key={platform.id}
                  className={`platform-btn ${selectedPlatform === platform.id ? 'active' : ''}`}
                  onClick={() => setSelectedPlatform(platform.id)}
                  style={{ '--platform-color': platform.color } as React.CSSProperties}
                >
                  <span className="platform-icon">{platform.icon}</span>
                  <span>{platform.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Tone</label>
            <div className="tone-grid">
              {tones.map(tone => (
                <button
                  key={tone.id}
                  className={`tone-btn ${selectedTone === tone.id ? 'active' : ''}`}
                  onClick={() => setSelectedTone(tone.id)}
                >
                  <span>{tone.emoji}</span>
                  <span>{tone.name}</span>
                </button>
              ))}
            </div>
          </div>

          <button 
            className="generate-btn" 
            onClick={generateContent}
            disabled={isGenerating || !topic.trim()}
          >
            {isGenerating ? '✨ Generating...' : '🚀 Generate Content'}
          </button>
        </div>

        {generatedContent.length > 0 && (
          <div className="output-section">
            <h2>✨ Generated Content</h2>
            {generatedContent.map((item, index) => (
              <div key={index} className="content-card">
                <div className="content-header">
                  <span className="platform-badge">{item.platform}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(item.content + '\n\n' + item.hashtags.join(' '))}
                  >
                    📋 Copy
                  </button>
                </div>
                <p className="content-text">{item.content}</p>
                <div className="hashtags">
                  {item.hashtags.map((tag, i) => (
                    <span key={i} className="hashtag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>🚀 Built for content creators | 100% Free to use</p>
      </footer>

      {showPricing && (
        <div className="modal-overlay" onClick={() => setShowPricing(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowPricing(false)}>×</button>
            <h2>💎 Pro Features</h2>
            <div className="pricing-grid">
              <div className="pricing-card free">
                <h3>Free</h3>
                <div className="price">$0<span>/month</span></div>
                <ul>
                  <li>✅ 10 generations/day</li>
                  <li>✅ All platforms</li>
                  <li>✅ Basic tones</li>
                </ul>
              </div>
              <div className="pricing-card pro">
                <h3>Pro</h3>
                <div className="price">$9<span>/month</span></div>
                <ul>
                  <li>✅ Unlimited generations</li>
                  <li>✅ Custom tone training</li>
                  <li>✅ Content scheduling</li>
                  <li>✅ Analytics</li>
                </ul>
                <button className="upgrade-btn">Coming Soon</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

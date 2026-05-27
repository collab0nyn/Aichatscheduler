import React, { useState } from 'react';
import { UploadCloud, MessageSquare, Send } from 'lucide-react';

export default function InputSection({ onExtract }) {
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      onExtract(data);
      setInputText('');
    } catch (err) {
      setError(err.message || 'Failed to connect to the server. Is Flask running?');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={24} className="text-gradient" />
        <h2 style={{ fontSize: '1.5rem' }}>Input Discussion</h2>
      </div>
      
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
        Paste your WhatsApp chat, Discord messages, or meeting notes below. Our NLP engine will automatically extract tasks, deadlines, and priorities.
      </p>

      {error && (
        <div style={{ color: '#f87171', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <textarea
            className="input-field"
            rows="6"
            placeholder="e.g., Vaishnavi prepare the PPT by Friday. Rahul complete the backend today. Priya check the report before submission. Backend is urgent."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{ resize: 'vertical', minHeight: '120px' }}
          ></textarea>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="button" className="btn-primary" style={{ background: 'rgba(255, 255, 255, 0.1)', color: 'var(--text-primary)' }}>
              <UploadCloud size={18} />
              Upload .txt
            </button>
          </div>
          
          <button type="submit" className="btn-primary" disabled={isProcessing}>
            {isProcessing ? (
              <span>Processing...</span>
            ) : (
              <>
                <Send size={18} />
                Extract Action Items
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

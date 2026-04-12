import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useDocument } from '../hooks/useDocument';
import { useWebSocket } from '../hooks/useWebSocket';
import wsClient from '../services/wsClient';
import api from '../services/api';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

export default function EditorPage() {
    const { slug } = useParams();
    const { document, setDocument, loading, notFound } = useDocument(slug);
    const isRemoteUpdate = useRef(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useWebSocket(slug, (delta) => {
        isRemoteUpdate.current = true;
        setDocument(prev => ({ ...prev, content: delta.content }));
    });

    function handleChange(e) {
        const content = e.target.value;
        setDocument(prev => ({ ...prev, content }));

        if (!isRemoteUpdate.current) {
            wsClient.publish({
                destination: `/app/doc/${slug}/edit`,
                body: JSON.stringify({ content })
            });
            api.patch(`/api/doc/${slug}`, { content });
        }

        isRemoteUpdate.current = false;
    }

    if (loading) return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            color: '#8c7a5e',
            letterSpacing: '0.08em',
            fontSize: '14px',
            textTransform: 'uppercase'
        }}>
            carregando...
        </div>
    );

    if (notFound) return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '16px',
            color: '#8c7a5e'
        }}>
            <p style={{ fontSize: '14px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                documento não encontrado
            </p>
            <a href="/" style={{ fontSize: '13px', color: '#6b4c2a', letterSpacing: '0.06em' }}>
                voltar ao início
            </a>
        </div>
    );

    return (
        <>
        <Sidebar
            slug={slug}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
        />

        <button
            onClick={() => setSidebarOpen(true)}
            style={{
                position: 'fixed',
                top: '20px',
                left: '20px',
                zIndex: 5,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                opacity: 0.4,
                transition: 'opacity 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = 1}
            onMouseLeave={e => e.currentTarget.style.opacity = 0.4}
        >
            {[0,1,2].map(i => (
                <span key={i} style={{
                    display: 'block',
                    width: '22px',
                    height: '1.5px',
                    background: '#6b4c2a'
                }} />
            ))}
        </button>
        
        <textarea
            value={document?.content || ''}
            onChange={handleChange}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '60px 80px',
                fontSize: '18px',
                lineHeight: '1.8',
                letterSpacing: '0.02em',
                background: 'transparent',
                color: 'inherit',
                fontFamily: 'Georgia, Times New Roman, serif',
                overflowX: 'hidden',
                overflowY: 'auto',
                boxSizing: 'border-box'
            }}
            placeholder="comece a escrever..."
        />
        </>
    );
}
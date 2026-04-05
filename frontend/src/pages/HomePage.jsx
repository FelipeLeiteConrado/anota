import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function HomePage() {
    const [slug, setSlug] = useState('');
    const navigate = useNavigate();

    async function handleGo() {
        const target = slug.trim() || Math.random().toString(36).slice(2, 8);
        
        try {
            await api.get(`/api/doc/${target}`);
        } catch {
            await api.post('/api/doc', { slug: target });
        }
        
        navigate(`/${target}`);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '16px'
        }}>
            <h1 style={{ fontSize: '32px', fontWeight: 500 }}>anota</h1>
            <div style={{ display: 'flex', gap: '8px' }}>
                <input
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGo()}
                    placeholder="nome do documento..."
                    style={{
                        padding: '10px 16px',
                        fontSize: '16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        outline: 'none',
                        width: '280px'
                    }}
                />
                <button
                    onClick={handleGo}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        background: '#000',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    ir
                </button>
            </div>
            <p style={{ color: '#888', fontSize: '14px' }}>
                deixe em branco pra gerar um link aleatório
            </p>
        </div>
    );
}
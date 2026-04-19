import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function HomePage() {
    const [slug, setSlug] = useState('');
    const navigate = useNavigate();

    async function handleGo() {
        const target = slug.trim();

        try {
            if (target) {
                await api.get(`/api/doc/${target}`);
                navigate(`/${target}`);
            } else {
                const res = await api.post('/api/doc', { slug: '' });
                navigate(`/${res.data.slug}`);
            }
        } catch (err) {
            if (err.response?.status === 404) {
                const res = await api.post('/api/doc', { slug: target });
                navigate(`/${res.data.slug}`);
            }
        }
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            gap: '24px',
            padding: '40px'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{
                    fontSize: '48px',
                    fontWeight: 'normal',
                    letterSpacing: '0.08em',
                    color: '#6b4c2a',
                    marginBottom: '8px'
                }}>
                    anota
                </h1>
                <p style={{
                    fontSize: '14px',
                    letterSpacing: '0.12em',
                    color: '#8c7a5e',
                    textTransform: 'uppercase'
                }}>
                    escreva. compartilhe. simples assim.
                </p>
            </div>

            <div style={{
                display: 'flex',
                gap: '0',
                border: '1px solid #d4c4a8',
                borderRadius: '4px',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '420px'
            }}>
                <input
                    value={slug}
                    onChange={e => setSlug(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGo()}
                    placeholder="nome do documento..."
                    style={{
                        flex: 1,
                        padding: '12px 16px',
                        fontSize: '16px',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        color: 'inherit',
                        letterSpacing: '0.02em'
                    }}
                />
                <button
                    onClick={handleGo}
                    style={{
                        padding: '12px 24px',
                        fontSize: '14px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        background: '#6b4c2a',
                        color: '#f5f0e8',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    ir
                </button>
            </div>

            <p style={{
                fontSize: '12px',
                color: '#8c7a5e',
                letterSpacing: '0.06em'
            }}>
                deixe em branco para gerar um link aleatório
            </p>
        </div>
    );
}
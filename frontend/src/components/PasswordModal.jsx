import { useState } from 'react';

export default function PasswordModal({ type, onSubmit, error, loading }) {
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(password, type);
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
        }}>
            <div style={{
                background: '#f0ead8',
                border: '1px solid #d4c4a8',
                borderRadius: '8px',
                padding: '40px',
                width: '100%',
                maxWidth: '360px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div>
                    <p style={{
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#8c7a5e',
                        marginBottom: '6px'
                    }}>
                        {type === 'read' ? 'senha de leitura' : 'senha de edição'}
                    </p>
                    <p style={{
                        fontSize: '14px',
                        color: '#2c2416',
                        fontFamily: 'Georgia, serif'
                    }}>
                        este documento está protegido.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="digite a senha..."
                        autoFocus
                        style={{
                            padding: '10px 14px',
                            fontSize: '15px',
                            border: '1px solid #d4c4a8',
                            borderRadius: '4px',
                            background: 'transparent',
                            color: '#2c2416',
                            fontFamily: 'Georgia, serif',
                            outline: 'none'
                        }}
                    />

                    {error && (
                        <p style={{ fontSize: '12px', color: '#c0392b', letterSpacing: '0.04em' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        style={{
                            padding: '10px',
                            background: '#6b4c2a',
                            color: '#f5f0e8',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '13px',
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            cursor: loading || !password ? 'not-allowed' : 'pointer',
                            opacity: loading || !password ? 0.6 : 1,
                            fontFamily: 'Georgia, serif'
                        }}
                    >
                        {loading ? 'verificando...' : 'entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
}
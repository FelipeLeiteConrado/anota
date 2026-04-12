import { useState } from 'react';

export default function Sidebar({ slug, isOpen, onClose }) {
    const [copied, setCopied] = useState(false);

    function copyLink() {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        zIndex: 10,
                        backdropFilter: 'blur(2px)'
                    }}
                />
            )}

            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '280px',
                background: '#f0ead8',
                borderRight: '1px solid #d4c4a8',
                zIndex: 20,
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.25s ease',
            }}>
                <p style={{
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#8c7a5e',
                    marginBottom: '8px'
                }}>
                    {slug}
                </p>

                <hr style={{ border: 'none', borderTop: '1px solid #d4c4a8', margin: '8px 0' }} />

                <button onClick={copyLink} style={btnStyle}>
                    {copied ? 'link copiado!' : 'copiar link'}
                </button>

                <hr style={{ border: 'none', borderTop: '1px solid #d4c4a8', margin: '8px 0' }} />

                <p style={{
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#8c7a5e',
                    marginTop: '4px'
                }}>
                    proteção por senha
                </p>

                <button style={btnStyle}>senha de leitura</button>
                <button style={btnStyle}>senha de edição</button>

                <div style={{ flex: 1 }} />

                <button onClick={onClose} style={{ ...btnStyle, color: '#8c7a5e', fontSize: '12px' }}>
                    fechar
                </button>
            </div>
        </>
    );
}

const btnStyle = {
    background: 'none',
    border: '1px solid #d4c4a8',
    borderRadius: '4px',
    padding: '10px 14px',
    fontSize: '13px',
    letterSpacing: '0.06em',
    color: '#2c2416',
    cursor: 'pointer',
    textAlign: 'left',
    fontFamily: 'Georgia, Times New Roman, serif',
    transition: 'background 0.15s'
};
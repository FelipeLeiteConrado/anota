import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useDocument } from '../hooks/useDocument';
import { useWebSocket } from '../hooks/useWebSocket';
import wsClient from '../services/wsClient';
import api from '../services/api';

export default function EditorPage() {
    const { slug } = useParams();
    const { document, setDocument, loading, notFound } = useDocument(slug);
    const isRemoteUpdate = useRef(false);

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

    if (loading) return <p>carregando...</p>;
    if (notFound) return <p>documento não encontrado</p>;

    return (
        <textarea
            value={document?.content || ''}
            onChange={handleChange}
            style={{
                width: '100vw',
                height: '100vh',
                border: 'none',
                outline: 'none',
                resize: 'none',
                padding: '40px',
                fontSize: '16px',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
            }}
            placeholder="comece a escrever..."
        />
    );
}
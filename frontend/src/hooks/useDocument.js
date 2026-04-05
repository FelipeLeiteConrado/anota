import { useState, useEffect } from 'react';
import api from '../services/api';

export function useDocument(slug) {
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        api.get(`/api/doc/${slug}`)
            .then(res => setDocument(res.data))
            .catch(err => {
                if (err.response?.status === 404) setNotFound(true);
            })
            .finally(() => setLoading(false));
    }, [slug]);

    return { document, setDocument, loading, notFound };
}
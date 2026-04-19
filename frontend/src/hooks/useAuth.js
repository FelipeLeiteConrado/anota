import { useState } from 'react';
import api from '../services/api';

export function useAuth(slug, document) {
    const [token, setToken] = useState(() => localStorage.getItem(`anota_token_${slug}`));
    const [permission, setPermission] = useState(() => localStorage.getItem(`anota_permission_${slug}`));
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const needsReadAuth = document?.hasReadPassword && !token;
    const needsWriteAuth = document?.hasWritePassword && permission !== 'read_write';
    const canEdit = !document?.hasWritePassword || permission === 'read_write';

    async function authenticate(password, type) {
        setLoading(true);
        setError(null);
        try {
            const res = await api.post(`/api/doc/${slug}/auth`, { password, type });
            const { token: newToken, permission: newPermission } = res.data;
            localStorage.setItem(`anota_token_${slug}`, newToken);
            localStorage.setItem(`anota_permission_${slug}`, newPermission);
            setToken(newToken);
            setPermission(newPermission);
        } catch {
            setError('senha incorreta');
        } finally {
            setLoading(false);
        }
    }

    return { token, permission, needsReadAuth, needsWriteAuth, canEdit, authenticate, error, loading };
}
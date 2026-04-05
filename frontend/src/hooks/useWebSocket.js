import { useEffect, useRef } from 'react';
import wsClient from '../services/wsClient';

export function useWebSocket(slug, onDelta) {
    const subscription = useRef(null);

    useEffect(() => {
        if (!slug) return;

        wsClient.onConnect = () => {
            subscription.current = wsClient.subscribe(
                `/topic/doc/${slug}`,
                (message) => {
                    const delta = JSON.parse(message.body);
                    onDelta(delta);
                }
            );
        };

        wsClient.activate();

        return () => {
            subscription.current?.unsubscribe();
            wsClient.deactivate();
        };
    }, [slug]);
}
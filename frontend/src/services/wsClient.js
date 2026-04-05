import { Client } from '@stomp/stompjs';

const wsUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8080')
    .replace('http', 'ws') + '/ws/websocket';

const wsClient = new Client({
    brokerURL: wsUrl,
    reconnectDelay: 5000,
});

export default wsClient;
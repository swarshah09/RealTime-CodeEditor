import { io } from 'socket.io-client';

let socket;

export const initSocket = async () => {
    if (!socket) {
        const options = {
            'force new connection': true,
            reconnectionAttempts: 'Infinity',
            timeout: 10000,
            transports: ['websocket'],
        };
        socket = io(process.env.REACT_APP_BACKEND_URL, options);
    }
    return socket;
};

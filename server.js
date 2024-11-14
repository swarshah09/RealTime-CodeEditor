const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const ACTIONS = require('./src/Actions');
const path = require('path');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Adjust if you have a specific domain for the frontend
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, 'build'))); // Serve static files

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// WebSocket and other configurations
const userSocketMap = {};
const roomCreationTimes = {};  // Store the creation time of each room

function getAllConnectedClients(roomId) {
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            username: userSocketMap[socketId],
        };
    });
}

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
        console.log(`User ${username} joined room ${roomId} with socket ID ${socket.id}`);
        userSocketMap[socket.id] = username;
        socket.join(roomId);

        if (!roomCreationTimes[roomId]) {
            roomCreationTimes[roomId] = new Date().toISOString();
        }

        const clients = getAllConnectedClients(roomId);
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                username,
                socketId: socket.id,
                roomCreationTime: roomCreationTimes[roomId],
            });
        });

        socket.emit(ACTIONS.JOINED, {
            clients,
            username,
            socketId: socket.id,
            roomCreationTime: roomCreationTimes[roomId],
        });
    });

    socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
        socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
    });

    socket.on(ACTIONS.TYPING, ({ roomId, username }) => {
        socket.in(roomId).emit(ACTIONS.TYPING, { username });
    });

    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                username: userSocketMap[socket.id],
            });
        });
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
        delete userSocketMap[socket.id];
    });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import ACTIONS from '../Actions';
import Client from '../components/Client';
import Editor from '../components/editor';
import { initSocket } from '../socket';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { CiCircleInfo } from "react-icons/ci";

const EditorPage = () => {
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomId } = useParams();
    const socketRef = useRef(null);
    const codeRef = useRef(null);
    const [clients, setClients] = useState([]);
    const [typingUsers, setTypingUsers] = useState([]);
    const [roomCreationTime, setRoomCreationTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState('00:00:00');
    const listenersAdded = useRef(false);

    useEffect(() => {
        const init = async () => {
            if (!socketRef.current) {
                socketRef.current = await initSocket();
                socketRef.current.username = location.state?.username;

                function handleErrors(e) {
                    console.log('socket error', e);
                    toast.error('Socket connection failed, try again later.');
                    reactNavigator('/');
                }

                socketRef.current.on('connect_error', handleErrors);
                socketRef.current.on('connect_failed', handleErrors);

                socketRef.current.emit(ACTIONS.JOIN, {
                    roomId,
                    username: location.state?.username,
                });

                if (!listenersAdded.current) {
                    // Listening for joined event
                    socketRef.current.on(ACTIONS.JOINED, ({ clients, username, socketId, roomCreationTime }) => {
                        console.log('JOINED event', clients);
                        if (username !== location.state?.username) {
                            toast.success(`${username} joined the room.`);
                            console.log(`${username} joined`);
                        }
                        setClients(clients);
                        setRoomCreationTime(new Date(roomCreationTime));  // Set room creation time
                        socketRef.current.emit(ACTIONS.SYNC_CODE, {
                            code: codeRef.current,
                            socketId,
                        });
                    });

                    socketRef.current.on(ACTIONS.TYPING, ({ username }) => {
                        setTypingUsers((prev) => [...new Set([...prev, username])]);
                        setTimeout(() => {
                            setTypingUsers((prev) => prev.filter((user) => user !== username));
                        }, 3000);
                    });

                    socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
                        toast.success(`${username} left the room.`);
                        setClients((prev) => prev.filter((client) => client.socketId !== socketId));
                    });

                    listenersAdded.current = true;
                }
            }
        };

        init();

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current.off(ACTIONS.JOINED);
                socketRef.current.off(ACTIONS.DISCONNECTED);
                socketRef.current.off(ACTIONS.TYPING);
            }
        };
    }, [roomId, location.state?.username, reactNavigator]);

    useEffect(() => {
        let interval;
        if (roomCreationTime) {
            interval = setInterval(() => {
                const now = new Date();
                const elapsed = new Date(now - roomCreationTime);
                setElapsedTime(
                    `${String(elapsed.getUTCHours()).padStart(2, '0')}:${String(elapsed.getUTCMinutes()).padStart(2, '0')}:${String(elapsed.getUTCSeconds()).padStart(2, '0')}`
                );
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [roomCreationTime]);

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    function leaveRoom() {
        reactNavigator('/');
    }

    function downloadCodeAsFile() {
        const code = codeRef.current;
        const blob = new Blob([code], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'code.txt'; // Change the file name and extension as needed
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }

    if (!location.state) {
        return <Navigate to="/" />;
    }

    return (
        <div className='mainWrap'>
            <div className='aside'>
                <div className='asideInner'>
                    <div className='logo'>
                        <img className='logoImage' src='/code-connection.png' alt='logo' />
                    </div>
                    <h3>Connected</h3>
                    <div className='clientsList'>
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.username} />
                        ))}
                    </div>
                    <div className='typingIndicator'>
                        {typingUsers.map((user, index) => (
                            <p key={index}>{user} is typing...</p>
                        ))}
                    </div>
                    <div className='elapsedTime'>
                        <p>Elapsed Time: {elapsedTime}</p>
                    </div>
                </div>
                {/*  */}
                <p className='issue'><CiCircleInfo />&nbsp;Just reload the page if you find any issues.</p>
                <div className='buttonboth'>
                    <button className="copy" onClick={copyRoomId}>
                        <span className="tooltip" data-text-initial="Copy to clipboard" data-text-end="Copied Room ID!"></span>
                        <span>
                            Copy Room ID
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                <g>
                                    <path d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" fill="currentColor"></path>
                                </g>
                            </svg>
                        </span>
                    </button>
                    <button className='btn downloadBtn' onClick={downloadCodeAsFile}>Download File</button> {/* button to download code */}
                    <button className='btn leaveBtn' onClick={leaveRoom}>Leave Room</button>
                </div>
            </div>
            <div className='editorWrap'>
                <Editor
                    socketRef={socketRef}
                    roomId={roomId}
                    onCodeChange={(code) => {
                        codeRef.current = code;
                    }}
                />
            </div>
        </div>
    );
};

export default EditorPage;

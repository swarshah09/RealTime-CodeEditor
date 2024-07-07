import React, { useEffect, useRef, useState } from 'react';
import Codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/closebrackets';
import ACTIONS from '../Actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
    const editorRef = useRef(null);
    const textareaRef = useRef(null);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!editorRef.current) {
            editorRef.current = Codemirror.fromTextArea(textareaRef.current, {
                mode: { name: 'javascript', json: true },
                theme: 'dracula',
                autoCloseTags: true,
                autoCloseBrackets: true,
                lineNumbers: true,
            });

            editorRef.current.on('change', (instance, changes) => {
                const { origin } = changes;
                const code = instance.getValue();
                onCodeChange(code);
                if (origin !== 'setValue') {
                    socketRef.current.emit(ACTIONS.CODE_CHANGE, {
                        roomId,
                        code,
                    });
                }
            });

            editorRef.current.on('keypress', () => {
                if (!isTyping) {
                    setIsTyping(true);
                    socketRef.current.emit(ACTIONS.TYPING, {
                        roomId,
                        username: socketRef.current.username, // Ensure username is passed
                    });
                }

                clearTimeout(editorRef.current.typingTimeout);
                editorRef.current.typingTimeout = setTimeout(() => {
                    setIsTyping(false);
                }, 3000);
            });
        }
    }, [isTyping, roomId, socketRef, onCodeChange]);

    useEffect(() => {
        const handleCodeChange = ({ code }) => {
            if (code !== null && editorRef.current) {
                editorRef.current.setValue(code);
            }
        };

        if (socketRef.current) {
            socketRef.current.on(ACTIONS.CODE_CHANGE, handleCodeChange);
        }

        return () => {
            if (socketRef.current) {
                socketRef.current.off(ACTIONS.CODE_CHANGE, handleCodeChange);
            }
        };
    }, [socketRef]);

    return <textarea ref={textareaRef} id="realtimeEditor"></textarea>;
};

export default Editor;

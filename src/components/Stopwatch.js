import React, { useState, useRef } from 'react';
import NoteItem from './NoteItem';
import './Stopwatch.css';

const Stopwatch = () => {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);
    const [notes, setNotes] = useState([]);

    const startPauseHandler = () => {
        if (!running) {
            const startTime = Date.now() - elapsedTime;
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTime);
            }, 10);
        } else {
            clearInterval(intervalRef.current);
        }
        setRunning(!running);
    };

    const stopHandler = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
        setElapsedTime(0);
    };

    const flagHandler = () => {
        const currentTime = formatTime(elapsedTime);
        setNotes([...notes, currentTime]);
    };

    const formatTime = (timeInMilliseconds) => {
        const totalMilliseconds = Math.floor(timeInMilliseconds);
        const minutes = Math.floor(totalMilliseconds / (1000 * 60));
        const seconds = Math.floor((totalMilliseconds % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((totalMilliseconds % 1000));

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(3, '0');

        return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    };

    return (
        <div className="container">
            <h1>Stopwatch</h1>
            <div id="timer">{formatTime(elapsedTime)}</div>
            <div id="buttons">
                <button id="startPause" className="btn" onClick={startPauseHandler}>
                    {running ? 'Pause' : 'Start'}
                </button>
                <button id="stop" className="btn" onClick={stopHandler}>
                    Stop
                </button>
                <button id="flag" className="btn" onClick={flagHandler}>
                    Flag
                </button>
            </div>
            <div id="notes">
                <h2>Notes:</h2>
                <ul id="notesList">
                    {notes.map((note, index) => (
                        <NoteItem key={index} time={note} />
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stopwatch;

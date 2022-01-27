import React, { useState } from 'react';
import Prompt from './Prompt';
import ConsoleMessage from './ConsoleMessage';
import parseInput from '../utils/parseInput';
import '../css/style.css';

const WindowTitle = ({ children }) => {
  return (
    <div className="window-title">
      <p>{children}</p>
      <button className="window-button">X</button>
    </div>
  );
};

const promptTitle = 'visitor@zmdesigns ~ >';

const ConsoleWindow = () => {
  const [history, setHistory] = useState([]);
  const [promptInput, setPromptInput] = useState('');
  const [isFocused, setFocus] = useState(false);
  const onPromptInput = (e) => {
    if (e.code === 'Enter') {
      onPromptSubmit();
    } else if (e.code === 'Backspace') {
      setPromptInput(promptInput.slice(0, -1));
    } else {
      setPromptInput(promptInput + e.key);
    }
  };
  const onPromptSubmit = () => {
    const result = parseInput(promptInput);
    setHistory([...history, promptTitle + ' ' + promptInput, result]);
    setPromptInput('');
  };
  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <div
      className="console-window"
      tabIndex="0"
      onKeyDown={onPromptInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <WindowTitle>Command Line</WindowTitle>
      <div className="console-body">
        {history.map((historyItem) => {
          return <ConsoleMessage>{historyItem}</ConsoleMessage>;
        })}
        <Prompt
          promptTitle={promptTitle}
          promptInput={promptInput}
          isFocused={isFocused}
        />
      </div>
    </div>
  );
};

export default ConsoleWindow;

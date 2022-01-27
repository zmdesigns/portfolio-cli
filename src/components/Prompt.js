import ConsoleMsg from './ConsoleMessage';

const PromptCursor = ({ isFocused }) => {
  return <div className={`${isFocused ? 'console-cursor' : ''}`}>&#9646;</div>;
};

const Prompt = ({ promptTitle, promptInput, isFocused }) => {
  return (
    <div className="prompt">
      {promptTitle + ' ' + promptInput}
      <PromptCursor isFocused={isFocused} />
    </div>
  );
};

export default Prompt;

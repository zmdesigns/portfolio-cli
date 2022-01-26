import ConsoleMsg from './ConsoleMessage';

const PromptCursor = () => {
  return <div className="console-cursor">&#9646;</div>;
};

const Prompt = ({ promptTitle, promptInput }) => {
  return (
    <div className="prompt">
      <div>{promptTitle + ' ' + promptInput}</div>
      <PromptCursor />
    </div>
  );
};

export default Prompt;

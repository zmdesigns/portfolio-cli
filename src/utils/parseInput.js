const tokenizer = (inputText) => {
  return inputText.split(/\W+/);
};

const parseInput = (inputText) => {
  const tokens = tokenizer(inputText);
  if (tokens.length < 0) {
    return;
  }
  const command = tokens[0];
  let args = [];
  if (tokens.length > 1) {
    args = tokens.slice(1);
  }
  return parseCommand(command, args);
};

const parseCommand = (command, args) => {
  let result = command + ': command not found';
  switch (command) {
    case 'help':
      result = parseCommandHelp(args);
      break;
    default:
      break;
  }
  return result;
};

const parseCommandHelp = (args) => {
  if (args) {
    const arg = args[0];
    switch (arg) {
      case 'help':
        return 'Lists available commands. Provides information about a command given as an argument.';
    }
  }
  return 'Available commands are: help';
};

export default parseInput;

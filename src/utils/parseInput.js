class mockOS {
  constructor() {
    this.cwd = '/';
  }
  tokenizer = (inputText) => {
    return inputText.split(/\W+/);
  };

  parseInput = (inputText) => {
    const tokens = this.tokenizer(inputText);
    if (tokens.length < 0) {
      return;
    }
    const command = tokens[0];
    let args = [];
    if (tokens.length > 1) {
      args = tokens.slice(1);
    }
    return this.parseCommand(command, args);
  };

  parseCommand = (command, args) => {
    let result = command + ': command not found';
    switch (command) {
      case 'help':
        result = this.parseCommandHelp(args);
        break;
      case 'ls':
        result = this.parseCommandLs(args);
        break;
      case 'cd':
        result = this.parseCommandCd(args);
        break;
      default:
        break;
    }
    return result;
  };

  parseCommandHelp = (args) => {
    if (args) {
      const arg = args[0];
      switch (arg) {
        case 'help':
          return 'Lists available commands. Provides information about a command given as an argument.';
      }
    }
    return 'Available commands are: help';
  };

  parseCommandCd = (args) => {
    if (args) {
      const target = args[0];
      switch (target) {
        case '/':
          this.cwd = '/';
          break;
        case '/Home':
          this.cwd = '/Home';
          break;
        case '/SoftwareDev':
          this.cwd = '/SoftwareDev';
          break;
        case '/About':
          this.cwd = '/About';
          break;
        case '/Contact':
          this.cwd = '/Contact';
          break;
        default:
          return 'cd: ' + target + ': No such file or directory';
      }
    }
    return '';
  };

  parseCommandLs = (args) => {
    switch (this.cwd) {
      case '/':
        return 'Home, SoftwareDev, About, Contact';
      case '/Home':
        return 'README.txt, logo.png';
      case '/SoftwareDev':
        return 'listProjects.sh';
      case '/About':
        return 'README.txt';
      case '/Contact':
        return 'sendmail.sh, README.txt';
    }

    return '';
  };
}

export default mockOS;

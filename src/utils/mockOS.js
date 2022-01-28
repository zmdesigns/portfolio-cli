import Tree from './tree';

class mockOS {
  constructor() {
    this.user = 'visitor';
    this.host = 'zmdesigns';
    this.files = new Tree('~', { type: 'folder' });
    this.cwd = [this.files.root];
    this.initFiles();
  }

  initFiles() {
    this.files.insert('~', 'README.txt', { type: 'file' });
    this.files.insert('~', 'Software', { type: 'folder' });
    this.files.insert('~', 'About', { type: 'folder' });
    this.files.insert('~', 'Contact', { type: 'folder' });
  }

  tokenizer = (inputText) => {
    return inputText.split(' ');
  };

  getCurrentPath() {
    let nodeKeys = this.cwd.map((dir) => dir.key);
    return nodeKeys.join('/');
  }

  get promptText() {
    return this.user + '@' + this.host + ' ' + this.getCurrentPath() + '>';
  }

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
      case 'pwd':
        result = this.parseCommandPwd(args);
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
    return 'Available commands are: help, ls, cd, pwd';
  };

  //if first character is '/' use it root node, otherwise use cwd node
  //split argument by '/'
  //for each token in argument
  //  search token under parent
  //  if found
  //    parent = token
  //    next token
  //  if not found
  //    error

  parseCommandCd = (args) => {
    if (args) {
      const target = args[0];
      if (target == '/') {
        this.cwd = [this.files.root];
        return '';
      } else if (target == '..') {
        if (this.cwd.length > 1) {
          this.cwd.pop();
        }
      } else {
        const currentNode = this.cwd[this.cwd.length - 1];
        const targetNode = this.files.find(target, currentNode);
        if (targetNode !== undefined) {
          this.cwd.push(targetNode);
          return '';
        }
      }
      return 'cd: ' + target + ' directory not found';
    }
    return '';
  };

  parseCommandLs = (args) => {
    const currentNode = this.cwd[this.cwd.length - 1];
    const targetKey = args.length ? args[0] : this.cwd[this.cwd.length - 1].key;
    const dirNode = this.files.find(targetKey, currentNode);

    if (dirNode) {
      const contents = dirNode.children.map((child) => {
        return child.key;
      });
      return contents.join(',');
    }
    return 'ls: ' + targetKey + ' directory not found';
  };

  parseCommandPwd = (args) => {
    return this.cwd.join('/');
  };
}

export default mockOS;

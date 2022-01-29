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
    this.files.insert('Software', 'Projects', { type: 'folder' });
    this.files.insert('~', 'About', { type: 'folder' });
    this.files.insert('~', 'Contact', { type: 'folder' });
  }

  tokenizer = (inputText) => {
    return inputText.split(' ');
  };

  get currentPath() {
    let nodeKeys = this.cwd.map((dir) => dir.key);
    return nodeKeys.join('/');
  }

  get welcomeMessage() {
    return 'Welcome to MockOS';
  }

  get promptText() {
    return this.user + '@' + this.host + ' ' + this.currentPath + '>';
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

  pathNodeListFromString = (pathString) => {
    let pathNodeList = [];
    const pathStringList = pathString.split('/');
    const startDir = pathStringList[0];
    let currentNode = this.files.root;
    if (startDir !== this.files.root.key) {
      //start from relative dir
      currentNode = this.cwd[this.cwd.length - 1];
      pathNodeList = this.cwd.slice();
    }
    pathStringList.forEach((pathKey) => {
      if (pathKey === '..') {
        if (pathNodeList.length > 0) {
          pathNodeList.pop();
        } else {
          return undefined;
        }
      }
      //only search immediate children
      let pathNode = currentNode.children.find(
        (child) => child.key === pathKey
      );
      if (pathNode) {
        pathNodeList.push(pathNode);
        currentNode = pathNode;
      } else {
        return undefined;
      }
    });
    return pathNodeList;
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
      const targetString = args[0];
      const targetPath = this.pathNodeListFromString(targetString);
      if (targetPath !== undefined && targetPath.length > 0) {
        this.cwd = targetPath;
      } else {
        return 'cd: ' + targetString + ' directory not found';
      }
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
    return this.currentPath;
  };
}

export default mockOS;

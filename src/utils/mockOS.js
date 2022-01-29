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
    if (args.length > 0) {
      const arg = args[0];
      switch (arg) {
        case 'help':
          return 'Lists available commands. Provides information about a command given as an argument.';
      }
    }
    return 'Available commands are: help, ls, cd, pwd';
  };

  parseCommandCd = (args) => {
    if (args.length > 0) {
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
    let targetNode = this.cwd[this.cwd.length - 1];
    if (args.length > 0) {
      const targetString = args[0];
      const targetPath = this.pathNodeListFromString(targetString);
      if (targetPath !== undefined && targetPath.length > 0) {
        targetNode = targetPath[targetPath.length - 1];
      } else {
        return 'ls: ' + targetString + ' directory not found';
      }
    }
    const contents = targetNode.children.map((child) => {
      return child.key;
    });
    return contents.join(',');
  };

  parseCommandPwd = (args) => {
    return this.currentPath;
  };
}

export default mockOS;

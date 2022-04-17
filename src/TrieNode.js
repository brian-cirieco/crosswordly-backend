class TrieNode {
  /**
   * Node for Trie data structure
   * @param {string} char
   */
  constructor(char) {
    this.char = char;
    this.children = new Array(26).fill(null);
    this.numChildren = 0;
    this.isWord = false;
  }

  /**
   * returns index between 0 and 25 based on alphabetic position
   * @param {string} char 
   * @returns index of node at char's position in children
   */
  static getChildIdx = char => char.charCodeAt(0) - 'a'.charCodeAt(0);

  /** label node as being the end of a valid word */
  markWord = () => {
    this.isWord = true;
  };

  /** remove valid word label from node */
  unMarkWord = () => {
    this.isWord = false;
  };

  /** get child node for character
   * @param {string} char
   * @returns {TrieNode|null} if has a child node at specified character, return node else return null
   */
  getChild = char => this.children[TrieNode.getChildIdx(char)];

  /** 
   * returns true if node has a child node for specified character
   * @param {string} char
   * @returns {boolean}
   */
  hasChild = char => !!this.getChild(char);

  /**
   * adds child node for specified character
   * @param {string} char
   * @returns {TrieNode} new child to return
   */
  addChild = char => {
    const child = new TrieNode(char);
    this.children[TrieNode.getChildIdx(char)] = child;
    this.numChildren++;
    return child;
  };

  /** 
   * returns incremental function that will get next child node, and returns null if none are left
   * @returns {Function}
   */
  getNextChild() {
    const children = this.children;
    let idx = 0;
    return function() {
      if (idx >= children.length) return null;
      for (let i = idx; i < children.length; i++) {
        if (children[i] !== null) {
          idx = i + 1;
          return children[i];
        }
      }
      return null;
    }
  }
}

module.exports = TrieNode;
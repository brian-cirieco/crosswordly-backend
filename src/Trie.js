const TrieNode = require("./TrieNode");

class Trie {
  /**
   * Prefix tree / trie data structure
   */
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * adds word to data structure iteratively by adding children where needed, and marking the last character's node with isWord
   * @param {string} word
   * @returns {void}
   */
  insert = word => {
    let node = this.root;
    for (const char of word) {
      node = node.hasChild(char) ? node.getChild(char) : node.addChild(char);
    }
    node.markWord();
  };
  
  /**
   * iterates through nodes to check whether the node at last character of word is marked as a word
   * @param {string} word 
   * @returns {boolean} true if word is marked as a word
   */
  guess = word => {
    let node = this.root;
    for (const char of word) {
      if (!node || !node.hasChild(char)) return false;
      node = node.getChild(char);
    }
    return node.isWord;
  };

  /**
   * leverages recursion to generate all possible words of length greater than 3 with provided letters
   * @param {string} letters - letters from which all words will be generated
   * @param {number} maxDepth - limit of how deep the trie levels are permitted for finding valid words
   * @param {TrieNode} node - current node
   * @param {string} word - current constructed word
   * @returns {Array<string>} array of words generated using provided letters
   */
  getWordsFrom = (letters, maxDepth=letters.length, node=this.root, word="") => {
    const words = [];
    const visited = {};
    if (node.isWord && word.length >= 3) words.push(word);
    if (!letters.length || !node || word.length >= maxDepth) return words;
    for (let i = 0; i < letters.length; i++) {
      if (!visited[letters[i]]) visited[letters[i]] = true;
      else continue;
      if (node.hasChild(letters[i])) {
        words.push(...this.getWordsFrom(
          letters.slice(0, i) + letters.slice(i + 1),
          maxDepth,
          node.getChild(letters[i]),
          `${word}${letters[i]}`));
      }
    }
    return words;
  };

  /**
   * generates trie data structure in JSON format 
   * @param {TrieNode} node
   * @yields {Object}
   */
  toJSON = (node=this.root) => {
    const trie = {};
    if (!node) return;
    if (node.isWord) trie.isWord = true;
    for (const n of node.children) {
      if (!n) continue;
      trie[n.char] = this.toJSON(n);
      if (n.isWord) trie.isWord = true;
    }
    return trie;
  }
}

module.exports = Trie;
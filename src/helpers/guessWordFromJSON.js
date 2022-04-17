/**
 * finds whether word is present in prefix tree / trie as a valid word
 * @param {object} trieJSON - JSON formatted prefix tree / trie data structure
 * @param {string} word - string representing a word
 * @returns {boolean} true if last node has isWord attribute
 */
function guessWordFromJSON(trieJSON, word) {
  let currNode = trieJSON;
  for (const char of word) {
    currNode = currNode[char];
    if (!currNode) return false;
  }
  return !!currNode.isWord;
}

module.exports = guessWordFromJSON;
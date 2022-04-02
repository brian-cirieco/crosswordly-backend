function guessWordFromJSON(trieJSON, word) {
  let currNode = trieJSON;
  for (const char of word) {
    currNode = currNode[char];
    if (!currNode) return false;
  }
  return !!currNode.isWord;
}

module.exports = guessWordFromJSON;
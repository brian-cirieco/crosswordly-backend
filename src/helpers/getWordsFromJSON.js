/** 
 * Generates a set of words  only containing a set of provided letters using recursion.
 * 
 * @param {Object} trieJSON - prefix tree / trie data structure preloaded with words from a dictionary
 * @param {String} letters - set of letters (allowing duplicates) from which words will be constructed
 * @param {number} maxDepth - furthest depth in trie data structure allowed
 * @param {String} word - constructed letters updated through recursive calls; this is added to the words array if a valid word
 * @return {Array} words array containing at least 3 letters each
 */
function getWordsFromJSON(trieJSON, letters, maxDepth=letters.length, word="") {
  const words = [];
  const visited = {};
  
  if (trieJSON.isWord && word.length >= 3) words.push(word);
  if (!letters.length || word.length >= maxDepth) return words;
  for (let i = 0; i < letters.length; i++) {
    const char = letters[i];
    if (!visited[char]) visited[char] = true;
    else continue;
    if (trieJSON[char]) {
      words.push(...getWordsFromJSON(
        trieJSON[char],
        letters.slice(0, i) + letters.slice(i + 1),
        maxDepth,
        word + char
      ));
    };
  }
  return words;
}

module.exports = getWordsFromJSON;
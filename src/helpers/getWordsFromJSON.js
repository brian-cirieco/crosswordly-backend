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
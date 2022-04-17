const wordnet = require("wordnet");
const filter = require("leo-profanity");
const Trie = require("../Trie");
filter.loadDictionary();

/**
 * using wordnet's 140k words, this function loads all words into Trie data structure
 * @returns {Trie}
 */
async function populateTrie() {
  await wordnet.init()
  const trie = new Trie();
  const words = await wordnet.list();
  words.forEach(word => {
    if (word.length >= 3 && !filter.check(word) && /^[a-z]+$/.test(word)) trie.insert(word);
  });
  return trie;
}

module.exports = populateTrie;
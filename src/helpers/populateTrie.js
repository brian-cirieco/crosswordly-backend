const wordnet = require("wordnet");
const filter = require("leo-profanity");
const Trie = require("../Trie");
filter.loadDictionary();

async function populateTrie() {
  await wordnet.init()
  const trie = new Trie();
  const words = await wordnet.list();
  words.forEach(word => {
    if (!filter.check(word) && /^[a-z]+$/.test(word)) trie.insert(word);
  });
  return trie;
}

module.exports = populateTrie;
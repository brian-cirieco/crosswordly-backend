const fs = require("fs");
const Trie = require("./Trie");

const trie = new Trie();
fs.readFileSync(__dirname + "/seeders/filteredWords.txt")
  .toString().split("\n")
  .forEach(word => trie.insert(word));

module.exports = trie;
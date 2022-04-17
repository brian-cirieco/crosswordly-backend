class Word {
  /**
   * Word class storing start and end coordinates of word on crossword board
   * @param {string} word
   * @param {number} x - initial row index of word
   * @param {number} y - initial column index of word
   * @param {boolean} isHorizontal
   */
  constructor(word, x, y, isHorizontal) {
    this.word = word;
    this.isHorizontal = isHorizontal;
    this.coords = {
      xi: x,
      yi: y,
      xf: isHorizontal ? x : x + word.length - 1,
      yf: isHorizontal ? y + word.length - 1 : y
    };
    this.charMap = {};
    for (let i = 0; i < word.length; i++) {
      if (!this.charMap[word[i]]) this.charMap[word[i]] = i;
    }
  }

  /**
   * getter function returning word string
   * @returns {string}
   */
  get = () => this.word;

  /**
   * get first letter from charMap
   * @param {string} char 
   * @returns {string|undefined} first index of char
   */
  charIdx = char => this.charMap[char];

  /**
   * get character at index
   * @param {number} idx 
   * @returns {string|undefined} character at idx
   */
  at = idx => this.word[idx];

  /**
   * find whether char exists in word
   * @param {string} char 
   * @returns {boolean} true if char exists in word
   */
  has = char => this.charMap[char] !== undefined;

  /**
   * getter method for word start and end coordinates
   * @returns {{ xi: number, xf: number, yi: number, yf: number }}
   */
  getCoords = () => this.coords;
}

module.exports = Word;
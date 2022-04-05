const getWordsFromJSON = require("../../helpers/getWordsFromJSON");

describe("getWordsFromJSON helper function unit tests", () => {
  const trieJSON = {
    'h': {
      'e': {
        'l': {
          isWord: true,
          'l': {
            isWord: true,
            'o': { isWord: true }
          }
        }
      },
      'i': {
        isWord: true,
        's': { isWord: true }
      },
    },
    'l': {
      'e': {
        'o': { isWord: true }
      },
      'o': {
        'l': { isWord: true }
      }
    },
  };

  test("finds all words that can be formed with 'hello'", () => {
    const words = getWordsFromJSON(trieJSON, "hello");
    expect(words).toEqual([ "hel", "hell", "hello", "leo", "lol" ]);
  });

  test("will not return words whose length is less than 3", () => {
    const words = getWordsFromJSON(trieJSON, "hi");
    expect(words).toEqual([]);
  });

  test("will return empty array if no words match letters provided", () => {
    const words = getWordsFromJSON(trieJSON, "blabla");
    expect(words.length).toBe(0);
  });

  test("will return empty array if no letters are provided", () => {
    expect(getWordsFromJSON(trieJSON, "")).toEqual([]);
  });

});
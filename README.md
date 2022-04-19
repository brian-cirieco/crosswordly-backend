# Crosswordly Backend

> Springboard Capstone Project 2 Backend API

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [How To Use](#how-to-use)  
  - [Installation](#installation)
  - [API Reference](#api-reference)
    - [/dictionaries](#dictionaries)
    - [/words](#words)
    - [/boards](#boards)
    - [/users](#users)

## Description

This API generates random crossword puzzles, fetching word definitions with [Free Dictionary API](https://www.dictionaryapi.dev/) and facilitating user login and registration.

The database is limited to 10,000 rows. Since the Wordnet library provides us with 140,000 words, the entire dictionary is loaded into a [Trie data structure](https://en.wikipedia.org/wiki/Trie) (aka Prefix Tree). The Trie is stored into a single row. Not only does this save space, but also allows the addition of themed lexical fields or other language dictionaries.

### Technologies

- Node.js 16.13.2
- Express.js 4.16.1
- Sequelize ORM & CLI 6.17.0
- axios 0.26.1
- bcrypt 5.01
- jest 27.5.1
- supertest 6.2.2
- wordnet 2.0.0

[Back To Top](#crosswordly-backend)

## How To Use

### **Installation**

To start the application, run the following commands in a Linux environment.

Install dependencies:  
```npm install```

Start postgresql server:  
```sudo service postgresql start```

Seed database:  
```sequelize db:seed:all```

Start app:  
```npm start```

Optionally, run tests with:  
```npm test```

[Back To Top](#crosswordly-backend)

### **API Reference**

#### **```/dictionaries```**

```js
GET /dictionaries/en
```

Fetches Trie data structure of specified language.

[Back To Top](#crosswordly-backend)

#### **```/words```**

```js
GET /words
```
Lists all words currently stored in database.

*Example:*
```js
[
  { "id" :1, "word": "leo" },
  { "id": 2, "word": "hello" }
]
```

```js
GET /words?term=WORD
```
Returns word definitions and examples if found in **Trie**.
If word is valid but does not yet exist in database, will store all word and definition data.

*Example with term=hello:*

```js
GET /words?term=hello
```

*Result:*
```js
{
  "id":2,
  "word": "hello",
  "definitions": [
    {
      "id": 1,
      "definition": "\"Hello!\" or an equivalent greeting.",
      "example": null,
      "categoryId": 1,
      "wordId": 2,
      "category": { "id": 1, "name": "noun" }
    },
    {
      "id": 2,
      "definition": "To greet with \"hello\".",
      "example": null,
      "categoryId": 3,
      "wordId": 2,
      "category": { "id": 3, "name": "verb" }
    },
    {
      "id": 3,
      "definition": "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.",
      "example": "Hello, everyone.",
      "categoryId":8,
      "wordId":2,
      "category": { "id": 8, "name": "interjection" }
    },
    {
      "id": 4,
      "definition": "A greeting used when answering the telephone.",
      "example": "Hello? How may I help you?",
      "categoryId": 8,
      "wordId": 2,
      "category": { "id": 8, "name": "interjection" }
    },
    {
      "id": 5,
      "definition": "A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.",
      "example": "Hello? Is anyone there?",
      "categoryId": 8,
      "wordId": 2,
      "category": { "id": 8, "name": "interjection" }
    },
    {
      "id": 6,
      "definition": "Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.",
      "example": "You just tried to start your car with your cell phone. Hello?",
      "categoryId": 8,
      "wordId": 2,
      "category": { "id": 8, "name": "interjection" }
    },
    {
      "id": 7,
      "definition": "An expression of puzzlement or discovery.",
        "example": "Hello! What’s going on here?",
        "categoryId": 8,
        "wordId": 2,
        "category": { "id": 8, "name": "interjection" }
    }
  ]
}
```
[Back To Top](#crosswordly-backend)

#### **```/boards```**

```js
GET /boards?letters=LETTERS&maxWords=MAX_WORDS
```
Generates a table containing the crossword puzzle, words, their coordinates on the table. Optionally, can specify maximum number of words the crossword can have.

*Example with letters=abcdef:*
```js
GET /boards?letters=abcdef
```
*Result:*
```js
{
  "words": {
    "bead": { "xi": 0, "yi": 0, "xf": 3, "yf": 0 },
    "deca": { "xi": 3, "yi": 0, "xf": 3, "yf": 3},
    "eac": { "xi": 1, "yi": 0, "xf": 1, "yf": 2 },
    "cab": { "xi": 3, "yi": 2, "xf": 5, "yf": 2 },
    "bed": { "xi": 5, "yi": 2, "xf": 5, "yf": 4 }
  },
  "numWords": 5,
  "crossword": [
    ["b", null, null, null, null],
    ["e", "a", "c", null, null],
    ["a", null, null, null, null],
    ["d", "e", "c", "a", null],
    [null, null, "a", null, null],
    [null, null, "b", "e", "d"]
  ]
}
```

*Example with letters=abcdef and maxWords=3:*
```js
GET /boards?letters=abcdef&maxWords=3
```
*Result:*
```js
{
  "words": {
    "dec": { "xi": 0, "yi": 0, "xf": 2, "yf": 0 },
    "cafe": { "xi": 2, "yi": 0, "xf": 2, "yf": 3 },
    "bead": { "xi": 1, "yi": 3, "xf": 4, "yf": 3 }
  },
  "numWords": 3,
  "crossword": [
    ["d", null, null, null],
    ["e", null, null, "b"],
    ["c", "a", "f", "e"],
    [null, null, null, "a"],
    [null, null, null, "d"]
  ]
}
```

[Back To Top](#crosswordly-backend)

#### **```/users```**

Route for user accounts.

```js
GET /users?orderByHighScore=ORDER_BY_HIGHSCORES&limit=LIMIT
```
Lists all users.  
Parameters:
- *highScore*: order from highest high score to lowest.
- *limit*: upper bound for number of users shown.

*Example*
```js
GET /users
```
*Result:*

```js
[
  {
    "id": "8d6906ed-0653-435c-9342-64bc11f46702",
    "username": "test",
    "displayName": "testNickname",
    "password": "$2b$12$3o5ArHxhXa9qkpBKJXVoguU.9boCiIEnB1r4KQnkTZ6I9d1CfNAfa",
    "highScore": 0
  },
  {
    "id": "2c201ecb-ed0d-4dc0-8390-30820ebd49b9",
    "username": "new",
    "displayName": "new",
    "password": "$2b$12$8Cbsevyojx.beF2I1Wk5iekCHVaLqZo82cs.RP5FyJJTFiAIDYeyK",
    "highScore": 30
  }
]
```

*Example ordered by high scores:*
```js
GET /users?orderByHighScore=true
```

*Result*
```js
[
  {
    "id": "2c201ecb-ed0d-4dc0-8390-30820ebd49b9",
    "username": "new",
    "displayName": "new",
    "password": "$2b$12$8Cbsevyojx.beF2I1Wk5iekCHVaLqZo82cs.RP5FyJJTFiAIDYeyK",
    "highScore": 30
  },
  {
    "id": "8d6906ed-0653-435c-9342-64bc11f46702",
    "username": "test",
    "displayName": "testNickname",
    "password": "$2b$12$3o5ArHxhXa9qkpBKJXVoguU.9boCiIEnB1r4KQnkTZ6I9d1CfNAfa",
    "highScore": 0
  }
]
```

*Example limited to 1 user:*
```js
GET /users?limit=1
```

*Result*
```js
[
  {
    "id": "8d6906ed-0653-435c-9342-64bc11f46702",
    "username": "test",
    "displayName": "testNickname",
    "password": "$2b$12$3o5ArHxhXa9qkpBKJXVoguU.9boCiIEnB1r4KQnkTZ6I9d1CfNAfa",
    "highScore": 0
  }
]
```

*Example with highest scoring user:*
```js
GET /users?orderByHighScore=true&limit=1
```

*Result:*
```js
[
  {
    "id": "2c201ecb-ed0d-4dc0-8390-30820ebd49b9",
    "username": "new",
    "displayName": "new",
    "password": "$2b$12$8Cbsevyojx.beF2I1Wk5iekCHVaLqZo82cs.RP5FyJJTFiAIDYeyK",
    "highScore": 30
  }
]
```

[Back To Top](#crosswordly-backend)
process.env.NODE_ENV = "test";

const request = require("supertest");
const { sequelize, Word, Dictionary } = require("../../models");
const populateTrie = require("../../helpers/populateTrie")
const app = require("../../app.js");

describe("/words route", () => {

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    await Word.create({ word: "hello" });
    await sequelize.getQueryInterface().bulkInsert("categories", [
      { name: "noun" },
      { name: "pronoun" },
      { name: "verb" },
      { name: "adjective" },
      { name: "adverb" },
      { name: "preposition" },
      { name: "conjunction" },
      { name: "interjection" }
    ], {});
    const trie = await populateTrie();
    await Dictionary.create({ language: "en", trieJSON: trie.toJSON() });
  }, 20000);

  describe("GET /words", () => {
    test("returns list of all words", async () => {
      const { statusCode, body } = await request(app).get("/words");
      expect(statusCode).toBe(200);
      expect(body.length).toBe(1);
      expect(body).toEqual([ { id: 1, word: "hello" } ]);
    });

    test("returns word object with definitions association when term is specified", async () => {
      const { statusCode, body } = await request(app).get("/words?term=hello");
      expect(statusCode).toBe(200);
      expect(body.definitions.length).toBe(7);
      expect(body).toEqual({
        id: 1, word: "hello",
        definitions: [
          {
            id: 1,
            definition: '"Hello!" or an equivalent greeting.',
            example: null,
            categoryId: 1,
            wordId: 1,
            category: { id: 1, name: 'noun' }
          },
          {
            id: 2,
            definition: 'To greet with "hello".',
            example: null,
            categoryId: 3,
            wordId: 1,
            category: { id: 3, name: 'verb' }
          },
          {
            id: 3,
            definition: 'A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence.',
            example: 'Hello, everyone.',
            categoryId: 8,
            wordId: 1,
            category: { id: 8, name: 'interjection' }
          },
          {
            id: 4,
            definition: 'A greeting used when answering the telephone.',
            example: 'Hello? How may I help you?',
            categoryId: 8,
            wordId: 1,
            category: { id: 8, name: 'interjection' }
          },
          {
            id: 5,
            definition: 'A call for response if it is not clear if anyone is present or listening, or if a telephone conversation may have been disconnected.',
            example: 'Hello? Is anyone there?',
            categoryId: 8,
            wordId: 1,
            category: { id: 8, name: 'interjection' }
          },
          {
            id: 6,
            definition: 'Used sarcastically to imply that the person addressed or referred to has done something the speaker or writer considers to be foolish.',
            example: 'You just tried to start your car with your cell phone. Hello?',
            categoryId: 8,
            wordId: 1,
            category: { id: 8, name: 'interjection' }
          },
          {
            id: 7,
            definition: 'An expression of puzzlement or discovery.',
            example: 'Hello! What’s going on here?',
            categoryId: 8,
            wordId: 1,
            category: { id: 8, name: 'interjection' }
          }
        ]
      })
    });

    test("creates word if not found in database", async () => {
      const { statusCode, body } = await request(app).get("/words?term=goddess");
      expect(statusCode).toBe(201);
      expect(body).toBeTruthy();
      expect(body.definitions.length).toBe(3);
    });

    test("creates word whose definition categories already exist on the database", async () => {
      let statusCode, body;
      ({ statusCode } = await request(app).get("/words?term=hello"));
      expect(statusCode).toBe(200);

      ({ statusCode, body } = await request(app).get("/words?term=charcoal"));
      expect(statusCode).toBe(201);
      expect(body.definitions.length).toBe(8);
    });

    test("returns error message if word exists on trie, but no definitions were found via the API", async () => {
      const { statusCode, body } = await request(app).get("/words?term=albe");
      expect(statusCode).toBe(201);
      expect(body).toEqual({ word: "albe", msg: "No definitions found for albe. Word may be obsolete." });
    }, 20000);

  });

});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app.js");
const { sequelize, Dictionary } = require("../../models");
const populateTrie = require("../../helpers/populateTrie");

describe("GET /boards route integration tests", () => {
  const _ = null;

  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const trie = await populateTrie();
    await Dictionary.create({ id: 1, trieJSON: trie.toJSON() });
  }, 10000);

  test("throws error if letters query parameter not specified", async () => {
    const { statusCode, body } = await request(app).get("/boards");
    
    expect(statusCode).toBe(500);
    expect(body).toEqual({});
  });

  test("throws error if letters query parameter is an empty string", async () => {
    const { statusCode, body } = await request(app)
      .get("/boards")
      .query({ letters: "" });
    
    expect(statusCode).toBe(500);
    expect(body).toEqual({});
  });

  test("returns board's words and crossword matrix", async () => {
    Math.random = jest.fn(() => 0.5);
    const { statusCode, body } = await request(app)
      .get("/boards")
      .query({ letters: "hello" });
    
    expect(statusCode).toBe(200);
    expect(Object.keys(body.words).length).toBe(3);
    expect(body.crossword).toEqual([
      [ 'o', 'l', 'l' ],
      [ 'l',  _ ,  _  ],
      [ 'e', 'l', 'l' ]
    ]);
  });
});
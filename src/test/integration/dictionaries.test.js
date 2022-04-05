process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const { sequelize, Dictionary } = require("../../models");
const populateTrie = require("../../helpers/populateTrie");

describe("GET /dictionaries/:id", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
    const trie = await populateTrie();
    await Dictionary.create({ id: 1, trieJSON: trie.toJSON() });
  }, 10000);

  test("returns JSON version of prefix trie, id=1 for english dictionary (140k words)", async () => {
    const { statusCode, body } = await request(app).get("/dictionaries/1");
    expect(statusCode).toBe(200);
    expect(body instanceof Object).toBeTruthy();
    expect(body.h.e.l.l.o.isWord).toBeTruthy();
  });
});
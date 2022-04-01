process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app.js");

describe("GET /boards route integration tests", () => {
  const _ = null;

  test("throws error if letters query parameter not specified", async () => {
    Math.random = jest.fn(() => 1);
    const { statusCode, body } = await request(app).get("/boards");
    
    expect(statusCode).toBe(500);
    expect(body).toEqual({});
  });

  test("throws error if letters query parameter is an empty string", async () => {
    Math.random = jest.fn(() => 1);
    const { statusCode, body } = await request(app)
      .get("/boards")
      .query({ letters: "" });
    
    expect(statusCode).toBe(500);
    expect(body).toEqual({});
  });

  test("returns board's words and crossword matrix", async () => {
    Math.random = jest.fn(() => 1);
    const { statusCode, body } = await request(app)
      .get("/boards")
      .query({ letters: "hello" });
    
    expect(statusCode).toBe(200);
    expect(Object.keys(body.words).length).toBe(3);
    expect(body.crossword).toEqual([
      ['h', 'e', 'l', 'l'],
      ['e', _, 'o', _],
      ['l', _, 'l', _],
      ['l', _, _, _],
      ['o', _, _, _]
    ]);
  });
});
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("./app");

const request = supertest(app);

describe("Endpoint tests", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/wtwr_test_db");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
  });

  it("GET / responds with 404 for now", async () => {
    const res = await request.get("/");
    expect(res.status).toBe(404);
  });

  it("GET /items returns an array and status 200", async () => {
    const res = await request.get("/items");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /signup creates a user (200 or 201)", async () => {
    const res = await request.post("/signup").send({
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      email: "test@example.com",
      password: "password123",
    });

    expect([200, 201]).toContain(res.status);
    expect(res.body).toBeDefined();
    expect(res.body.email).toBe("test@example.com");
    expect(res.body.password).toBeUndefined();
  });

  it("POST /signin returns a token (200)", async () => {
    await request.post("/signup").send({
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request.post("/signin").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(typeof res.body.token).toBe("string");
    expect(res.body.token.length).toBeGreaterThan(10);
  });

  it("POST /signin with wrong password returns 401", async () => {
    await request.post("/signup").send({
      name: "Test User",
      avatar: "https://example.com/avatar.png",
      email: "test@example.com",
      password: "password123",
    });

    const res = await request.post("/signin").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(res.status).toBe(401);
  });
});

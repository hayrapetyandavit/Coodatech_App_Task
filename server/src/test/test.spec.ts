import request from "supertest";
import Cookies from "js-cookie";
import cookie from "cookie";
import app from "../server";

describe("Authentication API", () => {
  let token: string;

  //   describe("POST /register", () => {
  //     it("should register a new user", async () => {
  //       const res = await request(app).post("/register").send({
  //         name: "Davit",
  //         email: "1@example.com",
  //         password: "password.9M",
  //       });

  //       expect(res.status).toBe(200);
  //     });
  //   });

  describe("POST /login", () => {
    it("should return an error for an empty email", async () => {
      const res = await request(app).post("/login").send({
        email: "",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it("should return an error for an empty password", async () => {
      const res = await request(app).post("/login").send({
        email: "1@example.com",
        password: "",
      });

      expect(res.status).toBe(400);
    });

    it("should return an error for an invalid user", async () => {
      const res = await request(app).post("/login").send({
        email: "wrong@example.com",
        password: "password",
      });

      expect(res.status).toBe(400);
    });

    it("should return an access token for a valid user", async () => {
      const res = await request(app).post("/login").send({
        email: "1@example.com",
        password: "password.9M",
      });

      expect(res.status).toBe(201);
      expect(res.headers["set-cookie"]).toBeDefined();

      const cookies = res.headers["set-cookie"].map(cookie.parse);
      const accessToken = cookies.find(
        (c: any) => c.access_token
      )?.access_token;

      expect(accessToken).toBeDefined();

      token = accessToken;
    });
  });

  describe("GET /users", () => {
    it("should return all users", async () => {
      const res = await request(app)
        .get("/users")
        .set("Cookie", [`access_token=${token}`]);

      expect(res.status).toBe(200);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).post("/users");

      expect(res.status).toBe(404);
    });
  });

  describe("POST /logout", () => {
    it("should log out the user", async () => {
      const res = await request(app)
        .post("/logout")
        .set("Cookie", [`access_token=${token}`]);

      expect(res.status).toBe(200);
    });
  });

  //For column.router
  describe("POST /column", () => {
    it("should create a new column if user is logged in", async () => {
      const res = await request(app)
        .post("/column")
        .set("Cookie", [`access_token=${token}`])
        .send({
          title: "New Column",
        });

      expect(res.status).toBe(201);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).post("/column").send({
        title: "New post",
      });

      expect(res.status).toBe(401);
    });
  });

  describe("GET /columns", () => {
    it("should return all columns if user is logged in", async () => {
      const res = await request(app)
        .get("/columns")
        .set("Cookie", [`access_token=${token}`]);

      expect(res.status).toBe(200);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).post("/column").send({
        title: "New post",
      });

      expect(res.status).toBe(401);
    });
  });

  //   For card.router
  describe("POST /card", () => {
    it("should create a new card if user is logged in", async () => {
      const res = await request(app)
        .post("/card")
        .set("Cookie", [`access_token=${token}`])
        .send({
          title: "New Card",
          userId: 45,
          columnId: 1,
        });

      expect(res.status).toBe(201);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).post("/card").send({
        title: "New Card",
        userId: 45,
        columnId: 1,
      });

      expect(res.status).toBe(401);
    });
  });

  describe("PUT /card/:id", () => {
    it("should update card if user is logged in", async () => {
      const res = await request(app)
        .put("/card/1")
        .set("Cookie", [`access_token=${token}`])
        .send({
          userId: 45,
          columnId: 1,
        });

      expect(res.status).toBe(201);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).put("/card/1").send({
        userId: 45,
        columnId: 1,
      });

      expect(res.status).toBe(401);
    });
  });

  describe("DELETE /card/:id", () => {
    it("should delete card if user is logged in", async () => {
      const res = await request(app)
        .delete("/card/23")
        .set("Cookie", [`access_token=${token}`])
        .send({
          userId: 45,
        });

      expect(res.status).toBe(201);
    });

    it("should return an error if user is not logged in", async () => {
      const res = await request(app).delete("/card/23").send({
        userId: 45,
      });

      expect(res.status).toBe(401);
    });
  });
});

import "isomorphic-fetch";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const handlers = [
  // rest.post("/register", (req, res, ctx) => {
  //   // Respond with a successful registration
  //   return res(ctx.status(200), ctx.json({ id: 1, username: "testuser" }));
  // }),
  http.post("https://forum-api.dicoding.dev/v1/login", (req, res, ctx) => {
    // Access the request body using req.body
    const { username, password } = req.body;

    // Handle the request based on the request body
    if (username === "testuser" && password === "testpassword") {
      return res(ctx.status(200), ctx.json({ token: "mockedToken" }));
    } else {
      return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
    }
  }),
  http.get("https://forum-api.dicoding.dev/v1/users", () => {
    return HttpResponse.json([
      { id: 1, username: "user1" },
      { id: 2, username: "user2" },
    ]);
  }),
];
const server = setupServer(...handlers);

export { server };

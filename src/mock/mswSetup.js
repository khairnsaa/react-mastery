import "isomorphic-fetch";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { mockData } from "./mockData";

const handlers = [
  http.post("https://forum-api.dicoding.dev/v1/login", (req, res, ctx) => {
    // Access the request body using req.body
    const { username, password } = req.body;

    // Handle the request based on the request body
    if (username === "testuser" && password === "testpassword") {
      return new HttpResponse.json({ token: "mockedToken" });
      // return res(ctx.status(200), ctx.json({ token: "mockedToken" }));
    } else {
      return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
    }
  }),
  http.get("https://forum-api.dicoding.dev/v1/users", () => {
    return HttpResponse.json(mockData.users);
  }),
  http.get("https://forum-api.dicoding.dev/v1/leaderboards", () => {
    return HttpResponse.json(mockData.leaderboards);
  }),
  http.get("https://forum-api.dicoding.dev/v1/threads", () => {
    return HttpResponse.json(mockData.threads);
  }),
  http.get(`https://forum-api.dicoding.dev/v1/threads/thread-1`, ({ request }) => {
    const { id } = request.params;
    console.log(id);
    if (!id) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(mockData.oneThread);
  }),
];
const server = setupServer(...handlers);

export { server };

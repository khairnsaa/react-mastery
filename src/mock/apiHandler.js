import { HttpResponse, delay, http } from "msw";
import { setupServer } from "msw/node";

const users = [
  {
    id: "user-aROWej8yYA1sOfHN",
    name: "Dicoding",
    email: "admin@dicoding.com",
    avatar: "https://ui-avatars.com/api/?name=Dicoding&background=random",
  },
  {
    id: "user-mQhLzINW_w5TxxYf",
    name: "Dimas Saputra",
    email: "dimas@dicoding.com",
    avatar: "https://ui-avatars.com/api/?name=Dimas Saputra&background=random",
  },
];

export const handlers = [
  http.get("/users", async () => {
    await delay(150);
    return HttpResponse.json(users);
  }),
];

export const server = setupServer(...handlers);

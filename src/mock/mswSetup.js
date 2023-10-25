import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("/users", (req, res, ctx) => {
    // Define the response data you expect
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
    return res(ctx.json(users));
  })
);

export { server };

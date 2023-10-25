// browser.js
import { rest } from "msw";

const apiUrl = "https://forum-api.dicoding.dev/v1";

export const worker = [
  rest.get(apiUrl, (req, res, ctx) => {
    // Define your mocked response data here
    const data = [
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
    return res(ctx.json(data));
  }),
];

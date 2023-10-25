import fetch from "node-fetch";
import { describe, expect, it, vi } from "vitest";
import { getData } from "../mock/setupTest";

import {
  useGetAllUsersQuery,
  useLoginMutation,
  useRegisterMutation,
  userApiSlice,
} from "./userApiSlice";

vi.mock("node-fetch");

describe("useGetAllUsersQuery hook works", async () => {
  it("should have the expected endpoints", () => {
    expect(userApiSlice).toBeDefined();
    expect(useRegisterMutation).toBeDefined();
    expect(useLoginMutation).toBeDefined();
    expect(useGetAllUsersQuery).toBeDefined();
  });
  it("should fetch all users data", async () => {
    fetch.mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve([
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
          ]),
      })
    );
    const result = await getData();
    expect(result).toEqual([
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
    ]);
  });
});

import { apiSlice } from "./apiSlice";

export const leaderboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaderboard: builder.query({
      query: () => {
        return {
          url: `/leaderboards`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApiSlice;

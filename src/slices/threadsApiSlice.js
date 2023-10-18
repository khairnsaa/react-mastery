import { apiSlice } from "./apiSlice";

export const threadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createThread: builder.mutation({
      query: (data) => ({
        url: `/threads`,
        method: "POST",
        body: data,
      }),
    }),
    getAllThreads: builder.query({
      query: () => ({
        url: `/threads`,
        method: "GET",
      }),
    }),
    getDetailThreads: builder.query({
      query: (id) => ({
        url: `/threads/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateThreadMutation, useGetAllThreadsQuery, useGetDetailThreadsQuery } =
  threadsApiSlice;

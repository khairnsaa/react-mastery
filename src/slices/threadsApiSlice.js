import { apiSlice } from "./apiSlice";

export const threadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createThread: builder.mutation({
      query: (data) => ({
        url: `/threads`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      }),
    }),
    getAllThreads: builder.query({
      query: () => ({
        url: `/threads`,
        method: "GET",
      }),
    }),
    getDetailThread: builder.query({
      query: (id) => ({
        url: `/threads/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateThreadMutation, useGetAllThreadsQuery, useGetDetailThreadQuery } =
  threadsApiSlice;

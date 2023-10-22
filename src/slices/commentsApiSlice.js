import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (threadId, data) => {
        console.log(data, threadId);
        return {
          url: `/threads/${threadId}/comments`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data,
        };
      },
    }),
  }),
});

export const { useCreateCommentMutation } = commentsApiSlice;

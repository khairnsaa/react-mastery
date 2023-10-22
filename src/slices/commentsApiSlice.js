import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (data) => {
        return {
          url: `/threads/${data.threadId}/comments`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: data.body,
        };
      },
    }),
    upVoteComment: builder.mutation({
      query: (data) => ({
        url: `/threads/${data.id}/comments/${data.commentId}/up-vote`,
        method: "POST",
      }),
    }),
    downVoteComment: builder.mutation({
      query: (data) => ({
        url: `/threads/${data.id}/comments/${data.commentId}/down-vote`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useUpVoteCommentMutation,
  useDownVoteCommentMutation,
} = commentsApiSlice;

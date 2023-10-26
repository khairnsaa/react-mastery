export const mockData = {
  users: [
    { id: 1, username: "user1" },
    { id: 2, username: "user2" },
  ],
  threads: [
    {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
    {
      id: "thread-2",
      title: "Thread Kedua",
      body: "Ini adalah thread kedua",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "users-2",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    },
  ],
  oneThread: {
    id: "thread-1",
    title: "Thread Pertama",
    body: "Ini adalah thread pertama",
    category: "General",
    createdAt: "2021-06-21T07:00:00.000Z",
    owner: {
      id: "users-1",
      name: "John Doe",
      avatar: "https://generated-image-url.jpg",
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: "comment-1",
        content: "Ini adalah komentar pertama",
        createdAt: "2021-06-21T07:00:00.000Z",
        owner: {
          id: "users-1",
          name: "John Doe",
          avatar: "https://generated-image-url.jpg",
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  },
  leaderboards: [
    {
      user: {
        id: "users-1",
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 10,
    },
    {
      user: {
        id: "users-2",
        name: "Jane Doe",
        email: "jane@example.com",
        avatar: "https://generated-image-url.jpg",
      },
      score: 5,
    },
  ],
};

import axios from "axios";

export const BASE_URL = "https://forum-api.dicoding.dev/v1";

// USERS

export const registerUser = async (body) => {
  const result = await axios.post(`${BASE_URL}/register`, body);
  return result;
};

export const loginUser = async (body) => {
  const result = await axios.post(`${BASE_URL}/login`, body);
  return result;
};

export const getAllUsers = async () => {
  const result = await axios.get(`${BASE_URL}/users`);
  return result;
};

export const getMyProfile = async () => {
  const result = await axios.get(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

// THREADS

export const addThread = async (body) => {
  const result = await axios.post(`${BASE_URL}/threads`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

export const getAllThreads = async (body) => {
  const result = await axios.get(`${BASE_URL}/threads`, body);
  return result;
};

export const getDetailThread = async (id) => {
  const result = await axios.get(`${BASE_URL}/threads/${id}`);
  return result;
};

// COMMENTS

export const addComment = async (threadId, body) => {
  const result = await axios.post(`${BASE_URL}/threads/${threadId}/comments}`, body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

export const addUpVoteThread = async (threadId) => {
  const result = await axios.post(`${BASE_URL}/threads/${threadId}/up-vote}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

export const addDownVoteThread = async (threadId) => {
  const result = await axios.post(`${BASE_URL}/threads/${threadId}/down-vote}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

export const addNeutralVoteThread = async (threadId) => {
  const result = await axios.post(`${BASE_URL}/threads/${threadId}/neutral-vote}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
  return result;
};

export const addUpVoteComment = async (threadId, commentId) => {
  const result = await axios.post(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return result;
};

export const addDownVoteComment = async (threadId, commentId) => {
  const result = await axios.post(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return result;
};

export const addNeutralVoteComment = async (threadId, commentId) => {
  const result = await axios.post(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return result;
};

export const getLeaderboard = async () => {
  const result = await axios.get(`${BASE_URL}/leaderboard`);
  return result;
};

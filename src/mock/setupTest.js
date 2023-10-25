import fetch from "node-fetch";

export const getData = async () => {
  const response = await fetch("https://forum-api.dicoding.dev/v1"); // GET
  const data = await response.json(); // Get response body as json
  return data; // Return the value of count key in the response
};

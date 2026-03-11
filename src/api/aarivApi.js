import axios from "axios";

export const sendMessageToAariv = async (data) => {

  const res = await axios.post(
    "http://localhost:3000/api/aariv/chat",
    data
  );

  return res.data;
};
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Bot {
  id: number;
  is_bot: boolean;
  first_name: string;
}
interface Chat {
  id: number;
  type: string;
}
interface Message {
  message_id: number;
  date: number;
  chat: Chat;
}
interface MessageBody {
  chat_id: string;
  text: string;
}

export const botApi = createApi({
  reducerPath: "botApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.telegram.org/bot${import.meta.env.VITE_BOT_API_TOKEN}/`,
  }),
  tagTypes: ["Bot"],
  endpoints: (builder) => ({
    getBot: builder.query<Bot, void>({
      query: () => "getMe",
      providesTags: ['Bot']
    }),
    sendMessage: builder.mutation<Message, MessageBody>({
      query: (message) => ({
        url: 'sendMessage',
        method: 'POST',
        body: message
      })
    })
  }),
});

export const { useGetBotQuery, useSendMessageMutation } = botApi;

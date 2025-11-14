import { useEffect, useState } from "react";
import { useGetBotQuery, useSendMessageMutation } from "./api/botApi";
import { Box, Button, TextField } from "@mui/material";

export const App = () => {
  const { data: botInfo, isSuccess } = useGetBotQuery();
  const [sendMessage] = useSendMessageMutation();
  const [value, setValue] = useState("");
  const handleChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value);
  };
  const handleSend = async () => {
    await sendMessage({ chat_id: "412554186", text: value }).unwrap();
    setValue("");
  };
  useEffect(() => {
    if (isSuccess) console.log(botInfo);
  }, [isSuccess, botInfo]);
  return (
    <Box
      sx={{
        m: "0 auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <TextField value={value} onChange={handleChange} />
      <Button size="large" onClick={handleSend}>Send Message</Button>
    </Box>
  );
};

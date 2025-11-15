import { useEffect, useState } from "react";
import { useGetBotQuery, useSendMessageMutation } from "./api/botApi";
import { Box, Button, TextField } from "@mui/material";
import WebApp from "@twa-dev/sdk";
import "./index.scss";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

const barData = [
  {
    name: 'Alex',
    loginCount: 24,
  },
  {
    name: 'Michael',
    loginCount: 4,
  },
  {
    name: 'Prompix',
    loginCount: 18,
  },
  {
    name: 'Artem',
    loginCount: 32,
  },
]

export const App = () => {
  const { data: botInfo, isSuccess } = useGetBotQuery();
  const [isAnimationActive, setIsAnimationActive] = useState(true);
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
    WebApp.ready();
    setTimeout(() => {
      setIsAnimationActive(false);
    }, 1000)
  }, []);
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
      <Button size="large" onClick={handleSend}>
        Send Message
      </Button>
      <BarChart style={{width: '100%', maxWidth: '400px', maxHeight: '70vh', aspectRatio: '0.5'}} data={barData} responsive>
        <CartesianGrid strokeDasharray='3 6' />
        <XAxis dataKey='name' />
        <YAxis width='auto' />
        <Tooltip />
        <Legend />
        <Bar dataKey='loginCount' fill="#8884d8" isAnimationActive={isAnimationActive} />
      </BarChart>
    </Box>
  );
};

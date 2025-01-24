require("dotenv").config();
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

let accessToken = "";
let baseDomain = "";

const getAccessToken = async () => {
  try {
    const response = await axios.get(
       'https://app2.gnzs.ru/amocrm/test/oauth/get-token.php',
      {
        headers: {
          'Content-Type': 'application/json',
          "X-Client-Id": 32185358, 
        },
      }
    );

    accessToken = response.data.access_token;
    baseDomain = response.data.base_domain;

    console.log('токены', accessToken, baseDomain)

  } catch (error) {
    console.error("Ошибка получения токена", error);
  }
};

getAccessToken();

app.post("/create-entity", async (req, res) => {
  const { entityType, data } = req.body;
  if (!entityType) {
    return res.status(400).json({ error: "entityType обязательен" });
  }

  try {
    const url = `https://${baseDomain}/api/v4/${entityType}`;
    console.log('url', url)
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    res.json({ id: response.data.id });
  } catch (error) {
    console.error("Ошибка создания сущности", error);
    res.status(500).json({ error: "Ошибка создания сущности" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

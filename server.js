
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

const keys = JSON.parse(fs.readFileSync("keys.json", "utf8"));

app.get("/api/load", (req, res) => {
    const userKey = req.query.key;
    if (!userKey || !keys[userKey]) {
        return res.status(403).send("You're not allowed here.");
    }

    const script = fs.readFileSync("./scripts/main.lua", "utf8");
    res.type("text/plain").send(script);
});

app.get("/", (req, res) => {
    res.status(403).send("This page is restricted.");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

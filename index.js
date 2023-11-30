const express = require("express");
const app = express();
const PORT = 3000;
const routes = require("./routes/route")


app.use(express.json());

app.use("/api",routes)

app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}.`);
})
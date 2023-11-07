const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const mongoDB = require('./db')
const BASE_URL = process.env.BASE_URL

mongoDB();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin",`${BASE_URL}`);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/',(req,res) =>{
    res.send('Hello World')
})
app.use(express.json());
app.use('/api', require("./Routes/NewUser"));

app.use('/api', require("./Routes/loginuser"));

app.use('/api', require("./Routes/DisplayData"));

app.use('/api', require("./Routes/OrderData"));

app.use('/api', require("./Routes/MyOrdersData"));

app.listen(PORT, () => {
    console.log(`Backend is running at PORT ${PORT}`)
})
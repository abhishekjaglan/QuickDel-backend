const express = require('express')
const app = express()
const port = process.env.PORT
const mongoDB = require('./db')

mongoDB();

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
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

app.listen(port, () => {
    console.log(`Backend is running at port ${port}`)
})
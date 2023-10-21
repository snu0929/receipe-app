require('dotenv').config()

const express=require('express')
const cors = require('cors');
const {connection}=require('./db')
const {userRouter}=require('./routes/user.routes')

const app=express()
app.use(express.json())
app.use(cors())
app.use("/users", userRouter);


app.listen(parseInt(process.env.port), async () => {
    try {
      await connection;
      console.log('Connected to the database');
      console.log(`Server is running at port ${process.env.port}`);
    } catch (error) {
      console.error('Error:', error);
      console.error('Something went wrong while starting the server');
    }
  });
  
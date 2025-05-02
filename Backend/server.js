const dotenv=require('dotenv');
dotenv.config();
const http=require('http');
const app=require('./app');
const connectDB=require('./db');
connectDB(); // Connect to the database
const server=http.createServer(app);
const PORT=process.env.port||4000;
const userRouter=require('./router/userRouter');
const taskRouter=require('./router/taskRouter');
const projectRouter=require('./router/projectRouter');


app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/project',projectRouter);


server.listen(process.env.PORT,()=>{
   console.log(`server is running on ${PORT}`);
})

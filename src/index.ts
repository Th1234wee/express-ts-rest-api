import { createConnection } from 'typeorm';
import express from 'express';
import userRoute from './routes/user/user.routes';
import bodyParser from 'body-parser';
//connect to typeorm
async function connectionDB(){
    try {
        const connection = await createConnection();
        console.log("Sucessfully connecting database");
    } catch (error) {
        console.log("Error connect database");
    }
}
//create server 
connectionDB()
    .then(() => {
        //create server
        const app = express(); //create express server
        const port = 3000;
        //middleware for work with json
        app.use(express.json());
        //register route into main file(index.ts)
        app.use('/api',userRoute)
        app.listen(port,() => console.log("Server listen at " + port))
    })
    .catch(() => {
        console.log("error connection");
    })

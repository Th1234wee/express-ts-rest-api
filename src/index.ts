import { createConnection } from 'typeorm';
import express from 'express';
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
        const app = express(); //create express server
        const port = 3000;
        app.listen(port,() => console.log("Server listen at " + port))
    })
    .catch(() => {
        console.log("error connection");
    })

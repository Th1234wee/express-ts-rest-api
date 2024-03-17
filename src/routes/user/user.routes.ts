import { Router,Request,Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../../entities/user.entity";

const router = Router();

router.post('/user/addData',async (request : Request,response: Response) =>{
    const newUser = request.body; //get all the reqest information
    const userRepository = getRepository(User); //get user entity 

    try {
        //save newUser(req.body) into table User(userRepository)
        const user = await userRepository.save(newUser);
        //response in status 201(created) and custom message
        //and registered data
        response.status(201).json({
            message : "Data registered",
            data    : user
        })
    } catch (error) {
        response.status(500).json({
            message : "Cannot Insert Data"
        })
    }
})

router.get('/user/getAllData' , async (request : Request , response:Response) =>{
    try {
        const userRepository = getRepository(User);
        const allUser = await userRepository.find();
        response.status(200).json({
            message : "Get Success",
            data : allUser
        })
    } catch (error) {
        response.status(500).json({
            message : "Error get Data"
        })
    }
})

export default router;
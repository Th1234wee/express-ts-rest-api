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
router.get('/user/findOneUser/:id', async(request : Request , response : Response) =>{
    const foundUser = parseInt(request.params.id);
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where :  {id : foundUser}   
    })
    return response.status(200).json({
        data : user
    })
    
})
router.put('/user/editUser/:id', async (request : Request , response : Response) => {
    const foundUser = parseInt(request.params.id);
    const { email , password} = request.body;
    const userRepository = getRepository(User);
    const user = await  userRepository.findOne({
        where : { id : foundUser}
    });
    const newUser = await userRepository.create({
        ...user,
        // name : name,
        email : email,
        password : password
    })
    await userRepository.save(newUser);
    response.status(200).json({
        data : newUser
    })
})
router.delete('/user/removeOneUser/:id',async (request : Request , response : Response) =>{
    const foundUser = parseInt(request.params.id);
    const userRepository = getRepository(User);
    await userRepository.delete(foundUser);
    response.json({
        message : "Success"
    })
} )


//dynamic route
export default router;

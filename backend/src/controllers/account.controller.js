import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import { getUserInfo } from "../services/riotAPI.js";
export async function signup(req, res) {
    const {username, gameTag, password} = req.body;

    try {
        //check if all fields are filled
        if(!username || !gameTag || !password) {
            return res.status(400).json({message: "Please fill all the fields."})
        }
        //check if password meets requirements
        if(password.length < 7) {
            return res.status(400).json({message: "Password has to be longer than 7 characters"})
        }
        //check if user exists in db
        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({message: "This user already exists"});
        }
        //salt for password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newRiotAccount = new User({
            username,
            riotId: gameTag,
            password: hashedPass
        });

        if(newRiotAccount) {
            generateToken(newRiotAccount._id, res);
            await newRiotAccount.save()

            res.status(201).json({
                _id: newRiotAccount._id,
                username: newRiotAccount.username,
                gameTag: newRiotAccount.riotId,
            })
        } else {
            return res.status(400).json({message: "This user already exists"})
        }
    } catch (error) {
        console.log("There is an error in signup controller", error.message);
        
        res.status(500).json({message: "Internal server error"});
    }
}


export async function login(req, res) {
    const {username, password} = req.body;

    try {
        if(!username || !password) {
          return res.status(400).json({message: "You need to fill all the fields."})
        }

        const user = await User.findOne({username}) 

        if(!user) {
            return res.status(400).json({message: "This username invalid"});
        }
        //compare db password and input by using bcrypt
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({message: "Incorrect Password"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            gametag: user.gametag,
    
        })

    } catch (error) {
        console.log("There is an error in the login controller", error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export async function logout(req, res) {
    try {
        //clear jwt
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: "Logged out"})
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({message: "Internal server error"})
    }
}

 //if protectRoute is successful get the user
 export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in each checkAuth controller ", error.message);
    res.status(500).json({ message: "Internal Server Error"});
  }
 }

import { getUserInfo, takeSummonerProfile, takeSummonerMatches, takeMatchInfo} from "../services/riotAPI.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs"

export async function signup(req, res) {
    const {username, gametag, password} = req.body;


    try {
        //check if all fields are filled
        if(!username || !gametag || !password) {
            return res.status(400).json({message: "Please fill all the fields."})
        }
        //check if password meets requirements
        if(password.length < 7) {
            return res.status(400).json({message: "Password has to be longer than 7 characters"})
        }
        //check if user exists in db
        const user = User.findOne({username});

        if(user) {
            return res.status(400).json({message: "This user already exists"});
        }
        //salt for password
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newRiotAccount = new User({
            username,
            gametag,
            password: hashedPass
        });

        if(newRiotAccount) {
            
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

        const user = User.findOne({username}) 

        if(!user) {
            return res.status(400).json({message: "This username invalid"});
        }
        //compare db password and input by using bcrypt
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) {
            return res.status(400).json({message: "Incorrect Password"})
        }
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
        
    } catch (error) {
        
    }
}


export async function getInfo(req, res) {

    const {username, gametag} = req.query;
    
    try{
        if (!gametag || !username) {
            return res.status(400).json({message: "Gametag and Username are both required."})
        }
        const info = await getUserInfo(username, gametag);
        const userInfo = await takeSummonerProfile(info.puuid);
        res.status(200).json({
           gamerTag: info,
           profile: userInfo, 
        }
            
        )
    } catch (error) {
        console.log("Error in getInfo");
        res.status(500).json({ message: "Error in getInfo",
                               error: error.message
        })
    }
    
}

export async function getMatchesInfo(req, res) {
    const {puuid} = req.query;

    try {
        if(!puuid) {
            return res.status(400).json({message: "PUUID is required."})
        }
        const matches = await takeSummonerMatches(puuid);
        const matchesInfo = await Promise.all(matches.map(match => 
            takeMatchInfo(match)
        ))
        res.status(200).json(matchesInfo);
    } catch (error) {
        console.log("Error in getMatchInfo");
        res.status(500).json({ message: "Error in getMatchInfo",
                               error: error.message
        });
    }
}
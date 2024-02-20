const User = require("../models/user.model.js")
const bcrypt = require("bcrypt");



module.exports.register = async(req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body;
        if(!username || !email || !password || !confirmPassword){
            return res.status(403).json({status:false, msg : 'All fields are required!'})
        }

        if(password !== confirmPassword){
            return res.status(403).json({status:false, msg : 'password and confirmPassword must same!'})
        }

        const usernameCheck = await User.findOne({username});
        if(usernameCheck){
            return res.status(400).json({msg : "Username already registered!", status : false});
        }

        const emailCheck = await User.findOne({email});
        if(emailCheck){
            return res.status(400).json({msg : "Email already registered!", status : false});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password : hashedPassword,
        })
        delete user.password;

        return res.status(200).json({status : true, msg : "User registered successfully!" , user})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            msg : "Something went wrong, please try again!"
        })
    }
}




module.exports.login = async(req, res) => {
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(403).json({status:false, msg : 'All fields are required!'})
        }

        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({msg : "Incorrect username or password!", status : false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid){
            return res.status(400).json({msg : "Incorrect username or password!", status : false});
        }
        delete user.password;

        return res.status(200).json({status : true, msg : "LoggedIn successfully!" , user})

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            msg : "Something went wrong, please try again!"
        })
    }
}



module.exports.setAvatar = async(req, res) => {
    try {
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet : true,
            avatarImage
        });

        return res.status(200).json({
            isSet: userData.isAvatarImageSet,
            image: userData.avatarImage
        })
    } catch (error) {
        res.status(500).json({status:false, msg: "Something went wrong, please try again!"})
    }
}



module.exports.getAllUsers = async(req, res) => {
    try {
        const users = await User.find(
            {_id:
                {
                    $ne: req.params.id
                }
            }
        ).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);

        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({status:false, msg: "Something went wrong, please try again!"});
        throw error;
    }
}


module.exports.logout = (req, res) => {
    try {
      if (!req.params.id) return res.json({ msg: "User id is required " });
      onlineUsers.delete(req.params.id);
      return res.status(200).send();
    } catch (error) {
        res.status(500).json({status:false, msg: "Something went wrong, please try again!"});
        throw error;
    }
  };
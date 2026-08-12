import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res)=> {

    //get user details from frontend
    const {fullName, email, username, password} = req.body
    console.log("user details from frontend", fullName, email, username, password); 
    // validation -not empty
    if (
        [fullName, email, username, password].some ((field)=>
            filed?.trim() === ""
        )
    ){
            throw new ApiError(400, "All fields are required")
    }
    //check if user alreaddy exists: username, email

    const existedUser = User.findOne({
        $or: [ { username } ,{ email } ]
    })
    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
    }
    // check for images, check for avatar
    const avatarLocalPath = req.files?.avatar[0]?.path   //multer
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar is required")
    }
    // upload to cloudinary

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "avatar is required")
    }
    // create user object - create entry in db

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        pasword,
        username: username.toLowerCase()
    })

   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // remove password and refresh token field from repsonse
   )
    
    // check for user creation 
    if(createdUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }
    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})


export { registerUser };

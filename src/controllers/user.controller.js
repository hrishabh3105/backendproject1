import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res)=> {
    
    //get user details from frontend
    // validation -not empty
    //check if user alreaddy exists: username, email
    // check for images, check for avatar
    // upload to cloudinary
    // create user object - create entry in db
    // remove password and refresh token field from repsonse
    // check for user creation 
    // return res
})


export { registerUser };

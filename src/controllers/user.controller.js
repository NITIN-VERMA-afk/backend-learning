import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/clodinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation-not empty
  //check if user already exists:username,email
  //cheak for images, cheak for avatar
  //upload them to cloudinary,avatar
  //create user object-create entry in db
  //remove password  and refresh token field from response
  //cheak for user creation
  //return response

  const { fullName, email, username, password } = req.body;

  console.log("email:", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "all field are required");
  }

  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email email already exit");
  }
  const avatarLocalPath = req.files?.avatar[0]?.path;
  req.files?.coverImages[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(422, "Avatar is missing");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImagesLocalpath);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }
  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
});
const createdUser = await User.findById(User._id).select("-password -refreshToken")

if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
}
return res.status(201).json(
    new ApiResponse(200,createdUser,"User registred sucssefully")
)

export { registerUser };
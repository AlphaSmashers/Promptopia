import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

// If there is error then change the below new Schema to newSchema
const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
    required: [true, "Email is Required"],
  },
  username: {
    type: String,
    required: [true, "Username is Required"],
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
/*  We did this || because this route gets called called everytime and the conection is established every single time from scratch, so we do this additional check, that if the model already exists in model object[local-my-Mongoose] (left side of oparand ||), then go with it (nothing to do), but if not then create it once(|| right side of oparend).
Nothing wrong with only writing model("User", UserSchema), because it checks in atlast if there is not any collection with this model, then create a new one, and if there is then modify in it. So no harm in that too, but why to go there everytime, when we can make it short by applying this condition. */
export default User;

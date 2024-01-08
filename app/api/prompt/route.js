//** This file must be named route.js because its a routed file. page.js wont be allowed. Remember if its backend file, where we do a fetch request, its name must be route.
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; //this is not client side, so we can import it without any tension

export const GET = async (req, res) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
    // As always again...standard procedure to send data is in JSON formet, as data is often transmitted or stored in the form of strings.
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; //this is not client side, so we can import it without any tension

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({ tag: params.tagName }).populate("creator");
    if (!prompts) return new Response("Tag Prompts not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
    // As always again...standard procedure to send data is in JSON formet, as data is often transmitted or stored in the form of strings.
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt"; //this is not client side, so we can import it without any tension

// GET (read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
    // As always again...standard procedure to send data is in JSON formet, as data is often transmitted or stored in the form of strings.
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

// PATCH (update)

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompt!", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const deletePrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletePrompt) return new Response("Prompt does not exists", { status: 404 });
    return new Response("Prompt Deleted Successfully.", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};

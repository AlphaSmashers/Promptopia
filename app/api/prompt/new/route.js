//** This file must be named route.js because its a routed file. page.js wont be allowed. Remember if its backend file, where we do a fetch request, its name must be route.
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json(); // .json(), a server side special, explecitly provided by NextJs(express dont have it), which parses/converts any payload of JSON format into a format that is usable within a programming language. Maybe JavaScript object format.

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
    // As always again...standard procedure to send data is in JSON formet, as data is often transmitted or stored in the form of strings.
  } catch (error) {
    console.log(error);
    return new Response("Failed to create a new Prompt", { status: 500 });
  }
};

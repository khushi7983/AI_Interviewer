// test-api-key.ts
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

async function test() {
  try {
    const { text } = await generateText({
      model: google("gemini-1.5-pro"),
      prompt: "Generate a technical question.",
    });
    console.log("Success:", text);
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}
test();
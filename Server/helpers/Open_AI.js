const { OpenAI } = require("openai");
require("dotenv").config();

module.exports = async function openAI(search) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `please give me 5 data title and body news from ${search}. the response must be a JSON. 
            the format is like this:
            
                { "url": "", "title": "", "body": ""} 
            
            the url must be a valid url, url is news url from internet`,
      },
    ],
    model: "gpt-4o-mini",
    response_format: {"type": "json_object"}
  });
  // console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
};

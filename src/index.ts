import express from 'express';
import bodyParser from 'body-parser';


import path from 'path'
import dotenv from 'dotenv'

import OpenAI from 'openai';

import schema from './functions.json'
import { Chat } from 'openai/resources';



dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.post('/sendHTML', async (req, res) => {
   const { html, prompt } = req.body; // Extracting HTML and prompt from the request body
   
   const messages = [
    {role: "system", content: "You are an assistant and your job is to help a Blind and visually impaired user by reducing clutter on a website. The user will provide you with the html of a page and will give you a prompt specifying what all things he wants to explore on the webpage. You have to go through the html of the webpage and return a set of classes and ids of html elements that are related to the content the user wants to see. Only Return the relevant element." },
    {role: "system", content: JSON.stringify(html)},
    {role: "system", content: JSON.stringify(prompt)},
    {role: "user", content: "Please return a array of classes and ids that are related to the prompt. Just return the JSON array, provide no other commentary."}
   ]

   try{
    const openai = new OpenAI({
      apiKey: '',
      baseURL: "",
      defaultQuery: { 'api-version': "2023-05-15" },
      defaultHeaders: { 'api-key': "" },
      });
  
      const completion = await openai.chat.completions.create({
        messages: messages as OpenAI.Chat.ChatCompletionMessageParam[],
        model: "gpt-3.5-turbo",
      });
  
      const json = completion.choices[0].message.content ? JSON.parse(completion.choices[0].message.content) : [];
      console.log(json)

      await res.json(json);
   }catch(err){
     console.log(err) 
  }
 });


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});


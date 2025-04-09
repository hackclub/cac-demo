import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main(){
  const checkIfExists = await prisma.slide.findMany()
  if (!checkIfExists.length){
    const createSlides = await prisma.slide.createMany({
      data: [
        {
          "prompt": "this is an interactive presentation",
          "directive": "Interpret the text received as a series of emojis, with a maximum of five emojis used, and return the emojis. If inappropriate, return ''. Do not render any encapsulating markdown tags or any explanations.",
          "content": `
              <div class = 'content'>
                <ul>
                  <li>text a sentence to the number on the screen to see something cool happen</li>
                  <li>don't send anything inappropriate 🙏 we will have your phone number...</li>
                </ul>
              </div>
              `,
          "type": "slide",
          "current": true
        },
        {
          "prompt": "nice!",
          "directive": "Interpret the text received as a series of emojis, with a maximum of five emojis used, and return the emojis. If inappropriate, return ''. Do not render any encapsulating markdown tags or any explanations.",
          "content": `
              <div class = 'content'>
                <ul>
                  <li>17 year old from australia (🇦🇺🦘) and an engineer at hack club</li>
                  <li>i have thoughts™ about ai</li>
                </ul>
              </div>
              `,
          "type": "slide",
        },
        {
          "prompt": "How would you improve your school?",
          "directive": "You are moderating a civics workshop for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'I would like school to start later', abbreviate it to 'Later school start'. If irrelevant or inappropriate, return ''. DO NOT USE MORE THAN THREE WORDS",
          "type": "wordcloud"
        },
        {
          "prompt": "What are the biggest tech challenges young people will face in the next 10 years?",
          "directive": "You are moderating a civics workshop for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'AI stealing jobs from programmers', abbreviate it to 'AI taking jobs'. If irrelevant or inappropriate, return ''. DO NOT USE MORE THAN THREE WORDS.",
          "type": "wordcloud"
        },
        {
          "prompt": "What do you want to see on this website?",
          "directive": "Generate the prompt provided as a styled, visually interesting reusable HTML component that can be directly dropped into a <div>. DO NOT RENDER ANY ENCAPSULATING MARKDOWN TAGS OR EXPLANATIONS. If irrelevant or inappropriate, return ''.",
          "type": "ai"
        },
        {
          "prompt": "tech",
          "directive": "Interpret the text received as a series of emojis, with a maximum of five emojis used, and return the emojis. If inappropriate, return ''. Do not render any encapsulating markdown tags or any explanations.",
          "content": `
              <div class = 'text-3xl my-8 grid grid-cols-2'>
                <ul class = 'list-disc list-inside col-span-1'>
                  <li>next.js, react, tailwindcss, prisma</li>
                  <li>ai model: <code>meta-llama/llama-4-scout-17b-16e-instruct</code></li>
                  <li>curious? hacky? 👀 check out what's happening behind the scenes at:</li>
                   https://github.com/hackclub/cac-demo
                </ul>
                <div class = 'col-span-1 flex flex-row gap-2 *:basis-1/2 *:mx-auto'>
                  <img src = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/a5bb220e16819271929f8d45c96c2b21dba0ce17_image.png'/>
                  </div>
              </div>
              `,
          "type": "slide"
        },
      ]
    })
  }
}


await main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
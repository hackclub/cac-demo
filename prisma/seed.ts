import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main(){
  const checkIfExists = await prisma.slide.findMany()
  console.log(!checkIfExists.length)
  if (!checkIfExists.length){
    const createSlides = await prisma.slide.createMany({
      data: [
        {
          "prompt": "How would you improve your school?",
          "directive": "You are moderating a civics workshop for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'I would like school to start later', abbreviate it to 'Later school start'. If irrelevant or inappropriate, return ''. DO NOT USE MORE THAN THREE WORDS",
          "current": true,
          "type": "wordcloud"
        },
        {
          "prompt": "What are the biggest tech challenges young people will face in the next 10 years?",
          "directive": "You are moderating a civics workshop for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'AI stealing jobs from programmers', abbreviate it to 'AI taking jobs'. If irrelevant or inappropriate, return ''. DO NOT USE MORE THAN THREE WORDS.",
          "type": "wordcloud"
        },
        {
          "prompt": "What do you want to see on this website?",
          "directive": "Generate the prompt provided as a reusable HTML component that can be directly dropped into a <div>. DO NOT RENDER any encapsulating markdown tags or any explanations. If irrelevant or inappropriate, return ''. If body text required, use Lorem Ipsum. If JavaScript used, use unique names prefixed with a ranodm number distinct to what you're generating for each variable.",
          "type": "ai"
        },
        {
          "prompt": "Generic Presentation Title",
          "directive": "Interpret the text received as a series of emojis, with a maximum of five emojis used, and return the emojis. If inappropriate, return ''. Do not render any encapsulating markdown tags or any explanations.",
          "content": `
              <h1 class = 'text-5xl'>what's up</h1>
              <ul class = "list-disc list-inside">
                <li>Something something</li>
                <li>Something something</li>
              </ul>
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
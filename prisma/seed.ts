import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
async function main(){
  const createSlides = await prisma.slide.createMany({
    data: [
      {
        "prompt": "How would you improve your school?",
        "directive": "You are moderating a workshop on civics performed for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'I would like school to start later', abbreviate it to 'Later school start'. If irrelevant or inappropriate, return an empty string.",
        "current": true
      },
      {
        "prompt": "What are the biggest tech challenges young people will face in the next 10 years?",
        "directive": "You are moderating a workshop on civics performed for teenagers. Summarise the text submitted into generic statements of three or less words, without quotation marks. For instance, if the prompt provided is similar to 'AI stealing jobs from programmers', abbreviate it to 'AI taking jobs'. If irrelevant or inappropriate, return an empty string."
      },
      {
        "prompt": "What do you want to see on this website?",
        "directive": "Generate the prompt provided as a colourful, visually interesting reusable absolutely positioned HTML component that can be directly dropped into a <div>. Do not render any encapsulating markdown tags or any explanations. If irrelevant or inappropriate, return an empty string.",
        "wordcloud": false,
      },
    ]
  })
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
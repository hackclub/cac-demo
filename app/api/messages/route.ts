
import { NextRequest, NextResponse } from "next/server";
import { parse } from 'querystring'; 
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest){
    const r = parse(await request.text())

    const slideDetails = (await prisma.slide.findFirst({
        where: {
            current: true
        },
        select: {
            id: true,
            prompt: true,
            directive: true
        }
    }))!

    const mainTopic = await fetch("https://ai.hackclub.com/chat/completions", { 
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            "messages": [
                {
                    "role": "system", 
                    "content": slideDetails.directive},
                {
                    "role": "user", 
                    "content": String(r.Body)
                }
            ]
        })
    })

    const topic = (await mainTopic.json())["choices"][0]["message"]["content"]

    const response = await prisma.message.create({
        data: {
            message: String(r.Body),
            topic: topic,
            slideId: slideDetails.id
        }
    })
    return NextResponse.json(response)
}   

export async function GET(request: NextRequest){
    const slide = request.nextUrl.searchParams.get("slide")
    const response = await prisma.message.findMany({
        where: {
            slideId: Number(slide)!
        }
    })
    return NextResponse.json(response)
}
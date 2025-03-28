import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    const activeSlide = await prisma.slide.findFirst({
        where: {
            current: true
        }
    })
    return NextResponse.json(activeSlide)
}

export async function POST(request: NextRequest){
    const activeSlide = await prisma.slide.findFirst({
        where: {
            current: true
        }, 
        select: {
            id: true
        }
        })

    const deactivateSlide = await prisma.slide.update({
        where: {
            id: activeSlide!.id
        },
        data: {
            current: false
        }
    })

    const activateNext = await prisma.slide.update({
        where: {
            id: (activeSlide!.id + 1)
        },
        data: {
            current: true
        }
    })
    return NextResponse.json(activeSlide)
}
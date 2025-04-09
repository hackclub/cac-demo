import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { wrap } from "@/utils/sort";

const prisma = new PrismaClient();

export async function GET(request: NextRequest){
    const slide = Number(request.nextUrl.searchParams.get("slide"))
    if (!slide){
        const activeSlide = await prisma.slide.findFirst({
            where: {
                current: true
            }
        })
        return NextResponse.json(activeSlide)
    } else {
        const queriedSlide = await prisma.slide.findFirst({
            where: {
                id: slide!
            }
        })
        return NextResponse.json(queriedSlide)
    }
}

export async function POST(request: NextRequest){
   
    const back = request.nextUrl.searchParams.get("back")
    console.log(back)
    const totalSlides = (await prisma.slide.findMany()).length
    let activeSlide = await prisma.slide.findFirst({
            where: {
                current: true
            }, 
            select: {
                id: true
            }
    })
        if (!activeSlide){
            activeSlide = { id: 1 }
        }
        if (back){
            console.log('back true', activeSlide, activeSlide.id-1)
            if (activeSlide!.id === 1){
                return 
            } else {
                const activatePrev = await prisma.slide.update({
                    where: {
                        id: activeSlide!.id - 1
                    },
                    data: {
                        current: true
                    }
                    }) 
            }
        } else {
            const activateNext = await prisma.slide.update({
                where: {
                    id: wrap(activeSlide!.id, totalSlides)
                },
                data: {
                    current: true
                }
                }) 
        }
        const deactivateSlide = await prisma.slide.update({
            where: {
                id: activeSlide!.id
            },
            data: {
                current: false
            }
        })
        return NextResponse.json(activeSlide)
}
'use client'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface ConfettiProps {
    emoji: string
}

export default function Confetti({ emoji }: ConfettiProps) {
    useEffect(() => {
        const shapes = [confetti.shapeFromText({ 
            text: emoji,
            scalar: 4
        })]

        const particleCount = Math.floor(5 + (Math.random() * 20))
        const spread = Math.floor(45 + (Math.random() * 20))
        const scalar = Math.floor(3 + (Math.random() * 3))
        
        // Launch confetti from left side
        confetti({
            particleCount: particleCount,
            angle: 60,
            spread: spread,
            origin: { x: 0, y: 0.5 },
            shapes,
            scalar: scalar,
            ticks: 200
        })

        // Launch confetti from right side
        confetti({
            particleCount: particleCount,
            angle: 120,
            spread: spread,
            origin: { x: 1, y: 0.5 },
            shapes,
            scalar: scalar,
            ticks: 200
        })
    }, [emoji])

    return null
} 
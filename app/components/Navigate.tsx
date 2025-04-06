import { useSession } from "next-auth/react";
import { NewNextAuthUser } from "@/utils/types";
import { wrap } from "@/utils/sort";

export default function Navigate({currentSlide, setCurrentSlide, className}: {currentSlide: number, setCurrentSlide: (value: any) => void, className: string}){
    const session = useSession();


    async function handleClick(){
        const totalSlides = (await fetch("/api/slides").then(r => r.json()))["count"]
        console.log(wrap(currentSlide, totalSlides), "from navigate")
        setCurrentSlide(wrap(currentSlide, totalSlides))

    }

    if (session.status === "authenticated" && (session.data?.user! as NewNextAuthUser).username === process.env.NEXT_PUBLIC_AUTHORISED_USER){
        return (
            <button className = {className} onClick={async () => {handleClick(); await fetch("/api/active", { method: "POST" })}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                next (admin)
            </button>
        )
    } else {
        return (
            <button className = {className}  onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                next
            </button>
        )
    }
}
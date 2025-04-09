import { useSession } from "next-auth/react";
import { NewNextAuthUser } from "@/utils/types";
import { wrap } from "@/utils/sort";

export default function Navigate({currentSlide, setCurrentSlide, className}: {currentSlide: number, setCurrentSlide: (value: any) => void, className: string}){
    const session = useSession();

    async function handleForward(){
        const totalSlides = (await fetch("/api/slides").then(r => r.json()))["count"]
        setCurrentSlide(wrap(currentSlide, totalSlides))
        }
    
        async function handleBack(){
            if (currentSlide == 1){
                // do nothing
            } else {
                setCurrentSlide(currentSlide-1)
            }
        }

    if (session.status === "authenticated" && (session.data?.user! as NewNextAuthUser).username === process.env.NEXT_PUBLIC_AUTHORISED_USER){
        return (
            <div className = "flex flex-row gap-4">
                <button className = {className} onClick={async () => {handleBack(); await fetch("/api/active?back=true", { method: "POST" })}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                    back (admin)
                </button>
                | 
                <button className = {className} onClick={async () => {handleForward(); await fetch("/api/active", { method: "POST" })}}>
                    next (admin)
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>
            </div>
        )
    } else {
        return (
            <button className = {className}  onClick={handleForward}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
                next
            </button>
        )
    }
}
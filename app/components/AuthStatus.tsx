import { useSession } from "next-auth/react"
import { NewNextAuthUser } from "@/utils/types"
export function AuthStatus({className}: {className: string}){
    const session = useSession()
    return (
        <div className = {className}>
            <div className = "flex flex-row gap-1 bg-white *:text-sm align-middle items-center p-1 border-l border-r border-b rounded-b-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                { session.status === "authenticated" && ((session.data?.user! as NewNextAuthUser).username === process.env.NEXT_PUBLIC_AUTHORISED_USER) 
                    ? <span>presenting slide</span>
                    : session.status === "loading" 
                        ? <span>loading...</span>
                        : <span>previewing slide as audience</span>
                }
                </div>
        </div>
    )
}
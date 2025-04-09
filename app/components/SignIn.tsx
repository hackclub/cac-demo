import { signIn } from "next-auth/react";

export default function SignIn(){
    return (
        <div className = "flex flex-row gap-2 align-middle items-center opacity-75 hover:opacity-100">
            <button onClick={() => signIn("github", {callbackUrl: "/"})}><img src = "github.png" className = "w-[2vw]"/></button>
            <a href = {process.env.NEXT_PUBLIC_REPO_URL}>{process.env.NEXT_PUBLIC_REPO_URL}</a>
        </div>
    )
}
import { signIn } from "next-auth/react";

export default function SignIn(){
    return (
        <div className = "flex flex-row gap-2 align-middle items-center opacity-50 hover:opacity-100">
            <button onClick={() => signIn("github", {callbackUrl: "/"})}><img src = "github.png" className = "w-[2vw]"/></button>
            <a href = "https://github.com/hackclub/cac-demo">github.com/hackclub/cac-demo</a>
        </div>
    )
}
'use client'

import { useContext, useEffect } from "react"
import { supabase } from "../client"
import { SessionProvider } from "../providers"
import { sessionContextType } from "../models"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export default function Home() {
    const { session, useSession } = useContext(SessionProvider)      
    const router = useRouter()
    
    const signout = async () => {
        await supabase.auth.signOut()
        console.log("Asdasd")
        useSession(false)
        router.push('/')
      }
    

    return (
        <div>LOGIN SUCCESSFUL<br></br><button className="bg-yellow-500" onClick={signout}>SIGN OUT</button></div>
    )
}
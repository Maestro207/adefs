'use client'

import { check } from "@/lib/test";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react"

function Home() {
  // const supabase = createClient()

  const [msg, setMsg] = useState("");
  const router = useRouter()

  const signIn = async (data: FormData) => {
    const response = await fetch('api/auth/login', {
      method: "POST",
      body: data,

    })
    const res = await response.json()

    console.log(res)

    if(res.error){
      setMsg(JSON.stringify(res.error))
    }else{
      router.push('/home')
    }
  }
  
  return(
    <div>
      <form action={signIn}>
        <label htmlFor="email">EMAIL</label>
        <input name="email" type="text" className="border-2" required/>
        <label htmlFor="password">PASSWORD</label>
        <input name="password" type="password" className="border-2" required/>
        <button type="submit">Submit</button>
      </form>
      <button onClick={async () => {
                const userData = await check();
                console.log(userData)
            }}>
                CHECK
            </button>
      <Link href="/register">REGISTER</Link>
      {msg}
    </div>
  )
}

export default Home;
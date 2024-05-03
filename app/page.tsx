'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react"

function Home() {
  
  const [msg, setMsg] = useState("");
  const router = useRouter()

  const signIn = async (data: FormData) => {
    const response = await fetch('api/auth/login', {
      method: "POST",
      body: data,

    })
    const res = await response.json()
    const ress = JSON.stringify(res)
    setMsg(ress)
    if(res.data.session){
      router.push("/home")
    }
  }
  
  return(
    <div>
      <form action={signIn}>
        <label htmlFor="email">EMAIL</label>
        <input name="email" type="text" className="border-2"></input>
        <label htmlFor="password">PASSWORD</label>
        <input name="password" type="password" className="border-2"></input>
        <button type="submit">Submit</button>
      </form>
      <Link href="/register">REGISTER</Link>
      {msg}
    </div>
  )
}

export default Home;
'use client'

import { check } from "@/lib/test";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"

import "@/app/globals.css"

import "@/app/burat.css"

function Home() {
  const supabase = createClient()
  const confirmUser = useCallback(async () => {
		const session = await supabase.auth.getUser()
		if(!session.error){
			router.push('/home')
		}
	}, [supabase])

	useEffect(() => {
		confirmUser()
	}, [])

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
      if(res.error.status == 400){
        setMsg("No Existing Account yet!")
      }
    }else{
      router.push('/home')
    }
  }
  
  return(
    <main id="login" className=" h-[100vh] flex justify-center items-center">
      <section className="loginCard gap-y-4 p-8 flex flex-col justify-stretch align-middle rounded-3xl h-auto w-[36vw]">
				<div className="flex flex-col p-8 h-auto bg-white border-2 rounded-2xl w-auto justify-between align-middle transition-all ease-in">
					<span className="flex justify-center align-middle text-2xl">LOGIN</span>  
          <span className="h-[2rem]">
            {msg}
          </span>
					
						<form
							action={signIn}
							className="flex flex-col p-8 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input name="email" type="email" className="border-2" required />
							<label htmlFor="password">PASSWORD</label>
							<input
								name="password"
								type="password"
								className="border-2"
								required
							/>
							<button type="submit" className="submit" onClick={() => {setMsg("")}}>
								Submit
							</button>
						</form>

				</div>
        <button onClick={() => {router.push("/register")}} className="text-white text-xl">Register</button>
			</section>
    </main>
  )
}

export default Home;
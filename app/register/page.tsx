'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
	const [msg, setMsg] = useState("");
  const router = useRouter()

	const signUp = async (data: FormData) => {
		const response = await fetch("api/auth/sign-up  ", {
			method: "POST",
			body: data,
			// headers: { "Content-Type": "application/json" }, 
		});
		const res = await response.json();
		const ress = JSON.stringify(res)
    if(res.data.session){
      router.push("/home")
    }
	};

	return (
		<div>
			<form action={signUp}>
				<label htmlFor="email">EMAIL</label>
				<input name="email" type="text" className="border-2"></input>
				<label htmlFor="password">PASSWORD</label>
				<input name="password" type="password" className="border-2"></input>
				<button type="submit">Submit</button>
			</form>
      
      {msg}
		</div>
	);
}

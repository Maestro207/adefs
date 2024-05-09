"use client";

import { check } from "@/lib/test";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import "@/app/globals.css";

function Home() {
	const supabase = createClient();

	const confirmUser = useCallback(async () => {
		const session = await supabase.auth.getUser();
		if (!session.error) {
			router.push("/home");
		}
	}, [supabase]);

	const [msg, setMsg] = useState("");
	const router = useRouter();

	useEffect(() => {
		confirmUser();
	}, []);

	const signIn = async (data: FormData) => {
		const response = await fetch("api/auth/login", {
			method: "POST",
			body: data,
		});
		const res = await response.json();

		if (res.error) {
			if (res.error.status == 400) {
				setMsg("No Existing Account yet!");
			}else if(res.error.status == 403){
        setMsg("Check your Connection")
      }else{
        setMsg("An error occured")
      }
		} else {
			router.push("/home");
		}
	};

	return (
		<main id="login" className=" h-[100vh] flex justify-center items-center">
			<section className="loginCard gap-y-4 p-4 md:p-8 flex flex-col justify-stretch align-middle rounded-3xl h-auto  w-[90vw] md:w-[56vw] lg:w-[40vw]">
				<div className="flex flex-col p-2 md:p-8 h-auto bg-white/[0.92] border-2 rounded-lg w-auto justify-between align-middle transition-all ease-in">
					<span className="flex flex-col w-full items-center justify-center align-middle text-2xl">
						<div id="logo" />
						<h1>LOGIN</h1>
					</span>
					<span className="h-[1.5rem]">{msg}</span>

					<form
						action={signIn}
						className="flex flex-col p-2 md:p-4 justify-center"
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
						<button
							type="submit"
							className="submit"
							onClick={() => {
								setMsg("Loading");
							}}
						>
							Submit
						</button>
					</form>
				</div>
				<button
					onClick={() => {
						router.push("/register");
					}}
					className="text-white text-lg"
				>
					Register
				</button>
			</section>
		</main>
	);
}

export default Home;

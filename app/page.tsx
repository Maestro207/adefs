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
			console.log(res.error)
			if (res.error.status == 400) {
				setMsg("No Account yet or Wrong Password");
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
			<section className="loginCard gap-y-4 px-2 py-4 md:p-8 flex flex-col justify-stretch align-middle rounded-3xl h-auto  w-[90vw] md:w-[56vw] lg:w-[40vw]">
				<div className="flex flex-col p-2 md:p-8 h-auto text-white rounded-lg w-auto justify-between align-middle transition-all ease-in">
					<span className="flex flex-col w-full items-center justify-center align-middle text-2xl">
						<div id="logo" className="scale-[1.2]"/>
						<h1 className="mb-3 mt-2">LOGIN</h1>
					</span>
					<span className="flex w-full items-center justify-center h-[2rem] mb-4">
						{msg == "Loading" ? (
							<span id="loading">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									height="24px"
									viewBox="0 -960 960 960"
									width="24px"
									className="fill-white"
								>
									<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
								</svg>
							</span>
						) : (
							<span className={msg == "" ? "border-2 border-none" :  "p-2 bg-[#ccabab]/[0.5] text-white rounded-md border-2 border-gray-300"}>{msg}</span>
						)}
					</span>

					<form
						action={signIn}
						className="flex flex-col p-2 md:p-4 justify-center"
					>
						<label htmlFor="email">EMAIL</label>
						<input name="email" type="email"  required />
						<label htmlFor="password">PASSWORD</label>
						<input
							name="password"
							type="password"
							
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
				<Link
					className="bg-white/[0.25] text-white rounded-md p-2 w-auto flex justify-center"
					href={'/register'}
				>
					No Account yet? Click here to Register
				</Link>
			</section>
		</main>
	);
}

export default Home;

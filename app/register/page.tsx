"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/globals.css";

export default function SignUp() {
	const [msg, setMsg] = useState("")
	const [role, setRole] = useState("");
	const router = useRouter();

	const studentRegister = async (data: FormData) => {
		const response = await fetch("api/auth/register/student", {
			method: "POST",
			body: data,
			// headers: { "Content-Type": "application/json" },
		});
		const res = await response.json();
		if (res.error) {
			setMsg("Error register")
		}else{
			// router.push("/home");
		}
	};
	const teacherRegister = async (data: FormData) => {
		const response = await fetch("api/auth/register/teacher", {
			method: "POST",
			body: data,
			// headers: { "Content-Type": "application/json" },
		});
		const res = await response.json();
		if (res.error) {
			setMsg(JSON.stringify(res))
		}else{
			// router.push("/home");
		}
	};

	return (
		<main id="register" className=" h-[100vh] flex justify-center items-center">
			<section className="regCard gap-y-4 p-8 flex flex-col justify-stretch align-middle rounded-3xl h-auto w-[36vw]">
				<span>
					<button
						className="bg-white border-black rounded-full border-[1px] p-2 w-auto"
						onClick={() => {
							router.push("/");
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="24px"
							viewBox="0 -960 960 960"
							width="24px"
							className="fill-black"
						>
							<path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
						</svg>
					</button>
				</span>
				<span className="flex flex-row p-2 justify-center gap-8">
					<button
						className={`p-8 border-[1px] rounded-3xl w-full text-2xl font-light text-white ${
							role != "STUDENT"
								? "border-black bg-red-500 text-2xl font-light "
								: "border-gray-100"
						} `}
						onClick={() => {
							setRole("TEACHER");
						}}
					>
						TEACHER
					</button>
					<button
						className={`p-8 border-[1px] rounded-3xl w-full text-2xl font-light text-white ${
							role == "STUDENT"
								? "border-black bg-red-500 "
								: "border-gray-100"
						} `}
						onClick={() => {
							setRole("STUDENT");
						}}
					>
						STUDENT
					</button>
				</span>
				<div className="flex flex-col p-2 h-auto bg-white border-2 rounded-2xl w-auto justify-between align-middle transition-all ease-in">
					<span className="flex justify-center align-middle text-2xl pt-2">REGISTER</span>
					<span className="h-[2rem]">{msg}</span>
					{role == "STUDENT" ? (
						<form
							action={studentRegister}
							className="flex flex-col p-8 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input name="email" type="email" className="border-2" required />
							<label htmlFor="name">NAME</label>
							<input name="name" type="text" className="border-2" required />
							<label htmlFor="course">COURSE</label>
							<select name="course" className="border-2" required>
								<option value="bscs">BSCS</option>
							</select>
							<label htmlFor="level">YEAR LEVEL</label>
							<select name="level" className="border-2" required>
								<option value="1">1st</option>
								<option value="2">2nd</option>
								<option value="3">3rd</option>
								<option value="4">4th</option>
							</select>
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
					) : (
						<form
							action={teacherRegister}
							className="flex flex-col p-8 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input name="email" type="email" className="border-2" required />
							<label htmlFor="name">NAME</label>
							<input name="name" type="text" className="border-2" required />
							<label htmlFor="course">COURSE</label>
							<input name="course" type="text" className="border-2" required />
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
					)}
				</div>
			</section>
		</main>
	);
}

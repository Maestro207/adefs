"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/globals.css";

export default function SignUp() {
	const [msg, setMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState("");
	const router = useRouter();

	const studentRegister = async (data: FormData) => {

		const response = await fetch("api/auth/register/student", {
			method: "POST",
			body: data,
		});
		const res = await response.json();
		if (res.error) {
			setMsg(JSON.stringify(res.error));
		}else{
			setMsg("Registerd Successfully")
		}
	};

	const teacherRegister = async (data: FormData) => {

		const response = await fetch("api/auth/register/teacher", {
			method: "POST",
			body: data,
		});
		const res = await response.json();
		if (res.error) {
			setMsg(JSON.stringify(res.error));
		}else{
			setMsg("Registerd Successfully")
		}
		
	};

	return (
		<main id="register" className=" h-[100vh] flex justify-center items-center">
			<section className="regCard transition-all ease-in gap-y-4 p-2 md:p-2 flex flex-col justify-stretch align-middle rounded-3xl h-auto w-[90vw] md:w-[56vw] lg:w-[40vw]">
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
						className={`p-2 border-[1px] rounded-3xl w-full text-2xl font-light text-white ${
							role != "STUDENT"
								? "border-black bg-red-500 text-2xl font-light "
								: "border-gray-100"
						} `}
						onClick={() => {
							setRole("TEACHER");
							setMsg("");
						}}
					>
						TEACHER
					</button>
					<button
						className={`p-2 border-[1px] rounded-3xl w-full text-2xl font-light text-white ${
							role == "STUDENT"
								? "border-black bg-red-500 "
								: "border-gray-100"
						} `}
						onClick={() => {
							setRole("STUDENT");
							setMsg("");
						}}
					>
						STUDENT
					</button>
				</span>
				<div className="flex flex-col p-2 md:p-2 h-auto bg-white border-2 rounded-2xl w-auto justify-between align-middle transition-all ease-in">
					<span className="flex justify-center align-middle text-3xl text-light pt-2">REGISTER</span>
					<span className="h-[1.5rem]">{msg}</span>
					<span className="h-[1.5rem]">{loading ? "Loading" : ""}</span>
					{role == "STUDENT" ? (
						<form
							action={studentRegister}
							className="flex flex-col p-2 md:p-2 justify-center"
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
							<button type="submit" className="submit" onClick={() => {setMsg("");setTimeout(() => {
								setLoading(true)
							}, 1000);}} disabled={loading}>
								Submit
							</button>
						</form>
					) : (
						<form
							action={teacherRegister}
							className="flex flex-col p-2 md:p-2 justify-center"
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
							<button type="submit" className="submit" onClick={() => {setMsg("")}} disabled={loading}>
								Submit
							</button>
						</form>
					)}
				</div>
			</section>
		</main>
	);
}

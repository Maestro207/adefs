"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "@/app/globals.css";
import Link from "next/link";

export default function SignUp() {
	const [msg, setMsg] = useState("");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState("");
	const router = useRouter();

	const studentRegister = async (data: FormData) => {
		setLoading(true);
		setMsg("Loading");
		const response = await fetch("api/auth/register/student", {
			method: "POST",
			body: data,
		});
		const res = await response.json();
		if (res.error) {
			console.log(res);
			if (res.error.status == 400) {
				setMsg("No Existing Account yet!");
			} else if (res.error.status == 403) {
				setMsg("Check your Connection");
			} else if (res.error.status == 422) {
				if (res.error.name == "AuthWeakPasswordError") {
					setMsg("Password Too Weak");
				}
				setMsg("Account already existing");
			} else {
				setMsg("An error occured");
			}
			setLoading(false);
		} else {
			setMsg("Registerd Successfully");
			setLoading(false);
		}
	};

	const teacherRegister = async (data: FormData) => {
		setLoading(true);
		setMsg("Loading");
		const response = await fetch("api/auth/register/teacher", {
			method: "POST",
			body: data,
		});
		const res = await response.json();
		if (res.error) {
			console.log(res);
			if (res.error.status == 400) {
				setMsg("No Existing Account yet!");
			} else if (res.error.status == 403) {
				setMsg("Check your Connection");
			} else if (res.error.status == 422) {
				if (res.error.name == "AuthWeakPasswordError") {
					setMsg("Password Too Weak");
				}
				setMsg("Account already existing");
			} else {
				setMsg("An error occured");
			}
			setLoading(false);
		} else {
			setMsg("Registerd Successfully");
			setLoading(false);
		}
	};

	return (
		<main id="register" className=" h-[100vh] flex justify-center items-center">
			<section className="regCard transition-all ease-in gap-y-4 p-2 md:p-6 flex flex-col justify-stretch align-middle rounded-3xl h-auto w-[98vw] md:w-[56vw] lg:w-[40vw]">
			<span className="text-white flex justify-center align-middle text-3xl text-light pt-2 my-2">
						REGISTER
					</span>
				<span className="flex flex-row p-4 justify-center gap-8">
					<button
						className={`px-2 py-4 border-[1px] rounded-lg w-full text-2xl font-normal text-white ${
							role != "STUDENT"
								? "border-black bg-red-500 text-xl font-light "
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
						className={`px-2 py-4 border-[1px] rounded-lg w-full text-2xl font-normal text-white ${
							role == "STUDENT" ? "border-black bg-red-500 " : "border-gray-100"
						} `}
						onClick={() => {
							setRole("STUDENT");
							setMsg("");
						}}
					>
						STUDENT
					</button>
				</span>
				<div className="flex flex-col p-2 md:p-2 h-auto text-white rounded-lg w-auto justify-between align-middle transition-all ease-in">
					
					{role == "STUDENT" ? (
						<form
							action={(data: FormData) => {
								setLoading(true);
								setMsg("Loading");
								studentRegister(data);
							}}
							className="flex flex-col p-2 md:p-4 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input
								name="email"
								minLength={12}
								maxLength={30}
								type="email"
								
								required
							/>
							<label htmlFor="name">NAME</label>
							<input
								name="name"
								minLength={8}
								maxLength={30}
								type="text"
								
								required
							/>
							<label htmlFor="course">COURSE</label>
							<select name="course"  required>
								<option value="bscs">BSCS</option>
							</select>
							<label htmlFor="level">YEAR LEVEL</label>
							<select name="level"  required>
								<option value="1">1st</option>
								<option value="2">2nd</option>
								<option value="3">3rd</option>
								<option value="4">4th</option>
							</select>
							<label htmlFor="password">PASSWORD</label>
							<input
								name="password"
								type="password"
								
								minLength={8}
								maxLength={30}
								required
							/>
							<button type="submit" className="submit" disabled={loading}>
								Submit
							</button>
						</form>
					) : (
						<form
							action={(data: FormData) => {
								setLoading(true);
								setMsg("Loading");
								teacherRegister(data);
							}}
							className="flex flex-col p-2 md:p-4 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input
								name="email"
								minLength={12}
								maxLength={30}
								type="email"
								
								required
							/>
							<label htmlFor="name">NAME</label>
							<input
								name="name"
								type="text"
								
								required
								minLength={8}
								maxLength={30}
							/>
							<label htmlFor="course">COURSE</label>
							<input
								name="course"
								minLength={4}
								maxLength={12}
								type="text"
								
								required
							/>
							<label htmlFor="password">PASSWORD</label>
							<input
								name="password"
								type="password"
								
								minLength={8}
								maxLength={30}
								required
							/>
							<button type="submit" className="submit" disabled={loading}>
								Submit
							</button>
							
						</form>
						
					)}
					<span
						id={`${loading ? "loading" : ""}`}
						className="flex w-full items-center justify-center h-[2rem] mt-4"
					>
						{msg == "Loading" ? (
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								className="fill-white"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						) : (
							<span className={msg == "" ? "border-2 border-none" : "p-2 bg-[#ccabab]/[0.5] text-white rounded-md border-2 border-gray-300"}>{msg}</span>
						)}
					</span>
				</div>
				<Link
					className="bg-white/[0.1] text-white rounded-lg p-2 w-auto flex justify-center"
					href={'/'}
				>
					Have an Account? Click Here to Login
				</Link>
			</section>
		</main>
	);
}

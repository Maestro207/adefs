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
			<section className="regCard transition-all ease-in gap-y-4 p-2 md:p-6 flex flex-col justify-stretch align-middle rounded-3xl h-auto w-[90vw] md:w-[56vw] lg:w-[40vw]">
				<span className="flex flex-row p-2 justify-center gap-8">
					<button
						className={`p-2 border-[1px] rounded-lg w-full text-2xl font-light text-white ${
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
						className={`p-2 border-[1px] rounded-lg w-full text-xl font-light text-white ${
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
				<div className="flex flex-col p-2 md:p-2 h-auto bg-white border-2 rounded-lg w-auto justify-between align-middle transition-all ease-in">
					<span className="flex justify-center align-middle text-3xl text-light pt-2">
						REGISTER
					</span>
					<span className="h-[1.5rem]">{msg}</span>
					{role == "STUDENT" ? (
						<form
							action={(data: FormData) => {
								setLoading(true);
								setMsg("Loading");
								studentRegister(data);
							}}
							className="flex flex-col p-2 md:p-2 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input name="email" 
							minLength={12}
							maxLength={30}
							type="email" className="border-2" required />
							<label htmlFor="name">NAME</label>
							<input name="name" 
							minLength={8}
							maxLength={30}
							type="text" className="border-2" required />
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
							className="flex flex-col p-2 md:p-2 justify-center"
						>
							<label htmlFor="email">EMAIL</label>
							<input name="email" 
							minLength={12}
							maxLength={30}
							 type="email" className="border-2" required />
							<label htmlFor="name">NAME</label>
							<input
								name="name"
								type="text"
								className="border-2"
								required
								minLength={8}
								maxLength={30}
							/>
							<label htmlFor="course">COURSE</label>
							<input name="course" 
							minLength={4}
							maxLength={12}
							type="text" className="border-2" required />
							<label htmlFor="password">PASSWORD</label>
							<input
								name="password"
								type="password"
								className="border-2"
								minLength={8}
								maxLength={30}
								required
							/>
							<button type="submit" className="submit" disabled={loading}>
								Submit
							</button>
						</form>
					)}
				</div>
				<button
					className="bg-white rounded-lg p-2 w-auto"
					onClick={() => {
						router.push("/");
					}}
				>
					Have an Account? Click Here to Login.
				</button>
			</section>
		</main>
	);
}

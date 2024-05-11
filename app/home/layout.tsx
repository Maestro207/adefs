'use client'

import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";
import "@/app/globals.css"
import { RoleProvider } from "../provider";

export default function HomeLayout({
	children,
	teacher,
	student,
	admin,
}: Readonly<{
	children: React.ReactNode;
	teacher: React.ReactNode;
	student: React.ReactNode;
	admin: React.ReactNode;
}>) {
	const supabase = createClient()
	const router = useRouter()
	const [role, setRole] = useState("")

	const userRole = useContext(RoleProvider)

	const confirmUser = useCallback(async () => {
		const response = await fetch("api/user", {
			method: "GET",
		});
		const res = await response.json();

		if(res.error){
			router.push('/')
		}else{
			setRole(res.data[0].role)
		}

	}, [supabase])

	useEffect(() => {
		confirmUser()
	}, [])
	
	return (
		<main className="bg-white">
			{role ? <Header /> : ''}
			
			<div id="backgroundPattern" className="flex flex-col items-center  w-[100vw] h-[100vh]">
			{
				role == null ? children :
				role == "teacher" ? teacher :
				role == "student" ? student :
				role == "admin" ? admin : children	
			}
			</div>
		</main>
	);
}

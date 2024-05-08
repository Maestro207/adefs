'use client'

import Header from "@/components/Header";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
		<main className="relative">
			<Header />
			<div className="dashboard absolute z-0 h-[100vh] w-[100vw] opacity-[.075]"></div>
			<div className="absolute z-10 w-[98vw] h-auto">
			{
				role == "teacher" ? teacher :
				role == "student" ? student :
				role == "admin" ? admin : children	
			}
			</div>
		</main>
	);
}

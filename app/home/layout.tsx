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
		<>
			<Header />
			<div className="flex flex-col items-center relative bg-slate-50 w-[100vw] h-[100vh] py-2 lg:p-4">
			{
				role == "teacher" ? teacher :
				role == "student" ? student :
				role == "admin" ? admin : children	
			}
			</div>
		</>
	);
}

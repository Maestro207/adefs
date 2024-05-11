"use client";

import File from "@/components/DownloadCard";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Student() {
	const supabase = createClient();
	const router = useRouter();

	const inputFileRef = useRef<HTMLInputElement>(null);
	const [downloads, setDownloads] = useState<
		| null
		| []
		| [
				{
					filename: string;
					name: string;
					url: string;
				}
		  ]
	>(null);
	const [user, setUser] = useState<{
		name: string;
		year_level: string;
		course: string;
	} | null>(null);
	const [search, setSearch] = useState("");
	const msg = useRef("");

	const getUploads = useCallback(async () => {
		const res = await (
			await fetch("/api/module/list-dls", { method: "GET" })
		).json();

		if (!res.error) {
			setDownloads(res.data);
		} else {
			setDownloads([]);
		}
	}, [supabase]);

	const getUser = useCallback(async () => {
		const res = await (await fetch("/api/user", { method: "GET" })).json();
		if (!res.error) {
			setUser(res.data[0]);
		}
	}, [supabase]);

	useEffect(() => {
		getUploads();
		getUser();
		if (!supabase.auth.getUser()) {
			router.push("/");
		}
	}, [supabase]);

	const filterSearch = (name: string) => {
		if (search == "") {
			return true;
		} else {
			return name.toLowerCase().includes(search.toLowerCase());
		}
	};

	return (
		<div
			id="backgroundPattern"
			className="w-full flex flex-col items-center absolute z-[10] p-2 lg:p-8 min-h-[100vh]"
		>
			<div className="dashboard relative z-0"></div>
			<span className="mb-4 max-w-[92%] w-[92%] h-[6em] lg:h-[10em] flex flex-col justify-center flex-wrap font-light relative border-b-[3px] border-[#222222] lg:p-4 ">
					{user == null ? (
						<span id="loading" className="flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#222222"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						</span>
					) : (
						<span className="flex flex-col justify-start py-4">
							<span className=" text-[2.5em] capitalize lg:text-[4em] font-[400] flex ">
								{user.name}
							</span>
							<span className=" text-[1em] !uppercase lg:text-[1.5em] font-[300] flex italic">
								{user.course} - {user.year_level}
							</span>
						</span>
					)}
				</span>
			<div className=" border-slate-300 rounded bg-white/[0.56] flex flex-col my-2 p-4 w-[90vw] lg:w-[90%] border-gray-500/[0.4]">
				<h1 className="text-3xl font-[600] p-2 m-2 bg-[#fafafa] text-gray-800 border-2 border-gray-300 justify-center flex rounded-lg">
					Your Modules
				</h1>

				<div className=" flex flex-wrap justify-center items-start gap-4 m-2 p-2 lg:m-8 lg:p-8 rounded-md border-2  border-gray-200">
					<span className="w-full flex flex-row content-center flex-wrap items-center justify-center align-middle my-3">
						<label htmlFor="search" className="pr-2 text-2xl">
							Search
						</label>
						<input
							name="search"
							onChange={(event) => {
								let timer;
								event.preventDefault();
								clearTimeout(timer);
								timer = setTimeout(() => {
									setSearch(event.target.value);
								}, 500);
							}}
							className="p-2 border-gray-400 border-[1px] rounded-lg w-[90%] md:w-[50vw] text-black"
						></input>
					</span>
					{downloads == null ? (
						// <span
						// 	id="loading"
						// 	className="flex w-full items-center justify-center "
						// >
						// 	<svg
						// 		xmlns="http://www.w3.org/2000/svg"
						// 		height="24px"
						// 		viewBox="0 -960 960 960"
						// 		width="24px"
						// 		fill="#222222"
						// 	>
						// 		<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
						// 	</svg>
						// </span>
						[0, 1, 2].map((n) => {
							return (
								<div
									key={n}
									className="loadingCard border-2 w-[80%] md:w-[28%] transition-all h-[6em] md:h-[10em] rounded-lg" 
								/>
							);
						})
					) : downloads.length == 0 ? (
						<div className="p-4 border-2 border-gray-200 bg-white">
							No Modules
						</div>
					) : (
						downloads
							.filter((val) => filterSearch(val.filename))
							.map((file) => {
								return (
									<File
										key={file.url}
										name={file.name}
										url={file.url}
										filename={file.filename}
									/>
								);
							})
					)}
				</div>
			</div>
		</div>
	);
}

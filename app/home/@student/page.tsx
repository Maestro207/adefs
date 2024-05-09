"use client";

import File from "@/components/DownloadCard";
import { createClient } from "@/utils/supabase/client";
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Student() {
	const supabase = createClient();

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
	const [user, setUser] = useState("");
	const [search, setSearch] = useState("");
	const msg = useRef("");

	const getUploads = useCallback(async () => {
		const res = await (
			await fetch("/api/module/list-dls", { method: "GET" })
		).json();
		console.log(res);
		if (!res.error) {
			setDownloads(res.data);
		} else {
			setDownloads([]);
		}
		console.log();
	}, [supabase]);

	const getUser = useCallback(async () => {
		const res = await (await fetch("/api/user", { method: "GET" })).json();
		if (!res.error) {
			setUser(res.data[0].name);
		}
	}, [supabase]);

	useEffect(() => {
		getUploads();
		getUser();
	}, [supabase]);

	const filterSearch = (name: string) => {
		console.log("Asd");
		if (search == "") {
			return true;
		} else {
			return name.toLowerCase().includes(search.toLowerCase());
		}
	};

	return (
		<main className="bg-slate-50 h-[100vh] p-8 ">
			<div className="dashboard relative z-0"></div>
			<span className="text-[4em] font-light block relative w-auto h-auto">
				<h1 className=" capitalize">Welcome! {user == "" ? <span
							id="loading"
							className="flex w-full items-center justify-center "
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="24px"
								viewBox="0 -960 960 960"
								width="24px"
								fill="#222222"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						</span>: user}</h1>
			</span>
			<div className="border-t-2 border-gray-400">
				<h1 className="text-3xl p-8 text-gray-800">Your Modules</h1>
				<span>
					<label htmlFor="search" className="pr-2">
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
						className="p-2 border-gray-300 border-[1px] rounded-lg"
					></input>
				</span>
				<div className="flex flex-wrap justify-center items-center gap-8 m-2 p-2 lg:m-8 lg:p-8 rounded-3xl border-2 bg-slate-100 border-gray-200">
					{downloads == null ? (
						<span
							id="loading"
							className="flex w-full items-center justify-center "
						>
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
					) : downloads.length == 0 ? (
						"No Modules"
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
		</main>
	);
}

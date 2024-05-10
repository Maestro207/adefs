"use client";

import { useState } from "react";
import "@/app/globals.css";
export default function File({
	className,
	url,
	filename,
	name,
	callback,
}: {
	className?: string;
	url: string;
	filename: string;
	name: string;
	callback: Function;
}) {
	const [loading, setLoading] = useState(false);

	return (
		<div className="bg-white p-2 lg:p-8 flex flex-col break-words wrap rounded-2xl border-[2px] max-w-[96%] md:max-w-[28%] lg:max-w-[48%] text-balance border-gray-200 hover:border-gray-800 transition-all ease duration-500">
			<span className="text-xl lg:text-3xl font-bold">
				<h1>{filename}</h1>
			</span>
			<span className=" italic">Uploaded by: {name}</span>
			<div className="flex flex-wrap justify-center align-middle items-center gap-4 mt-4">
				<a
					href={url}
					target="_blank"
					className="text-balance break-words transition-all ease-in duration-300 hover:bg-white hover:text-black border-[#00000000] border-2 hover:border-red-600 p-2 bg-red-600 text-white font-bold flex justify-center rounded-xl"
				>
					Download Module
				</a>
				<button
					disabled={loading}
					onClick={async () => {
						await callback(url, setLoading);
					}}
					className="bg-red-600 flex justify-center items-center fill-white p-2 rounded-xl text-white hover:bg-white font-bold hover:text-black hover:fill-black border-[#00000000] border-2 hover:border-red-600 duration-300"
				>
					{loading ? (
						<span id="loading">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16px"
								viewBox="0 -960 960 960"
								width="16px"
							>
								<path d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120Zm160-360q66 0 113-47t47-113v-120H320v120q0 66 47 113t113 47ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Zm320-80Zm0-640Z" />
							</svg>
						</span>
					) : (
						"Delete Module"
					)}
				</button>
			</div>
		</div>
	);
}

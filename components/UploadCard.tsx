'use client'

export default function File({
	className,
	url,
	filename,
	name,
	callback
}: {
	className?: string;
	url: string;
	filename: string;
	name: string;
	callback: Function
}) {

	return (
		<div className="bg-red-white p-8 flex flex-col wrap rounded-2xl border-[1px] border-gray-200">
			<span className="text-3xl bolder">
				<h1>{filename}</h1>
			</span>
			<span className=" italic">Uploaded by: {name}</span>
			<a
				href={url}
				target="_blank"
				className=" transition-all ease-in duration-200 hover:bg-white hover:text-black border-[#00000000] border-2 hover:border-red-500 mt-4 p-2 bg-red-500 text-white font-bold flex justify-center rounded-xl"
			>
				Download Module
			</a>
			<button onClick={()=>{callback(url)}} className="bg-red-500 mt-2 p-2 rounded-2xl text-white">Delete Module</button>
		</div>
	);
}

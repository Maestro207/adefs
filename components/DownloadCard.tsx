'use client'

export default function File({
	className,
	url,
	filename,
	name,
}: {
	className?: string;
	url: string;
	filename: string;
	name: string;
}) {
	return (
		<div className="bg-white p-8 flex flex-col break-words wrap rounded-2xl border-[1px] max-w-[90%] md:max-w-[30%] text-balance border-gray-200 hover:border-gray-800 transition-all ease">
			<span className="text-3xl bolder">
				<h1>{filename}</h1>
			</span>
			<span className=" italic">Uploaded by: {name}</span>
			<a
				href={url}
				target="_blank"
				className="text-balance break-words transition-all ease-in duration-200 hover:bg-white hover:text-black border-[#00000000] border-2 hover:border-red-500 mt-4 p-2 bg-red-500 text-white font-bold flex justify-center rounded-xl"
			>
				Download Module
			</a>
		</div>
	);
}

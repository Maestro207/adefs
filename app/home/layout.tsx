import Header from "@/components/Header";

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<Header />
            {children}
		</>
	);
}

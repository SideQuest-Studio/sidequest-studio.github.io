import Header from "@/components/shared/header";
import Hero from "@/pages/public/hero"
import About from "@/pages/public/about";
import type React from "react";
import { useEffect, useState } from "react";

export default function Public() {
	const [position, setPosition] = useState(0)

	const scrollEvent = (e: React.UIEvent<HTMLDivElement>) => {
		const root = document.getElementById("main")
		console.log("Scrolling")
		if (root) {
			console.log("Root visible")
			const height = root.scrollTop ?? 0
			const offsetHeight = root.offsetHeight
			setPosition(height / offsetHeight)
		}
	}

	useEffect(() => {
		console.log(position)
	}, [position])

	return (
		<div id="main" onScroll={scrollEvent} className="w-dvw h-dvh overflow-hidden overflow-y-auto bg-neutral-950 text-white">
			<Header position={position} />
			<Hero />
			<About />
		</div>
	)
}

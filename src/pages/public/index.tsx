import Header from "@/components/shared/header";
import Hero from "@/pages/public/hero"
import About from "@/pages/public/about";

export default function Public() {
	return (
		<div className="w-dvw h-dvh overflow-hidden overflow-y-auto bg-neutral-950 text-white">
			<Header />
			<Hero />
			<About />
		</div>
	)
}

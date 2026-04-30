/*
 * TODO: Use this index as the base template for web pages
 */

import Header from "@/components/shared/header";
import Hero from "./hero";

export default function Index() {
	return (
		<div className="h-dvh w-dvw overflow-hidden overflow-y-auto bg-neutral-900 text-white overflow-y-auto">
			<Header />
			<Hero />
			<Hero />
		</div>
	)
}

import { FaArrowRight } from "react-icons/fa"
import Logo from "@/assets/logo.png"

export default function Header() {
	return (
		<div className="flex justify-start items-center w-full h-[calc(5%+1rem)] sticky top-0 left-0 right-0 p-1 bg-red-200 gap-2">
			<img className="h-full aspect-square" src={Logo} alt="Logo" />
			<FaArrowRight className="aspect-square" />
			<span>About</span>
		</div>
	)
}

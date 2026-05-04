import Logo from "@/assets/logo.png"
import { useState } from "react"
import { TiInfoLarge, TiUser } from "react-icons/ti"

interface headerProps {
	position: number
}

const headers = [
	"about", "projects"
]

export default function Header(props: headerProps) {
	const [position, setPosition] = useState(1)

	return (
		<div className="flex justify-between items-center w-full h-[calc(5%+1rem)] sticky top-2 md:top-0 left-0 right-0 p-1 px-5 gap-2">
			<div className="flex h-full gap-2 items-center md:w-[calc(20%-1rem)]">
				<img className="h-full aspect-square" src={Logo} alt="Logo" />
				<span className="hidden md:inline text-[1.5rem]">SideQuest</span>
			</div>
			<div className="flex items-center justify-center bg-neutral-800/75 text-neutral-100 shadow-md shadow-neutral-900 backdrop-blur-xs gap-3 p-2 px-5 rounded-full">
				{headers.map((head: string, i: number) => {
					return <span>{props.position > (i + 0.5) && props.position < (i + 1.5) ? <span>{head}</span> : <span>{head[0].toUpperCase()}</span>}</span>
				})}
			</div>
			<div className="flex items-center justify-end w-[calc(20%-1rem)]">
				<span>Get Started</span>
			</div>
		</div>
	)
}

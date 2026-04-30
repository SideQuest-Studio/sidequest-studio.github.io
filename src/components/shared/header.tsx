import { TiInfoLarge, TiContacts, TiUser } from "react-icons/ti"
import Logo from "@/assets/logo.png"

export default function Header() {
	return (
		<div className="flex justify-between items-center w-full h-[calc(5%+1rem)] sticky top-2 md:top-0 left-0 right-0 p-1 px-5 gap-2">
			<div className="flex h-full gap-2 items-center md:w-[calc(20%-1rem)]">
				<img className="h-full aspect-square" src={Logo} alt="Logo" />
				<span className="hidden md:inline text-[1.5rem]">SideQuest</span>
			</div>
			<div className="flex items-center justify-center bg-neutral-800/75 text-neutral-100 shadow-md shadow-neutral-900 backdrop-blur-xs gap-2 p-2 rounded-full">
				<TiInfoLarge />
				<TiUser />
			</div>
			<div className="flex items-center justify-end w-[calc(20%-1rem)]">
				<span>Start</span>
			</div>
		</div>
	)
}

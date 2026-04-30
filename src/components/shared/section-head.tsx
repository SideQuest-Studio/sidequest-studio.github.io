interface section_head {
	children: string
}

export default function SectionHead(props: section_head) {
	return (
		<div className="flex items-center gap-2">
			<span className="bg-white w-[5rem] md:w-[10rem] p-px"></span>
			<span className="text-[1.5rem] md:text-[3rem] font-serif">{props.children}</span>
			<span className="bg-white w-[5rem] md:w-[10rem] p-px"></span>
		</div>
	)
}

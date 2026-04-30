import SectionHead from "@/components/shared/section-head";

const dev = [
	{
		"name": "Abdul Barry Adam",
		"profile": "a",
		"roles": [
			"front-end",
			"back-end",
			"full-stack"
		]
	},
	{
		"name": "Kurt Cyrus Atoat",
		"profile": "a",
		"roles": [
			"front-end",
			"back-end",
			"full-stack",
			"graphic design"
		]
	},
	{
		"name": "James Patrick De Mesa",
		"profile": "a",
		"roles": [
			"front-end",
			"back-end",
			"full-stack"
		]
	},
	{
		"name": "Ryann Kim Sesgundo",
		"profile": "a",
		"roles": [
			"web front-end",
			"back-end",
			"mobile front-end",
			"full-stack",
			"automation"
		]
	},
	{
		"name": "Steven Maraig",
		"profile": "a",
		"roles": [
			"front-end",
			"back-end",
			"negotiator"
		]
	}
]

export default function About() {
	return (
		<div className="flex flex-col justify-start items-center text-center w-full h-[calc(95%-1rem)]">
			<SectionHead>Our Team</SectionHead>
			<div className="flex flex-row flex-wrap w-full h-full p-2">
				{dev.map(d => {
					return (
						<div className="flex flex-col w-full md:w-[calc(33.333%-1rem)] h-[calc(5%-1rem)] gap-2">
							<div className="flex gap-2">
								<img className="aspect-square border border-white border-solid h-[3rem]" src="" alt={d.profile} />
								<div className="flex flex-col items-start">
									<span>{d.name}</span>
									<div className="flex flex-wrap gap-1">
										{d.roles.map(role => {
											return (
												<span className="px-3 bg-neutral-800 rounded-full">{role}</span>
											)
										})}
									</div>
								</div>
							</div>
						</div>
					)
				})}
			</div>
		</div >
	)
}

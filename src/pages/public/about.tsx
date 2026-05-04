import SectionHead from "@/components/shared/section-head";

const dev = [
	{
		"name": "Abdul Barry Adam",
		"profile": "a",
		"position": "co-founder",
		"roles": [
			"front-end",
			"back-end",
			"full-stack"
		]
	},
	{
		"name": "Kurt Cyrus Atoat",
		"profile": "a",
		"position": "founder",
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
		"position": "co-founder",
		"roles": [
			"front-end",
			"back-end",
			"full-stack"
		]
	},
	{
		"name": "Ryann Kim Sesgundo",
		"profile": "a",
		"position": "co-founder",
		"roles": [
			"web front-end",
			"back-end",
			"mobile front-end",
			"full-stack",
			"automation"
		],
		"portfolio": "ryannkim327.is-a.dev"
	},
	{
		"name": "Steven Maraig",
		"profile": "a",
		"position": "co-founder",
		"roles": [
			"front-end",
			"back-end",
			"negotiator"
		]
	}
]

export default function About() {
	return (
		<div id="about" className="flex flex-col justify-start items-center text-center w-full h-[calc(95%-1rem)]">
			<SectionHead>Our Team</SectionHead>
			<div className="flex flex-row flex-wrap flex-1 w-full p-2 gap-2 items-start">
				{dev.map(d => {
					return (
						<div className="flex flex-col w-full md:w-[calc(33.333%-1rem)] h-[calc(33.333%-1rem)] gap-2 bg-neutral-900 rounded">
							<div className="flex gap-2 p-2 items-center">
								<img className="aspect-square border border-white border-solid h-[3rem]" src="" alt={d.profile} />
								<div className="flex flex-col items-start">
									<span>{d.name} <span className="text-[0.75rem] italic font-serif font-bold">[{d.position}]</span></span>
									<div className="flex flex-wrap gap-1">
										{d.roles.map(role => {
											return (
												<span className="px-3 bg-neutral-800 rounded-full text-[0.7rem]">{role}</span>
											)
										})}
									</div>
								</div>
							</div>
							{d.portfolio ? <span onClick={() => {
								location.href = d.portfolio.startsWith("https://") ? d.portfolio : `https://${d.portfolio}`
							}}>Visit Portfolio</span> : null}
						</div>
					)
				})}
			</div>
		</div >
	)
}

interface Props {
	url: string;
}

export default function LoomVideo(props: Props) {
	return (
		<div className="aspect-video w-[559px] h-[351px] mx-auto">
			<iframe
				className="w-full h-full border-2 rounded-md border-zinc-300"
				src={props.url}
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
}

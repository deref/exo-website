import Head from "next/head";
import { useEffect, useState } from "react";

import LightSvgGUI from "~/public/svg/V2-Light.svg";
import DarkSvgGUI from "~/public/svg/V2-Dark.svg";

export default function Home() {
	const [title, setTitle] = useState("exo");

	useEffect(() => {
		const titleBlinker = setInterval(() => {
			if (title === "exo") {
				setTitle("exo_");
			} else {
				setTitle("exo");
			}
		}, 500);

		return () => {
			clearInterval(titleBlinker);
		};
	}, [title]);

	const description = "Process manager & log viewer for dev";

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta content="dark light" name="color-scheme" />
				<link rel="icon" href="/deref-rounded-icon.png" />
			</Head>

			<h1>{title}</h1>
			<p>{description}</p>

			<br />

			<div className="svg-wrapper">
				<div className="light-only">
					<LightSvgGUI />
				</div>
				<div className="dark-only">
					<DarkSvgGUI />
				</div>
			</div>

			<br />

			<h3>Install</h3>
			<pre>{`curl -sL https://exo.deref.io/install | sh`}</pre>
			<p>
				Prefer manual installation? See{" "}
				<a href="https://github.com/deref/exo/blob/main/doc/install.md">
					install.md
				</a>
			</p>

			<hr />

			<h3>Getting started</h3>
			<p>
				Add exo to your <code>PATH</code>:
			</p>
			<pre>{`export PATH="$PATH:$HOME/.exo/bin"`}</pre>
			<p>
				To make this change permanent, add the <code>export</code> line to your
				shell&apos;s initialization script.
			</p>
			<p>For example, the following will add `exo` to the path for Bash:</p>
			<pre>{`echo 'export PATH="$PATH:$HOME/.exo/bin"' >> ~/.bashrc`}</pre>
			<p>
				Run <code>exo gui</code> in your project directory.
			</p>

			<hr />

			<p>
				<a href="https://github.com/deref/exo">GitHub repository</a>
			</p>

			<br />

			<p>Copyright 2021 Deref Inc. &nbsp; All rights reserved.</p>
		</div>
	);
}

import Head from "next/head";

import SvgGUI from "~/public/svg/dark-exo.svg";

export default function Home() {
	return (
		<div>
			<Head>
				<title>exo</title>
				<meta
					name="description"
					content={`A process manager & log viewer for dev`}
				/>
				<meta content="dark light" name="color-scheme" />
				<link rel="icon" href="/deref-rounded-icon.png" />
			</Head>

			<h1>exo</h1>
			<p>{`Process manager & log viewer for dev`}</p>

			<br />

			<div className="svg-wrapper">
				<SvgGUI />
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
				To make this change permanent, add the <code>export</code> line to your shell's initialization script.
				For example, the following will add `exo` to the path for Bash:
			</p>
			<pre>{`echo 'export PATH="$PATH:$HOME/.exo/bin"' >> ~/.bashrc`}</pre>
			<p>
				Run <code>exo gui</code> in your project directory.
			</p>

			<hr />

			<p>
				<a href="https://github.com/deref/exo">Github repository</a>
			</p>

			<br />

			<p>Copyright 2021 Deref Inc. &nbsp; All rights reserved.</p>
		</div>
	);
}

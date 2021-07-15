import Head from "next/head";

export default function Home() {
	return (
		<div>
			<Head>
				<title>Exo</title>
				<meta
					name="description"
					content="Dev Environment Process Manager & Log Viewer"
				/>
				<meta content="dark light" name="color-scheme" />
				<link rel="icon" href="/deref-rounded-icon.png" />
			</Head>

			<h1>Exo</h1>
			<p>Dev Environment Process Manager &amp; Log Viewer</p>

			<br />

			<h3>Install</h3>
			<pre>{`$ /bin/bash -c "$(curl -fsSL https://exo.deref.io/install.sh)"`}</pre>

			<hr />

			<h3>Getting started</h3>
			<p>
				Run <code>exo gui</code> in your project directory
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

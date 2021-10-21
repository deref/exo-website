import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

import css from "~/styles/v2.module.scss";

import SupportedOSes from "~/com/SupportedOSes.svg";

import Moon from "~/com/Moon.svg";
import Sun from "~/com/Sun.svg";
import GitHub from "~/com/GitHub.svg";
import Download from "~/com/Download.svg";

const urls = {
	docs: "https://docs.deref.io/exo",
	github: "https://github.com/deref/exo",
	download: "https://github.com/deref/exo#getting-started",
	license: "https://github.com/deref/exo/blob/main/LICENSE",
	privacy: "/",
};

export default function Home() {
	const [title, setTitle] = useState("exo");
	const [dark, setDark] = useState(false);
	const [lsTheme, setLsTheme] = useState<string | null>(null);

	const lsThemeKey = "io.deref.exo/theme";

	const effectiveTheme = () => {
		if (lsTheme === "Light" || (lsTheme === "Auto" && !dark)) {
			return "Light";
		}
		return "Dark";
	};

	const toggleTheme = () => {
		if (effectiveTheme() === "Light") {
			setLsTheme("Dark");
			window.localStorage.setItem(lsThemeKey, "Dark");
		} else {
			setLsTheme("Light");
			window.localStorage.setItem(lsThemeKey, "Light");
		}
	};

	useEffect(() => {
		const ls = window.localStorage.getItem(lsThemeKey);

		setLsTheme(ls);

		if (ls === null) {
			window.localStorage.setItem(lsThemeKey, "Auto");
		}

		const titleBlinker = setInterval(() => {
			if (title === "exo") {
				setTitle("exo_");
			} else {
				setTitle("exo");
			}
		}, 500);

		const mqList = window.matchMedia("(prefers-color-scheme: dark)");

		setDark(mqList.matches);

		const handleThemeChange = (e: MediaQueryListEvent) => {
			setDark(e.matches);
		};

		mqList.addEventListener("change", handleThemeChange);

		return () => {
			clearInterval(titleBlinker);
		};
	}, [title, lsTheme]);

	const description = "Process manager & log viewer for dev.";

	return (
		<main className={[css.Main, css[effectiveTheme()]].join(" ")}>
			<Head>
				<title>exo</title>
				<meta name="description" content={description} />
				<meta content="dark light" name="color-scheme" />
				<link rel="icon" href="/deref-rounded-icon.png" />
			</Head>

			<header className={css.Header}>
				<div className={css.Clip}>
					<Link href="/">
						<a>
							<div className={css.Logo}>
								<div />
								exo
							</div>
						</a>
					</Link>
					<div className={css.Links}>
						<Link href={urls.docs}>
							<a>Docs</a>
						</Link>
						<Link href={urls.github}>
							<a className={css.GitHubLink}>
								<GitHub />
								GitHub
							</a>
						</Link>
						<button className={css.ThemeButton} onClick={toggleTheme}>
							{effectiveTheme() === "Light" ? <Moon /> : <Sun />}
						</button>
					</div>
				</div>
			</header>

			<div className={css.Clip}>
				<div className={css.Columns}>
					<article className={css.ScrollContent}>
						<section>
							<div>
								<h1>
									Meet <b>{title}</b>
								</h1>

								<p>{description}</p>
								<p>Compatible with Procfiles and Docker Compose.</p>

								<Link href={urls.download}>
									<a className={css.GsButton}>
										<Download />
										<span>Get started with exo</span>
									</a>
								</Link>

								<div className={css.OSList}>
									<p>Available on MacOS, Linux, and WSL.</p>

									<SupportedOSes />
								</div>
							</div>
						</section>

						<section>
							<div>
								<h2>Install now.</h2>
								<pre>
									<span className={css.Yellow}>{`curl`}</span>
									<span className={css.Blue}>{` -sL `}</span>
									<span>{`https://exo.deref.io/install `}</span>
									<span className={css.Blue}>{`|`}</span>
									<span className={css.Yellow}>{` bash`}</span>
								</pre>
								<p>
									Prefer manual installation? See{" "}
									<a href="https://docs.deref.io/exo/using-exo/install">
										install docs
									</a>
									.
								</p>
								<p>
									Easy to uninstall too:{" "}
									<a href="https://docs.deref.io/exo/using-exo/uninstall">
										uninstall docs
									</a>
									.
								</p>
							</div>
						</section>
					</article>

					<aside className={css.VideoWrapper}>
						<div className={css.PngWrapper}>
							<div className={css.PngScreenshot} />
						</div>
					</aside>
				</div>
			</div>
			<footer className={css.Footer}>
				<div className={css.Clip}>
					<p>Copyright {new Date().getFullYear()} Deref Inc.</p>
					<Link href={urls.license}>
						<a>License</a>
					</Link>
					<Link href={urls.privacy}>
						<a>Privacy Policy</a>
					</Link>
				</div>
			</footer>
		</main>
	);
}

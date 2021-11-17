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

function AutoScrollSection({ children }: any) {
	return (
		<section
			onFocus={(e) =>
				window.scrollTo(
					0,
					e.currentTarget.offsetTop +
						e.currentTarget.offsetHeight / 2 -
						window.outerHeight / 2
				)
			}
		>
			{children}
		</section>
	);
}

export default function Home() {
	const [title, setTitle] = useState("exo");
	const [dark, setDark] = useState(false);
	const [lsTheme, setLsTheme] = useState<string | null>(null);
	const [scrollY, setScrollY] = useState(0);

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

		document.addEventListener("scroll", (e) => {
			setScrollY(
				Math.min(
					Math.max(
						Math.round(
							(100 * window.scrollY) /
								(document.body.scrollHeight - window.innerHeight)
						),
						0
					),
					100
				)
			);
		});

		return () => {
			clearInterval(titleBlinker);
		};
	}, [title, lsTheme]);

	const description = "Process manager & log viewer for dev.";

	return (
		<main className={[css.Main, css[effectiveTheme()]].join(" ")}>
			<Head>
				<title>exo | {description}</title>
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
						<AutoScrollSection>
							<div>
								<h1>
									Meet <b>{title}</b>
								</h1>

								<p>{description}</p>
								<p>Compatible with Procfiles and Docker Compose.</p>

								<Link href={urls.download}>
									<a className={css.GsButtonLarge}>
										<Download />
										<span>Get started with exo</span>
									</a>
								</Link>

								<div className={css.OSList}>
									<p>Available on MacOS, Linux, and WSL.</p>

									<SupportedOSes />
								</div>
							</div>
						</AutoScrollSection>

						<AutoScrollSection>
							<div>
								<h2>Log viewer</h2>

								<p>
									View logs from multiple development processes in a unified
									stream.
								</p>

								<p>Toggle visibility and filter logs.</p>

								<Link href={urls.download}>
									<a className={css.GsButton}>
										<Download />
										<span>Try it out now</span>
									</a>
								</Link>
							</div>
						</AutoScrollSection>

						<AutoScrollSection>
							<div>
								<h2>Process orchestration</h2>

								<p>Interactive process control:</p>

								<p>Start, stop, &amp; restart services.</p>

								<p>
									Unified management of local processes and Docker containers.
								</p>

								<Link href={urls.download}>
									<a className={css.GsButton}>
										<Download />
										<span>See it in action</span>
									</a>
								</Link>
							</div>
						</AutoScrollSection>

						<AutoScrollSection>
							<div>
								<h2>Secret management</h2>

								<p>Share API keys and credentials with your team.</p>

								<p>Automatically injects environment variables.</p>

								<Link href={urls.download}>
									<a className={css.GsButton}>
										<Download />
										<span>Download now</span>
									</a>
								</Link>
							</div>
						</AutoScrollSection>

						<AutoScrollSection>
							<div>
								<h2>Command Line Interface</h2>

								<p>Prefer the terminal?</p>

								<p>
									Full support for all operations in both the terminal and web
									UI. Powerful automation &amp; scripting support.
								</p>

								<Link href={urls.download}>
									<a className={css.GsButton}>
										<Download />
										<span>Get started</span>
									</a>
								</Link>
							</div>
						</AutoScrollSection>

						<AutoScrollSection>
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
									Packages and manual installation options also available: See{" "}
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
						</AutoScrollSection>
					</article>

					<aside className={css.VideoWrapper}>
						<div className={css.PngWrapper}>
							<div className={css.PngScreenshot} />
							<div className={css.ProgressBar}>
								<div style={{ width: scrollY + "%" }} />
							</div>
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

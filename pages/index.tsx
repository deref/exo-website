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
        <title>exo</title>
        <meta name="description" content={description} />
        <meta content="dark light" name="color-scheme" />
        <link rel="icon" href="/deref-rounded-icon.png" />
      </Head>

      <h1>{title}</h1>
      <p>{description}</p>
      <p>
        <small>Compatible with Procfiles and Docker Compose</small>
      </p>

      <br />

      <div className="svg-wrapper">
        <div className="png-screenshot" />
        {/* <div className="light-only">
					<LightSvgGUI />
				</div>
				<div className="dark-only">
					<DarkSvgGUI />
				</div> */}
      </div>

      <br />

      <h3>Install</h3>
      <pre>
        <span className="yellow-text">{`curl`}</span>
        <span className="blue-text">{` -sL `}</span>
        <span>{`https://exo.deref.io/install `}</span>
        <span className="blue-text">{`|`}</span>
        <span className="yellow-text">{` sh`}</span>
      </pre>
      <p>
        Prefer manual installation? See{" "}
        <a href="https://github.com/deref/exo/blob/main/doc/install.md">
          install.md
        </a>
      </p>
      <p>
        Easy to uninstall too:{" "}
        <a href="https://github.com/deref/exo/blob/main/doc/uninstall.md">
          uninstall.md
        </a>
      </p>

      <hr />

      <h3>Getting started</h3>
      <p>
        Add exo to your <code>PATH</code>:
      </p>
      <pre>
        <span className="yellow-text">{`export`}</span>
        <span>{` PATH`}</span>
        <span className="blue-text">{`=`}</span>
        <span className="orange-text">{`"$PATH:$HOME/.exo/bin"`}</span>
      </pre>
      <p>
        To make this change permanent, add the <code>export</code> line to your
        shell&apos;s initialization script.
      </p>
      <p>For example, the following will add `exo` to the path for Bash:</p>
      <pre>
        <span className="yellow-text">{`echo`}</span>
        <span className="orange-text">{` 'export`}</span>
        <span>{` PATH`}</span>
        <span className="blue-text">{`=`}</span>
        <span className="orange-text">{`"$PATH:$HOME/.exo/bin"'`}</span>
        <span className="blue-text">{` >> `}</span>
        <span>{`~/.bashrc`}</span>
      </pre>
      <p>Once installed, the easiest way to get going is to launch the GUI:</p>
      <pre>
        <span className="yellow-text">{`exo`}</span>
        <span>{` gui`}</span>
      </pre>
      <p>
        If you want to use exo as a drop-in replacement for Foreman or Docker
        Compose, use <code>exo run</code> instead:
      </p>
      <pre>
        <span className="yellow-text">{`exo`}</span>
        <span>{` run`}</span>
      </pre>
      <p>
        For more, see{" "}
        <a href="https://github.com/deref/exo/blob/main/doc/guide.md">
          the guide
        </a>
        .
      </p>

      <br />

      <hr />

      <p style={{ textAlign: "center" }}>
        Support Exo by starring our{" "}
        <a href="https://github.com/deref/exo">GitHub repository</a>. &nbsp;
        Thank you &nbsp;
        {":)"}
      </p>

      <hr />

      <br />

      <p>Copyright 2021 Deref Inc. &nbsp; All rights reserved.</p>
    </div>
  );
}

import Head from "next/head";

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

      <h3>Install</h3>
      <pre>{`$ curl -sL https://download-page.deref.workers.dev/install.sh | sh`}</pre>

      <hr />

      <h3>Getting started</h3>
      <p>
        Add exo to your <code>PATH</code>:
      </p>
      <pre>{`$ export PATH="$PATH:$HOME/.exo/bin"`}</pre>
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
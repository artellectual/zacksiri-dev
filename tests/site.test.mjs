import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const dist = new URL("../dist/", import.meta.url);
const read = file => readFile(new URL(file, dist), "utf8");
const publishedPosts = [
  "data-visualization-for-machine-learning-in-elixir",
  "how-i-build-with-llms",
  "i-built-a-home-server",
  "learning-machine-learning-in-elixir",
  "llms-a-ghost-in-the-machine",
  "self-provisioning-ecto-based-application",
  "the-intelligent-balance",
  "why-i-created-pakman",
  "work-distribution-with-jump-consistent-hash",
];

test("published post URLs and canonical links survive the content migration", async () => {
  const rss = await read("rss.xml");
  const sitemap = await read("sitemap-0.xml");
  for (const id of publishedPosts) {
    const html = await read(`posts/${id}/index.html`);
    const url = `https://zacksiri.dev/posts/${id}/`;
    assert.ok(html.includes(url), `Missing canonical URL for ${id}`);
    assert.ok(html.includes("<h1"), `Missing post heading for ${id}`);
    assert.ok(rss.includes(url), `Missing RSS entry for ${id}`);
    assert.ok(sitemap.includes(url), `Missing sitemap entry for ${id}`);
  }
});

test("static pages never link to a missing collection slug", async () => {
  const files = await readdir(dist, { recursive: true });
  for (const file of files.filter(file => file.endsWith(".html"))) {
    const html = await read(file.split(path.sep).join("/"));
    assert.doesNotMatch(html, /\/posts\/(?:undefined|null)\//, file);
  }
});

test("the two removed YouTube embeds stay out of the published posts", async () => {
  for (const id of ["how-i-build-with-llms", "llms-a-ghost-in-the-machine"]) {
    const html = await read(`posts/${id}/index.html`);
    assert.doesNotMatch(html, /youtube(?:-nocookie)?\.com\/embed\//i, id);
    assert.doesNotMatch(html, /By the end of this video/, id);
  }
});

test("site and post social images are valid, full-size PNGs", async () => {
  const postImages = (await readdir(new URL("posts/", dist))).filter(file =>
    file.endsWith(".png")
  );
  assert.ok(postImages.length >= publishedPosts.length);
  for (const file of ["og.png", ...postImages.map(file => `posts/${file}`)]) {
    const png = await readFile(new URL(file, dist));
    assert.deepEqual(
      png.subarray(0, 8),
      Buffer.from("89504e470d0a1a0a", "hex"),
      file
    );
    assert.ok(png.readUInt32BE(16) >= 1200, `${file}: width`);
    assert.ok(png.readUInt32BE(20) >= 630, `${file}: height`);
  }
});

test("the Cloudflare redirects and custom 404 are included in the build", async () => {
  const redirects = await read("_redirects");
  for (const suffix of ["", "/"]) {
    assert.ok(
      redirects.includes(
        `/posts/work-distribution-with-jump-consistent-hashing${suffix} /posts/work-distribution-with-jump-consistent-hash/ 301`
      )
    );
  }
  assert.match(await read("404.html"), /Page Not Found/);
});

test("Tailwind directives are compiled and code highlighting is retained", async () => {
  const cssFiles = (await readdir(new URL("_astro/", dist))).filter(file =>
    file.endsWith(".css")
  );
  assert.ok(cssFiles.length > 0);
  for (const file of cssFiles) {
    assert.doesNotMatch(await read(`_astro/${file}`), /@(?:tailwind|apply)\s/);
  }
  assert.match(
    await read("posts/how-i-build-with-llms/index.html"),
    /astro-code/
  );
});

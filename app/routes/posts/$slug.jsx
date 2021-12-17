import parseFrontMatter from "front-matter";
import fs from "fs/promises";
import { marked } from "marked";
import path from "path";
import { useLoaderData } from "remix";

async function getPost(slug) {
  const postsPath = path.join(__dirname, "../", "posts");
  const filepath = path.join(postsPath, slug + ".md");
  const file = await fs.readFile(filepath);
  const { attributes, body } = parseFrontMatter(file.toString());
  const html = marked(body);
  return { slug, html, title: attributes.title };
}

export const loader = async ({ params }) => {
  return getPost(params.slug);
};

export default function PostSlug() {
  const post = useLoaderData();
  return <div dangerouslySetInnerHTML={{ __html: post.html }} />;
}

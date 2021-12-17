import parseFrontMatter from "front-matter";
import { marked } from "marked";
import fs from "fs/promises";
import path from "path";
import { Link, useLoaderData } from "remix";

export const loader = async () => {
  const postsPath = path.join(__dirname, "../", "posts");
  const dir = await fs.readdir(postsPath);
  return Promise.all(
    dir.map(async (filename) => {
      const file = await fs.readFile(path.join(postsPath, filename));
      const { attributes, body } = parseFrontMatter(file.toString());
      const html = marked(body);

      return {
        slug: filename.replace(/\.md$/, ""),
        html,
        title: attributes.title,
      };
    })
  );
};

export default function Posts() {
  const posts = useLoaderData();
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={post.slug}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

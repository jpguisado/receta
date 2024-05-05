import { db } from "~/server/db";

export default async function HomePage() {
  
  const posts = await db.query.posts.findMany();
  
  return (
    <div>Hello World from HomPage</div>
  );
}

import { getPosts } from "@/graphql/getPosts";
import Modal from "./components/modal";


export default async function Marcus() {
  const posts = await getPosts();
  return (
    <>
      <Modal />
      <h1 className="text-3xl text-red-800 uppercase">Hello, this is Marcus</h1>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}

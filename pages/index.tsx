import { ReactElement } from "react";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div>
      <div>Home</div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout title="Cloned Spotify">{page}</Layout>;
};

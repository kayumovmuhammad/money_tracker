import Layout from "./Layout";
import Dashboard from "./Dashboard";

export default function Home() {
  return <Layout>
    {{ element: Dashboard }}
  </Layout>;
}

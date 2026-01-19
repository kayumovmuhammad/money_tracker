import useAuth from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <h1>Home</h1>
    </>
  );
}

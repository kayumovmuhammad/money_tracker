import ProfileButton from "./ProfileButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-card border-b border-border px-(--header-padding-x-mobile) py-(--header-padding-y-mobile) md:px-(--header-padding-x) md:py-(--header-padding-y)">
      <h1 className="text-[1.2rem] font-extrabold">Overview</h1>
      <ProfileButton></ProfileButton>
    </header>
  );
}

import SideBar from "@/components/SideBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SideBar>
      <div>{children}</div>
    </SideBar>
  );
}

import HeaderBar from "../HeaderBar";
import SideBar from "../SideBar";

import dynamic from "next/dynamic";
const TaskView = dynamic(import("../TaskView"));

export default function AppLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="grid grid-cols-app-layout grid-rows-app-layout h-screen gap-4">
      <div className="col-start-2 row-start-1 w-full justify-self-center self-center">
        <HeaderBar title={title} />
      </div>

      <div className="max-w-sidebar row-start-2 col-start-1 w-full justify-self-end">
        <SideBar />
      </div>

      <div className="row-start-2 col-start-2 w-full justify-self-center">
        {children}
      </div>
    </main>
  );
}

import { Outlet } from "react-router-dom";
import Header from "./components/navigation/Header";

export default function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}

import { Outlet } from "react-router";
import Navbar from "../ui/navbar";

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

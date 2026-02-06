import { Outlet } from "react-router";
import Navbar from "../ui/navbar";
import Footer from "../ui/footer";

export default function GuestLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
}

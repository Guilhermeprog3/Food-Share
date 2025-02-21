"use client";

import { redirect } from "next/navigation";
import logo from "../../assets/images/Logo.png";
import { Button } from "../ui/button";

import Cookies from "js-cookie";

const Navbar_Private = () => {

  const handleLogout = () => {
    Cookies.remove("JWT");
    redirect("/");
  };
  const handlealiments = () => {
    redirect("/listfood")
  }

  const handledashboard = () => {
    redirect("/dashboard")
  }

  return (
    <div className="bg-card h-13 border-b-[0.5px] border-slate-50 p-3">
      <div className="flex content-center gap-60 justify-between">
        <div className="flex justify-start items-center">
          <button onClick={handledashboard}>
            <img src={logo.src} alt="Food_share-Logo" className="h-[40px]" />
          </button>
          <h1 className="ml-8 text-3xl">FoodsShare</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button onClick={handlealiments} className="rounded-xl">Alimentos</Button>
          <Button className="rounded-xl">Agendamentos</Button>
          <Button className="rounded-xl" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar_Private;

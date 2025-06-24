"use client";

import Link from "next/link";
import Button from "../Button/Button";
import Image from "next/image";
import { useContext, useState } from "react";
import { ThemeContext } from "../ThemeController/ThemeController";
import useWindowWidth from "@/hooks/useWindowWidth";
import { AppContext } from "../ThemeController/AppController";

export default function Navbar() {
  const themeContext = useContext(ThemeContext);
  const appContext = useContext(AppContext);

  const innerWidth = useWindowWidth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const items = [
    { href: "", label: "Início" },
    { href: "", label: "Serviços" },
    { href: "", label: "Como Funciona" },
    { href: "", label: "Contato" },
  ];

  const handleToggle = () => {
    themeContext?.toggleDarkMode();
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const Menu = () => {
    return (
      <ul
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } fixed flex-col md:flex-row top-16 bottom-0 right-0 md:top-0 z-100  bg-background md:flex items-center md:justify-between h-full md:relative min-w-screen md:min-w-3/5`}
      >
        {items.map((item, i) => (
          <Link
            onClick={() => {
              setIsMenuOpen(false);
            }}
            key={i}
            href={item.href}
          >
            <li className="h-24 grid items-center">{item.label}</li>
          </Link>
        ))}
        <Button
          label="Faça um Orçamento"
          className="bg-primary p-2 px-10 rounded-[30px]"
        />

        <div className="mt-10 md:mt-0 grid items-center">
          <span className="text-center">Detalhes</span>
          <div
            className="w-10 h-5 mx-auto flex items-center border border-foreground rounded-full"
            onClick={() => appContext?.setFancy(!appContext.fancy)}
          >
            <div
              className={`toggle h-5 w-5 mx-full bg-foreground rounded-full ${
                appContext?.fancy ? "active" : ""
              }`}
            ></div>
          </div>
        </div>
      </ul>
    );
  };

  return (
    <>
      {innerWidth <= 800 && <Menu />}
      <nav className="bg-background z-1000 top-0 fixed w-[100vw] h-16 text-sm">
        <div className="container p-2 md:p-0 mx-auto flex items-center justify-between h-full">
          <Link href={"/"}>
            <Image
              src={"/dynamouslogo.png"}
              alt="logo"
              width={180}
              height={80}
            />
          </Link>
          <div onClick={handleToggle}>
            <div className="w-10 h-5 flex items-center border border-foreground rounded-full">
              <div
                className={`toggle h-5 w-5 mx-full bg-foreground rounded-full ${
                  themeContext?.darkmode ? "active" : ""
                }`}
              ></div>
            </div>
          </div>
          {innerWidth > 800 && <Menu />}
          <div
            onClick={handleMenuToggle}
            className="md:hidden h-full flex flex-col gap-2 justify-center"
          >
            {isMenuOpen ? (
              <div className="relative w-8 h-8">
                <div className="absolute top-0 left-0 right-0 bg-foreground w-1 h-8 rotate-45"></div>
                <div className="absolute top-0 left-0 right-0 bg-foreground w-1 h-8 -rotate-45"></div>
              </div>
            ) : (
              <>
                <div className="h-1 bg-foreground w-8"></div>
                <div className="h-1 bg-foreground w-8"></div>
                <div className="h-1 bg-foreground w-8"></div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

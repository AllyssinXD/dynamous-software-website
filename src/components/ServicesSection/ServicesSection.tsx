"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import style from "./serviceSection.module.css";
import SimpleSectionRoot from "../Basics/SimpleSectionRoot";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useWindowWidth from "@/hooks/useWindowWidth";
import Carrosel from "../Basics/Carrosel";
interface ServiceCard {
  label: string;
  link: string;
  backgroundImg: string;
}

function ServicesSection() {
  const innerWidth = useWindowWidth();

  const services: ServiceCard[] = [
    {
      label: "Web-Design",
      link: "/criacao-de-sites-inteligentes",
      backgroundImg: "/webdesign-service-image.png",
    },
    {
      label: "Criação de sites inteligentes",
      link: "/criacao-de-sites-inteligentes",
      backgroundImg: "/websites-creation-service.png",
    },
    {
      label: "Criação de Webapps",
      link: "/criacao-de-webapps",
      backgroundImg: "/webapp-service-image.png",
    },
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".service-section", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".service-section",
        start: "top 700px",
        end: "bottom 300px",
        scrub: true,
      },
    });
    services.forEach((_, i) => {
      gsap.fromTo(
        "." + style[`item-${i}`] + "-div",
        {
          rotate: 10,
        },
        {
          rotate: 0,
          scrollTrigger: {
            trigger: ".service-section",
            start: "top 700px",
            end: "bottom 300px",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <SimpleSectionRoot
      containerClass="service-section opacity-0 overflow-hidden"
      title="O que podemos oferecer :"
      subtitle="Serviços"
      className="shadow-[0px_-10px_10px_0px] shadow-background"
    >
      <Carrosel
        listClass={style.list}
        items={services.map((service, i) => (
          <Link key={i} href={service.link} className={style[`item-${i}`]}>
            <div
              style={{
                background: `url(${service.backgroundImg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "top",
                width:
                  innerWidth < 600
                    ? "calc(" + innerWidth + "px - (var(--spacing) * 4))"
                    : "",
              }}
              className={` ${
                style[`item-${i}`]
              }-div group transition shadow-[0px_0px_10px_0px] shadow-complementary hover:cursor-pointer rounded-xl  md:h-[400px] flex items-end h-72 md:w-full overflow-hidden`}
            >
              <div className="h-24 transition md:translate-y-24 group-hover:translate-y-0 p-10 flex items-center w-full bg-[rgba(0,0,0,0.5)]">
                <span className="text-white">{service.label}</span>
                <Image
                  className="w-6 h-6 invert"
                  src="/rightArrow.svg"
                  width={30}
                  height={30}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      />
    </SimpleSectionRoot>
  );
}

export default ServicesSection;

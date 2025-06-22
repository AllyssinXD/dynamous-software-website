"use client";

import Link from "next/link";
import Carrosel from "../Basics/Carrosel";
import SimpleSectionRoot from "../Basics/SimpleSectionRoot";
import Image from "next/image";
import useWindowWidth from "@/app/hooks/useWindowWidth";

function ProjectsSection() {
  const innerWidth = useWindowWidth();

  const projects = [
    {
      label: "Notifiq",
      imgSrc: "/dynamouslogo.png",
      link: "/dynamouslogo.png",
    },

    {
      label: "Notifiqa",
      imgSrc: "/notifiqa.png",
      link: "/notifiqa.png",
    },

    {
      label: "Metafiq",
      imgSrc: "/Metafiq.png",
      link: "/Metafiq.png",
    },
  ];

  const projectsElements = projects.map((project, i) => (
    <Link key={i} href={project.link}>
      <div
        style={{
          background: `url(${project.imgSrc})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "80%",
          backgroundPosition: "center",
          width:
            innerWidth < 600
              ? "calc(" + innerWidth + "px - (var(--spacing) * 4))"
              : "",
        }}
        className={`hover:scale-125 transition shadow-[0px_0px_10px_0px] shadow-complementary hover:cursor-pointer rounded-xl  md:h-[400px] flex items-end h-72 md:w-full overflow-hidden`}
      ></div>
    </Link>
  ));

  return (
    <SimpleSectionRoot
      subtitle="Projetos"
      title="Veja alguns dos nossos trabalhos recentes"
    >
      <Carrosel
        items={projectsElements}
        listClass="md:grid transition grid-cols-3"
      />
    </SimpleSectionRoot>
  );
}

export default ProjectsSection;

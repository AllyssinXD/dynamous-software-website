"use client";

import Link from "next/link";
import Carrosel from "../Basics/Carrosel";
import SimpleSectionRoot from "../Basics/SimpleSectionRoot";
import Image from "next/image";
import useWindowWidth from "@/hooks/useWindowWidth";

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
          width:
            innerWidth < 600
              ? "calc(" + innerWidth + "px - (var(--spacing) * 4))"
              : "",
        }}
        className={`hover:scale-110 bg-background transition flex items-center justify-center shadow-[0px_0px_5px_0px] shadow-complementary hover:cursor-pointer rounded-xl  md:h-[400px] flex h-72 w-[] md:w-full overflow-hidden`}
      >
        <Image
          className="w-2/3"
          alt={project.label}
          width={1200}
          height={500}
          src={project.imgSrc}
        />
      </div>
    </Link>
  ));

  return (
    <SimpleSectionRoot
      subtitle="Projetos"
      title="Veja alguns dos nossos trabalhos recentes"
    >
      <Carrosel
        items={projectsElements}
        listClass="flex md:grid transition grid-cols-3 md:p-10"
      />
    </SimpleSectionRoot>
  );
}

export default ProjectsSection;

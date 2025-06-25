"use client";

import Link from "next/link";
import SectionSubtitle from "../Basics/SectionSubtitle";
import SectionTitle from "../Basics/SectionTitle";
import SimpleSectionRoot from "../Basics/SimpleSectionRoot";
import Button from "../Button/Button";
import Image from "next/image";
import { useCustomSection } from "@/hooks/useCustomSection";
import { useContext } from "react";
import { ThemeContext } from "../ThemeController/ThemeController";

function AboutSection() {
  const AboutSection = useCustomSection();
  const themeContext = useContext(ThemeContext);
  const { titleID, subtitleID } = AboutSection;

  return (
    <AboutSection.createSectionRoot>
      <SimpleSectionRoot
        className="px-1"
        containerClass="rounded-xl bg-secondary-000 text-foreground pb-24"
      >
        <div className="px-10 md:px-24 md:grid grid-cols-3">
          <div className="grid items-center">
            <SectionSubtitle id={subtitleID}>Sobre a Dynamous</SectionSubtitle>
            <SectionTitle id={titleID}>Temos uma Missão</SectionTitle>
          </div>
          <div className="grid items-center">
            <p>
              Acreditamos que tudo dá para ficar mais fácil com software. Por
              isso, temos o objetivo de ajudar empresas a atrair mais clientes
              por meio de websites bonitos, inteligentes e personalizados. Além
              disso, também fazemos apps personalizados para atender as
              necessidades de cada negócio.
            </p>
          </div>
          <div className="md:ml-20 md:mt-0 mt-10">
            <h3 className="text-[2rem]">Nos siga!</h3>
            <ul className="mt-5 md:mt-0">
              <Link
                href={"https://instagram.com/dynamoussoftware"}
                className="block mb-3"
              >
                <Button
                  className="sm:py-1 h-12 sm:pl-2 sm:pr-12 md:w-64 flex items-center justify-center md:justify-start w-full"
                  isSecondary={true}
                  label=""
                >
                  <Image
                    src={"/instagram-logo.png"}
                    alt=""
                    width={100}
                    height={100}
                    className={`${
                      !themeContext?.darkmode
                        ? "invert-90 group-hover:invert-0"
                        : ""
                    } w-6 md:ml-1 h-6 mr-8`}
                  />
                  <span className="w-32">Instagram</span>
                </Button>
              </Link>
              <Link
                href={"https://instagram.com/dynamoussoftware"}
                className="block mb-3"
              >
                <Button
                  className="sm:py-1 h-12 sm:pl-2 sm:pr-12 flex items-center justify-center md:justify-start md:w-auto w-full"
                  isSecondary={true}
                  label=""
                >
                  <Image
                    src={"/youtube-logo.png"}
                    alt=""
                    width={100}
                    height={100}
                    className={`${
                      !themeContext?.darkmode
                        ? "invert-90 group-hover:invert-0"
                        : ""
                    } w-6 md:ml-1 h-5 mr-8`}
                  />
                  <span className="w-32">Youtube</span>
                </Button>
              </Link>
              <Link
                href={"https://instagram.com/dynamoussoftware"}
                className="block mb-3"
              >
                <Button
                  className="group sm:py-1 h-12 sm:pl-2 sm:pr-12 flex items-center justify-center md:justify-start md:w-auto w-full"
                  isSecondary={true}
                  label=""
                >
                  <Image
                    src={"/linkedin-logo.png"}
                    alt=""
                    width={100}
                    height={100}
                    className={`${
                      !themeContext?.darkmode
                        ? "invert-90 group-hover:invert-0"
                        : ""
                    } w-6 md:ml-1 h-6 mr-8`}
                  />
                  <span className="w-32">Linkedin</span>
                </Button>
              </Link>
            </ul>
          </div>
        </div>
      </SimpleSectionRoot>
    </AboutSection.createSectionRoot>
  );
}

export default AboutSection;

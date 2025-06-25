"use client";

import { useLayoutEffect, useState } from "react";
import DoubleContent from "../DoubleContent/DoubleContent";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionSubtitle from "../Basics/SectionSubtitle";
import SectionTitle from "../Basics/SectionTitle";
import { useCustomSection } from "@/hooks/useCustomSection";

function FAQSection() {
  const FAQSection = useCustomSection();
  const [questionSelected, setQuestionSelection] = useState(0);
  const questions = [
    "Tenho um pequeno negócio. Será que preciso de um site?",
    "Qual a vantagem de ter software personalizado?",
    "Quanto custa fazer um site com vocês?",
  ];

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    questions.forEach((_, i) => {
      gsap.fromTo(
        ".faq-question" + i,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: ".faq-question" + i,
            start: "top 600px",
            end: "bottom 0px",
            scrub: true,
          },
        }
      );
    });

    gsap.fromTo(
      ".right-side",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 4,
        scrollTrigger: {
          trigger: ".right-side",
          start: "top 900px",
          end: "bottom 300px",
          scrub: true,
        },
      }
    );
  }, []);

  const { titleID, subtitleID } = FAQSection;

  return (
    <FAQSection.createSectionRoot>
      <DoubleContent
        left={
          <>
            <SectionSubtitle id={subtitleID}>FAQ</SectionSubtitle>
            <SectionTitle id={titleID}>
              Perguntas mais frequentes sobre Software
            </SectionTitle>
            <div className="pt-2">
              {questions.map((q, i) => (
                <Question
                  key={i}
                  label={q}
                  className={
                    "faq-question" +
                    i +
                    (questionSelected == i ? " bg-primary text-white" : "")
                  }
                  onClick={() => setQuestionSelection(i)}
                />
              ))}
            </div>
          </>
        }
        right={
          <div className="right-side md:ml-10 md:pl-10 md:mt-0 md:pt-0 mt-16 pt-16 h-full md:border-l-1 border-t-1 md:border-t-0 border-foreground">
            <span className="block mb-4 text-[0.9rem] tracking-widest font-[300]">
              {questions[questionSelected]}
            </span>
            {questionSelected === 0 && (
              <>
                <span className="block mb-4 text-[2rem]">
                  Sim, e ele pode fazer toda a diferença.
                </span>
                <span className="block mb-4">
                  Com um site bem feito, você pode:
                </span>
                <ul>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Mostrar seus produtos ou serviços 24h por dia;
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Receber contatos pelo WhatsApp;
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Ser lembrado por quem já te conhece.
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-10 w-10"
                      width={500}
                      height={500}
                      src={"/star-icon.png"}
                      alt=""
                    />
                    <span className="block">
                      Um bom site é como uma{" "}
                      <span className="font-bold">
                        vitrine que trabalha por você o tempo todo
                      </span>{" "}
                      — mesmo quando sua loja está fechada.
                    </span>
                  </li>
                </ul>
              </>
            )}

            {questionSelected === 1 && (
              <>
                <span className="block mb-4 text-[2rem]">
                  Personalização traz resultados melhores.
                </span>
                <span className="block mb-4">
                  Com um software feito sob medida para seu negócio, você:
                </span>
                <ul>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Ganha tempo automatizando tarefas repetitivas;
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Evita erros que acontecem em planilhas ou papel;
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-10 w-10"
                      width={500}
                      height={500}
                      src={"/star-icon.png"}
                      alt=""
                    />
                    <span className="block">
                      Cria um sistema que se adapta ao que você precisa — não o
                      contrário.
                    </span>
                  </li>
                </ul>
              </>
            )}

            {questionSelected === 2 && (
              <>
                <span className="block mb-4 text-[2rem]">
                  Depende do que você precisa 😄
                </span>
                <span className="block mb-4">
                  O valor do site varia de acordo com:
                </span>
                <ul>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">Quantidade de páginas;</span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-8 w-8"
                      width={30}
                      height={30}
                      src={"/check-simbol.png"}
                      alt=""
                    />
                    <span className="block">
                      Se vai ter integração com WhatsApp, IA, etc;
                    </span>
                  </li>
                  <li className="flex items-center h-20">
                    <Image
                      className="mr-4 h-10 w-10"
                      width={500}
                      height={500}
                      src={"/star-icon.png"}
                      alt=""
                    />
                    <span className="block">
                      Mas não se preocupe — oferecemos orçamentos gratuitos e
                      com preços acessíveis para quem está começando.
                    </span>
                  </li>
                </ul>
              </>
            )}
          </div>
        }
      />
    </FAQSection.createSectionRoot>
  );
}

function Question({
  label,
  className,
  onClick,
}: {
  onClick?: () => void;
  className?: string;
  label: string;
}) {
  return (
    <div
      className={
        className + " mt-5 py-4 px-5 rounded-full border-2 border-primary"
      }
      onClick={onClick}
    >
      {label}
    </div>
  );
}

export default FAQSection;

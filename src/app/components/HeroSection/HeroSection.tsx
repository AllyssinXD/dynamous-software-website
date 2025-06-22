"use client";

import Image from "next/image";
import Button from "../Button/Button";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import useWindowWidth from "@/app/hooks/useWindowWidth";
import { AppContext } from "../ThemeController/AppController";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Props {}
interface DetailsInterface {
  radius: number;
  angle: number;
  progress: number;
  inverted: boolean;
}

interface BlursInterface {
  x: number;
  y: number;
}

export default function HeroSection({}: Props) {
  const appContext = useContext(AppContext);
  const [details, setDetails] = useState<DetailsInterface[]>([]);

  const innerWidth = useWindowWidth();

  useEffect(() => {
    const isMobile = innerWidth <= 600;

    const numberOfLayers = isMobile ? 4 : 5;
    const numberPerLayer = isMobile ? 4 : 5;

    const minRadius = isMobile ? 300 : 420;
    const maxRadius = isMobile ? 400 : 590;
    const step = (maxRadius - minRadius) / (numberOfLayers - 1);
    const radii = Array.from({ length: numberOfLayers }, (_, i) =>
      Math.round(maxRadius - i * step)
    );

    const newDetails = [];

    for (let layer = 0; layer < numberOfLayers; layer++) {
      const radius = radii[layer];
      if (radius > innerWidth) continue; // ignora se estourar a tela

      const inverted = layer % 2 === 1;
      const angleStep = 360 / numberPerLayer;
      const angleOffset = Math.random() * angleStep * 0.5;

      for (let i = 0; i < numberPerLayer; i++) {
        const baseAngle = i * angleStep + angleOffset;
        const randomJitter = Math.random() * 10 - 5;
        const angle = (baseAngle + randomJitter + 360) % 360;

        newDetails.push({
          angle,
          progress: Math.random() * (40 - 8) + 8,
          radius,
          inverted,
        });
      }
    }

    setDetails(newDetails);
  }, [innerWidth]);

  const [blurs, setBlurs] = useState<BlursInterface[]>([
    {
      x: 0,
      y: 0,
    },
    {
      x: 400,
      y: 200,
    },
    {
      x: 0,
      y: 200,
    },
    {
      x: 700,
      y: 300,
    },
    {
      x: 700,
      y: 300,
    },
    {
      x: 700,
      y: 300,
    },
  ]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".content", {
      x: 0,
      opacity: 1,
      ease: "power1.inOut",
      duration: 1,
    });
    gsap.fromTo(
      ".details",
      {
        scale: 2,
      },
      {
        scale: 1,
        scrollTrigger: {
          trigger: "header",
          start: "top 0px",
          end: "bottom 200px",
          scrub: true,
        },
      }
    );
    const generateCoordinates = (): Promise<{ x: number; y: number }> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const x = Math.round(Math.random() * innerWidth);
          const y = Math.round(Math.random() * 400);
          resolve({ x, y }); // <- aqui sim resolvemos a Promise
        }, 13);
      });
    };
    blurs.forEach(async (blur, i) => {
      setInterval(async () => {
        const index = i;
        const newCords = await generateCoordinates();
        blurs[index].x = newCords.x;
        blurs[index].y = newCords.y;
        console.log(newCords);
        setBlurs((prev) => {
          const updated = [...prev];
          updated[index] = { ...updated[index], ...newCords };
          return updated;
        });
      }, (Math.round(Math.random() * 6 - 3) + 3) * 1000);
    });
  }, []);

  return (
    <header className="hero mt-24 d:mt-32">
      <div className="container p-2 md:p-0 overflow-hidden md:overflow-visible relative md:flex items-center mx-auto">
        {appContext?.fancy &&
          blurs.map(({ x, y }, i) => {
            return (
              <div
                key={i}
                style={{
                  background:
                    "radial-gradient(circle at center,rgba(74, 110, 227, 0.22), transparent)",
                  filter: "blur(20px)",
                  top: y + "px",
                  left: x + "px",
                  transition: "7s",
                }}
                className={`absolute z-[-2] min-w-[300px] min-h-[300px] rounded-[50%]`}
              ></div>
            );
          })}
        <div className="relative z-1 content md:w-6/9 opacity-0 -translate-x-50 h-[460px] flex flex-col justify-around mb-24">
          <h1 className="text-[3rem] xl:text-[4.3rem] font-bold">
            Criamos WebApps, Sites, Chatbots e mais.
          </h1>
          <p className="text-xl xl:text-[1.6rem] mt-12">
            Criamos ferramentas digitais personalizadas e variadas para te
            ajudar a alcançar seus objetivos.
          </p>
          <div className="mt-12 flex w-full gap-5">
            <Button label="Nos contate" className="" />
            <Button
              label="Explore mais"
              className="min-w-64"
              isSecondary={true}
            />
          </div>
        </div>
        <div className="md:absolute md:bottom-0 md:right-0 mx-auto w-2/5 h-64 md:h-[500px]">
          <Image
            src={"/hero-cellphone.png"}
            width={640}
            height={540}
            alt="celular"
            className="absolute z-[-1] bottom-[0px] left-[-40px] md:left-[-180px] md:min-w-[700px] min-w-96"
          />
          <div
            style={{
              background:
                "radial-gradient(circle at center, #02d1c033, transparent)",
              filter: "blur(40px)",
            }}
            className="absolute z-[-2] bottom-[0px] left-[-140px] md:min-w-[580px] md:min-h-[600px] rounded-[50%]"
          ></div>
          <div className="md:block absolute z-[-26] overflow-hidden left-0 bottom-0 min-h-64  md:overflow-visible w-full md:min-w-[640px] md:left-[-120px] md:top-[-100px] md:min-h-[660px]">
            <div className="relative details">
              {appContext?.fancy &&
                details.map((detail, i) => (
                  <RotatingCirclesDetails
                    inverted={detail.inverted}
                    angle={detail.angle}
                    progress={detail.progress}
                    radius={detail.radius}
                    key={i}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function RotatingCirclesDetails({
  radius,
  angle,
  progress,
  inverted,
}: {
  radius: number;
  angle: number;
  progress: number;
  inverted: boolean;
}) {
  const innerWidth = useWindowWidth();

  return (
    <div
      className={`absolute flex items-center justify-center`}
      style={{
        minWidth: innerWidth < 800 ? innerWidth : 620,
        minHeight: innerWidth < 800 ? innerWidth : 620,
      }}
    >
      <div
        className={`rotating-details ${inverted ? "inverted" : ""}`}
        style={{
          borderRadius: "50%",
          opacity: "0.25",
          background: `conic-gradient(var(--color-foreground) ${progress}deg, 0,transparent 0%)`,
          width: radius + "px",
          height: radius + "px",
          rotate: angle + "deg",
          ...({
            "--thickness": (radius / 620) * 7 + "px",
          } as any), //Radius 620, Thickness 7
        }}
      ></div>
    </div>
  );
}

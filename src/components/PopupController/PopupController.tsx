"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import SimpleSectionRoot from "../Basics/SimpleSectionRoot";
import Button from "../Button/Button";
import DoubleContent from "../DoubleContent/DoubleContent";

interface PopupContextInterface {
  addToQueue: (popup: PopupInterface) => void;
}

export interface PopupInterface {
  iconSrc?: string;
  label: string;
  destroy?: () => void;
}

const PopupContext = createContext<PopupContextInterface | null>(null);

const Popup = ({ label, iconSrc, destroy }: PopupInterface) => {
  const [closing, setClosing] = useState(false);
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const appearAnimationTimeout = setTimeout(() => {
      setStarting(false);
    }, 10);
    const closeAnimationTimeout = setTimeout(() => {
      setClosing(true);
    }, 4800);
    const timeout = setTimeout(() => {
      destroy?.();
    }, 5000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(closeAnimationTimeout);
      clearTimeout(appearAnimationTimeout);
    };
  }, []);

  return (
    <motion.div
      className={`${
        closing || starting
          ? "translate-x-[200px]"
          : "translate-x-[0px] md:-translate-x-[200px]"
      } transition mb-5 max-w-[300px] md:min-w-[300px] rounded-sm p-3 bg-secondary text-dark`}
    >
      {iconSrc && (
        <Image
          src={iconSrc}
          alt={label}
          width={300}
          height={300}
          className="w-8 h-8"
        />
      )}
      <span>{label}</span>
    </motion.div>
  );
};

export default function PopupProvider({ children }: { children: ReactNode }) {
  type PopupInterfaceWithId = PopupInterface & { id: string };

  const [queue, setQueue] = useState<PopupInterfaceWithId[]>([]);
  const [visiblePopups, setVisiblePopups] = useState<PopupInterfaceWithId[]>(
    []
  );
  const [getInfo, setGetInfo] = useState<boolean | null>(null);
  const [getInfoStarting, setInfoStarting] = useState(true);
  const [getInfoEnding, setInfoEnding] = useState(false);
  const [infoHidden, setInfoHidden] = useState(false);

  const addToQueue = (popup: PopupInterface) => {
    const popupWithId = { ...popup, id: Date.now().toString() };
    setQueue((prev) => [...prev, popupWithId]);
  };

  const removePopup = (id: string) => {
    setVisiblePopups((prev) => prev.filter((p) => p.id !== id));
    setQueue((prev) => prev.slice(1));
  };

  useEffect(() => {
    if (queue.length > 0 && visiblePopups.length < 3) {
      const slots = 3 - visiblePopups.length;
      const toShow = queue.slice(0, slots);
      setVisiblePopups((prev) => [...prev, ...toShow]);
      setQueue((prev) => prev.slice(toShow.length));
    }
  }, [queue, visiblePopups]);

  useEffect(() => {
    const savedInfo = localStorage.getItem("sharingInfo");
    const consent = savedInfo === "S" ? true : savedInfo === "N" ? false : null;
    setGetInfo(consent);
    if (consent === null) setInfoHidden(false);

    setTimeout(() => {
      setInfoStarting(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => setInfoHidden(true), 1000);
  }, [getInfoEnding]);

  useEffect(() => {
    console.log(getInfo);
    if (getInfo !== true) return;

    const handleClick = async (e: MouseEvent) => {
      try {
        const ip = await fetch("https://api.ipify.org?format=json")
          .then((res) => res.json())
          .then((data) => data.ip);

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const target = e.target as HTMLElement;

            const analyticsData = {
              ip,
              country: "Brasil",
              city: "Embu das Artes",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              page: window.location.pathname,
              elementClicked:
                target.tagName +
                (target.id ? `#${target.id}` : target.className),
            };

            fetch("/api/analytics", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(analyticsData),
            });
          },
          (error) => {
            console.warn("Geolocalização não permitida:", error.message);
          }
        );
      } catch (err) {
        console.error("Erro ao obter IP:", err);
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [getInfo]);

  return (
    <PopupContext.Provider value={{ addToQueue }}>
      <AnimatePresence>
        <div className="fixed z-600 right-5 top-20">
          {visiblePopups.map((popup) => (
            <motion.div
              key={popup.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <Popup {...popup} destroy={() => removePopup(popup.id)} />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Banner de permissão */}
      <div
        style={{ transition: "1s" }}
        className={`${
          getInfo === null && (getInfoStarting || getInfoEnding)
            ? "translate-y-100"
            : ""
        } ${
          getInfo === null && (!getInfoStarting || !getInfoEnding)
            ? "translate-y-0"
            : ""
        } ${
          infoHidden ? "hidden" : ""
        } fixed bg-complementary z-600 shadow-[0px_10px_10px_0px] shadow-complementary bottom-0 right-0 left-0 h-96`}
      >
        <SimpleSectionRoot
          title="Bem-vindo ao nosso site! Podemos te pedir um favor?"
          containerClass="py-0"
          className="py-0"
        >
          <DoubleContent
            left={
              <p>
                Estamos fazendo uma pesquisa sobre nosso público e sobre nosso
                alcance. Gostaria de ajudar a gente com algumas informações?
              </p>
            }
            right={
              <div className="flex flex-col justify-between items-end">
                <Button
                  className="w-64 mb-5"
                  label="Sim!"
                  onClick={() => {
                    setInfoEnding(true);
                    setGetInfo(true);
                    localStorage.setItem("sharingInfo", "S");
                  }}
                />
                <Button
                  label="Não, obrigado."
                  className="w-64"
                  onClick={() => {
                    setInfoEnding(true);
                    setGetInfo(false);
                    localStorage.setItem("sharingInfo", "N");
                  }}
                />
              </div>
            }
          />
        </SimpleSectionRoot>
      </div>
      {children}
    </PopupContext.Provider>
  );
}

// Hook para acessar o contexto
export function usePopup() {
  return useContext(PopupContext);
}

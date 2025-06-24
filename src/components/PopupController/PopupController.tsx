"use client";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface PopupContextInterface {
  addToQueue: (popup: PopupInterface) => void;
}

export interface PopupInterface {
  iconSrc?: string;
  label: string;
  closable?: boolean;
  destroy?: () => void;
}

// Nome correto da constante do contexto
const PopupContext = createContext<PopupContextInterface | null>(null);

const Popup = ({ label, iconSrc, closable, destroy }: PopupInterface) => {
  const [closing, setClosing] = useState(false);
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const initial = setTimeout(() => {
      setStarting(true);
    }, 1);
    const appearAnimationTimeout = setTimeout(() => {
      setStarting(false);
    }, 10);
    const closeAnimationTimeout = setTimeout(() => {
      setClosing(true);
    }, 4800);

    const timeout = setTimeout(() => {
      console.log("DESTRUINDO");
      destroy!();
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
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt={label}
          width={300}
          height={300}
          className="w-8 h-8"
        />
      ) : null}
      <span>{label}</span>
    </motion.div>
  );
};

export default function PopupProvider({ children }: { children: ReactNode }) {
  let [numberOfPopups, setNumberOfPopups] = useState(0);
  const [queue, setQueue] = useState<PopupInterfaceWithId[]>([]);

  const [visiblePopups, setVisiblePopups] = useState<PopupInterfaceWithId[]>(
    []
  );

  type PopupInterfaceWithId = PopupInterface & { id: string };

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
  }, [queue]);

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
      {children}
    </PopupContext.Provider>
  );
}

// Hook para acessar o contexto
export function usePopup() {
  const context = useContext(PopupContext);
  return context;
}

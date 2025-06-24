"use client";

import { useCustomSection } from "@/hooks/useCustomSection";
import SectionTitle from "../Basics/SectionTitle";
import SectionSubtitle from "../Basics/SectionSubtitle";
import Button from "../Button/Button";
import { usePopup } from "../PopupController/PopupController";

function CTASection() {
  const CTASection = useCustomSection();
  const { titleID, subtitleID } = CTASection;

  const popup = usePopup();

  return (
    <CTASection.createSectionRoot containerClass="cta-section md:flex flex-col items-center">
      <SectionSubtitle id={subtitleID}>Nos envie uma mensagem</SectionSubtitle>
      <SectionTitle id={titleID}>
        Vamos criar algo incrivel juntos?
      </SectionTitle>
      <textarea
        className="p-10 border border-primary rounded-xl md:w-1/2 w-full h-96"
        placeholder="Escreva sua mensagem aqui..."
      ></textarea>
      <div className="w-full md:w-1/2 mt-10 md:grid gap-10 grid-cols-3">
        <input
          type="text"
          className="p-3 w-full md:col-span-2 border border-primary rounded-full"
          placeholder="Seu email"
        />
        <Button
          onClick={() => {
            popup!.addToQueue({ label: "Enviado com sucesso" });
          }}
          label="Enviar"
          className="w-full py-10 md:p-3 md:w-auto mt-10 md:mt-0"
        />
      </div>
    </CTASection.createSectionRoot>
  );
}

export default CTASection;

"use client";

import { useState } from "react";

type OrderBuilderProps = {
  lang: string;
};

export function OrderBuilder({ lang }: OrderBuilderProps) {
  const [formData, setFormData] = useState({
    date: "",
    product: "",
    size: "",
    base: "",
    flavor: "",
    design: "",
    addons: "",
    guests: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenerateMessage = () => {
    let message = "";
    const phone = "+15715258279";

    if (lang === "pt") {
      message = `Olá! Gostaria de solicitar uma encomenda na Monae Dessert Studio.%0A%0A`;
      message += `*Data:* ${formData.date}%0A`;
      message += `*Produto:* ${formData.product}%0A`;
      if (formData.size) message += `*Tamanho:* ${formData.size}%0A`;
      if (formData.base) message += `*Massa:* ${formData.base}%0A`;
      if (formData.flavor) message += `*Sabor:* ${formData.flavor}%0A`;
      if (formData.design) message += `*Decoração:* ${formData.design}%0A`;
      if (formData.addons) message += `*Adicionais:* ${formData.addons}%0A`;
      if (formData.guests) message += `*Número de convidados:* ${formData.guests}%0A`;
      if (formData.notes) message += `*Observações:* ${formData.notes}%0A`;

      window.open(`https://wa.me/15715258279?text=${message}`, "_blank");
    } else {
      message = `Hi! I'd like to request a custom order from Monae Dessert Studio.%0A%0A`;
      message += `Date: ${formData.date}%0A`;
      message += `Product: ${formData.product}%0A`;
      if (formData.size) message += `Size: ${formData.size}%0A`;
      if (formData.base) message += `Base: ${formData.base}%0A`;
      if (formData.flavor) message += `Flavor: ${formData.flavor}%0A`;
      if (formData.design) message += `Design: ${formData.design}%0A`;
      if (formData.addons) message += `Add-ons: ${formData.addons}%0A`;
      if (formData.guests) message += `Guests: ${formData.guests}%0A`;
      if (formData.notes) message += `Notes: ${formData.notes}%0A`;

      window.open(`sms:${phone}?body=${message}`, "_self");
    }
  };

  const labels = lang === "pt" ? {
    date: "Data do Evento",
    product: "Produto Principal",
    size: "Tamanho",
    base: "Massa",
    flavor: "Sabor",
    design: "Estilo de Decoração",
    addons: "Adicionais (Doces, Flores, etc)",
    guests: "Número de Convidados",
    notes: "Observações Especiais",
    btn: "CONTINUAR PELO WHATSAPP"
  } : {
    date: "Event Date",
    product: "Main Product",
    size: "Size",
    base: "Cake Base",
    flavor: "Flavor",
    design: "Design Style",
    addons: "Add-ons (Sweets, Flowers, etc)",
    guests: "Number of Guests",
    notes: "Special Notes",
    btn: "CONTINUE IN MESSAGES"
  };

  return (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border border-brand-border/40 max-w-2xl mx-auto w-full font-sans">
      <h3 className="text-2xl font-serif text-text-dark mb-8 text-center">
        {lang === "pt" ? "Montar Pedido" : "Order Builder"}
      </h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-soft-text mb-2">{labels.date}</label>
            <input type="date" name="date" onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-soft-text mb-2">{labels.guests}</label>
            <input type="number" name="guests" placeholder="Ex: 20" onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-soft-text mb-2">{labels.product}</label>
          <select name="product" onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors bg-white">
            <option value="">{lang === "pt" ? "Selecione..." : "Select..."}</option>
            <option value="Custom Cake">Custom Cake</option>
            <option value="Brigadeiros">Brigadeiros</option>
            <option value="Mini Desserts">Mini Desserts</option>
            <option value="Party Package">Party Package</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-soft-text mb-2">{labels.size}</label>
            <input type="text" name="size" placeholder={lang === "pt" ? "Ex: 8 polegadas" : "Ex: 8 inch"} onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-soft-text mb-2">{labels.flavor}</label>
            <input type="text" name="flavor" placeholder="Ex: Ninho & Nutella" onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-soft-text mb-2">{labels.design}</label>
          <input type="text" name="design" placeholder={lang === "pt" ? "Ex: Delicate Piping" : "Ex: Delicate Piping"} onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm text-soft-text mb-2">{labels.addons}</label>
          <input type="text" name="addons" placeholder={lang === "pt" ? "Ex: Flores frescas" : "Ex: Fresh flowers"} onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-soft-text mb-2">{labels.notes}</label>
          <textarea name="notes" rows={3} onChange={handleChange} className="border border-brand-border rounded px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
        </div>
      </div>

      <button 
        onClick={handleGenerateMessage}
        disabled={!formData.date || !formData.product}
        className="w-full mt-10 bg-[#25D366] text-white py-4 rounded font-sans tracking-wide hover:bg-[#20bd5a] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {labels.btn}
      </button>
      <p className="text-xs text-center text-soft-text mt-4">
        {lang === "pt" 
          ? "* Você poderá revisar a mensagem antes de enviar." 
          : "* You'll be able to review the message before sending."}
      </p>
    </div>
  );
}

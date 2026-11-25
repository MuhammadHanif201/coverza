import { Icon } from "@/components/ui/Icon";
import { whatsappLink } from "@/lib/site";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Assalam o Alaikum! I want to order a phone cover.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-4 z-30 flex items-center gap-2 rounded-full bg-wa p-3.5 text-white shadow-[0_6px_18px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 sm:bottom-6 sm:right-6 lg:px-5"
    >
      <Icon name="message" size={22} />
      <span className="hidden text-sm font-semibold lg:inline">Order on WhatsApp</span>
    </a>
  );
}

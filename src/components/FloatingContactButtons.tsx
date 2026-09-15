"use client";

const PHONE_NUMBER = "919236553585"; // country code + number, no + or spaces
const WHATSAPP_MESSAGE = "Hi, I have a query.";

export default function FloatingContactButtons() {
  const whatsappHref = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;
  const callHref = `tel:+${PHONE_NUMBER}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
      {/* Phone button */}
      <a
        href={callHref}
        aria-label="Call us"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full
                   bg-gradient-to-br from-purple-500 to-purple-700
                   ring-2 ring-white/20
                   transition-all duration-300 ease-out
                   hover:scale-110 "
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 fill-white drop-shadow-sm"
        >
          <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.57.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.25 1.02z" />
        </svg>
        <span className="absolute inset-0 rounded-full animate-ping bg-purple-500/30 opacity-0 group-hover:opacity-100" />
      </a>

      {/* WhatsApp button */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full
                   bg-gradient-to-br from-[#25D366] to-[#128C7E]
                   ring-2 ring-white/20
                   transition-all duration-300 ease-out
                   hover:scale-110"
      >
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7 fill-white drop-shadow-sm"
        >
          <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.393.7 4.62 1.902 6.49L4 29l7.72-1.87A11.94 11.94 0 0016.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3zm0 21.75c-1.98 0-3.83-.55-5.41-1.51l-.39-.23-4.58 1.11 1.13-4.47-.25-.4A9.7 9.7 0 016.25 15c0-5.39 4.38-9.75 9.75-9.75S25.75 9.61 25.75 15 21.38 24.75 16.001 24.75zm5.4-7.32c-.29-.15-1.73-.85-2-.95-.27-.1-.47-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.52-.07-.15-.66-1.59-.9-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.52.07-.79.37-.27.29-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.73-.71 1.97-1.39.24-.68.24-1.27.17-1.39-.07-.12-.27-.2-.56-.34z" />
        </svg>
        <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 opacity-0 group-hover:opacity-100" />
      </a>
    </div>
  );
}
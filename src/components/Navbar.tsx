import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-muzik.svg";

const links = [
  { label: "Služby", href: "#sluzby" },
  { label: "Proč my", href: "#proc-my" },
  { label: "Reference", href: "#reference" },
  { label: "Kontakt", href: "#kontakt" },
];

const ctaEmail = {
  href: "mailto:info@nabytekmuzik.cz",
  label: "Napište nám",
};

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Nábytek Mužík logo" className="h-7 w-auto" />
          <span className="font-display text-xl font-bold text-primary-foreground tracking-tight">Nábytek Mužík</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={ctaEmail.href}
            className="bg-primary text-primary-foreground px-5 py-2 rounded-sm font-body text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaEmail.label}
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground"
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-foreground/95 backdrop-blur-md px-6 pb-6 space-y-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-primary-foreground/80 font-body text-lg py-2"
            >
              {l.label}
            </a>
          ))}
          <a
            href={ctaEmail.href}
            className="block bg-primary text-primary-foreground px-5 py-3 rounded-sm font-body text-center font-semibold"
          >
            {ctaEmail.label}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

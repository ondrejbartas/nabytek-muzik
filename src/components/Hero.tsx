import heroImage from "@/assets/gallery/hero-image.webp";
import { Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Obývací stěna na míru od Nábytek Mužík"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-foreground/40" />
      </div>

      <div className="relative z-10 section-padding pb-16 md:pb-24 w-full max-w-5xl">
        <p className="text-primary-foreground/70 font-body text-sm tracking-[0.3em] uppercase mb-4 animate-fade-up">
          Tradice od roku 1996
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Nábytek na míru,<br />
          který vypráví<br />
          váš příběh
        </h1>
        <p className="text-primary-foreground/80 font-body text-lg md:text-xl max-w-xl mb-10 animate-fade-up" style={{ animationDelay: "0.3s" }}>
          Zakázková výroba nábytku z lamina i masivu. Od návrhu architekta po profesionální montáž.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <a
            href="mailto:info@nabytekmuzik.cz"
            className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 py-4 rounded-sm font-body font-semibold text-base tracking-wide hover:opacity-90 transition-opacity"
          >
            <Mail className="w-5 h-5" />
            <span>Napište nám</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;

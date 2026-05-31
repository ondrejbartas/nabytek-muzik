import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import koupelna1 from "@/assets/gallery/koupelna-1.webp";
import koupelna2 from "@/assets/gallery/koupelna-2.webp";
import koupelna3 from "@/assets/gallery/koupelna-3.webp";
import koupelna4 from "@/assets/gallery/koupelna-4.webp";
import koupelna5 from "@/assets/gallery/koupelna-5.webp";
import kuchyn1 from "@/assets/gallery/kuchyn-1.webp";
import kuchyn2 from "@/assets/gallery/kuchyn-2.webp";
import kuchyn3 from "@/assets/gallery/kuchyn-3.webp";
import kuchyn4 from "@/assets/gallery/kuchyn-4.webp";
import kuchyn5 from "@/assets/gallery/kuchyn-5.webp";
import kuchyn6 from "@/assets/gallery/kuchyn-6.webp";
import kuchyn7 from "@/assets/gallery/kuchyn-7.webp";
import kuchyn8 from "@/assets/gallery/kuchyn-8.webp";
import kuchyn9 from "@/assets/gallery/kuchyn-9.webp";
import loznice1 from "@/assets/gallery/loznice-1.webp";
import loznice2a from "@/assets/gallery/loznice-2a.webp";
import loznice2b from "@/assets/gallery/loznice-2b.webp";
import loznice3 from "@/assets/gallery/loznice-3.webp";
import loznice4 from "@/assets/gallery/loznice-4.webp";
import loznice5 from "@/assets/gallery/loznice-5.webp";
import loznice6 from "@/assets/gallery/loznice-6.webp";
import obyvaciPokoj1 from "@/assets/gallery/obyvaci-pokoj-1.webp";
import pokojDetsky1 from "@/assets/gallery/pokoj-detsky-1.webp";
import pokojDetsky2 from "@/assets/gallery/pokoj-detsky-2.webp";
import pokojDetsky3 from "@/assets/gallery/pokoj-detsky-3.webp";
import pokojDetsky4 from "@/assets/gallery/pokoj-detsky-4.webp";
import pokojDetsky5 from "@/assets/gallery/pokoj-detsky-5.webp";
import pokojDetsky6a from "@/assets/gallery/pokoj-detsky-6a.webp";
import pokojDetsky6b from "@/assets/gallery/pokoj-detsky-6b.webp";
import pokojDetsky7 from "@/assets/gallery/pokoj-detsky-7.webp";
import kancelar1 from "@/assets/gallery/kancelar-1.webp";
import knihovna1 from "@/assets/gallery/knihovna-1.webp";
import satna1 from "@/assets/gallery/satna-1.webp";
import skrine1 from "@/assets/gallery/skrine-1.webp";
import chodba1 from "@/assets/gallery/chodba-1.webp";

const galleryItems = [
  { src: kuchyn1, alt: "Moderní kuchyňská linka na míru v světlém dekoru", label: "Kuchyně" },
  { src: kuchyn2, alt: "Oranžová kuchyňská linka na míru do rohu", label: "Kuchyně" },
  { src: kuchyn3, alt: "Zelená kuchyňská linka na míru s dlouhou pracovní deskou", label: "Kuchyně" },
  { src: kuchyn4, alt: "Klasická bílá rohová kuchyň na míru", label: "Kuchyně" },
  { src: kuchyn5, alt: "Minimalistická kuchyně s ostrůvkem a dřevěným obkladem", label: "Kuchyně" },
  { src: kuchyn6, alt: "Rustikální dřevěná kuchyňská linka na míru", label: "Kuchyně" },
  { src: kuchyn7, alt: "Světlá kuchyňská linka na míru s vysokými skříněmi a dřevěnými detaily", label: "Kuchyně" },
  { src: kuchyn8, alt: "Kuchyňský ostrůvek na míru s dřevěnou pracovní deskou a otevřenými policemi", label: "Kuchyně" },
  { src: kuchyn9, alt: "Kuchyně na míru s ostrůvkem v kombinaci bílé a dřeva", label: "Kuchyně" },
  { src: koupelna1, alt: "Koupelnová sestava na míru s umyvadlem a úložným prostorem", label: "Koupelny" },
  { src: koupelna2, alt: "Dřevěná koupelnová skříňka na míru s černými detaily", label: "Koupelny" },
  { src: koupelna3, alt: "Koupelnový nábytek na míru v dekoru světlého dřeva", label: "Koupelny" },
  { src: koupelna4, alt: "Koupelna na míru se sprchovým koutem a vestavěnou pračkou se sušičkou", label: "Koupelny" },
  { src: koupelna5, alt: "Koupelnová skříňka na míru s podsvíceným zrcadlem a úložným prostorem", label: "Koupelny" },
  { src: loznice1, alt: "Ložnice na míru s vestavěnými skříněmi nad postelemi", label: "Ložnice" },
  { src: loznice2a, alt: "Ložnice na míru s postelí a vestavěnou šatní skříní", label: "Ložnice" },
  { src: loznice2b, alt: "Ložnice s komodou, zrcadlem a posuvnou skříní", label: "Ložnice" },
  { src: loznice3, alt: "Ložnice na míru s bílými skříněmi a dekorativní tapetou", label: "Ložnice" },
  { src: loznice4, alt: "Vestavěná bílá šatní skříň do ložnice", label: "Ložnice" },
  { src: loznice5, alt: "Ložnice na míru s komodou, zrcadlem a žlutými akcenty", label: "Ložnice" },
  { src: loznice6, alt: "Ložnice se šatní skříní s posuvnými dveřmi a lavicí", label: "Ložnice" },
  { src: obyvaciPokoj1, alt: "Obývací stěna s lamelovým obkladem a TV sestavou", label: "Obývací pokoje" },
  { src: pokojDetsky1, alt: "Dětský pokoj s pracovním stolem a úložnými skříňkami", label: "Dětské pokoje" },
  { src: pokojDetsky2, alt: "Dětský pokoj s vyvýšenou postelí a úložným prostorem", label: "Dětské pokoje" },
  { src: pokojDetsky3, alt: "Dětský pokoj s nízkými postelemi a vestavěnými zásuvkami", label: "Dětské pokoje" },
  { src: pokojDetsky4, alt: "Vestavěná skříň do dětského pokoje s otevřenými policemi", label: "Dětské pokoje" },
  { src: pokojDetsky5, alt: "Dětský pokoj s psacím stolem a bílými knihovnami", label: "Dětské pokoje" },
  { src: pokojDetsky6a, alt: "Dětský pokoj s vestavěnými policemi, postelí a pracovním koutem", label: "Dětské pokoje" },
  { src: pokojDetsky6b, alt: "Dětský pokoj s úložnými policemi a oranžovým psacím stolem", label: "Dětské pokoje" },
  { src: pokojDetsky7, alt: "Dětský pokoj s patrovou postelí a psacím stolem na míru", label: "Dětské pokoje" },
  { src: kancelar1, alt: "Kancelář na míru s knihovnou a úložnými skříněmi", label: "Kancelář" },
  { src: knihovna1, alt: "Velká vestavěná knihovna na míru s pracovním stolem", label: "Knihovny" },
  { src: satna1, alt: "Prostorná šatna na míru s otevřenými úložnými systémy", label: "Šatny" },
  { src: skrine1, alt: "Vestavěné skříně na míru s posuvnými i klasickými dveřmi", label: "Skříně" },
  { src: chodba1, alt: "Předsíň na míru s vysokými skříněmi, lavicí a zrcadlem", label: "Předsíně & chodby" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);
  const prev = () =>
    setLightbox((c) => (c !== null ? (c - 1 + galleryItems.length) % galleryItems.length : null));
  const next = () =>
    setLightbox((c) => (c !== null ? (c + 1) % galleryItems.length : null));

  useEffect(() => {
    if (lightbox === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [lightbox]);

  return (
    <section id="galerie" className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Galerie realizací
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto font-body">
          Výběr z našich skutečných realizací — kuchyně, koupelny, ložnice, dětské pokoje,
          šatny, kanceláře, knihovny i vestavěné skříně.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryItems.map((item, i) => (
            <button
              key={`${item.label}-${i}`}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-lg bg-muted aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              aria-label={`Otevřít fotku: ${item.alt}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent px-4 py-4 text-left">
                <span className="block font-display text-lg font-semibold text-primary-foreground drop-shadow-lg">
                  {item.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/95 p-4 sm:p-6" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full border border-primary-foreground/20 bg-background/10 p-2 text-primary-foreground transition-colors hover:bg-background/20"
            aria-label="Zavřít"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/20 bg-background/10 p-2 text-primary-foreground transition-colors hover:bg-background/20 sm:left-4"
            aria-label="Předchozí"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-primary-foreground/20 bg-background/10 p-2 text-primary-foreground transition-colors hover:bg-background/20 sm:right-4"
            aria-label="Další"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightbox].src}
              alt={galleryItems[lightbox].alt}
              className="max-h-[78vh] w-auto max-w-[88vw] rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-4 text-center">
              <p className="font-display text-xl font-semibold text-primary-foreground">
                {galleryItems[lightbox].label}
              </p>
              <p className="mt-1 font-body text-sm text-primary-foreground/80">
                {galleryItems[lightbox].alt}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;

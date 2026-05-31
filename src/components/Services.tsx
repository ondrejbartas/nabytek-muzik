import { Armchair, DoorOpen, BedDouble, Baby, Footprints, PencilRuler } from "lucide-react";
import kuchynImg from "@/assets/gallery/kuchyn-5.webp";
import wardrobeImg from "@/assets/gallery/loznice-2b.webp";
import officeImg from "@/assets/gallery/kancelar-1.webp";
import bathroomImg from "@/assets/gallery/koupelna-2.webp";

const featuredServices = [
  {
    title: "Kuchyně",
    description: "Kuchyňské linky a ostrůvky přesně podle vašich představ a rozměrů místnosti.",
    image: kuchynImg,
  },
  {
    title: "Skříně & šatny",
    description: "Vestavěné skříně, šatní systémy a skříně s posuvnými dveřmi do každého prostoru.",
    image: wardrobeImg,
  },
  {
    title: "Kancelář",
    description: "Pracovní stoly, regály a kompletní vybavení kanceláří na míru.",
    image: officeImg,
  },
  {
    title: "Koupelny",
    description: "Koupelnový nábytek odolný vlhkosti, navržený přesně pro váš prostor.",
    image: bathroomImg,
  },
];

const additionalServices = [
  { icon: BedDouble, label: "Nábytek do ložnice" },
  { icon: Baby, label: "Dětské pokoje" },
  { icon: Footprints, label: "Schody" },
  { icon: DoorOpen, label: "Dveře" },
  { icon: Armchair, label: "Nábytek na chalupu" },
  { icon: PencilRuler, label: "Další truhlářské výrobky" },
];

const Services = () => {
  return (
    <section id="sluzby" className="section-padding bg-card">
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">Co vyrábíme</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
          Nábytek na míru
        </h2>
        <p className="text-muted-foreground font-body leading-relaxed max-w-3xl mb-16">
          Nechte si vyrobit nábytek na zakázku — ať už si přejete moderní nábytek do kanceláře,
          rustikální nábytek na chalupu nebo šikovné skříně s posuvnými dveřmi do úzké chodby.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {featuredServices.map((service, i) => (
            <div key={i} className="group">
              {service.image && (
                <div className="overflow-hidden rounded-sm mb-5 bg-muted">
                  <img
                    src={service.image}
                    alt={service.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              )}
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-12">
          <h3 className="font-display text-xl font-semibold text-foreground mb-8 text-center">
            Dále vyrábíme na míru
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {additionalServices.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-3 p-4 rounded-sm bg-secondary/40 animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <s.icon className="w-6 h-6 text-primary" />
                <span className="text-sm font-body text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center font-body text-foreground font-medium">
            Náš architekt pro vás <span className="text-primary">zdarma</span> připraví návrh interiéru.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

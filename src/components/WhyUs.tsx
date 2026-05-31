import { Ruler, Clock, Truck, Award } from "lucide-react";

const reasons = [
  {
    icon: Ruler,
    title: "Přesné rozměry",
    text: "Nábytek přesně podle vašeho prostoru, ani centimetr nazmar.",
  },
  {
    icon: Award,
    title: "Kvalitní materiály",
    text: "Používáme lamino i masiv nejvyšší kvality, aby nábytek vydržel.",
  },
  {
    icon: Clock,
    title: "Krátká dodací lhůta",
    text: "Rychlá výroba bez kompromisů na kvalitě.",
  },
  {
    icon: Truck,
    title: "Doprava & montáž",
    text: "Profesionální doprava a montáž u vás doma je samozřejmostí.",
  },
];

const WhyUs = () => {
  return (
    <section id="proc-my" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-3">Proč Nábytek Mužík</p>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-16 max-w-lg">
          Tradice řemeslné práce od roku 1996
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {reasons.map((r, i) => (
            <div key={i} className="text-center">
              <div className="flex justify-center mb-5">
                <r.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{r.title}</h3>
              <p className="text-muted-foreground font-body leading-relaxed text-sm">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

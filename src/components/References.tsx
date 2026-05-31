import { Star, Quote, Building2 } from "lucide-react";
import NejremeslniciBadge from "./NejremeslniciBadge";
import rating from "@/data/nejremeslnici.json";

type Testimonial = {
  text: string;
  author: string;
  location?: string;
  date?: string;
  rating?: number;
  title?: string;
  url?: string;
  source?: "nejremeslnici";
};

const curated: Testimonial[] = [
  {
    text: "S firmou pana Mužíka jsme nadmíru spokojeni. Už od začátku bylo jeho jednání velice profesionální a zároveň byl maximálně ochotný vyjít všem našim požadavkům vstříc. Na jeho slovo se dalo spolehnout a vždy dodržel termíny, ať už prvotního zaměření, výroby skříně nebo finální realizace včetně celkové ceny.",
    author: "Tomáš Pavlíček",
    location: "Praha",
  },
  {
    text: "S realizací jsme velice spokojeni. Komunikace s dodavatelem byla bez problémů. Pánové pracovali rychle a efektivně a výsledek stojí za to. Skříně i botník jsou kvalitní, plně vyhovují našim potřebám a vypadají moc hezky. Plánujeme si nechat od dodavatele vyrobit i další nábytek.",
    author: "Lea Zámečníková",
    location: "Praha",
  },
  {
    text: "Perfektní práce, když budu potřebovat něco dalšího, vím na kterou firmu se obrátit.",
    author: "Michaela Bařinková",
    location: "Praha",
  },
];

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${Number(d)}. ${Number(m)}. ${y}`;
};

// The latest Nejřemeslníci reviews are pre-selected at build time
// (scripts/fetch-rating.mjs); show the 3 newest, each linking to its
// own reference page.
const nejremeslniciReviews: Testimonial[] = rating.reviews.slice(0, 3).map((r) => ({
  text: r.reviewBody,
  author: r.author,
  date: formatDate(r.datePublished),
  rating: r.rating,
  title: r.title,
  url: r.url,
  source: "nejremeslnici" as const,
}));

const testimonials: Testimonial[] = [...curated, ...nejremeslniciReviews];

const corporateClients = [
  "MAKRO Cash & Carry ČR",
  "Ford Charouz",
  "UniControls a.s.",
  "Metrostav, a.s.",
  "RE/MAX Czech Republic",
  "Coty ČR",
  "RESERVED - LPP Retail",
  "Česká pojišťovna ZDRAVÍ",
  "Český hydrometeorologický ústav",
  "Úřad pro civilní letectví",
  "Akademie věd ČR",
  "ČVUT Praha",
  "Schlumberger",
  "Českobrodská nemocnice",
];

const References = () => {
  return (
    <section id="reference" className="py-24 bg-secondary/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
          Reference
        </h2>
        <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto font-body">
          Co o nás říkají naši zákazníci
        </p>

        <div className="flex justify-center mb-16">
          <NejremeslniciBadge />
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8 mb-8 items-start">
          {testimonials.map((t, i) => {
            const stars = Math.round(t.rating ?? 5);
            const isNr = t.source === "nejremeslnici";
            const cardClass =
              "bg-card rounded-lg p-8 shadow-sm border border-border relative animate-fade-up block" +
              (isNr ? " transition-shadow hover:shadow-md" : "");
            const content = (
              <>
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <div className="flex gap-1 mb-2">
                  {[...Array(stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                {isNr && (
                  <p className="font-display font-semibold text-foreground mb-3">{t.title}</p>
                )}
                <p className="text-muted-foreground font-body text-sm leading-relaxed mb-6">
                  "{t.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-display font-semibold text-foreground">{t.author}</p>
                  <p className="text-muted-foreground text-sm font-body">
                    {isNr ? `Nejřemeslníci.cz · ${t.date}` : t.location}
                  </p>
                </div>
              </>
            );
            return isNr ? (
              <a
                key={i}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
                style={{ animationDelay: `${(i % 3) * 100}ms` }}
              >
                {content}
              </a>
            ) : (
              <div
                key={i}
                className={cardClass}
                style={{ animationDelay: `${(i % 3) * 100}ms` }}
              >
                {content}
              </div>
            );
          })}
        </div>

        <p className="text-center text-muted-foreground font-body mb-20">
          Přečtěte si{" "}
          <a
            href={rating.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary font-semibold underline-offset-4 hover:underline"
          >
            další hodnocení naší práce zákazníky na webu Nejřemeslníci.cz
          </a>
          .
        </p>

        {/* Corporate clients */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Building2 className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl font-semibold text-foreground">
              Významní firemní odběratelé
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {corporateClients.map((client) => (
              <span
                key={client}
                className="bg-card border border-border text-muted-foreground font-body text-sm px-4 py-2 rounded-sm"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;

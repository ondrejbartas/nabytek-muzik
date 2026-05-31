import { Phone, Mail, MapPin } from "lucide-react";

const contact = { name: "Stanislav Mužík", phone: "+420602203739", label: "602 203 739" };

const Contact = () => {
  return (
    <section id="kontakt" className="section-padding bg-foreground">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-3">Kontakt</p>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary-foreground mb-6">
              Pojďme vytvořit něco krásného
            </h2>
            <p className="text-primary-foreground/60 font-body leading-relaxed mb-10">
              Napište nám nebo zavolejte. Rádi s vámi probereme vaše představy a připravíme nezávazný návrh.
            </p>

            <div className="space-y-6">
              <a href="mailto:info@nabytekmuzik.cz" className="flex items-center gap-4 text-primary-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-body text-lg">info@nabytekmuzik.cz</span>
              </a>
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center gap-4 text-primary-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-body text-lg">{contact.label}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-sm p-8">
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-4">
                Nábytek Mužík
              </h3>
              <p className="text-primary-foreground/80 font-body text-sm mb-2">
                Klučov 84, Český Brod, 282 01
              </p>
              <p className="text-primary-foreground/50 font-body text-sm mb-6">
                IČ: 40010902 · DIČ: CZ6803301769
              </p>
              <p className="text-primary-foreground/60 font-body text-sm leading-relaxed">
                Zapsáno živnostenským odborem Městského úřadu Český Brod, číslo registrace 320402
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

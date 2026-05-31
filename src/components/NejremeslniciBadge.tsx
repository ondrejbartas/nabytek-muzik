import { Star } from "lucide-react";
import rating from "@/data/nejremeslnici.json";
import nrLogo from "@/assets/nejremeslnici-logo.svg";

const starFill = (rating.ratingValue / rating.bestRating) * 5;

const NejremeslniciBadge = () => {
  return (
    <a
      href={rating.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 bg-card border border-border rounded-lg px-6 py-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="text-left">
        <p className="font-display text-3xl font-bold text-foreground leading-none">
          {rating.ratingValue.toFixed(2).replace(".", ",")}
          <span className="text-muted-foreground text-lg font-body font-normal"> / {rating.bestRating}</span>
        </p>
        <div className="flex gap-0.5 mt-1.5" aria-hidden="true">
          {[...Array(5)].map((_, i) => {
            const fill = Math.max(0, Math.min(1, starFill - i));
            return (
              <span key={i} className="relative inline-block w-4 h-4">
                <Star className="absolute inset-0 w-4 h-4 text-primary/25" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star className="w-4 h-4 fill-primary text-primary" />
                </span>
              </span>
            );
          })}
        </div>
      </div>
      <div className="border-l border-border pl-4 flex flex-col items-start gap-2">
        <span
          role="img"
          aria-label="Nejřemeslníci.cz"
          className="block bg-foreground"
          style={{
            width: "132px",
            height: "34px",
            WebkitMaskImage: `url(${nrLogo})`,
            maskImage: `url(${nrLogo})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
        <span className="text-muted-foreground text-sm font-body">
          {rating.ratingCount} hodnocení
        </span>
      </div>
    </a>
  );
};

export default NejremeslniciBadge;

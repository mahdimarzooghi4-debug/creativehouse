export type NewsArtVariant = "lab" | "workshop" | "stage";

export function NewsArt({ variant, large = false }: { variant: NewsArtVariant; large?: boolean }) {
  return (
    <div className={`news-art news-art--${variant}${large ? " news-art--large" : ""}`} aria-hidden="true">
      <div className="news-art__canvas">
        <span className="news-art__board" />
        <span className="news-art__table" />
        <span className="news-art__person news-art__person--1" />
        <span className="news-art__person news-art__person--2" />
        <span className="news-art__person news-art__person--3" />
      </div>
    </div>
  );
}

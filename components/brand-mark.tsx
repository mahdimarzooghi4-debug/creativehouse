export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 70" role="img" aria-label="نشان خانه خلاق و نوآوری آینه">
      <rect x="7" y="6" width="68" height="58" rx="18" fill="#f7f5f1" />
      <path d="M20 43V28.5L41 16l21 12.5V43" fill="none" stroke="#364e92" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 49c5.7-9 20.3-9 26 0" fill="none" stroke="#364e92" strokeWidth="5" strokeLinecap="round" />
      <path d="M41 23v31" fill="none" stroke="#fb8c74" strokeWidth="5" strokeLinecap="round" />
      <circle cx="41" cy="21" r="5" fill="#fb8c74" />
    </svg>
  );
}

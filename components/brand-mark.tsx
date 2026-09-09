export function BrandMark({ className = "brand-mark" }: { className?: string }) {
  return (
    <img
      className={className}
      src="/images/figma-brand-logo.png"
      alt="نشان خانه خلاق و نوآوری آینه"
      width={82}
      height={70}
    />
  );
}

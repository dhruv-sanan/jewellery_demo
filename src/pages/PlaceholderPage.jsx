/**
 * Shared placeholder template for pages that are not yet built.
 * Usage:  <PlaceholderPage title="Collections" />
 */
export default function PlaceholderPage({ title, subtitle }) {
  return (
    <section className="min-h-screen bg-[#0A0A0A] flex flex-col">
      {/* Hero Banner */}
      <div className="h-[40vh] flex flex-col items-center justify-center text-center px-6 relative">
        {/* Subtle gold line above title */}
        <div className="w-10 h-[1px] bg-[#C9A96E] mb-6" />

        <h1 className="font-primary text-[clamp(36px,6vw,72px)] text-[#FAFAFA] font-normal tracking-wide">
          {title}
        </h1>

        {subtitle && (
          <p className="font-secondary text-[13px] tracking-[0.2em] uppercase text-[#C9A96E] mt-4">
            {subtitle}
          </p>
        )}
      </div>

      {/* Coming Soon body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <p className="font-secondary text-[14px] text-[#666] tracking-[0.15em] uppercase mb-6">
          Coming Soon
        </p>
        <div className="w-16 h-[1px] bg-[#2A2A2A]" />
      </div>
    </section>
  );
}

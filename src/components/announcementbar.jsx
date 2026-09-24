import { siteConfig } from "../data/siteConfig";

export default function AnnouncementBar() {
  const loopMessages = [...siteConfig.announcements, ...siteConfig.announcements];

  return (
    <div className="w-full bg-bg-secondary border-b border-border overflow-hidden">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2.5">
        {loopMessages.map((msg, i) => (
          <span
            key={i}
            className="flex items-center text-tiny font-semibold uppercase tracking-widest text-text-secondary"
          >
            {msg}
            <span className="mx-6 text-accent">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

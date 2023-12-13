import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js",
};

export default function InventoriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="items-center justify-center gap-4 py-8 md:py-10">
      <div className="text-center justify-center">{children}</div>
    </section>
  );
}

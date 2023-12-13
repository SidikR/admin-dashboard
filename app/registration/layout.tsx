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
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    //   <div className="inline-block  text-center justify-center">{children}</div>
    // </section>
    <section className="items-center justify-center gap-4 py-8 md:py-10">
      <div className="text-center justify-center">{children}</div>
    </section>
  );
}

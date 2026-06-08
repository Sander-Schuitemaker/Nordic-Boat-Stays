import { Anchor, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-[calc(100vh-72px)] lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <section
        className="relative hidden min-h-[720px] overflow-hidden bg-cover bg-center lg:block"
        style={{
          backgroundImage:
            "linear-gradient(180deg,rgba(17,19,21,.18),rgba(17,19,21,.82)),url(https://images.unsplash.com/photo-1520769669658-f07657f5a307?auto=format&fit=crop&w=1600&q=85)",
        }}
      >
        <div className="absolute inset-x-0 bottom-0 p-12 text-white">
          <div className="flex items-center gap-3 text-sm font-semibold">
            <Anchor className="size-5" />
            Nordic Boat Stays
          </div>
          <h2 className="mt-6 max-w-xl text-4xl font-semibold">
            Noorwegen aan het water, met een boot die bij je verblijf hoort.
          </h2>
          <div className="mt-8 grid max-w-xl gap-3 text-sm text-white/85">
            {[
              "Persoonlijke boekingen en favorieten",
              "Privéberichten met je verhuurder",
              "Eén account om te reizen én te verhuren",
            ].map((item) => (
              <p key={item} className="flex items-center gap-3">
                <CheckCircle2 className="size-4 text-[#d4a761]" />
                {item}
              </p>
            ))}
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center px-4 py-12 sm:px-8 lg:px-14">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-10 inline-flex items-center gap-3 font-semibold">
            <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Anchor className="size-5" />
            </span>
            Nordic Boat Stays
          </Link>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
          <div className="mt-8">{children}</div>
        </div>
      </section>
    </main>
  );
}

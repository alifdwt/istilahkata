import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 bg-muted py-8">
      <div className="mx-auto max-w-screen-2xl px-4 text-center">
        {/* <h3 className="mb-2 font-mono text-xl font-bold text-primary">
          IstilahKata
        </h3> */}
        <Image
          src="/istilah-kata-logo.png"
          alt="IstilahKata"
          width={150}
          height={100}
          className="mx-auto mb-4"
        />
        <p className="mb-4 text-sm text-muted-foreground">
          Platform kolaboratif untuk memahami bahasa gaul dari semua generasi
        </p>
        <div className="flex justify-center gap-6 text-sm">
          {["Tentang", "Kebijakan Privasi", "Syarat & Ketentuan", "Kontak"].map(
            (link) => (
              <a
                key={link}
                href="#"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {link}
              </a>
            )
          )}
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          © 2024 IstilahKata. Semua hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

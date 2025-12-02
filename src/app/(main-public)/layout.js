import NavBar from "@/components/Shared/NavBar/NavBar/NavBar";

export default function RootLayout({ children }) {
  return (
    <section>
      <header className="sticky top-0 z-50">
        <header>
          <NavBar />
        </header>
      </header>
      <main>{children}</main>
      <footer></footer>
    </section>
  );
}

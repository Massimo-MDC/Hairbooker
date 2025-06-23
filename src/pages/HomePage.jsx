import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function HomePage() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen flex flex-col">
      {/* HERO SECTION */}
      <header
        className="relative bg-cover bg-center text-white h-[80vh] flex flex-col justify-center items-center text-center px-4"
        style={{
        backgroundImage:
      "url('https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
    }}
    >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold animate-fade-in">
                Hairbook Barber Shop
            </h1>
            <p className="text-xl md:text-2xl mt-4 animate-fade-in delay-200">
                La tua esperienza di stile, prenota il tuo prossimo look
            </p>

        <Link
            to={
            isAuthenticated
            ? user.role === "admin"
            ? "/admin/dashboard"
            : "/appointments"
            : "/login"
        }
        className="mt-8 px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded hover:bg-green-600 transition animate-fade-in delay-400 inline-block"
        >
            {isAuthenticated ? "Vai alle Prenotazioni" : "Prenota ora"}
        </Link>
  </div>
</header>



      {/* SERVIZI */}
      <section className="py-16 px-6 text-center bg-gray-100">
        <h2 className="text-4xl font-bold mb-10">I nostri servizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Taglio Uomo</h3>
            <p className="text-gray-600">Taglio classico o moderno, su misura per te.</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Rasatura Barba</h3>
            <p className="text-gray-600">Rasatura tradizionale e modellatura barba.</p>
          </div>
          <div className="p-6 bg-white rounded shadow hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-4">Colore e Styling</h3>
            <p className="text-gray-600">Personalizzazione del look con i migliori prodotti.</p>
          </div>
        </div>
      </section>

      {/* CONTATTI */}
      <section className="py-12 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Contattaci</h2>
        <p className="text-gray-700 mb-2">📍 Via Roma 123, Palermo</p>
        <p className="text-gray-700 mb-2">📞 091 1234567</p>
        <p className="text-gray-700">📧 info@hairbookbarber.it</p>
      </section>

      {/* FOOTER */}
      <footer className="py-6 bg-gray-800 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} Hairbook Barber Shop. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

export default HomePage;

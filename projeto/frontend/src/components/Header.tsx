import { useLocation, Link } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/": "Início",
  "/add": "Adicionar Jogo",
};

export default function Header() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Página";

  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="flex justify-between items-center max-w-4xl mx-auto">
        <h1 className="text-xl font-bold">{title}</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Início
          </Link>
          <Link to="/add" className="hover:underline">
            Adicionar
          </Link>
        </nav>
      </div>
    </header>
  );
}
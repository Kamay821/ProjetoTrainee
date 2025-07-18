import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  let pageTitle = "Filmes";
  if (location.pathname === "/") pageTitle = "Membros";
  else if (location.pathname === "/filmes") pageTitle = "Filmes OMDb";

  return (
    <header className="bg-orange-500 px-4 py-3 flex items-center gap-4">
      <img src="/icone.png" alt="Logo" className="w-20 h-20" />
      <h1 className="text-white text-4xl font-bold">{pageTitle}</h1>
    </header>
  );
}

import React from "react";
import "../Index.css";

// Definição das propriedades do componente Header
interface Props {
  onNavigate: (page: "cadastro" | "lista") => void;
  active: "cadastro" | "lista";
}

// Componente Header para navegação entre páginas
const Header: React.FC<Props> = ({ onNavigate, active }) => (
  <header className="header-ecommerce">
    <div className="header-content">
      <span className="header-title">E-Commerce</span>
      <nav className="header-nav">
        <button
          className={"header-btn" + (active === "cadastro" ? " active" : "")}
          onClick={() => onNavigate("cadastro")}
        >
          Cadastro
        </button>
        <button
          className={"header-btn" + (active === "lista" ? " active" : "")}
          onClick={() => onNavigate("lista")}
        >
          Lista
        </button>
      </nav>
    </div>
  </header>
);

export default Header;

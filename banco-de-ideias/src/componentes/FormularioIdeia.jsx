import React, { useState } from "react";

export default function FormularioIdeia({ onCadastrar }) {
  const [titulo, setTitulo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    onCadastrar(titulo);
    setTitulo("");
  };

  return (
    <div className="painel-cadastro">
      <h3>Nova ideia</h3>
      <form onSubmit={handleSubmit}>
        <div className="campo-grupo">
          <label htmlFor="reg-titulo">Título</label>
          <input
            id="reg-titulo"
            type="text"
            placeholder="App de receitas da vovó"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-principal">
          Adicionar ideia
        </button>
      </form>
    </div>
  );
}

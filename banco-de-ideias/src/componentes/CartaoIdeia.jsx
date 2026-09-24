import React, { useState } from "react";

export default function CartaoIdeia({ ideia, onAlternarStatus, onEditar, onExcluir }) {
  const [emEdicao, setEmEdicao] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState(ideia.title);

  const handleSalvar = () => {
    if (!novoTitulo.trim()) return;
    onEditar(ideia.id, novoTitulo);
    setEmEdicao(false);
  };

  const handleCancelar = () => {
    setNovoTitulo(ideia.title);
    setEmEdicao(false);
  };

  if (emEdicao) {
    return (
      <div className="cartao modo-edicao">
        <div className="form-edicao-inline">
          <label>Título</label>
          <input
            type="text"
            value={novoTitulo}
            onChange={(e) => setNovoTitulo(e.target.value)}
          />
          <div className="acoes-inline">
            <button className="btn-salvar-inline" onClick={handleSalvar}>
              Salvar
            </button>
            <button className="btn-secundario" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cartao">
      <div className="cartao-cabecalho">
        <h3>{ideia.title}</h3>
        <span className={`badge ${!ideia.completed ? "pendente" : ""}`}>
          {ideia.completed ? "executada" : "pendente"}
        </span>
      </div>
      <p className="cartao-sub">
        id {ideia.id} - userId {ideia.userId}
      </p>
      
      <div className="cartao-acoes">
        <button className="btn-secundario" onClick={() => onAlternarStatus(ideia)}>
          {ideia.completed ? "Reabrir" : "Marcar executada"}
        </button>
        <button className="btn-secundario" onClick={() => setEmEdicao(true)}>
          Editar
        </button>
        <button className="btn-secundario" onClick={() => onExcluir(ideia.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}

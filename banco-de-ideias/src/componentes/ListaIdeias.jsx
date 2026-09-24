import React from "react";
import CartaoIdeia from "./CartaoIdeia";

export default function ListaIdeias({ ideias, onAlternarStatus, onEditar, onExcluir }) {
  return (
    <div>
      <h2>Minhas ideias ({ideias.length})</h2>
      {ideias.map((ideia) => (
        <CartaoIdeia
          key={ideia.id}
          ideia={ideia}
          onAlternarStatus={onAlternarStatus}
          onEditar={onEditar}
          onExcluir={onExcluir}
        />
      ))}
    </div>
  );
}

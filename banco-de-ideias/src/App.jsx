import React, { useState, useEffect } from "react";
import FormularioIdeia from "./componentes/FormularioIdeia";
import ListaIdeias from "./componentes/ListaIdeias";
import "./App.css";

const API_URL = "https://typicode.com";

const IDEIAS_PADRAO = [
  { userId: 1, id: 1, title: "App de receitas da vovó", completed: false },
  { userId: 1, id: 2, title: "Jogo da memória em React", completed: false },
  { userId: 1, id: 3, title: "Mapa de pontos de ônibus", completed: true }
];

export default function App() {
  const [ideias, setIdeias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function carregarIdeias() {
      try {
        setCarregando(true);
        setErro(null);
        const resposta = await fetch(`${API_URL}?_limit=15`, { signal: controller.signal });
        
        if (!resposta.ok) throw new Error();
        
        const dados = await resposta.json();
        setIdeias(dados);
      } catch (error) {
        if (error.name !== "AbortError") {
          setIdeias(IDEIAS_PADRAO);
          setErro("Não foi possível conectar à API (Modo de segurança local ativo).");
        }
      } finally {
        setCarregando(false);
      }
    }

    carregarIdeias();
    return () => controller.abort();
  }, []);

  const handleCadastrarIdeia = async (titulo) => {

    const novoId = ideias.length > 0 ? Math.max(...ideias.map(i => i.id)) + 1 : 1;
    const novaIdeia = { userId: 1, id: novoId, title: titulo, completed: false };
    setIdeias([novaIdeia, ...ideias]);

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaIdeia),
      });
    } catch {
      console.log("API offline, mas o item foi salvo localmente no seu estado!");
    }
  };

  const handleEditarIdeia = async (id, novoTitulo) => {
    setIdeias(ideias.map((i) => (i.id === id ? { ...i, title: novoTitulo } : i)));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: novoTitulo }),
      });
    } catch {
      console.log("Editado localmente.");
    }
  };

  const handleAlternarStatus = async (ideia) => {
    const statusAtualizado = !ideia.completed;
    
    setIdeias(ideias.map((i) => (i.id === ideia.id ? { ...i, completed: statusAtualizado } : i)));

    try {
      await fetch(`${API_URL}/${ideia.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: statusAtualizado }),
      });
    } catch {
      console.log("Status atualizado localmente.");
    }
  };
  const handleExcluirIdeia = async (id) => {
    const copiaSeguranca = [...ideias];
    setIdeias(ideias.filter((i) => i.id !== id));

    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    } catch {
      console.log("Removido localmente.");
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="h1">
          Banco de Ideias <span>Projeto P1 — PTAC4 — anotação de ideias de projetos</span>
        </h1>
        
      </header>

      <div className="layout-corpo">
        <FormularioIdeia onCadastrar={handleCadastrarIdeia} />

        <div className="area-principal">
          {ideias.length > 0 && (
            <ListaIdeias
              ideias={ideias}
              onAlternarStatus={handleAlternarStatus}
              onEditar={handleEditarIdeia}
              onExcluir={handleExcluirIdeia}
            />
          )}

          {!carregando && ideias.length === 0 && (
            <div className="status-erro">Nenhuma ideia por aqui — que tal cadastrar a primeira?</div>
          )}

          {carregando && (
            <div className="status-carregando">
              <input type="radio" checked readOnly disabled /> Carregando ideias...
            </div>
          )}

          {erro && (
            <div className="status-erro" style={{ backgroundColor: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5" }}>
              {erro}
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

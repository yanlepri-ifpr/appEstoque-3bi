import { useState } from 'react';
import { produtoApi } from '../api/api';
import type { Categoria } from '../types';

interface Props {
  categorias: Categoria[];
  onProdutoCriado: () => void;
}

export function FormularioProduto({ categorias, onProdutoCriado }: Props) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [erro, setErro] = useState('');

  function validar(): string {
    if (!nome.trim()) {
      return 'Informe o nome do produto';
    }

    const precoNumero = Number(preco);
    if (Number.isNaN(precoNumero) || precoNumero <= 0) {
      return 'Informe um preço maior que zero';
    }

    const quantidadeNumero = Number(quantidade);
    if (!quantidade.trim() || !Number.isInteger(quantidadeNumero) || quantidadeNumero < 0) {
      return 'Informe uma quantidade inteira maior ou igual a zero';
    }

    if (!categoriaId) {
      return 'Selecione a categoria do produto';
    }

    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const mensagemErro = validar();
    if (mensagemErro) {
      setErro(mensagemErro);
      return;
    }

    setErro('');

    try {
      await produtoApi.criar({
        nome: nome.trim(),
        preco: Number(preco),
        quantidade: Number(quantidade),
        categoriaId: Number(categoriaId),
      });
    } catch (err: any) {
      setErro(err.response?.data?.message ?? 'Erro ao cadastrar o produto');
      return;
    }

    setNome('');
    setPreco('');
    setQuantidade('');
    setCategoriaId('');
    onProdutoCriado();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Novo Produto</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Nome</label>
        <br />
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Preço</label>
        <br />
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Quantidade inicial</label>
        <br />
        <input
          type="number"
          step="1"
          min="0"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Categoria</label>
        <br />
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Selecione...</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button type="submit">Salvar</button>
    </form>
  );
}

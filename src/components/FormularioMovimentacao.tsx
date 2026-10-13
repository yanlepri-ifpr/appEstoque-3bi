import { useState } from 'react';
import { movimentacaoApi } from '../api/api';
import type { Produto, TipoMovimentacao } from '../types';

interface Props {
  produtos: Produto[];
  onMovimentacaoCriada: () => void;
}

export function FormularioMovimentacao({ produtos, onMovimentacaoCriada }: Props) {
  const [produtoId, setProdutoId] = useState('');
  const [tipo, setTipo] = useState<TipoMovimentacao>('ENTRADA');
  const [quantidade, setQuantidade] = useState('');
  const [erro, setErro] = useState('');

  function validar(): string {
    if (!produtoId) {
      return 'Selecione o produto da movimentação';
    }

    const quantidadeNumero = Number(quantidade);
    if (!quantidade.trim() || !Number.isInteger(quantidadeNumero) || quantidadeNumero <= 0) {
      return 'Informe uma quantidade inteira maior que zero';
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
      await movimentacaoApi.criar({
        produtoId: Number(produtoId),
        tipo,
        quantidade: Number(quantidade),
      });
    } catch (err: any) {
      setErro(err.response?.data?.message ?? 'Erro ao registrar a movimentação');
      return;
    }

    setProdutoId('');
    setQuantidade('');
    onMovimentacaoCriada();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nova Movimentação</h3>

      <div style={{ marginBottom: 12 }}>
        <label>Produto</label>
        <br />
        <select
          value={produtoId}
          onChange={(e) => setProdutoId(e.target.value)}
          style={{ padding: 8 }}
        >
          <option value="">Selecione...</option>
          {produtos.map((produto) => (
            <option key={produto.id} value={produto.id}>
              {produto.nome} — estoque atual: {produto.quantidade}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Tipo</label>
        <br />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as TipoMovimentacao)}
          style={{ padding: 8 }}
        >
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saída</option>
        </select>
      </div>

      <div style={{ marginBottom: 12 }}>
        <label>Quantidade</label>
        <br />
        <input
          type="number"
          step="1"
          min="1"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          style={{ padding: 8 }}
        />
      </div>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <button type="submit">Registrar</button>
    </form>
  );
}

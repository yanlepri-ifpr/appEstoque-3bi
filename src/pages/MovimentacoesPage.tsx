import { useEffect, useState } from 'react';
import { type Movimentacao, type Produto } from '../types';
import { movimentacaoApi, produtoApi } from '../api/api';
import { ListaMovimentacoes } from '../components/ListaMovimentacoes';
import { FormularioMovimentacao } from '../components/FormularioMovimentacao';

export function MovimentacoesPage() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function carregar() {
    const movimentacoesData = await movimentacaoApi.listar();
    const produtosData = await produtoApi.listar();

    setMovimentacoes(movimentacoesData);
    setProdutos(produtosData);
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <div>
      <h2>Movimentações</h2>
      <ListaMovimentacoes movimentacoes={movimentacoes} />
      <hr />
      <FormularioMovimentacao
        produtos={produtos}
        onMovimentacaoCriada={carregar}
      />
    </div>
  );
}

import { type Movimentacao } from '../types';

interface Props {
  movimentacoes: Movimentacao[];
}

const ROTULO_TIPO: Record<Movimentacao['tipo'], string> = {
  ENTRADA: 'Entrada',
  SAIDA: 'Saída',
};

const COR_TIPO: Record<Movimentacao['tipo'], string> = {
  ENTRADA: '#15803d',
  SAIDA: '#b91c1c',
};

const formatadorData = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

export function ListaMovimentacoes({ movimentacoes }: Props) {
  if (movimentacoes.length === 0) {
    return <p>Nenhuma movimentação registrada.</p>;
  }

  return (
    <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Data/Hora</th>
          <th>Produto</th>
          <th>Tipo</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {movimentacoes.map((movimentacao) => (
          <tr key={movimentacao.id}>
            <td>{formatadorData.format(new Date(movimentacao.criadoEm))}</td>
            <td>{movimentacao.produto.nome}</td>
            <td style={{ color: COR_TIPO[movimentacao.tipo], fontWeight: 'bold' }}>
              {ROTULO_TIPO[movimentacao.tipo]}
            </td>
            <td>{movimentacao.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

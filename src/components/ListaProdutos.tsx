import { type Produto } from '../types';

interface Props {
  produtos: Produto[];
}

const formatadorPreco = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function ListaProdutos({ produtos }: Props) {
  if (produtos.length === 0) {
    return <p>Nenhum produto cadastrado.</p>;
  }

  return (
    <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        {produtos.map((produto) => (
          <tr key={produto.id}>
            <td>{produto.id}</td>
            <td>{produto.nome}</td>
            <td>{produto.categoria.nome}</td>
            <td>{formatadorPreco.format(produto.preco)}</td>
            <td>{produto.quantidade}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

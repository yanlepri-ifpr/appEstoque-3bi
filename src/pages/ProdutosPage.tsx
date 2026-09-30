import { useEffect, useState } from 'react';
import { type Categoria, type Produto } from '../types';
import { produtoApi, categoriaApi } from '../api/api';
import { ListaProdutos } from '../components/ListaProdutos';
import { FormularioProduto } from '../components/FormularioProduto';

export function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function carregar() {
    setProdutos(await produtoApi.listar());
  }

  useEffect(() => {
    carregar();
    categoriaApi.listar().then(setCategorias);
  }, []);

  return (
    <div>
      <h2>Produtos</h2>
      <ListaProdutos produtos={produtos} />
      <hr />
      <FormularioProduto categorias={categorias} onProdutoCriado={carregar} />
    </div>
  );
}

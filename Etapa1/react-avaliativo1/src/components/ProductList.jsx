import React, { useState } from 'react';
import ProductCard from './ProductCard';

const ProductList = () => {
    const [produtos, setProdutos] = useState([]);
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState('');
    const [editingPreco, setEditingPreco] = useState('');

    const addProduto = () => {
        if (nome.trim() === '' || preco.trim() === '') return;
        setProdutos([...produtos, { id: Date.now(), nome: nome, preco: preco }]);
        setNome('');
        setPreco('');
    };

    const startEditing = (id, nome, preco) => {
        setEditingId(id);
        setEditingNome(nome);
        setEditingPreco(preco);
    };

    const saveEdit = () => {
        setProdutos(
            produtos.map((produto) =>
                produto.id === editingId
                    ? {
                          ...produto,
                          nome: editingNome,
                          preco: editingPreco,
                      }
                    : produto
            )
        );
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    const deleteProduto = (id) => {
        setProdutos(produtos.filter((produto) => produto.id !== id));
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingNome('');
        setEditingPreco('');
    };

    return (
        <div
        style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
            <h2>Adicionar Produto</h2>
            <input
                style={{ margin: '30px 0 0 0', width: '200px', height: '30px' }}
                type="text"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Nome:"
            />
            <input
                style={{
                    margin: '20px 0 20px 0',
                    width: '200px',
                    height: '30px',
                }}
                type="text"
                value={preco}
                onChange={(event) => setPreco(event.target.value)}
                placeholder="Preço:"
            />
            <button onClick={addProduto}>Adicionar produto</button>
            <h2>Lista de Produtos</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {produtos.map((produto) => (
                    <li key={produto.id} style={{ margin: '10px 0' }}>
                        {editingId === produto.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingNome}
                                    onChange={(e) =>
                                        setEditingNome(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    value={editingPreco}
                                    onChange={(e) =>
                                        setEditingPreco(e.target.value)
                                    }
                                />
                                <button onClick={saveEdit}>Salvar</button>
                                <button onClick={cancelEditing}>
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <div>
                                <ProductCard produto={produto} />
                                <button
                                    onClick={() =>
                                        startEditing(
                                            produto.id,
                                            produto.nome,
                                            produto.preco
                                        )
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteProduto(produto.id)}
                                >
                                    Excluir
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
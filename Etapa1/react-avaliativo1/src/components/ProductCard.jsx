import React, { useState } from 'react';

const ProductCard = ({ produto }) => {
    return (
        <span>
            <p>Nome: {produto.nome}</p>
            <p>Preço: {produto.preco}</p>

            <button onClick={() => {}}>Adicionar ao carrinho</button>
        </span>
    );
};

export default ProductCard;
import React, { useState } from 'react';

const Contato = ( { contato}) => {
    return (
        <span>
            {contato.nome} - {contato.telefone}
        </span>
    )
};

export default Contato;

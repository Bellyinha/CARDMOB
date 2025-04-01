import React, { useState } from 'react';
import Contato from './Contato';

const ListaContato = () => {
    const [contatos, setContatos] = useState([]);
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingNome, setEditingNome] = useState('');
    const [editingTelefone, setEditingTelefone] = useState('');

    const addContato = () => {
        if (nome.trim() === '' || telefone.trim() === '') return;
        setContatos([...contatos, { id: Date.now(), nome, telefone }]);
        setNome('');
        setTelefone('');
    };

    const startEditing = (id, nome, telefone) => {
        setEditingId(id);
        setEditingNome(nome);
        setEditingTelefone(telefone);
    };

    const saveEdit = () => {
        setContatos(
            contatos.map((contato) =>
                contato.id === editingId
                    ? {
                          ...contato,
                          nome: editingNome,
                          telefone: editingTelefone,
                      }
                    : contato
            )
        );
        setEditingId(null);
        setEditingNome('');
        setEditingTelefone('');
    };

    const deleteContato = (id) => {
        setContatos(contatos.filter((contato) => contato.id !== id));
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingNome('');
        setEditingTelefone('');
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
            <h2 style={{ margin: '-10px' }}>Adicionar Contato</h2>
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
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
                placeholder="Telefone:"
            />
            <button onClick={addContato}>Adicionar contato</button>
            <h2>Lista de Contatos</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {contatos.map((contato) => (
                    <li key={contato.id} style={{ margin: '10px 0' }}>
                        {editingId === contato.id ? (
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
                                    value={editingTelefone}
                                    onChange={(e) =>
                                        setEditingTelefone(e.target.value)
                                    }
                                />
                                <button onClick={saveEdit}>Salvar</button>
                                <button onClick={cancelEditing}>
                                    Cancelar
                                </button>
                            </>
                        ) : (
                            <div>
                                <Contato contato={contato} />
                                <button
                                    onClick={() =>
                                        startEditing(
                                            contato.id,
                                            contato.nome,
                                            contato.telefone
                                        )
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteContato(contato.id)}
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

export default ListaContato;

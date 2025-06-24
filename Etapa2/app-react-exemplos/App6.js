import React, { useState, useEffect, use } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';

const BASE_URL = 'http://10.81.205.29:3000';

export default function App() {
    // CRUD em memória
    const [items, setItems] = useState([]);
    const [text, setText] = useState('');
    const [editItemId, setEditItemId] = useState(null);
    const [editItemText, setEditItemText] = useState('');
    const [quantidade, setQuantidade] = useState(0);
    const [editQuantidade, setEditQuantidade] = useState(0);
    // loading ... efeito de carregamento...
    const [loading, setLoading] = useState(false); 

    // buscar tudo
    const fetchItems = async () => {
        setLoading(true);
        try {
            // executa o que precisa, se der erro, vai para o catch
            const response = await fetch(`${BASE_URL}/compras`);
            const data = await response.json();
            console.log(JSON.stringify(data))
            setItems(data);
        } catch (error) {
            // quando der erro
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItems();
    }, []) 

    const addItem = async () => {
        if (text.trim() === '' || quantidade.trim() === '') {
            Alert.alert('Erro', 'Preencha ambos os campos.');
            return;
        }
        try {
            const response =  await fetch(`${BASE_URL}/compras`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text.trim(), quantidade: quantidade.trim() }),
            })
            if (response.ok) {
                await fetchItems();
            }
            else {
                console.error('Error adding item:', response.status);
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    // Update
    const updateItem = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/compras/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: editItemText, quantidade: editQuantidade }),
            });
            if (response.ok) {
                await fetchItems();
                setEditItemId(null);
                setEditItemText('');
                setEditQuantidade(0);
            } else {
                console.error('Failed to update item:', response.status);
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }

        
    };

    // Delete
    const deleteItem = async (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const response = await fetch(`${BASE_URL}/compras/${id}`, {
                                method: 'DELETE',
                            });
                            if (response.ok) {
                                await fetchItems();
                            } else {
                                console.error('Error deleting item:', response.status);
                            }
                        } catch (error) {
                            console.error('Error deleting item:', error);
                        }
                    }
                }
                
            ],
            { cancelable: true }
        )
    };

    // Read -> um unico item e/ou lista de itens
    const renderItem = ({ item }) => {
        if (item.id != editItemId) {
            return (
                <View style={styles.item}>
                    <Text style={styles.itemText}>Item: {item.text}</Text>
                    <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
                    <View style={styles.buttons}>
                        <Button
                            title="Edit"
                            onPress={() => {
                                setEditItemId(item.id);
                            }}
                            color={'deepskyblue'}
                        ></Button>
                        <Button
                            title="Delete"
                            onPress={() => deleteItem(item.id)}
                            color={'red'}
                        ></Button>
                    </View>
                </View>
            );
        } else {
            // Um item está sendo editado
            return (
                <View style={styles.item}>
                    <TextInput
                        style={styles.editInput}
                        onChangeText={setEditItemText}
                        value={editItemText}
                        placeholder="Enter item name"
                        autoFocus
                    />
                    <TextInput
                        style={styles.editInput}
                        onChangeText={setEditQuantidade}
                        value={editQuantidade.toString()}
                        placeholder="Enter quantity"
                        keyboardType="numeric"
                    />
                    <Button
                        title="Update"
                        onPress={() => updateItem(item.id)}
                        color={'deepskyblue'}
                    ></Button>
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                placeholder="Enter name item"
            />
            <TextInput
                style={styles.input}
                value={quantidade}
                onChangeText={setQuantidade}
                placeholder="Enter quantity"
                keyboardType="numeric"
            />
            <Button title="Add Item" onPress={addItem} color={'deepskyblue'} />
            <FlatList
                data={items}
                renderItem={renderItem} // cada item da lista (items) vai ser processado
                keyExtractor={(item) => item.id} // retorna o id do item
                style={styles.list}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eff0f0',
        marginTop: 50,
        padding: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'cursive',
    },
    buttonContainer: {
        marginTop: 12,
        flexDirection: 'row',
        gap: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    list: {
        marginTop: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    buttons: {
        flexDirection: 'row',
    },
    editInput: {
        flex: 1,
        marginRight: 10,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

// onPress = OnClick

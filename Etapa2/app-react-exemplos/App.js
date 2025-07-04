import React, { useState, useEffect, use } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, Alert } from 'react-native';

const BASE_URL = 'http://10.81.205.29:5000';

export default function App() {
    // CRUD em memória
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [editItemId, setEditItemId] = useState(null);
    const [editItemName, setEditItemName] = useState('');
    const [price, setPrice] = useState(0);
    const [editPrice, setEditPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [editDescription, setEditDescription] = useState('');
    // loading ... efeito de carregamento...
    const [loading, setLoading] = useState(false); 

    // buscar tudo
    const fetchItems = async () => {
        setLoading(true);
        try {
            // executa o que precisa, se der erro, vai para o catch
            const response = await fetch(`${BASE_URL}/api/catalog`);
            const data = await response.json();
            console.log(JSON.stringify(data))
            setItems(data.catalog);
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
        if (name.trim() === '' || price.trim() === '' || description.trim() === '') {
            Alert.alert('Erro', 'Preencha ambos os campos.');
            return;
        }
        try {
            const response =  await fetch(`${BASE_URL}/api/catalog`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim(), price: price.trim(), description: description.trim() }),
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
            const fValue = parseFloat(editPrice)
            const response = await fetch(`${BASE_URL}/api/catalog/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: editItemName,
                    price: fValue,
                    description: editDescription,
                }),
            });
            if (response.ok) {
                await fetchItems();
                setEditItemId(null);
                setEditItemName('');
                setEditPrice(0);
                setEditDescription('');
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
                            const response = await fetch(
                                `${BASE_URL}/api/catalog/${id}`,
                                {
                                    method: 'DELETE',
                                }
                            );
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
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={styles.itemText}>Name: {item.name}</Text>
                    <Text style={styles.itemText}>Price: {item.price}</Text>
                    <Text style={styles.itemText}>
                        Description: {item.description}
                    </Text>
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
                        onChangeText={setEditItemName}
                        value={editItemName}
                        placeholder="Enter item name"
                    />
                    <TextInput
                        style={styles.editInput}
                        onChangeText={setEditPrice}
                        value={editPrice}
                        placeholder="Enter price"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.editInput}
                        onChangeText={setEditDescription}
                        value={editDescription}
                        placeholder="Enter description"
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
                value={name}
                onChangeText={setName}
                placeholder="Enter name item"
            />
            <TextInput
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                placeholder="Enter price"
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
                autoFocus
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
import React from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

export default function RegisterScreen({ navigation }: any) {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

     function handleSubmit() {
        const userData = {
            name,
            email,
            password,
        };
        console.log('Dados do usuário:', userData);

        fetch('http://10.81.205.29:5000/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((text) => {
                        throw new Error(
                            `Erro da API: ${response.status} - ${text}`
                        );
                    });
                }
                return response.json();
            })
            .then((data) => {
                console.log('Usuário cadastrado:', data);
                alert('Cadastro realizado!');
                setName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.error('Erro ao cadastrar usuário:', error);
                alert('Erro ao realizar o cadastro, tente novamente.');
            });
    }


        return (
                <View style={styles.container}>
                    <Text>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        value={name}
                        onChangeText={setName}
                    />
                    <Text>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    <Text>Senha:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <Button title="Entrar" onPress={handleSubmit} />
                </View>
        );
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 20,
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            marginBottom: 12,
        }
    });
    
    

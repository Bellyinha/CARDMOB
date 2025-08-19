import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            // Lógica de login / conexão com o backend
            console.log('Login ok');
        } catch (err: any) {
            setError(err);
        }
    };

    return (
        <View style={styles.container}>
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
            {/* <Button title="Entrar" onPress={handleLogin} /> */}
            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
            <Button title="Entrar" onPress={handleLogin} />
            <Button
                title="Registrar"
                onPress={() => navigation.navigate('Register')}
            />
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

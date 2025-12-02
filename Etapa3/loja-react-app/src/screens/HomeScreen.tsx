import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
// EXCLUIR: import { useNavigation } from "@react-navigation/native";
import { useTheme } from '../contexts/ThemeContext'; // Nova
import { useAuth } from "../contexts/AuthContext";

function HomeScreen({ navigation }: any) { // INCLUIR {navigation}: any
    // EXCLUIR const navigation = useNavigation();
    const { theme, toggleTheme } = useTheme();
    const { login } = useAuth();

    return (
        <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
            <Text style={{ color: theme.colors.text, marginBottom: theme.spacing(1) }}>
                Home Screen
            </Text>
            <Button title="Alternar Tema" color={theme.colors.primary} onPress={toggleTheme}/>
            <Button title="Ir para Detalhes" onPress={ () => navigation.navigate('Details')} />
            <Button title="Login" onPress={ () => navigation.navigate('Login')}/>
            <Button  title="Fake Login" onPress={ () => login('fake_token') }/>
        </View>
    );
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
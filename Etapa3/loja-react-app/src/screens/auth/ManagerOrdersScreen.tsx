import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

function ManagerOrdersScreen({ navigation }: any) {
    const { login } = useAuth();

    return (
        <View style={styles.container}>
            <Text>Gestão de pedidos</Text>
        </View>
    );
}
export default ManagerOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

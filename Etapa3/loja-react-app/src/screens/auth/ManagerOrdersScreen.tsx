import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    FlatList,
    SafeAreaView,
} from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import { getOrders, updateOrderStatus } from '../../services/orderService';

function ManagerOrdersScreen({ navigation }: any) {
    const { user } = useAuth();
    const [ordersInfo, setOrdersInfo] = useState<any[]>([]);

    useEffect(() => {
        const loadOrders = async () => {
            const orders = await getOrders(user);
            console.log(orders);
            setOrdersInfo(orders);
        };
        loadOrders();
    }, []);

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.customerName}</Text>
            <Text style={styles.statusValue}>{item.status}</Text>

            <Text style={styles.label}>
                Endereço de entrega{item.customerAddress}
            </Text>
            <Text style={styles.label}>Telefone{item.customerPhone}</Text>
            <Text style={styles.label}>
                Total: R${item.totalPrice.toFixed(2)}
            </Text>
            <Text style={styles.label}>
                Data:
                {item.createdAt.toLocaleString('pt-BR', {
                    timezone: 'America/Sao_Paulo',
                })}
            </Text>

            <Text>Produtos:</Text>
            {item.orderOffering.length > 0 ? (
                item.orderOffering.map((orderItem, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text style={styles.itemDetails}>
                            {orderItem.offering.name} - x{orderItem.quantity} -
                            R$ {orderItem.subtotal.toFixed(2)}
                        </Text>
                    </View>
                ))
            ) : (
                <Text>Nenhum produto no pedido</Text>
            )}

            <View style={styles.buttonContainer}>
                {['Em Produção', 'A Caminho', 'Entregue', 'Cancelado'].map(
                    (title, index) => (
                        <View key={index} style={styles.buttonWrapper}>
                            <Button
                                title={title}
                                color="grey"
                                onPress={async () => {
                                    await updateOrderStatus(
                                        item.id,
                                        title,
                                        user
                                    );
                                    // @todo recarregar os pedidos;
                                }}
                            />
                        </View>
                    )
                )}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {ordersInfo.orders ? (
                <FlatList
                    data={ordersInfo.orders}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={{ padding: 10 }}
                />
            ) : (
                <View style={styles.infoRow}>
                    <Text style={styles.title}>Nenhum pedido encontrado</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
export default ManagerOrdersScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {},
    title: {},
    label: {},
    statusValue: {},
    itemContainer: {},
    itemDetails: {},
    buttonContainer: {},
    buttonWrapper: {},
    infoRow: {},
});

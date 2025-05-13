import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import List from './components/List';

export default function App() {

    return (
        <View style={styles.container}>
            <List/> 
            <View style={styles.redbox} />
            <View style={styles.bluebox} />
            <View style={styles.blackbox} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        height: 600,
        marginTop: 150,
    },
    redbox: {
        backgroundColor: 'lightcoral',
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    bluebox: {
        backgroundColor: 'lightblue',
        width: 100,
        height: 100,
    },
    blackbox: {
        backgroundColor: 'lightslategrey',
        width: 100,
        height: 100,
    },
});

// onPress = OnClick

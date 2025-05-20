import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native';

class ScrollViewExample extends Component {
    state = {
        names: [
            { name: 'Chris Redfield', id: 1 },
            { name: 'Leon S. Kennedy', id: 2 },
            { name: 'Ada Wong', id: 3 },
            { name: 'Claire Redfield', id: 4 },
            { name: 'Rebecca Chambers', id: 5 },
            { name: 'Albert Wesker', id: 6 },
            { name: 'Sheva Alomar', id: 7 },
            { name: 'Jake Muller', id: 8 },
            { name: 'Carlos Oliveira', id: 9 },
            { name: 'Piers Nivans', id: 10 },
            { name: 'Steve Burnside', id: 11 },
            { name: 'Sherry Birkin', id: 12 },
        ],
    };

    render() {
        return (
            <View>
                <ScrollView>
                    {this.state.names.map((item, index) => (
                        <View key={item.id} style={styles.item}>
                            <Image style={styles.image} source={require('../assets/umbrecorps.png')}/>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default ScrollViewExample;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#8b0000',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    image: {
        width: 70,
        height: 70,
    }
});
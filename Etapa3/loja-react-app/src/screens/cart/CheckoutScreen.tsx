import React, { useState, useContext } from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Platform, 
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

import { useShop } from '../../contexts/ShopContext';

const CheckoutScreen = ( {navigation}: any) => {
    const { getTotalPrice } = useShop();
    const {phone, setPhone} = useState('');
    const {address, setAddress} = useState('');
    const {customer, setCustomer} = useState('');
    const {paymentMethod, setPaymentMethod} = useState('');
}

export default CheckoutScreen;
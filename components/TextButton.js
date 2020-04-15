import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { peach, white, blue } from '../utils/colors';

export default function TextButton({ onPress, children, style = {} }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.btn}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        textAlign: 'center',
        backgroundColor: blue,
        color: white,
        fontSize: 15,
        padding: 20,
        marginBottom: 10,
    }
})

/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View} from 'react-native';

const Button = ({onPress, children}) => {
    const { button,text,container} = styles;
    
    return (
        <View style={container}>
            <TouchableOpacity 
                style={button}
                onPress={() => onPress()}>
                <Text style={text}>
                    {children}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = {
    container: {
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: '#8E8E8E',
        borderWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    text: {
        color: '#8E8E8E',
    },
};

export default Button;

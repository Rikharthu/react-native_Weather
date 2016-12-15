/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({onPress, children}) => {
    const { buttonStyle, textStyle } = styles;
    var a=4;
    return (
        <TouchableOpacity 
            style={buttonStyle}
            onPress={() => onPress()}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#000',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5
    }
};

export default Button;

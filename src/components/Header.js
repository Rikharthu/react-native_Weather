import React from 'react';
import { Text, View } from 'react-native';


// make a component
const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    // is equivalent to const textStyle=styles.textStyle
    
    // props are passed as function params

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
        </View>
    )
};

const styles = {
    textStyle: {
        fontSize: 20,
        color: '#000'
    },
    viewStyle: {
        backgroundColor: '#F6F6F6',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: '#000', // shadows do not work on android
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
        // iphone would need an additional paddingTop: 15
    }
};

// make this component available to other parts of the app (export it)
export default Header;

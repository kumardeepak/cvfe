import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';


export default class AppSerachBar extends Component {
    render() {
        const { placeholder, textChangeHandler,serachText } = this.props;
        return (
            <SearchBar

                containerStyle={{ backgroundColor: '#fff', borderColor: '#fff', borderTopColor: null, borderBottomColor: null }}
                inputStyle={{ backgroundColor: 'rgba(142,142,147,0.12)', paddingLeft: 25, borderColor: 'rgba(142,142,147,0.12)', borderTopRightRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}
                round
                // icon={{ type: 'font-awesome', name: 'search' }}
                onChangeText={(text) => textChangeHandler ? textChangeHandler(text) : console.log(text)}
                // onClear={someMethod}
                placeholder={placeholder} >{serachText}</SearchBar>
        );
    }
}
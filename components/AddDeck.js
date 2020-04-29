import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import TextButton from './TextButton';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { peach, blue, grey } from '../utils/colors';
import { saveDeckTitle } from '../utils/api';

class AddDeck extends React.Component {
    state = {
        deckName: ''
    }

    addDeck = (title) => {
        const { deckName } = this.state;

        // adding new deck
        if (deckName !== '') {
            const key = deckName;
            const title = deckName;
            saveDeckTitle(key, title)

            let deck = {}
            deck[deckName] = {
                title: title,
                questions: []
            }

            // updating redux
            this.props.dispatch(addDeck(deck));
        }

        // redirectiong to the AddCard component
        this.props.navigation.navigate('Deck', { title });
    }

    render() {
        const { deckName } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>What's the name of the new deck?</Text>
                <TextInput
                    placeholder='Name of the new deck'
                    underlineColorAndroid={grey}
                    style={styles.inputField}
                    value={deckName}
                    onChangeText={(deckName) => this.setState({ deckName })}
                />
                <TextButton onPress={() => this.addDeck(deckName)}>
                    Create new deck
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    inputField: {
        fontSize: 20,
        height: 40,
        marginBottom: 30,
        padding: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#758184',
        marginBottom: 50,
        padding: 20,
        alignSelf: 'center',
    }
})

export default connect()(AddDeck);
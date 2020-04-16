import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import { peach, white } from '../utils/colors';

class Dashboard extends React.Component {
    componentDidMount() {
        getDecks()
            .then((decks) => {
                this.props.dispatch(receiveDecks(decks))
            })
    }

    // navigates to the deck's deckview page
    onDeckPress = (title) => {
        this.props.navigation.navigate('Deck', { title });
    }

    render() {
        const { deckArray } = this.props;
        return (
            <View style={styles.container}>
                {deckArray.length > 0
                    ? <FlatList
                        data={deckArray}
                        renderItem={({ item }) => <Deck title={item.title} cardNumber={item.questions.length} onPress={() => this.onDeckPress(item.title)} />}
                        keyExtractor={item => item.title}
                    />
                    : <Text>You have no decks yet</Text>
                }
            </View>
        )
    }
}

function Deck({ title, cardNumber, onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.deckContainer}>
                <Text style={styles.deckTitle}>{title}</Text>
                <Text style={styles.deckText}>{cardNumber} cards</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    text: {
        fontSize: 30,
        marginTop: 30,
        marginBottom: 30,
        padding: 20,
        alignSelf: 'center',
    },
    deckContainer: {
        backgroundColor: peach,
        padding: 20,
        marginBottom: 10,
    },
    deckTitle: {
        color: white,
        textAlign: 'center',
        fontSize: 30,
    },
    deckText: {
        color: white,
        textAlign: 'center',
        fontSize: 10,
    }
})

// mapToProps or deck and their question properties
function mapStateToProps(decks) {
    const deckIds = Object.keys(decks);
    let deckArray = [];

    deckIds.map((id) => {
        deckArray.push(decks[id])
    })

    return {
        deckArray
    }
}

export default connect(mapStateToProps)(Dashboard);
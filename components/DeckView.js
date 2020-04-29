import React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';
import { white, green } from '../utils/colors';
import { connect } from 'react-redux';
import { removeDeck } from '../utils/api';
import { deleteDeck } from '../actions';

class DeckView extends React.Component {
    state = {
        exists: true
    }

    onStartQuiz = (questions, title) => {
        this.props.navigation.navigate('Quiz', { questions, title });
    }

    onAddCard = (title) => {
        this.props.navigation.navigate('Add Card', { title });
    }

    onDeleteDeck = (title) => {
        this.setState({
            exists: false
        })

        this.props.dispatch(deleteDeck(title));
        let removed = removeDeck(title)

        if (removed) {
            this.props.navigation.navigate('Dashboard');
        }
    }

    render() {
        const { exists } = this.state;
        let title;
        let questions;

        if (exists === true) {
            title = this.props.route.params.title;
            questions = this.props.decks[title].questions;
        }

        return (
            <View style={styles.container}>

                {exists === true &&
                    <View>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.subtitle}>{questions.length} of cards</Text>

                        {questions.length > 0 &&
                            <TextButton
                                style={{ backgroundColor: green }}
                                onPress={() => this.onStartQuiz(questions, title)}
                            >Start quiz</TextButton>
                        }

                        <TextButton
                            onPress={() => this.onAddCard(title)}
                        >Add card</TextButton>
                        <TextButton
                            onPress={() => this.onDeleteDeck(title)}
                        >Delete Deck</TextButton>
                    </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 40,
        marginTop: 30,
        padding: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: '#758184',
    },
    subtitle: {
        alignSelf: 'center',
        color: '#758184',
        marginBottom: 60,
    }
})

function mapStateToProps(decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckView);
import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import TextButton from './TextButton';
import { peach, white } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { addQuestion } from '../actions';
import { connect } from 'react-redux';

class AddCard extends React.Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const { question, answer } = this.state;

        // adding card
        if (question !== '' && answer !== '') {

            const { title } = this.props.route.params;

            const card = {
                question: question,
                answer: answer
            };

            // updating redux 
            const params = { title, card };
            this.props.dispatch(addQuestion(params));

            // adding to storage
            addCardToDeck(title, card);

            alert('Card has been successfully added to the deck!')

            // clear textinput
            this.setState({
                question: '',
                answer: ''
            })
        }
    }

    render() {
        const { question, answer } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Add new card</Text>
                <TextInput
                    placeholder='Question'
                    underlineColorAndroid={peach}
                    style={styles.inputField}
                    value={question}
                    onChangeText={(question) => this.setState({ question })}
                />
                <TextInput
                    placeholder='Answer'
                    underlineColorAndroid={peach}
                    style={styles.inputField}
                    value={answer}
                    onChangeText={(answer) => this.setState({ answer })}
                />
                <TextButton onPress={this.submit}>
                    Add new card
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
        backgroundColor: white,
        fontSize: 20,
        height: 50,
        marginBottom: 30,
        padding: 10,
    },
    text: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 50,
        padding: 20,
    }
})

export default connect()(AddCard);
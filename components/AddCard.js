import React from 'react';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import TextButton from './TextButton';
import { grey, white } from '../utils/colors';
import { addCardToDeck } from '../utils/api';
import { addQuestion } from '../actions';
import { connect } from 'react-redux';
import { setLocalNotification } from '../utils/notification';

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

            // set notification
            setLocalNotification();

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
                    underlineColorAndroid={grey}
                    style={styles.inputField}
                    value={question}
                    onChangeText={(question) => this.setState({ question })}
                />
                <TextInput
                    placeholder='Answer'
                    underlineColorAndroid={grey}
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
        fontSize: 20,
        height: 50,
        marginBottom: 30,
        padding: 10,
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#758184',
        alignSelf: 'center',
        marginBottom: 30,
        padding: 20,
    }
})

export default connect()(AddCard);
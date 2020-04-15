import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import TextButton from './TextButton';
import { peach, white } from '../utils/colors';

// The Quiz view starts with a question from the selected deck.
// The question is displayed, along with a button to show the answer.
// Pressing the 'Show Answer' button displays the answer.
// Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
// The view displays the number of questions remaining.
// When the last question is answered, a score is displayed.This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
// When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
// Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.

class QuizPage extends React.Component {
    state = {
        index: 0,
        showAnswer: false,
        correct: 0,
        wrong: 0
    }

    onShowAnswer = () => {
        this.setState({
            showAnswer: true
        })
    }

    onAnswerCorrect = () => {
        this.setState({
            correct: this.state.correct + 1,
            index: this.state.index + 1,
            showAnswer: false,
        })
    }

    onAnswerWrong = () => {
        this.setState({
            wrong: this.state.wrong + 1,
            index: this.state.index + 1,
            showAnswer: false,
        })
    }

    render() {
        const { questions } = this.props.route.params;
        const { index, showAnswer, correct, wrong } = this.state;

        return (
            <View style={styles.container}>
                {index < questions.length
                    ? <Quiz
                        showAnswer={showAnswer}
                        question={questions[index].question}
                        answer={questions[index].answer}
                        onAnswerPress={this.onShowAnswer}
                        onCorrectPress={this.onAnswerCorrect}
                        onWrongPress={this.onAnswerWrong}
                    />
                    : <EndPage
                        correct={correct}
                        wrong={wrong}
                        onPress={() => this.props.navigation.goBack()}
                    />
                }
            </View>
        )
    }
}

function Quiz({ showAnswer, question, answer, onAnswerPress, onCorrectPress, onWrongPress }) {
    return (
        <View>

            {showAnswer === false
                ? <View style={styles.questionContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{question}</Text>
                        <View style={styles.buttonContainer}>
                            <TextButton onPress={onAnswerPress}>Show answer</TextButton>
                        </View>
                    </View>
                </View>
                : <View style={styles.questionContainer}>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{answer}</Text>
                    </View>
                </View>
            }

            <View >
                <TextButton onPress={onCorrectPress}>Correct</TextButton>
                <TextButton onPress={onWrongPress}>Wrong</TextButton>
            </View>
        </View>
    )
}

function EndPage({ correct, wrong, onPress }) {
    return (
        <View>
            <View style={styles.questionContainer}>
                <View style={styles.endContainer}>
                    <Text style={styles.endText}>End of the quiz</Text>
                    <Text style={styles.endText}>Correct answers: {correct}</Text>
                    <Text style={styles.endText}>Wrong answers: {wrong}</Text>
                </View>
            </View>
            <TextButton onPress={onPress}>
                Return to the deck
            </TextButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    questionContainer: {
        height: 300,
        backgroundColor: peach,
        marginBottom: 20,
    },
    text: {
        fontSize: 15,
        color: white,
    },
    textContainer: {
        padding: 30,
    },
    buttonContainer: {
        marginTop: 150,
    },
    endContainer: {
        alignItems: "center",
        marginTop: 100,
    },
    endText: {
        color: white,
        fontSize: 30,
    }
})

export default QuizPage;
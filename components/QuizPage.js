import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import TextButton from './TextButton';
import { peach, white } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

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

    onAgain = () => {
        this.setState({
            index: 0,
            correct: 0,
            wrong: 0,
            showAnswer: false
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
                        index={index + 1}
                        questionsLength={questions.length}
                    />
                    : <EndPage
                        correct={correct}
                        wrong={wrong}
                        onPress={() => this.props.navigation.goBack()}
                        onAgainPress={this.onAgain}
                    />
                }
            </View>
        )
    }
}

function Quiz({ showAnswer, question, answer, onAnswerPress, onCorrectPress, onWrongPress, index, questionsLength }) {
    return (
        <View>

            {showAnswer === false
                ? <View style={styles.questionContainer}>
                    <View>
                        <Text style={styles.text}>{index}/{questionsLength}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{question}</Text>
                        <View style={styles.buttonContainer}>
                            <TextButton onPress={onAnswerPress}>Show answer</TextButton>
                        </View>
                    </View>
                </View>
                : <View style={styles.questionContainer}>
                    <View>
                        <Text style={styles.text}>{index}/{questionsLength}</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{question}</Text>
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

function EndPage({ correct, wrong, onPress, onAgainPress }) {
    // clear notification
    clearLocalNotification()
        .then(setLocalNotification);

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
            <TextButton onPress={onAgainPress}>
                Start the quiz again
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
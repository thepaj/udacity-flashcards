import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import TextButton from './TextButton';
import { black, white, grey, red, green } from '../utils/colors';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';
import { Entypo } from '@expo/vector-icons';
import { whitesmoke } from 'color-name';

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
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.questionNumber}>Question {index}/{questionsLength}</Text>
                        </View>
                        <Text style={styles.text}>{question}</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onAnswerPress}>
                                <Text style={styles.showAnswer}>SHOW ANSWER</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                : <View style={styles.questionContainer}>
                    <View style={styles.textContainer}>
                        <View>
                            <Text style={styles.questionNumber}>Question {index}/{questionsLength}</Text>
                        </View>
                        <Text style={styles.text}>{question}</Text>
                        <Text style={styles.answerText}>{answer}</Text>
                    </View>
                </View>
            }

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={onCorrectPress}>
                    <Entypo name='emoji-happy' size={80} color={green} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onWrongPress}>
                    <Entypo name='emoji-sad' size={80} color={red} />
                </TouchableOpacity>
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
                    <Text style={styles.endTitle}>End of the quiz</Text>
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
        marginBottom: 20,
        backgroundColor: grey,
        borderColor: grey,
        borderRadius: 5,
        borderWidth: 2,
    },
    questionNumber: {
        fontSize: 12,
        color: white,
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: white,
    },
    textContainer: {
        padding: 30,
    },
    buttonContainer: {
        marginTop: 170,
    },
    showAnswer: {
        alignSelf: 'center',
        color: white,
    },
    answerText: {
        color: '#339933',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 50,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    endContainer: {
        alignItems: "center",
        marginTop: 100,
    },
    endTitle: {
        color: white,
        fontWeight: 'bold',
        fontSize: 40,
    },
    endText: {
        color: white,
        fontSize: 20,
    }
})

export default QuizPage;
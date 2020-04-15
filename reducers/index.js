import { RECEIVE_DECKS, ADD_DECK, ADD_QUESTION, DELETE_DECK } from '../actions';

function decks(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }
        case ADD_QUESTION:
            const { title, card } = action.params;

            return {
                ...state,
                [title]: {
                    ...state[title],
                    questions: state[title].questions.concat([card])
                },
            };
        case DELETE_DECK:
            delete state[action.title]
            return {
                ...state,
            };

        default:
            return state
    }
}

export default decks;

//  ...state,
//     [action.question.author]: {
//                     ...state[action.question.author],
//         questions: state[action.question.author].questions.concat([action.question.id])
// }
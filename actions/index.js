export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_QUESTION = 'ADD_QUESTION';
export const DELETE_DECK = 'DELETE_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addQuestion(params) {
    return {
        type: ADD_QUESTION,
        params
    }
}

export function deleteDeck(title) {
    return {
        type: DELETE_DECK,
        title
    }
}
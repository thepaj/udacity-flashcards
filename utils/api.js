import { AsyncStorage } from 'react-native';
import { NOTIFICATION_KEY } from './notification';

export async function getDecks() {
    let keys = await AsyncStorage.getAllKeys();
    keys = keys.filter((key) => key !== NOTIFICATION_KEY);
    let result = await AsyncStorage.multiGet(keys);
    let object = {};

    result.map(item => {
        object[item[0]] = JSON.parse(item[1])
    })

    return object;
}

export function getDeck(id) {
    return AsyncStorage.getItem(id)
}

export function saveDeckTitle(key, title) {
    const newDeck = {
        title: title,
        questions: [],
    }
    return AsyncStorage.setItem(key, JSON.stringify(newDeck));
}

export function addCardToDeck(deckTitle, card) {
    return getDeck(deckTitle)
        .then((deck) => {
            const deckObject = JSON.parse(deck);
            deckObject.questions.push(card);

            AsyncStorage.setItem(deckTitle, JSON.stringify(deckObject))
        })
}

export async function removeDeck(key) {
    try {
        await AsyncStorage.removeItem(key);

        return true;
    }
    catch (exception) {
        return false;
    }
}

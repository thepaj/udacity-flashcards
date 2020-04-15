import { AsyncStorage } from 'react-native';

export async function getDecks() {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    let object = {};


    result.map(item => {
        object[item[0]] = JSON.parse(item[1])
        // array.push(JSON.parse(item[1]));
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
            console.log('adding card')
            const deckObject = JSON.parse(deck);
            deckObject.questions.push(card);

            AsyncStorage.setItem(deckTitle, JSON.stringify(deckObject))
        })
}

export async function removeDeck(key) {
    try {
        await AsyncStorage.removeItem(key);
        console.log(key);
        return true;
    }
    catch (exception) {
        return false;
    }
}

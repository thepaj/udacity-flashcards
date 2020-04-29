import React from 'react';
import { View, StatusBar } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from './components/Dashboard';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import DeckView from './components/DeckView';
import QuizPage from './components/QuizPage';

import { grey } from './utils/colors';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View>
      <StatusBar translucent backgroundColor={grey} {...props} />
    </View>
  )
}

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'Dashboard') {
            return <MaterialCommunityIcons name='cards-outline' size={30} color={grey} />;
          } else if (route.name === 'New deck') {
            return <FontAwesome name='plus-square-o' size={30} color={grey} />;
          }

        },
      })}
      tabBarOptions={{
        activeTintColor: grey,
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="New deck" component={AddDeck} />
    </Tab.Navigator>
  )
}

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <MyStatusBar />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Home} />
            <Stack.Screen name="Add Card" component={AddCard} />
            <Stack.Screen name="Deck" component={DeckView} />
            <Stack.Screen name="Quiz" component={QuizPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;

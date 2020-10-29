import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Easing } from 'react-native';
import TraveilList from './Screens/TraveilList';
import TraveilListDetails from './Screens/TraveilListDetail';
import { enableScreens } from 'react-native-screens';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
enableScreens();
const Stack = createSharedElementStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="TraveilList" headerMode="none">
        <Stack.Screen name="TraveilList" component={TraveilList} />
        <Stack.Screen
          name="TraveilListDetails"
          component={TraveilListDetails}
          options={() => ({
            gestureEnabled: false,
            transitionSpec: {
              open: {
                animation: "timing",
                config: { duration: 500, easing: Easing.inOut(Easing.ease) }
              },
              close: {
                animation: "timing",
                config: { duration: 500, easing: Easing.inOut(Easing.ease) }
              },
            },
            cardStyleInterpolator: ({ current: { progress } }) => {
              return {
                cardStyle: {
                  opacity: progress,
                }
              }
            }
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

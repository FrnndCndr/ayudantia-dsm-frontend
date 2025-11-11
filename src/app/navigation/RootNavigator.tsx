import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NowPlayingScreen from "../../features/music/screens/NowPlayingScreen";

export type RootStackParamList = { NowPlaying: undefined };
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="NowPlaying"
      screenOptions={{ headerShown: false, headerBackVisible: false }}
    >
      <Stack.Screen name="NowPlaying" component={NowPlayingScreen} />
    </Stack.Navigator>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SystemStatusScreen from "../../features/auth/screens/SystemStatusScreen";

export type RootStackParamList = {
  SystemStatus: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SystemStatus"
      screenOptions={{ 
        headerShown: true,
        headerBackVisible: false 
      }}
    >
      <Stack.Screen
        name="SystemStatus"
        component={SystemStatusScreen}
        options={{ title: "Estado del sistema" }}
      />
    </Stack.Navigator>
  );
}

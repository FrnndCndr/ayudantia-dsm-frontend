# Crear una App Móvil con React Native

# Inicializar proyecto
npm install -g expo-cli

# Crear un nuevo proyecto
expo init frontend-proyecto
cd frontend-proyecto

# Crear la estructura básica
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World desde mi App Móvil con React Native</Text>
      <StatusBar style="auto" />
    </View>
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

# Ejecutar la app
npm start
expo start
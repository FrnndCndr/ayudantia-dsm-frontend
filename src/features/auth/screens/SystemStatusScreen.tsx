// src/features/auth/screens/SystemStatusScreen.tsx
import React, { useEffect, useState } from "react";
import { ScrollView, Text, ActivityIndicator, StyleSheet, Platform, View } from "react-native";
import { getHealth, getDbTables } from "../api/authService";
import type { HealthResponse, DbTablesResponse } from "../models/system.models";

export default function SystemStatusScreen() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [db, setDb] = useState<DbTablesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [healthData, dbData] = await Promise.all([
          getHealth(),
          getDbTables()
        ]);
        
        setHealth(healthData);
        setDb(dbData);
      } catch (err: any) {
        console.error("Error al obtener datos del backend:", err);
        setError(err?.message ?? "Error al conectar con el backend");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Conectando con el backend...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Error de conexión</Text>
        <Text style={styles.errorDetail}>{error}</Text>
        <Text style={styles.hint}>
          Asegúrate de que el backend esté ejecutándose en {'\n'}
          http://localhost:7070
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.section}>/ (health)</Text>
      <Text selectable style={styles.code}>
        {JSON.stringify(health, null, 2)}
      </Text>

      <Text style={styles.section}>/db/tables</Text>
      <Text selectable style={styles.code}>
        {JSON.stringify(db, null, 2)}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 16 
  },
  title: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  section: { marginTop: 12, marginBottom: 6, fontWeight: "600" },
  code: {
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
    backgroundColor: "#111",
    color: "#eee",
    padding: 12,
    borderRadius: 8,
  },
  error: { 
    color: "#ff5252", 
    fontSize: 18, 
    fontWeight: "600", 
    textAlign: "center",
    marginBottom: 8 
  },
  errorDetail: {
    color: "#ff5252",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666"
  },
  hint: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic"
  }
});

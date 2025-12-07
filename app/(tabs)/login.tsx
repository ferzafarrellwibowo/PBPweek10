import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "../../services/auth";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Email dan password wajib diisi");
    }

    try {
      setLoading(true);
      await login(email, password);
      router.replace("/(tabs)/index"); // arahkan user ke halaman utama
    } catch (e: any) {
      Alert.alert("Login Gagal", e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#888"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#888"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={onLogin} style={styles.button} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>

      <Text style={styles.note}>Gunakan akun yang sudah terdaftar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", paddingHorizontal: 30, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 30, textAlign: "center", color: "#222" },
  input: { width: "100%", borderWidth: 1, borderColor: "#ccc", padding: 14, borderRadius: 10, marginBottom: 15, fontSize: 16, color: "#000" },
  button: { backgroundColor: "#007aff", paddingVertical: 14, borderRadius: 10, marginTop: 10 },
  buttonText: { textAlign: "center", color: "#fff", fontSize: 18, fontWeight: "600" },
  note: { textAlign: "center", marginTop: 15, fontSize: 13, color: "#888" },
});

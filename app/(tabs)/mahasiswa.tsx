import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getMahasiswa } from "../../services/mahasiswa";

export default function MahasiswaScreen() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getMahasiswa().then(setData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nama}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#ccc" },
});

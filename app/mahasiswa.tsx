import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { getMahasiswa } from "../services/mahasiswa";

export default function MahasiswaScreen() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const load = async () => {
      const result = await getMahasiswa();
      setData(result);
    };
    load();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 12 }}>
            <Text>Nama: {item.nama}</Text>
            <Text>NIM: {item.nim}</Text>
            <Text>Jurusan: {item.jurusan}</Text>
          </View>
        )}
      />
    </View>
  );
}

// app/(tabs)/index.tsx
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
// PASTIKAN import ini MENGARAH ke file service Firestore Anda
import { submitVote } from "../../services/vote";

// Data Kandidat (Tambahkan photoUrl)
const candidates = [
  { id: "K1", name: "Ferza Farrell", nomorUrut: 1, photoUrl: "https://picsum.photos/seed/ferza/400/400" }, 
  { id: "K2", name: "Wibowo Ferza", nomorUrut: 2, photoUrl: "https://picsum.photos/seed/wibowo/400/400" }, 
];

export default function VoteScreen() {
  const [voterId, setVoterId] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleVote = async () => {
    // Memastikan ID Pemilih terisi (Menggunakan komponen Alert)
    if (!voterId.trim()) {
      Alert.alert("Perhatian", "Anda harus memasukkan NIM/ID Pemilih."); 
      return;
    }
    // Memastikan Kandidat terpilih (Menggunakan komponen Alert)
    if (!selectedCandidate) {
      Alert.alert("Perhatian", "Anda harus memilih salah satu kandidat.");
      return;
    }

    const candidate = candidates.find(c => c.id === selectedCandidate);

    try {
      setLoading(true);
      
      // MEMANGGIL FUNGSI FIREBASE ASLI DARI FILE SERVICE
      await submitVote(voterId, candidate!.id, candidate!.name);
      
      // Notifikasi Berhasil (Menggunakan komponen Alert)
      Alert.alert("✅ Berhasil!", `Suara untuk ${candidate!.name} berhasil dicatat. Terima kasih atas partisipasi Anda.`); 
      setVoterId("");
      setSelectedCandidate(null);
    } catch (e: any) {
      // Notifikasi Gagal (Menggunakan komponen Alert)
      console.error("FIREBASE ERROR:", e);
      Alert.alert("Error Submit", `Gagal mencatat suara: ${e.message}.`); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}> Pemilihan Ketua Himpunan</Text>
      
      {/* Input ID Pemilih (Komponen TextInput) */}
      <View style={styles.section}> {/* Komponen View */}
        <Text style={styles.label}>Masukkan ID Pemilih Anda (NIM):</Text> {/* Komponen Text */}
        <TextInput // Komponen TextInput
          placeholder="Contoh: 12345678"
          value={voterId}
          onChangeText={setVoterId}
          style={styles.input}
          editable={!loading}
          keyboardType="numeric"
        />
      </View>

      {/* Daftar Kandidat (Komponen Image, Text, View) */}
      <Text style={styles.subheader}>Pilih Kandidat Anda:</Text>
      <View style={styles.candidatesGrid}> {/* Komponen View */}
        {candidates.map(c => (
          <TouchableOpacity // Bertindak sebagai Button
            key={c.id}
            style={[
              styles.candidateCard, 
              selectedCandidate === c.id && styles.selectedCandidate
            ]}
            onPress={() => setSelectedCandidate(c.id)}
            disabled={loading}
          >
            {/* Komponen Image */}
            <Image 
              source={{ uri: c.photoUrl }} 
              style={styles.candidatePhoto} 
            />
            
            <View style={styles.candidateInfo}> {/* Komponen View */}
              <Text style={styles.candidateNumber}>Nomor Urut {c.nomorUrut}</Text> {/* Komponen Text */}
              <Text style={styles.candidateName}>{c.name}</Text>
              
              <View style={[styles.voteIndicator, selectedCandidate === c.id && styles.selectedIndicator]}>
                 <Text style={[styles.indicatorText, selectedCandidate === c.id && styles.indicatorTextSelected]}>
                    {selectedCandidate === c.id ? "PILIHAN ANDA" : "PILIH"}
                 </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {/* Tombol Kirim Suara (Komponen Button/TouchableOpacity) */}
      <TouchableOpacity 
        style={[styles.button, (!voterId.trim() || !selectedCandidate || loading) && styles.buttonDisabled]} 
        onPress={handleVote} 
        disabled={!voterId.trim() || !selectedCandidate || loading} // Button
      >
        <Text style={styles.buttonText}> {/* Komponen Text */}
          {loading ? "Memproses Suara..." : "Kirim Suara Anda"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Pastikan pilihan Anda sudah benar sebelum mengirim.</Text>
      
    </ScrollView>
  );
}

// =========================================================
// STYLES
// =========================================================
const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: "#f5f5f5",
    minHeight: '100%'
  },
  header: { 
    fontSize: 24, 
    fontWeight: "800", 
    textAlign: 'center',
    marginBottom: 30,
    color: "#333",
  },
  subheader: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    marginTop: 10,
    color: "#555",
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#444",
    fontWeight: "600",
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    padding: 15, 
    fontSize: 16,
    backgroundColor: '#fff',
  },
  candidatesGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  candidateCard: { 
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#eee",
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  selectedCandidate: { 
    borderColor: "#007AFF", 
    backgroundColor: "#E0F0FF",
  },
  candidatePhoto: { // Komponen Image
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  candidateInfo: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  candidateNumber: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  candidateName: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: 'center',
    marginBottom: 10,
    color: "#333",
  },
  voteIndicator: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedIndicator: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  indicatorText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  indicatorTextSelected: {
    color: '#fff',
  },
  button: { 
    backgroundColor: "#007AFF",
    padding: 18, 
    borderRadius: 10, 
    marginTop: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "700", 
    textAlign: "center",
    fontSize: 18,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  }
});
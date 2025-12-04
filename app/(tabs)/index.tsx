import React, { useState } from 'react';
import {
  Alert, // Mengganti Button dengan TouchableOpacity untuk styling kustom
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

// Contoh data kandidat
const candidates = [
  {
    id: 'KANDIDAT_1',
    name: 'Ferza Farrell',
    moto: '"Inovasi untuk Himpunan yang Progresif"',
    imageUri: 'https://via.placeholder.com/200/4285F4/FFFFFF?text=Budi+S', // Warna biru modern
    nomorUrut: 1,
  },
  {
    id: 'KANDIDAT_2',
    name: 'Wibowo Ferza',
    moto: '"Kolaborasi Membangun Masa Depan"',
    imageUri: 'https://via.placeholder.com/200/EA4335/FFFFFF?text=Citra+D', // Warna merah modern
    nomorUrut: 2,
  }
];

export default function VoteScreen() {
  const [voterId, setVoterId] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  // Fungsi untuk menampilkan Alert konfirmasi
  const handleVote = () => {
    if (!voterId.trim()) {
      Alert.alert('⚠️ Perhatian', 'NIM/ID Pemilih harus diisi.', [{ text: 'OK' }]);
      return;
    }
    
    if (!selectedCandidate) {
      Alert.alert('⚠️ Perhatian', 'Anda harus memilih salah satu kandidat.', [{ text: 'OK' }]);
      return;
    }

    const candidate = candidates.find(c => c.id === selectedCandidate);

    Alert.alert(
      'Konfirmasi Suara',
      `Anda yakin memilih ${candidate?.name} (Nomor ${candidate?.nomorUrut})?`,
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Ya, Kirim Suara',
          onPress: () => {
            // Logika voting (API call) akan ditempatkan di sini
            console.log(`Suara dari ID: ${voterId} untuk Kandidat: ${selectedCandidate}`);
            
            Alert.alert(
              '✅ Terima Kasih!',
              `Suara Anda untuk ${candidate?.name} telah dicatat.`,
              [{ text: 'OK', onPress: () => {
                setVoterId('');
                setSelectedCandidate(null);
              } }]
            );
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Komponen untuk setiap kandidat
  const CandidateCard = ({ candidate }: { candidate: typeof candidates[0] }) => {
    const isSelected = selectedCandidate === candidate.id;
    
    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.selectedCard]}
        onPress={() => setSelectedCandidate(candidate.id)}
        activeOpacity={0.8}
      >
        <Text style={styles.nomorUrut}>{candidate.nomorUrut}</Text>
        <Image 
          source={{ uri: candidate.imageUri }} 
          style={styles.image} 
        />
        <View style={styles.cardContent}>
            <Text style={styles.nameText}>{candidate.name}</Text>
            <Text style={styles.motoText}>{candidate.moto}</Text>
        </View>
        
        {/* Indikator pilihan modern */}
        {isSelected && (
            <View style={styles.checkMarkContainer}>
                <Text style={styles.checkMark}>✓</Text>
            </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>PILIH KETUA HIMPUNAN</Text>
      <Text style={styles.subHeader}>Periode 2024/2025</Text>
      
      {/* Input ID Pemilih (NIM) */}
      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Masukkan NIM Anda:</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setVoterId}
          value={voterId}
          placeholder="Contoh: 13521001"
          keyboardType="default"
          autoCapitalize="characters"
          placeholderTextColor="#aaa"
        />
      </View>
      
      <Text style={styles.instructionText}>Ketuk gambar kandidat untuk memilih.</Text>

      {/* Kontainer Kandidat (Menggunakan flex: 1 untuk tampilan berdampingan yang rapih) */}
      <View style={styles.candidatesContainer}>
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </View>

      {/* Tombol Utama untuk Vote */}
      <TouchableOpacity
        style={[
            styles.voteButton, 
            (!voterId.trim() || !selectedCandidate) && styles.voteButtonDisabled
        ]}
        onPress={handleVote}
        disabled={!voterId.trim() || !selectedCandidate}
      >
        <Text style={styles.voteButtonText}>KIRIM SUARA </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // Latar belakang bersih
  },
  header: {
    fontSize: 28,
    fontWeight: '900', // Sangat tebal
    color: '#1A237E', // Warna Himpunan
    textAlign: 'center',
    marginTop: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: '400',
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 20,
  },
  // --- Input Section ---
  inputSection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    // Shadow ringan untuk kesan modern pada input
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  instructionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  // --- Candidates Section ---
  candidatesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15, // Jarak antar kandidat
    marginBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
    // Shadow yang lebih menonjol
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  selectedCard: {
    borderColor: '#FFC107', // Border tebal kuning/emas jika terpilih
    backgroundColor: '#FFFDE7', // Sedikit latar belakang kuning muda
  },
  nomorUrut: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFC107',
    marginBottom: 10,
  },
  image: {
    width: '100%', // Lebar responsif
    aspectRatio: 1, // Memastikan bentuknya kotak
    borderRadius: 1000, // Lingkaran sempurna
    marginBottom: 15,
    borderWidth: 4,
    borderColor: '#E0E0E0',
  },
  cardContent: {
    alignItems: 'center',
    minHeight: 80, // Memastikan tinggi kartu sama
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 5,
  },
  motoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  checkMarkContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#4CAF50', // Hijau
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  checkMark: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2, // Penyesuaian vertikal
  },
  // --- Vote Button ---
  voteButton: {
    backgroundColor: '#4CAF50', // Hijau yang menonjol
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  voteButtonDisabled: {
    backgroundColor: '#BDBDBD', // Abu-abu jika disabled
    shadowOpacity: 0,
    elevation: 0,
  },
  voteButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  ScrollView,
  Image
} from 'react-native';

export default function SearchScreen({ navigation }: { navigation: any }) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [aCarregar, setACarregar] = useState(false);

  // Os meus destinos em destaque para aparecerem logo na página
  const destinosDestaque = [
    { 
      id: '1', 
      name: 'Paris', 
      country: 'França', 
      latitude: 48.8566, 
      longitude: 2.3522, 
      imagem: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
      descricao: 'A cidade do amor e da luz, famosa pela Torre Eiffel e monumentos históricos.'
    },
    { 
      id: '2', 
      name: 'Tóquio', 
      country: 'Japão', 
      latitude: 35.6762, 
      longitude: 139.6503, 
      imagem: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
      descricao: 'Uma metrópole incrível que junta tradição milenar e alta tecnologia.'
    }
  ];

  // Pesquisa global em tempo real consoante o que escrevo
  useEffect(() => {
    if (termoPesquisa.trim().length < 2) {
      setResultados([]);
      return;
    }

    const timer = setTimeout(async () => {
      setACarregar(true);
      try {
        const resposta = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(termoPesquisa)}&count=10&language=pt&format=json`
        );
        const dados = await resposta.json();
        setResultados(dados.results || []);
      } catch (e) {
        console.log('Erro na pesquisa:', e);
      } finally {
        setACarregar(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [termoPesquisa]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Explorar Destinos 🌺</Text>

      {/* Caixa de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Pesquisar cidade ou país..."
        placeholderTextColor="#888"
        value={termoPesquisa}
        onChangeText={setTermoPesquisa}
      />

      {aCarregar && <ActivityIndicator size="small" color="#007AFF" style={{ marginVertical: 10 }} />}

      {/* Se não estiver a pesquisar nada, mostro os destaques. Se escrever, mostro a lista */}
      {termoPesquisa.trim().length < 2 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitulo}>Destinos em Destaque</Text>
          {destinosDestaque.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.cardDestaque}
              onPress={() => navigation.navigate('Details', { destino: item })}
            >
              <Image source={{ uri: item.imagem }} style={styles.imagemDestaque} />
              <View style={styles.overlay}>
                <Text style={styles.textoDestaque}>{item.name}, {item.country}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (!aCarregar ? <Text style={styles.vazio}>Nada encontrado.</Text> : null)}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.cardLista}
              onPress={() => {
                const destinoEscolhido = {
                  id: item.id.toString(),
                  name: item.name,
                  country: item.country || 'Mundo',
                  latitude: item.latitude,
                  longitude: item.longitude,
                  imagem: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
                  descricao: `Explora ${item.name} (${item.country || 'Local'}). Vê os pontos turísticos e o tempo.`
                };
                navigation.navigate('Details', { destino: destinoEscolhido });
              }}
            >
              <Text style={styles.nomeLista}>{item.name}</Text>
              <Text style={styles.paisLista}>{item.admin1 ? `${item.admin1}, ` : ''}{item.country}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', color: '#444', marginBottom: 10 },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#ddd', marginBottom: 15 },
  vazio: { textAlign: 'center', color: '#888', marginTop: 20 },
  cardDestaque: { height: 180, borderRadius: 15, overflow: 'hidden', marginBottom: 15 },
  imagemDestaque: { width: '100%', height: '100%' },
  overlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, backgroundColor: 'rgba(0,0,0,0.4)' },
  textoDestaque: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  cardLista: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 10, borderWidth: 1, borderColor: '#eee' },
  nomeLista: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  paisLista: { fontSize: 14, color: '#666', marginTop: 3 },
});
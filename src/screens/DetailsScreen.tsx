import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { obterMeteorologia } from '../services/weatherService'; // Importo o meu serviço da API

export default function DetailsScreen({ route }: { route: any }) {
  const { destino } = route.params;

  const [tempo, setTempo] = useState<any>(null);
  const [aCarregarTempo, setACarregarTempo] = useState(true);

  // Os meus pontos turísticos para este destino
  const pontosTuristicos = [
    { id: '1', nome: `Centro Histórico`, desc: 'Zona principal repleta de pontos de interesse e comércio.' },
    { id: '2', nome: 'Miradouro Local', desc: 'O melhor sítio para tirar fotografias panorâmicas da cidade.' },
  ];

  // Vou buscar a meteorologia usando as coordenadas do destino
  useEffect(() => {
    async function carregar() {
      const dados = await obterMeteorologia(destino.latitude, destino.longitude);
      setTempo(dados);
      setACarregarTempo(false);
    }
    carregar();
  }, [destino]);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Fotografia principal / capa */}
      <Image source={{ uri: destino.imagem }} style={styles.capa} />

      <View style={styles.conteudo}>
        <Text style={styles.titulo}>{destino.name}</Text>
        <Text style={styles.pais}>{destino.country}</Text>

        <Text style={styles.descricao}>{destino.descricao}</Text>

        {/* Bloco da Meteorologia (API) */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>🌤️ Meteorologia Atual</Text>
          {aCarregarTempo ? (
            <ActivityIndicator size="small" color="#007AFF" style={{ marginTop: 10 }} />
          ) : (
            <View style={{ marginTop: 5 }}>
              <Text style={styles.textoCard}>Temperatura: {tempo?.temperatura || 'N/D'}</Text>
              <Text style={styles.textoCard}>Vento: {tempo?.vento || 'N/D'}</Text>
            </View>
          )}
        </View>

        {/* Pontos Turísticos e Fotografias */}
        <Text style={styles.subtitulo}>Pontos Turísticos</Text>
        {pontosTuristicos.map((ponto) => (
          <View key={ponto.id} style={styles.cardPonto}>
            <Text style={styles.nomePonto}>{ponto.nome}</Text>
            <Text style={styles.descPonto}>{ponto.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  capa: { width: '100%', height: 280 },
  conteudo: { padding: 20, marginTop: -25, backgroundColor: '#f8f9fa', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  titulo: { fontSize: 30, fontWeight: 'bold', color: '#333' },
  pais: { fontSize: 16, color: '#666', marginBottom: 10 },
  descricao: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 20 },
  card: { backgroundColor: '#fff', padding: 18, borderRadius: 14, borderWidth: 1, borderColor: '#eee', marginBottom: 25 },
  cardTitulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  textoCard: { fontSize: 14, color: '#555', marginTop: 4 },
  subtitulo: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  cardPonto: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: '#eee' },
  nomePonto: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  descPonto: { fontSize: 14, color: '#666', marginTop: 4 },
});
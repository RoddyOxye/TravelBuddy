import { globalStyles } from '../styles/globalStyles';
import { colors } from '../theme/colors';
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";

interface Destination {
  id: string;
  name: string;
  country: string;
}

const destinations: Destination[] = [
  { id: "1", name: "Lisboa", country: "Portugal" },
  { id: "2", name: "Porto", country: "Portugal" },
  { id: "3", name: "Paris", country: "França" },
  { id: "4", name: "Roma", country: "Itália" },
  { id: "5", name: "Londres", country: "Reino Unido" },
];

export default function HomeScreen() {

  const [search, setSearch] = useState("");
  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name
        .toLowerCase()
        .includes(search.trim().toLowerCase())
  );

  const handleDestinationPress = (destination: Destination) => {
    Alert.alert(destination.name, destination.country);
  };

  return (
    <ScrollView
  style={globalStyles.screen}
  contentContainerStyle={{ padding: 20 }}>
      <View style={styles.section}>
        <TextInput
          placeholder="Pesquisar destinos..."
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Explorar destinos
        </Text>

        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              style={globalStyles.card}
              onPress={() =>
                handleDestinationPress(destination)
              }
            >
              <Text>{destination.name}</Text>
              <Text>{destination.country}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhum destino encontrado.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          As minhas viagens
        </Text>

        <TouchableOpacity
          style={globalStyles.card}
          onPress={() =>
            Alert.alert("Viagens", "Funcionalidade futura")
          }
        >
          <Text>Criar nova viagem +</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Desafios
        </Text>

        <TouchableOpacity
          style={globalStyles.card}
          onPress={() =>
            Alert.alert("Desafios", "Funcionalidade futura")
          }
        >
          <Text>Explorar desafios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilos mínimos e temporários
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    padding: 12,
    borderRadius: 8,
  },
});

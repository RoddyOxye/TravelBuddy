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
  Image,
} from "react-native";

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
}

interface Trip {
  id: string;
  destination: string;
  country: string;
  startDate: string;
  endDate: string;
  status: "planned" | "completed";
}

const destinations: Destination[] = [
  {
    id: "1",
    name: "Lisboa",
    country: "Portugal",
    description: "História, cultura e gastronomia",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600",
  },
  {
    id: "2",
    name: "Porto",
    country: "Portugal",
    description: "Vinho, paisagens e tradição",
    image: "https://images.unsplash.com/photo-1555881400-69a2384ed3fb?w=600",
  },
  {
    id: "3",
    name: "Paris",
    country: "França",
    description: "Arte, romance e monumentos",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600",
  },
  {
    id: "4",
    name: "Roma",
    country: "Itália",
    description: "História e arquitetura",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600",
  },
  {
    id: "5",
    name: "Londres",
    country: "Reino Unido",
    description: "Museus, cultura e atrações",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600",
  },
];

const trips: Trip[] = [
  {
    id: "1",
    destination: "Paris",
    country: "França",
    startDate: "2027-04-10",
    endDate: "2027-04-15",
    status: "planned",
  },
  {
    id: "2",
    destination: "Roma",
    country: "Itália",
    startDate: "2026-08-05",
    endDate: "2026-08-10",
    status: "completed",
  },
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

  const handleTripPress = (trip: Trip) => {
    Alert.alert(
      `Viagem a ${trip.destination}`,
      `${trip.country}\nDe ${trip.startDate} até ${trip.endDate}`
    );
  };

  const handleCreateTrip = () => {
    Alert.alert("Viagens", "Funcionalidade em desenvolvimento");
  };

  const handleChallenges = () => {
    Alert.alert("Desafios", "Funcionalidade em desenvolvimento");
  };

  return (
    <ScrollView
      style={globalStyles.screen}
      contentContainerStyle={{ padding: 20 }}
    >
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

        <FlatList
          data={filteredDestinations}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleDestinationPress(item)}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: 200, height: 140 }}
                resizeMode="cover"
              />

              <Text>
                {item.name}, {item.country}
              </Text>

              <Text>{item.description}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text>Nenhum destino encontrado.</Text>
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          As minhas viagens
        </Text>

        {trips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={globalStyles.card}
            onPress={() => handleTripPress(trip)}
          >
            <Text>
              {trip.destination}, {trip.country}
            </Text>

            <Text>
              {trip.startDate} - {trip.endDate}
            </Text>

            <Text>
              {trip.status === "planned"
                ? "Viagem planeada"
                : "Viagem concluída"}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={globalStyles.card}
          onPress={handleCreateTrip}
        >
          <Text>+ Criar nova viagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Desafios
        </Text>

        <TouchableOpacity
          style={globalStyles.card}
          onPress={handleChallenges}
        >
          <Text>Explorar desafios</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
}

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

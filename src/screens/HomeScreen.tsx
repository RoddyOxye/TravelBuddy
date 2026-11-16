import { getGreeting } from '../utils/getGreeting';
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

  const [greeting] = useState(getGreeting);

  return (
    <ScrollView
  style={globalStyles.screen}
  contentContainerStyle={globalStyles.screenContent}>
    <View style={globalStyles.section}>
      <Text style={globalStyles.sectionTitle}>
        {greeting.title}
      </Text>
      <Text style={globalStyles.secondaryText}>
        {greeting.subtitle}
      </Text>
    </View>
      <View style={globalStyles.section}>
        <TextInput
          placeholderTextColor={colors.textSecondary}
          placeholder="Pesquisar destinos..."
          value={search}
          onChangeText={setSearch}
          style={globalStyles.input}
        />
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
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
              <Text style={globalStyles.bodyText}>{destination.name}</Text>
              <Text style={globalStyles.secondaryText}>{destination.country}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={globalStyles.bodyText}>Nenhum destino encontrado.</Text>
        )}
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
          As minhas viagens
        </Text>

        <TouchableOpacity
          style={globalStyles.primaryButton}
          onPress={() =>
            Alert.alert("Viagens", "Funcionalidade futura")
          }
        >
          <Text style={globalStyles.primaryButtonText}>Criar nova viagem +</Text>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.section}>
        <Text style={globalStyles.sectionTitle}>
          Desafios
        </Text>

        <TouchableOpacity
          style={globalStyles.secondaryButton}
          onPress={() =>
            Alert.alert("Desafios", "Funcionalidade futura")
          }
        >
          <Text style={globalStyles.secondcaryButtonText}>Explorar desafios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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

  const handleCreateTrip = () => {
    Alert.alert("Viagens", "Funcionalidade em desenvolvimento");
  };

  const handleChallenges = () => {
    Alert.alert("Desafios", "Funcionalidade em desenvolvimento");
  };

  return (
    <ScrollView>
      <View>
        <TextInput
          placeholder="Pesquisar destinos..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View>
        <Text>Explorar destinos</Text>

        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <TouchableOpacity
              key={destination.id}
              onPress={() => handleDestinationPress(destination)}
            >
              <Text>{destination.name}</Text>
              <Text>{destination.country}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Nenhum destino encontrado.</Text>
        )}
      </View>

      <View>
        <Text>As minhas viagens</Text>

        <TouchableOpacity onPress={handleCreateTrip}>
          <Text>+ Criar nova viagem</Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Desafios</Text>

        <TouchableOpacity onPress={handleChallenges}>
          <Text>Explorar desafios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

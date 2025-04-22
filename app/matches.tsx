
import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { Heart } from "lucide-react-native";

const MATCHES = [
  {
    id: "1",
    name: "Sophie",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=800&q=80",
  },
  {
    id: "2",
    name: "Mia",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=800&q=80",
  },
];

export default function MatchesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Matches</Text>
      <FlatList
        data={MATCHES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.matchCard}>
            <Image source={{ uri: item.image }} style={styles.matchImage} />
            <Text style={styles.matchName}>{item.name}</Text>
            <Heart color="#FF5864" size={22} style={{ marginLeft: 8 }} />
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No matches yet. Keep swiping!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F6",
    alignItems: "center",
    paddingTop: 40,
  },
  title: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: "#FF5864",
    marginBottom: 10,
  },
  matchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    width: 320,
    shadowColor: "#FF5864",
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  matchImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 16,
  },
  matchName: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    color: "#22223B",
  },
  emptyText: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    color: "#9A8C98",
    marginTop: 40,
    textAlign: "center",
  },
});
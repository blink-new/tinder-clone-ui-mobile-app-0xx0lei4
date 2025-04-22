
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { User } from "lucide-react-native";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=800&q=80",
          }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>Emma, 25</Text>
      <Text style={styles.bio}>Bookworm. Yoga enthusiast. Dreaming big.</Text>
      <Pressable style={styles.editButton}>
        <User color="#fff" size={22} />
        <Text style={styles.editText}>Edit Profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F6",
    alignItems: "center",
    paddingTop: 60,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: "hidden",
    marginBottom: 18,
    borderWidth: 4,
    borderColor: "#FF5864",
    shadowColor: "#FF5864",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: "#22223B",
    marginBottom: 6,
  },
  bio: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    color: "#9A8C98",
    marginBottom: 24,
    textAlign: "center",
    width: 260,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF5864",
    borderRadius: 18,
    paddingHorizontal: 28,
    paddingVertical: 12,
    marginTop: 10,
    shadowColor: "#FF5864",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  editText: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
    marginLeft: 10,
  },
});
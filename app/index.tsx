
import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Pressable, Modal } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useAnimatedGestureHandler } from "react-native-reanimated";
import { Heart, X, Info } from "lucide-react-native";

const { width, height } = Dimensions.get("window");

const CARD_WIDTH = width * 0.9;
const CARD_HEIGHT = height * 0.65;

const PROFILES = [
  {
    id: "1",
    name: "Sophie",
    age: 24,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=800&q=80",
    bio: "Loves hiking, coffee, and dogs.",
  },
  {
    id: "2",
    name: "Mia",
    age: 22,
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=800&q=80",
    bio: "Designer. Dreamer. Cat mom.",
  },
  {
    id: "3",
    name: "Olivia",
    age: 27,
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=800&q=80",
    bio: "Foodie and world traveler.",
  },
  {
    id: "4",
    name: "Emma",
    age: 25,
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=800&q=80",
    bio: "Bookworm. Yoga enthusiast.",
  },
];

const COLORS = {
  background: "#FFF6F6",
  card: "#fff",
  like: "#4DED8A",
  nope: "#FF5864",
  accent: "#FF5864",
  text: "#22223B",
  subtext: "#9A8C98",
};

function ProfileCard({ profile, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: profile.image }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardName}>
          {profile.name}, <Text style={styles.cardAge}>{profile.age}</Text>
        </Text>
        <Text style={styles.cardBio} numberOfLines={2}>
          {profile.bio}
        </Text>
      </View>
    </Pressable>
  );
}

export default function HomeScreen() {
  const [profiles, setProfiles] = useState(PROFILES);
  const [modalProfile, setModalProfile] = useState(null);

  const swipeX = useSharedValue(0);
  const swipeY = useSharedValue(0);
  const [current, setCurrent] = useState(0);

  const [likeOpacity, setLikeOpacity] = useState(0);
  const [nopeOpacity, setNopeOpacity] = useState(0);

  const handleSwipe = (direction) => {
    setTimeout(() => {
      setCurrent((prev) => prev + 1);
      swipeX.value = 0;
      swipeY.value = 0;
      setLikeOpacity(0);
      setNopeOpacity(0);
    }, 300);
  };

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: swipeX.value },
        { translateY: swipeY.value },
        { rotate: `${swipeX.value / 20}deg` },
      ],
    };
  });

  const animatedLikeStyle = useAnimatedStyle(() => ({
    opacity: swipeX.value > 0 ? Math.min(swipeX.value / 100, 1) : 0,
    transform: [{ rotate: "-20deg" }],
  }));

  const animatedNopeStyle = useAnimatedStyle(() => ({
    opacity: swipeX.value < 0 ? Math.min(-swipeX.value / 100, 1) : 0,
    transform: [{ rotate: "20deg" }],
  }));

  // Reanimated v2+ gesture handler
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = swipeX.value;
      ctx.startY = swipeY.value;
    },
    onActive: (event, ctx) => {
      swipeX.value = ctx.startX + event.translationX;
      swipeY.value = ctx.startY + event.translationY;
    },
    onEnd: (event, ctx) => {
      if (swipeX.value > 120) {
        swipeX.value = withTiming(width * 1.5, { duration: 200 }, () => {
          runOnJS(handleSwipe)("like");
        });
        runOnJS(setLikeOpacity)(1);
      } else if (swipeX.value < -120) {
        swipeX.value = withTiming(-width * 1.5, { duration: 200 }, () => {
          runOnJS(handleSwipe)("nope");
        });
        runOnJS(setNopeOpacity)(1);
      } else {
        swipeX.value = withSpring(0);
        swipeY.value = withSpring(0);
        runOnJS(setLikeOpacity)(0);
        runOnJS(setNopeOpacity)(0);
      }
    },
  });

  const currentProfile = profiles[current];
  const nextProfile = profiles[current + 1];

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {nextProfile && (
          <Animated.View style={[styles.cardAnimated, { zIndex: 0, top: 10, opacity: 0.7 }]}>
            <ProfileCard profile={nextProfile} onPress={() => setModalProfile(nextProfile)} />
          </Animated.View>
        )}
        {currentProfile ? (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={[styles.cardAnimated, animatedCardStyle, { zIndex: 1 }]}>
              <ProfileCard profile={currentProfile} onPress={() => setModalProfile(currentProfile)} />
              <Animated.View style={[styles.likeBadge, animatedLikeStyle]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>
              <Animated.View style={[styles.nopeBadge, animatedNopeStyle]}>
                <Text style={styles.nopeText}>NOPE</Text>
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No more profiles nearby.</Text>
          </View>
        )}
      </View>
      <View style={styles.actionRow}>
        <Pressable
          style={[styles.actionButton, { backgroundColor: COLORS.nope }]}
          onPress={() => {
            swipeX.value = withTiming(-width * 1.5, { duration: 200 }, () => {
              handleSwipe("nope");
            });
            setNopeOpacity(1);
          }}
        >
          <X color="#fff" size={32} />
        </Pressable>
        <Pressable
          style={[styles.actionButton, { backgroundColor: COLORS.like }]}
          onPress={() => {
            swipeX.value = withTiming(width * 1.5, { duration: 200 }, () => {
              handleSwipe("like");
            });
            setLikeOpacity(1);
          }}
        >
          <Heart color="#fff" size={32} />
        </Pressable>
        <Pressable
          style={[styles.infoButton]}
          onPress={() => {
            if (currentProfile) setModalProfile(currentProfile);
          }}
        >
          <Info color={COLORS.accent} size={28} />
        </Pressable>
      </View>
      <Modal
        visible={!!modalProfile}
        animationType="slide"
        transparent
        onRequestClose={() => setModalProfile(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {modalProfile && (
              <>
                <Image
                  source={{ uri: modalProfile.image }}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalName}>
                  {modalProfile.name}, <Text style={styles.modalAge}>{modalProfile.age}</Text>
                </Text>
                <Text style={styles.modalBio}>{modalProfile.bio}</Text>
                <Pressable
                  style={styles.closeModal}
                  onPress={() => setModalProfile(null)}
                >
                  <Text style={styles.closeModalText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  cardsContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  cardAnimated: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
    backgroundColor: COLORS.card,
    shadowColor: "#FF5864",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: COLORS.card,
    shadowColor: "#FF5864",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cardImage: {
    width: "100%",
    height: "78%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  cardInfo: {
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    minHeight: 90,
  },
  cardName: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  cardAge: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 24,
    color: COLORS.subtext,
  },
  cardBio: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 16,
    color: COLORS.subtext,
    marginTop: 4,
  },
  likeBadge: {
    position: "absolute",
    top: 40,
    left: 30,
    borderWidth: 4,
    borderColor: COLORS.like,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: "rgba(77,237,138,0.15)",
  },
  likeText: {
    color: COLORS.like,
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    letterSpacing: 2,
  },
  nopeBadge: {
    position: "absolute",
    top: 40,
    right: 30,
    borderWidth: 4,
    borderColor: COLORS.nope,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: "rgba(255,88,100,0.15)",
  },
  nopeText: {
    color: COLORS.nope,
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    letterSpacing: 2,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 30,
  },
  actionButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5864",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  infoButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginLeft: 10,
  },
  emptyState: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5864",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
  emptyText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 22,
    color: COLORS.subtext,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(34,34,59,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 28,
    alignItems: "center",
    padding: 24,
    shadowColor: "#FF5864",
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 12,
  },
  modalImage: {
    width: "100%",
    height: 260,
    borderRadius: 18,
    marginBottom: 18,
  },
  modalName: {
    fontFamily: "Montserrat_700Bold",
    fontSize: 28,
    color: COLORS.text,
    marginBottom: 4,
  },
  modalAge: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 24,
    color: COLORS.subtext,
  },
  modalBio: {
    fontFamily: "Montserrat_400Regular",
    fontSize: 18,
    color: COLORS.subtext,
    marginBottom: 18,
    textAlign: "center",
  },
  closeModal: {
    backgroundColor: COLORS.accent,
    borderRadius: 18,
    paddingHorizontal: 32,
    paddingVertical: 10,
    marginTop: 8,
  },
  closeModalText: {
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
    fontSize: 18,
  },
});
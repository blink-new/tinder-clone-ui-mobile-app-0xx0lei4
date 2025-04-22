
import { Tabs } from "expo-router";
import { useFonts, Montserrat_700Bold, Montserrat_400Regular } from "@expo-google-fonts/montserrat";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular,
  });

  useEffect(() => {
    // Required for gesture handler
  }, []);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#FF5864",
          tabBarInactiveTintColor: "#BDBDBD",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 10,
          },
          tabBarLabelStyle: {
            fontFamily: "Montserrat_700Bold",
            fontSize: 12,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => {
              const Icon = require("lucide-react-native").Flame;
              return <Icon color={color} size={28} />;
            },
          }}
        />
        <Tabs.Screen
          name="matches"
          options={{
            title: "Matches",
            tabBarIcon: ({ color }) => {
              const Icon = require("lucide-react-native").Heart;
              return <Icon color={color} size={28} />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => {
              const Icon = require("lucide-react-native").User;
              return <Icon color={color} size={28} />;
            },
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
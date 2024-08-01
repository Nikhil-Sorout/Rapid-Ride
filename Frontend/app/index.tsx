import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoarding from "@/components/OnBoarding";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Index() {
  const Words = ["Hey", "whats'up", "peeps"]
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [isDriver, setIsDriver] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      const driver = await AsyncStorage.getItem('isDriver');

      if (refreshToken != null) {
        setIsDriver(driver === 'true');
        setAuthenticated(true);
        setLoading(false);
      }
    }
    checkAuth();
  }, [])

  useEffect(() => {
    if (authenticated) {
      if (isDriver) {
        router.replace('/(tabs)');
      }
      else {
        router.replace('/(tabs)')
      }
    }
  },[authenticated, isDriver])

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={30} color={'lightblue'} />
      </View>
    )
  }


  return (
    <ScrollView pagingEnabled horizontal style={{ backgroundColor: "lightblue", opacity: .5 }} >
      {Words.map((title, index) => {
        return <OnBoarding key={index.toString()} title={title} index={index} />
      })}
    </ScrollView>
  );
}



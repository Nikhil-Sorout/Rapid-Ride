import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignIn" options={{ headerShown: false }} />
      <Stack.Screen name="screens/SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="screens/CheckInPassenger" options={{ headerShown: false }} />
      <Stack.Screen name="screens/CheckInDriver" options={{ headerShown: false }} />
      <Stack.Screen name="screens/DriverHomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="screens/PassengerHomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}


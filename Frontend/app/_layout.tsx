import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"  options={{headerShown: false}}/>
      <Stack.Screen name="screens/SignIn"  options={{headerShown: false}}/>
      <Stack.Screen name="screens/SignUp"  options={{headerShown: false}}/>
      <Stack.Screen name="screens/CheckInPassenger"  options={{headerShown: false}}/>
      <Stack.Screen name="screens/CheckInDriver"  options={{headerShown: false}}/>
    </Stack>
  );
}

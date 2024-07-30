import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import OnBoarding from "@/components/OnBoarding";

export default function Index() {
  const Words = ["Hey", "whats'up", "peeps"]
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event)=>{
    // console.log(event.contentOffset.x);
  })
  return (
    <Animated.ScrollView pagingEnabled horizontal style={{backgroundColor: "lightblue", opacity: .5}} onScroll={scrollHandler}>
      {Words.map((title, index)=>{
        return <OnBoarding key={index.toString()} title={title} index ={index} translateX={translateX} />
      })}
    </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({

})

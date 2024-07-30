import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated from 'react-native-reanimated'
import { Link } from 'expo-router'

interface pageProps {
    title: string,
    index: number,
    translateX: Animated.SharedValue<number>
}


const onBoarding: React.FC<pageProps> = ({ title, index, translateX }) => {
    const { width, height } = Dimensions.get('window')
    return (
        <View style={{ height: height, width: width, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text style={{ fontSize: 30, fontWeight: '800' }}>{title}</Text>
            </View>

            {/* Conditional rendering */}

            {index == 2 && <Link style={{position: 'absolute',bottom: 5, right: 15}} href={"/screens/SignIn"} asChild><TouchableOpacity style={{ backgroundColor: "white", height: 'auto', width: 'auto', padding: 5, borderRadius: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Sign In</Text>
            </TouchableOpacity>
            </Link>}

        </View>
    )
}

export default onBoarding
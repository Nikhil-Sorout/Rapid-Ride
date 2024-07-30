import { Image, View, TextInput, TouchableOpacity, Text,KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'

const SignIn = () => {
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View style={{ flex: 1, flexDirection: "column", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                <Image style={{ height: "30%", width: "70%", borderRadius: 120 }} source={require("../../assets/images/SignUpImage.jpg")} />
                <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 10 }}>Rapid Rides</Text>

                <View style={{ width: "100%", alignItems: 'center', rowGap: 10 }}>
                    <TextInput placeholder="Email" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10 }} />
                    <TextInput placeholder="Password" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10 }} />
                </View>
                <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Sign In</Text>
                </TouchableOpacity>

                <View style={{ position: 'absolute', bottom: 10 }}>
                    <Text style={{}}>Don't have an account? Register Now</Text>
                    <Link href={"/screens/SignUp"} asChild>
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
                            <Text style={{ fontWeight: '600' }}>Sign up</Text>
                        </TouchableOpacity></Link>
                </View>

            </View>
        </KeyboardAvoidingView>
    )
}

export default SignIn
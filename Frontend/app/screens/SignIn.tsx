import { Image, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { io } from 'socket.io-client'
import { localhost } from '@/helper'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signedIn, setSignedIn] = useState(false);
    const [isDriver, setIsDriver] = useState(false);

    const handleSignIn = async () => { 
        console.log("Signing in..... ")
        try{
            const response = await axios.post(`http://${localhost}/api/common/signIn`,
                {
                    email, password
                }
            )
            if(response.status==200)
            {
                console.log(response.data);
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;
                await AsyncStorage.setItem('accessToken', accessToken);
                await AsyncStorage.setItem('refreshToken', refreshToken);
                await AsyncStorage.setItem('isDriver', response.data.isDriver?'true':'false');
                setIsDriver(response.data.isDriver);
                setSignedIn(true);
            }
        }
        catch(err)
        {
            console.log(err);
        }
    }

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
                    <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10 }} />
                    <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10 }} />
                </View>
                {!signedIn && <TouchableOpacity onPress={handleSignIn} style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
                    <Text style={{ fontWeight: '600' }}>Sign In</Text>
                </TouchableOpacity>}

                {signedIn && <Link href={isDriver ? '/screens/DriverHomeScreen' : '/screens/PassengerHomeScreen'} asChild>
                    <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
                        <Text style={{ fontWeight: '600' }}>Continue</Text>
                    </TouchableOpacity></Link>}


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
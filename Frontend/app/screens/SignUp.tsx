import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '@/helper'

const SignUp = () => {

  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.get(`http://${localhost}/api/drivers/emailVerification`,
        {params :{email : email}}
      )
      console.log(response);
      if(response.status == 200 && response.data.status == "valid") setIsEmailValid(true);
      await AsyncStorage.setItem('email',email);
    }
    catch(err)
    {
      console.log(err);
    }
  }

  console.log(email);


  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1, flexDirection: "column", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ height: '30%', width: "70%", borderRadius: 120 }} source={require("../../assets/images/SignUpImage.jpg")} />
        <Text style={{ fontWeight: '800', fontSize: 20, marginTop: 10 }}>Rapid Rides</Text>

        <View style={{ width: "100%", alignItems: 'center', rowGap: 10 }}>
          <TextInput placeholder="Email" value={email} onChangeText={(text) => setEmail(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', columnGap: 5, marginTop: 5 }}>
          <TouchableOpacity onPress={() => setChecked(!checked)} style={{ borderWidth: 1, height: '60%', width: '4%', borderColor: 'lightblue', backgroundColor: checked ? "lightblue" : "white" }} />
          <Text style={{ fontWeight: "700", marginBottom: 5 }}>Check the box if you are a cab owner</Text>
        </View>


        {!isEmailValid && <TouchableOpacity disabled={email==""} onPress={verifyEmail} style={{ padding: 10, backgroundColor: !isEmailValid?"white":'lightblue', borderRadius: 10, margin: 10 }}>
          <Text style={{ fontWeight: '600' }}>Verify Email</Text>
        </TouchableOpacity>}

        {isEmailValid && <Link href={checked ? "/screens/CheckInDriver" : "/screens/CheckInPassenger"} asChild>
          <TouchableOpacity style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
            <Text style={{ fontWeight: '600' }}>Sign Up</Text>
          </TouchableOpacity>
        </Link>}

        <View style={{ position: 'absolute', bottom: 10 }}>
          <Text style={{}}>Already have an account?</Text>
          <Link href={"/screens/SignIn"} asChild>
            <TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
              <Text style={{ fontWeight: '600' }}>Get back in</Text>
            </TouchableOpacity></Link>
        </View>

      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUp

const styles = StyleSheet.create({})
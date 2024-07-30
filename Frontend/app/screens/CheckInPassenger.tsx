import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { localhost } from '@/helper'

const CheckInPassenger = () => {

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [registered, setRegistered] = useState(false);

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const data = {
    userName: userName,
    password: password,
    number: number,
    street: street,
    city: city,
    state: state,
    pincode: pincode,
  }

  const verifyNumber = async()=>{
    try{
      const response = await axios.get(`http://${localhost}/api/passengers/numberVerification`,
        {params:{
          number: number
        }}
      )
      if(response.status==200 && response.data.isValidNumber)
      {
        console.log("Number verified successfully");
        setPhoneVerified(true);
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }

  const handleSignUp = async()=>{
    try {
      const response = await axios.post(`http://${localhost}/api/passengers/signup`, {data, email: await AsyncStorage.getItem('email')});
      if(response.status==200)
      {
        setRegistered(true);
      }
    }
    catch(err)
    {
      console.log(err);
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>

      <Text style={{ fontWeight: "800", fontSize: 25 }}>Personal info</Text>
      
      <View style={{ rowGap: 10, marginTop: 10 }}>
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Username</Text>
        <TextInput placeholder="Enter username" value={userName} onChangeText={(text)=>setUsername(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
      
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Password</Text>
        <TextInput placeholder="Enter password" secureTextEntry={true} value={password} onChangeText={(text)=>setPassword(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Phone Number</Text>
        <TextInput placeholder="+91 XXXX XXXX XX" value={number} onChangeText={(text)=>setNumber(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
       
       {!phoneVerified && <TouchableOpacity onPress={verifyNumber} style={{padding: 2, backgroundColor: 'lightblue', width: 60, alignItems: 'center', borderRadius: 100}}>
          <Text style={{fontWeight: '500'}}>Verify</Text>
        </TouchableOpacity>}
       
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Address</Text>
       
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 5 }}>
          <TextInput placeholder="Street /Block /Building" value={street} onChangeText={(text)=>setStreet(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
          <TextInput placeholder="City" value={city} onChangeText={(text)=>setCity(text)} style={{ paddingLeft: 10, height: 40, width: "45%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
          <TextInput placeholder="State" value={state} onChangeText={(text)=>setState(text)} style={{ paddingLeft: 10, height: 40, width: "45%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
          <TextInput placeholder="Pincode" value={pincode} onChangeText={(text)=>setPincode(text)} style={{ paddingLeft: 10, height: 40, width: "45%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        </View>
      
      </View>
      
      <Link href={"/screens/CheckInPassenger"} asChild>
        {!registered && <TouchableOpacity disabled={!phoneVerified} onPress={handleSignUp} style={{ alignItems: 'center', padding: 10, backgroundColor: phoneVerified?'lightblue':'lightgrey', borderRadius: 10, margin: 10 }}>
          <Text style={{ fontWeight: '600' }}>Check In</Text>
        </TouchableOpacity>}
      </Link>

    </SafeAreaView >
  )
}

export default CheckInPassenger
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import axios from 'axios'
import { localhost } from '@/helper'

const CheckInDriver = () => {

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [DLnumber, setDLnumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [modelName, setModelName] = useState("");

  const data = {
    userName: userName,
    password: password,
    number: number,
    DLnumber: DLnumber,
    regNumber: regNumber,
    modelName: modelName
  }

  const handleSignUp = async()=>{
    try{
      const response = await axios.post(`http://${localhost}/api/drivers/signup`, data);
      if(response.status == 200)
      {
        console.log(response.data);
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
        <TextInput placeholder="Enter username" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Password</Text>
        <TextInput placeholder="Enter password" secureTextEntry={true} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Phone Number</Text>
        <TextInput placeholder="Enter phone number" keyboardType='numeric' style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>DL Number</Text>
        <TextInput placeholder="Enter vehicle number" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Vehicle Details</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 5 }}>
          <TextInput placeholder="Registration Number" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
          <TextInput placeholder="Model Name" style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        </View>
      </View>
      <Link href={"/screens/CheckInPassenger"} asChild>
        <TouchableOpacity onPress={handleSignUp} style={{ alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
          <Text style={{ fontWeight: '600' }}>Check In</Text>
        </TouchableOpacity>
      </Link>

    </SafeAreaView >
  )
}

export default CheckInDriver
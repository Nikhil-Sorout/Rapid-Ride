import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import axios from 'axios'
import { localhost } from '@/helper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { io, Socket } from 'socket.io-client'

const CheckInDriver = () => {

  const [socket, setSocket] = useState<Socket| null>(null);

  useEffect(() => {
    const newSocket = io(`http://${localhost}`);
    setSocket(newSocket);
  },[])

  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [DLnumber, setDLnumber] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [modelName, setModelName] = useState("");

  const [registered, setRegistered] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const data = {
    userName: userName,
    password: password,
    number: number,
    DLnumber: DLnumber,
    regNumber: regNumber,
    modelName: modelName,
    isDriver: true
  }

  const verifyNumber = async () => {
    try {
      const response = await axios.get(`http://${localhost}/api/common/numberVerification`,
        {
          params: {
            number: number
          }
        }
      )
      if (response.status == 200 && response.data.isValidNumber) {
        console.log("Number verified successfully");
        setPhoneVerified(true);
      }
    }
    catch (err) {
      console.log(err);
    }
  }


  const handleSignUp = async () => {
    try {
      const response = await axios.post(`http://${localhost}/api/drivers/signup`, { data, email: await AsyncStorage.getItem('email') });
      if (response.status == 200) {
        console.log(response.data);
        setRegistered(true);
        socket!.emit('joinRoom', 'drivers');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', padding: 10 }}>
      <Text style={{ fontWeight: "800", fontSize: 25 }}>Personal info</Text>
      <View style={{ rowGap: 10, marginTop: 10 }}>
        <Text style={{ fontWeight: "600", fontSize: 20 }}>Username</Text>
        <TextInput placeholder="Enter username" value={userName} onChangeText={(text) => setUsername(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />

        <Text style={{ fontWeight: "600", fontSize: 20 }}>Password</Text>
        <TextInput placeholder="Enter password" value={password} onChangeText={(text) => setPassword(text)} secureTextEntry={true} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />

        <Text style={{ fontWeight: "600", fontSize: 20 }}>Phone Number</Text>
        <TextInput placeholder="+91 XXXX XXXX XX" value={number} onChangeText={(text) => setNumber(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />

        {!phoneVerified && <TouchableOpacity onPress={verifyNumber} style={{ padding: 2, backgroundColor: 'lightblue', width: 60, alignItems: 'center', borderRadius: 100 }}>
          <Text style={{ fontWeight: '500' }}>Verify</Text>
        </TouchableOpacity>}

        <Text style={{ fontWeight: "600", fontSize: 20 }}>DL Number</Text>
        <TextInput placeholder="Enter vehicle number" value={DLnumber} onChangeText={(text) => setDLnumber(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />

        <Text style={{ fontWeight: "600", fontSize: 20 }}>Vehicle Details</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', rowGap: 10, columnGap: 5 }}>
          <TextInput placeholder="Registration Number" value={regNumber} onChangeText={(text) => setRegNumber(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
          <TextInput placeholder="Model Name" value={modelName} onChangeText={(text) => setModelName(text)} style={{ paddingLeft: 10, height: 40, width: "80%", borderWidth: 1, borderRadius: 10, borderColor: 'lightblue' }} />
        </View>
      </View>

      {!registered && <TouchableOpacity disabled={!phoneVerified} onPress={handleSignUp} style={{ alignItems: 'center', padding: 10, backgroundColor: phoneVerified ? 'lightblue' : 'lightgrey', borderRadius: 10, margin: 10 }}>
        <Text style={{ fontWeight: '600' }}>Check In</Text>
      </TouchableOpacity>}
      {registered && <Link href={"/screens/SignIn"} asChild><TouchableOpacity style={{ alignItems: 'center', padding: 10, backgroundColor: 'lightblue', borderRadius: 10, margin: 10 }}>
        <Text style={{ fontWeight: '600' }}>Continue</Text></TouchableOpacity></Link>}

    </SafeAreaView >
  )
}

export default CheckInDriver
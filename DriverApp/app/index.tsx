import { PermissionsAndroid, Platform, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from 'expo-location'
import { Pusher, PusherChannel, PusherEvent } from "@pusher/pusher-websocket-react-native";


export default function Index() {
  // const [location, setLocation] = useState(null)

  const state = {
    passenger: null, // passenger info
    region: null, // current location of driver
    accuracy: null, // accuracy of the location
    nearbyAlert: false, 
    has_passenger: false,
    has_ridden: false,
  }


  const [availabeDriversChannel, setAvailableDriversChannel] = useState({})
  const [rideChannel, setRideChannel] = useState({})
  const [pusherClient, setPusherClient] = useState({})
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);



  // Creating a new connection
  const pusher = Pusher.getInstance();
  // setPusherClient(pusher);

  useEffect(()=>{
    (async()=>{
      try{

        pusher.init({ 
          apiKey: process.env.EXPO_PUBLIC_APP_KEY!,
          cluster: process.env.EXPO_PUBLIC_APP_CLUSTER!,
          // authEndpoint: "https://rapid-ride.vercel.app/pusher/auth"
        });

        await pusher.connect();

        
        
        // Subscribing to a channel
        const channel: PusherChannel = await pusher.subscribe({channelName: 'ride-channel', onEvent:(async(event: PusherEvent)=>{
          console.log(event);
        })});
        setAvailableDriversChannel(channel);
      //   channel.onEvent(async(event: PusherEvent)=>{
      //     if(!state.has_passenger)
      //     {
      //       console.log(`Hey you got a passenger ${event.data}`)
      //       const ride_channel = await pusher.subscribe({channelName: `private-username-channel`, onSubscriptionSucceeded:()=>{
      //         ride_channel.trigger({
      //           eventName: 'client-driver-response', data: { "response": "Yes" },
      //           channelName: ""
      //         });
      //       }})
      //     }
      //   })
      }
      catch(err)
      {
        console.log(err);
      }
    })
  })


  const [lat, setLat] = useState(37.78825)
  const [lon, setLon] = useState(-122.4324)
  const region = {
    latitude: lat,
    longitude: lon,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }

  useEffect(()=>{
    (async()=>{
      const {status} = await Location.requestForegroundPermissionsAsync();
      if(status === 'granted')
      {
        const location = await Location.getCurrentPositionAsync({});
        console.log(location);
        setLat(location.coords.latitude);
        setLon(location.coords.longitude);
      }
      else{
        console.log("Location permission denied");
      }
    })
    ()
  },[])

  return (
    <View
      style={styles.container}
    >
      <MapView
        provider={PROVIDER_GOOGLE} 
        style={styles.map}
        region={region}
      >
        <Marker coordinate={{
          latitude: lat,
          longitude: lon,
        }} title="Hey">
          {/* <View style={{backgroundColor: 'red'}}>
            <Text>You are here</Text>
          </View> */}
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});


import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');
export default function Tab() {
    const [location, setLocation] = useState({});
    const [lat, setLat] = useState(37.78825)
    const [lon, setLon] = useState(-122.4324)
    
    const [pickupPoint, setPickupPoint] = useState("");
    const [dropPoint, setDropPoint] = useState("");
    
    
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const token = await AsyncStorage.getItem('accessToken');
                console.log(token);
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === "granted") {
                    const location = await Location.getCurrentPositionAsync();
                    setLocation(location);
                    setLat(location.coords.latitude);
                    setLon(location.coords.longitude);
                }
                else {
                    console.log('Location access denied')
                }
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchLocation()
    }, [])

    const region = {
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    console.log(location);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{backgroundColor: 'white', zIndex: 10, position:'absolute', top: 60, right: 30, borderRadius: 5, padding: 5}}>
                <Ionicons name="notifications-outline" size={25} color="lightblue"/>
            </TouchableOpacity>
            <MapView
                style={styles.map}
                region={region}
            >
                <Marker pinColor='lightblue' draggable={true} title='Pick up location' coordinate={{
                    latitude: lat,
                    longitude: lon
                }} />
            </MapView>
            
            
            <View style={{ justifyContent: 'center', alignItems: 'center', rowGap: 5, position: 'absolute', backgroundColor: 'white', padding: 10, borderRadius: 10, bottom: 10, width: '90%' }}>
                
                <Text style={{ fontSize: 20, fontWeight: '500', color: 'grey', textAlign: 'center' }}>Select location</Text>
                
                <View style={{ width: '90%' }}>
                    <TextInput placeholder='Pickup Location' value={pickupPoint} onChangeText={(text)=>setPickupPoint(text)} placeholderTextColor="grey" style={{ borderWidth: .5, padding: 5, paddingLeft: 10, borderRadius: 10, borderColor: 'lightblue' }} />
                    <TouchableOpacity style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Ionicons size={20} name="locate-outline" color={'lightblue'} />
                    </TouchableOpacity>
                </View>
                
                <Ionicons name='arrow-down-outline' size={20} color={'grey'} />
                
                <TextInput placeholder='Drop Location' value={dropPoint} onChangeText={(text)=>setDropPoint(text)} placeholderTextColor="grey" style={{ borderWidth: .5, padding: 5, paddingLeft: 10, borderRadius: 10, borderColor: 'lightblue', width: '90%' }} />
                
                <TouchableOpacity style={{ marginTop: 5, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 10 }}>
                    <Text style={{ fontWeight: '500', fontSize: 15, color: 'white' }}>Book a ride</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: height * .98,
        width: width,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

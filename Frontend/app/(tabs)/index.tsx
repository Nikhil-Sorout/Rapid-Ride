import { View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, FlatList } from 'react-native';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import * as Location from 'expo-location'
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { localhost } from '@/helper';

const { width, height } = Dimensions.get('window');
export default function Tab() {
    const [location, setLocation] = useState({});
    const [lat, setLat] = useState(37.78825)
    const [lon, setLon] = useState(-122.4324)

    const [pickupPoint, setPickupPoint] = useState("");
    const [dropPoint, setDropPoint] = useState("");
    const [selectLocation, setSelectLocation] = useState(false);
    const [pickUpLocationData, setPickUpLocationData] = useState([]);
    const [dropLocationData, setDropLocationData] = useState([]);
    const [pickUpData, setPickUpData] = useState({})
    const [dropData, setDropData] = useState({})

    const dummyData = [
        "Hey", "I", "am", "here", "behind", "you"
    ]

    const searchPickupLocation = async () => {
        try {
            console.log("Initiated....");
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(`http://${localhost}/api/passengers/searchLocation`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        search: pickupPoint,
                    }
                }
            )
            if (response.status == 200) {
                console.log(response.data.features)
                console.log(response.data.features[0].properties?.name + ', ' + response.data.features[0].properties?.place_formatted);
                console.log(response.data.features[0].properties.coordinates);
                // setPickupPoint(response.data.features[0].properties?.name + ', ' + response.data.features[0].properties?.place_formatted)
                setPickUpLocationData(response.data.features);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const searchDropLocation = async () => {
        try {
            console.log("Initiated....");
            const accessToken = await AsyncStorage.getItem('accessToken');
            const response = await axios.get(`http://${localhost}/api/passengers/searchLocation`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    params: {
                        search: dropPoint,
                    }
                }
            )
            if (response.status == 200) {
                console.log(response.data.features)
                console.log(response.data.features[0].properties?.name + ', ' + response.data.features[0].properties?.place_formatted);
                console.log(response.data.features[0].properties.coordinates);
                // setDropPoint(response.data.features[0].properties?.name + ', ' + response.data.features[0].properties?.place_formatted)
                setDropLocationData(response.data.features);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

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
    // const height = Math.floor(100/dummyData.length);
    // console.log(height);
    console.log(pickUpLocationData);
    console.log(pickUpData, dropData);
    // console.log(pickUpLocationData.length == 0)

    const onSelectingFinalPickupLocation = (data:any)=>{
        setPickUpData(data);
        setPickupPoint(data.properties?.name + ', ' + data.properties?.place_formatted);
        setPickUpLocationData([]);
    }

    const onSelectingFinalDropLocation = (data:any)=>{
        setDropData(data);
        setDropPoint(data.properties?.name + ', ' + data.properties?.place_formatted);
        setDropLocationData([]);
    }

    const PickUpItem = ({ data }: any) => {
        return (
            <TouchableOpacity onPress={()=>onSelectingFinalPickupLocation(data)} style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, padding: 2, width: "100%" }}>
                <Text style={{color: 'grey'}}>{data.properties?.name}, {data.properties?.place_formatted}</Text>
            </TouchableOpacity>
        )
    }

    const DropItem = ({ data }: any) => {
        return (
            <TouchableOpacity onPress={()=>onSelectingFinalDropLocation(data)} style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 10, padding: 2, width: "100%" }}>
                <Text style={{color: 'grey'}}>{data.properties?.name}, {data.properties?.place_formatted}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ backgroundColor: 'white', zIndex: 10, position: 'absolute', top: 60, right: 30, borderRadius: 5, padding: 5 }}>
                <Ionicons name="notifications-outline" size={25} color="lightblue" />
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


            {selectLocation && <View style={{ justifyContent: 'center', alignItems: 'center', rowGap: 5, position: 'absolute', backgroundColor: 'white', borderRadius: 10, top: 150, width: '90%', elevation: 5, padding: 10 }}>

                <Text style={{ fontSize: 20, fontWeight: '500', color: 'grey', textAlign: 'center' }}>Select location</Text>

                <View style={{ width: '90%' }}>
                    <TextInput placeholder='Pickup Location' value={pickupPoint} onChangeText={(text) => setPickupPoint(text)} placeholderTextColor="grey" style={{ borderWidth: .5, padding: 5, paddingLeft: 10, borderRadius: 10, borderColor: 'lightblue' }} />
                    <TouchableOpacity onPress={searchPickupLocation} style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Ionicons size={20} name="search" color={'lightblue'} />
                    </TouchableOpacity>
                </View>
                {pickUpLocationData.length != 0 && <View style={{ width: "90%", zIndex: 5, backgroundColor: 'white', borderWidth: .5, borderColor: 'lightblue', borderRadius: 10, height: "12%"}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        // pagingEnabled
                        data={pickUpLocationData}
                        renderItem={({ item }) => <PickUpItem data={item} />}
                    // keyExtractor={item => item.id} 
                    />
                </View>}

                <Ionicons name='arrow-down-outline' size={20} color={'grey'} />

                <View style={{ width: '90%' }}>
                    <TextInput placeholder='Drop Location' value={dropPoint} onChangeText={(text) => setDropPoint(text)} placeholderTextColor="grey" style={{ borderWidth: .5, padding: 5, paddingLeft: 10, borderRadius: 10, borderColor: 'lightblue' }} />
                    <TouchableOpacity onPress={searchDropLocation} style={{ position: 'absolute', right: 10, top: 10 }}>
                        <Ionicons size={20} name='search' color={'lightblue'} />
                    </TouchableOpacity>

                </View>

                {dropLocationData.length != 0 && <View style={{ width: "90%", zIndex: 5, backgroundColor: 'white', borderWidth: .5, borderColor: 'lightblue', borderRadius: 10, height: "12%"}}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        // pagingEnabled
                        data={dropLocationData}
                        renderItem={({ item }) => <DropItem data={item} />}
                    // keyExtractor={item => item.id} 
                    />
                </View>}




                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '90%' }}>
                    <TouchableOpacity style={{ marginTop: 5, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: 'white' }}>Book a ride</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectLocation(false)} style={{ marginTop: 5, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 10 }}>
                        <Text style={{ fontWeight: '500', fontSize: 15, color: 'white' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>

            </View>}
            {!selectLocation && <TouchableOpacity onPress={() => setSelectLocation(true)} style={{ marginTop: 5, padding: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightblue', borderRadius: 10, bottom: 50, elevation: 5 }}>
                <Text style={{ fontWeight: '500', fontSize: 15, color: 'white' }}>Book a ride</Text>
            </TouchableOpacity>}
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
        position: 'absolute'
    },
});

import React, { useEffect, useState } from 'react'
import { View, TextInput, Alert, Image, StyleSheet, Modal, Text, Dimensions } from 'react-native'
import RoomItem from '../../components/RoomItem'
import {
    useTheme,
    themeColor,
    Button,
} from "react-native-rapi-ui";
import { get, getDatabase, onValue, push, ref } from "firebase/database";
import AddRoomButton from '../../components/AddRoomButton';
import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';

const Home = ({ navigation }: any) => {
    const { isDarkmode } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useSelector((state: any) => state.auth)
    const [room, setRoom] = useState("")
    const [rooms, setRooms] = useState<any>([])

    useEffect(() => {
        const db = getDatabase();
        const roomRefs = ref(db, '/rooms');
        onValue(roomRefs, (snapshot) => {
            const data = snapshot.val();
            const roomList: any[] = []

            Object.keys(data).map(key => {
                data[key].id = key
                roomList.push(data[key])
            })
            setRooms(roomList.reverse())
        });
    }, []);

    const handleAddRoom = () => {
        const context = {
            room_name: room,
            email: user.email,
            date: (new Date()).toISOString(),
        }

        const db = getDatabase();
        push(ref(db, '/rooms'), context)
        setModalVisible(false)
        setRoom("")
    }

    return (
        <View style={{
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            flex: 1
        }}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    backgroundColor: 'rgba(0,0,0,0.5)'
                }}>
                    <View style={{
                        height: Dimensions.get("window").height / 3,
                        backgroundColor: "white",
                        marginHorizontal: 10,
                        borderRadius: 10
                    }}>
                        <TextInput placeholder='Oda adı...'
                            value={room}
                            onChangeText={setRoom}
                            style={{
                                backgroundColor: "white",
                                padding: 10,
                                fontSize: 16,
                                borderRadius: 10

                            }}></TextInput>
                        <View style={{ flex: 1 }}></View>
                        <Button
                            style={{
                                marginHorizontal: 15,
                                marginVertical: 10
                            }}
                            text='Ekle' onPress={handleAddRoom} />
                    </View>
                </View>
            </Modal>
            <FlatList data={rooms} renderItem={({ item }) =>
                <RoomItem name={item.room_name}
                    onPress={() => navigation.navigate("Chat",
                        {
                            owner: item.email,
                            id: item.id
                        })} />} />

            <AddRoomButton onPress={() => setModalVisible(true)} />
        </View>
    )
}

export default Home

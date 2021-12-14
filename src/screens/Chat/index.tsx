import { getDatabase, onValue, push, ref, remove } from 'firebase/database';
import React, { useEffect, useState } from 'react'
import { View, TextInput, Modal, Dimensions, FlatList, Text } from 'react-native'
import { Button, themeColor, useTheme } from 'react-native-rapi-ui'
import { useSelector } from 'react-redux';
import AddRoomButton from '../../components/AddRoomButton';
import MessageItem from '../../components/MessageItem';

const Chat = ({ route, navigation }: any) => {
    const { isDarkmode } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const { user } = useSelector((state: any) => state.auth)
    const [message, setMessage] = useState("")
    const { id, owner } = route.params

    const [messages, setMessages] = useState<any>([])

    useEffect(() => {
        const db = getDatabase();
        const roomRefs = ref(db, `/rooms/${id}/messages`);
        onValue(roomRefs, (snapshot) => {
            const data = snapshot.val();
            const messageList: any[] = []

            if (data) {
                Object.keys(data).map(key => {
                    data[key].id = key
                    messageList.push(data[key])
                })
            }

            setMessages(messageList)
        });
    }, []);

    const handleRemoveRoom = () => {
        const db = getDatabase();
        remove(ref(db, `/rooms/${id}`))

        navigation.goBack()
    }

    const handleAddMessage = () => {
        const context = {
            message: message,
            email: user.email,
            date: (new Date()).toISOString(),
        }

        const db = getDatabase();
        push(ref(db, `/rooms/${id}/messages`), context)
        setModalVisible(false)
        setMessage("")
        setModalVisible(false)
    }

    return (
        <View style={{
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            flex: 1
        }}>
            {
                user.email === owner &&
                < Button
                    status='danger'
                    style={{
                        marginHorizontal: 15,
                        marginVertical: 10,
                    }}
                    text='Chat odasını sil' onPress={handleRemoveRoom} />
            }
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
                        <TextInput placeholder='Mesajın...'
                            value={message}
                            onChangeText={setMessage}
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
                            text='Gönder' onPress={handleAddMessage} />
                    </View>
                </View>
            </Modal>
            <FlatList data={messages} renderItem={({ item }) =>
                <MessageItem data={item} />} />

            <AddRoomButton onPress={() => setModalVisible(true)} />
        </View>
    )
}

export default Chat

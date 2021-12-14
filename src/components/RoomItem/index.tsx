import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-rapi-ui'
import { Ionicons } from '@expo/vector-icons';
const RoomItem = ({ name, onPress }: any) => {
    const { isDarkmode } = useTheme()
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Ionicons name="people-circle-sharp" size={50} color="black" />
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    )
}

export default RoomItem

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: "#3366FF",
        borderRadius: 10,
        flexDirection: "row"
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    name: {
        fontSize: 20,
        color: "white",
        alignSelf: "center",
        marginLeft: 10
    }
})
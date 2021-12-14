import { formatDistance, subMinutes } from 'date-fns'
import { tr } from 'date-fns/esm/locale'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MessageItem = ({ data }: any) => {
    const [date, setDate] = useState<string>("")
    
    useEffect(() => {
        setDate(formatDistance(
            subMinutes(new Date(data.date), 0), new Date(), { locale: tr, addSuffix: true }))
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "white", flex: 1 }}>{data.email}</Text>
                <Text style={{ color: "white" }}>{date}</Text>
            </View>
            <Text style={{ color: "white", fontSize: 16, marginTop: 4 }}>{data.message}</Text>
        </View>
    )
}

export default MessageItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: "#3366FF",
        padding: 10,
        marginTop: 10,
        marginHorizontal: 15
    }
})
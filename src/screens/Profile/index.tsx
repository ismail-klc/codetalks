import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { themeColor, Button, useTheme } from 'react-native-rapi-ui';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { isDarkmode } = useTheme();
    const { user } = useSelector((state: any) => state.auth)

    const handleLogout = () => {
        const auth = getAuth()
        signOut(auth)
    }
    return (
        <View style={{
            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
            flex: 1,
            justifyContent: "center"
        }}>
            <Image
                style={styles.image}
                source={{
                    uri: 'https://randomuser.me/api/portraits/men/46.jpg',
                }} />
            <Text style={{
                color: isDarkmode ? "#fff" : "#17171E",
                fontSize: 20,
                alignSelf: "center",
                marginTop: 5
            }}>{user.email}</Text>
            <Button style={styles.button} status='danger' onPress={handleLogout} text='Çıkış Yap' />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    email: {

    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 50,
        alignSelf: "center",
    },
    button: {
        marginHorizontal: 20,
        marginTop: 20
    }
})
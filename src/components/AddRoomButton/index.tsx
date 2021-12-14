import React, { useState } from 'react'
import { TouchableOpacity, Modal, View, Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { } from "firebase/database";

const AddRoomButton = ({ onPress }: any) => {

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 70,
                backgroundColor: '#3366FF',
                borderRadius: 100,
            }}
        >
            <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
    )
}

export default AddRoomButton

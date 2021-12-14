import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    ScrollView,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Image,
} from "react-native";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { StackScreenProps } from "@react-navigation/stack";
import {
    Layout,
    Text,
    TextInput,
    Button,
    useTheme,
    themeColor,
} from "react-native-rapi-ui";

const Register = ({ navigation }: any) => {
    const { isDarkmode, setTheme } = useTheme();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function register() {
        setLoading(true);
        const auth = getAuth();

        await createUserWithEmailAndPassword(auth, email, password)
            .catch(function (error: any) {
                var errorCode = error.code;
                var errorMessage = error.message;

                setLoading(false);
                alert(errorMessage);
            });
        setLoading(false)
    }
    return (
        <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
            <Layout>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: isDarkmode ? "#17171E" : themeColor.white100,
                        }}
                    >
                        <Image
                            resizeMode="contain"
                            style={{
                                height: 220,
                                width: 220,
                            }}
                            source={require("../../../../assets/register.png")}
                        />
                    </View>
                    <View
                        style={{
                            flex: 3,
                            paddingHorizontal: 20,
                            paddingBottom: 20,
                            backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
                        }}
                    >
                        <Text
                            fontWeight="bold"
                            size="h3"
                            style={{
                                alignSelf: "center",
                                padding: 30,
                            }}
                        >
                            Kayıt ol
                        </Text>
                        <Text>Email</Text>
                        <TextInput
                            containerStyle={{ marginTop: 15 }}
                            placeholder="Email adresinizi giriniz"
                            value={email}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            autoCorrect={false}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                        />

                        <Text style={{ marginTop: 15 }}>Şifre</Text>
                        <TextInput
                            containerStyle={{ marginTop: 15 }}
                            placeholder="Enter your password"
                            value={password}
                            autoCapitalize="none"
                            autoCompleteType="off"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Button
                            text={loading ? "Yükleniyor" : "Hesap oluştur"}
                            onPress={() => {
                                register();
                            }}
                            style={{
                                marginTop: 20,
                            }}
                            disabled={loading}
                        />

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 15,
                                justifyContent: "center",
                            }}
                        >
                            <Text size="md">Hesabınız var mı?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    Giriş yapın
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginTop: 30,
                                justifyContent: "center",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    isDarkmode ? setTheme("light") : setTheme("dark");
                                }}
                            >
                                <Text
                                    size="md"
                                    fontWeight="bold"
                                    style={{
                                        marginLeft: 5,
                                    }}
                                >
                                    {isDarkmode ? "☀️ Açık tema" : "🌑 Koyu tema"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Layout>
        </KeyboardAvoidingView>
    );
}

export default Register

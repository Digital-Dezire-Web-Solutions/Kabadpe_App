import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../features/store";
export default function RootLayout() {
  return (
// -------------------------------------
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="ProfileEdit"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="MapScreen"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="AddressScreen"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="WalletScreen"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Spalsh"
          options={{ animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="ForogotPassword"
          options={{ animation: "simple_push" }}
        />
          <Stack.Screen
          name="ForgetPassword"
          options={{ animation: "simple_push" }}
        />
        <Stack.Screen
          name="CreateAccount"
          options={{ animation: "fade_from_bottom" }}
        />
         <Stack.Screen
          name="KabadiLogin"
          options={{ animation: "simple_push" }}
        />
             <Stack.Screen
          name="KabadiCreateAccount"
          options={{ animation: "fade_from_bottom" }}
        />
      </Stack>
    </Provider>
  );
}

  {/* <View style={styles.InputBx}>
                            <Text style={styles.label}>Full Name / पूरा नाम</Text>
                            <View style={styles.input}>
                                <AntDesign
                                    style={styles.icon}
                                    name="user"
                                    size={15}
                                    color="#a6a4a4"
                                />
                                <TextInput
                                    style={styles.mainInput}
                                    name="name"
                                    placeholder="Enter your name..."
                                />
                            </View>
                        </View>

                        <View style={styles.InputBx}>
                            <Text style={styles.label}>WhatsApp No. / व्हाट्सएप नंबर</Text>
                            <View style={styles.input}>
                                <FontAwesome
                                    style={styles.icon}
                                    name="whatsapp"
                                    size={15}
                                    color="#a6a4a4"
                                />
                                <TextInput
                                    style={styles.mainInput}
                                    maxLength={10}
                                    name="whatsappnumber"
                                    keyboardType="numeric"
                                    placeholder="Enter your whatsapp no..."
                                />
                            </View>
                        </View> */}


import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
   Button,
} from "react-native";


export default function Home({ navigation, route }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != null) {
          let user = JSON.parse(value);
          setName(user.Name);
          setAge(user.Age);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
      {
        name;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={{fontSize:50}}>{name}</Text>
      <Text style={{fontSize:50}}> {age}</Text>
      <Button title="Remove" onPress={removeData} />
    </View>
  );
}

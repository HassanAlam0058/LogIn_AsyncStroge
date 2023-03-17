import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  Alert,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    try {
      AsyncStorage.getItem("UserData").then((value) => {
        if (value != null) {
          navigation.navigate("Home");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setData = async () => {
    if (name.length == 0 || age.length == 0) {
      Alert.alert("Warning!", "Please write your data.");
    } else {
      try {
        var user = {
          Name: name,
          Age: age,
        };
        await AsyncStorage.setItem("UserData", JSON.stringify(user));
        navigation.navigate("Home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
    <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <TextInput
        style={{color:"#000" ,fontSize:50,borderBottomColor:"#333",borderBottomWidth:5,borderBottomLeftRadius:10,borderBottomRightRadius:10}}
        placeholder="Your name"
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        placeholder="Your age"
        style={{color:"#000" ,fontSize:50,borderBottomColor:"#333",borderBottomWidth:5,borderBottomLeftRadius:10,borderBottomRightRadius:10}}
        onChangeText={(value) => setAge(value)}
      />
      <Button title="Save" onPress={setData} />
      </View>
    </>
  );
}

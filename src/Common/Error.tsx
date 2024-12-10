import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

interface  ErrorProps {
  width?: string | number;
  maxWidth?: string | number;
  onCloseError?: React.Dispatch<React.SetStateAction<boolean>>;
}
const {width:screenWidth}=Dimensions.get('screen');

const Error: React.FC<ErrorProps> = ({ }) => {
  return (
      <View style={[styles.container, { width:screenWidth*0.9,height:200}]}>
        <Text style={styles.title}>Issue with the KEY</Text>
        <Text style={styles.subtitle}>Get in touch</Text>
        <Text style={styles.description}>Get a valid API Key</Text>
      </View>
  );
};

const styles = StyleSheet.create({
 
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    alignItems: "center",
    justifyContent:'center',

    // Shadow for iOS
    shadowColor: "#000", // Dark shadow
    shadowOffset: { width: 0, height: 2 }, // Position of the shadow
    shadowOpacity: 0.25, // Transparency of the shadow
    shadowRadius: 3.5, // Blur of the shadow

    // Shadow for Android
    elevation: 2, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Soehne", // You must include the font in your project
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    fontWeight: "400",
  },
});

export default Error;

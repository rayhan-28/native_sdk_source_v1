import {  Dimensions, StyleSheet } from "react-native";

const { width: screenWidth } = Dimensions.get("window");
export const SuccessScreenStyle = StyleSheet.create({
  successWithoutContainer: {
    backgroundColor: '#FFFFFF',
    // // width: screenWidth,
    // borderTopLeftRadius:20,
    // borderTopRightRadius:20,
    // // Shadow for iOS
    // shadowColor: "#000", // Dark shadow
    // shadowOffset: { width: 0, height: 2 }, // Position of the shadow
    // shadowOpacity: 0.25, // Transparency of the shadow
    // shadowRadius: 3.5, // Blur of the shadow
   
    // // Shadow for Android
    // elevation: 2, 
    // backgroundColor: "red",
    flexDirection:'column',
    paddingVertical: 30,
    paddingHorizontal:20,
    alignItems: "center",
    borderTopLeftRadius: 20,  // Apply radius to the top-left corner
    borderTopRightRadius: 20,
    gap: 35,
  },
  closeIcon: {
    padding:10,
    alignItems:'center',
    justifyContent:'center',
    marginLeft:screenWidth-70
  },
  rewardContainer: {
    width: 70,
    height: 80,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#06182C80',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successWithoutButton: {
    width: 220,
    height: 40,
    backgroundColor: "#06182C",
    borderRadius: 20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pointAndArtifact: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
});
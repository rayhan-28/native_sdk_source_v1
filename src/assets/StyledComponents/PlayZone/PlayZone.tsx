import { Dimensions, StyleSheet } from 'react-native';
const {height:screenHeight}=Dimensions.get('screen')
const PlayZoneStyles = StyleSheet.create({

  overlay: {
    flex: 1,
    position:'absolute',
    bottom:0,
    height:screenHeight,
    zIndex: 1000,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  scrollView: {
    // marginTop: 20,
  },
  item: {
    height: 100,  // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    marginBottom: 10,
    
  },

  playZoneQuestSee: {
    padding:20,
    flexDirection: 'row', // Row layout for alignment
    justifyContent: 'space-between',
  },

  playZoneSee: {
    color: '#06182C80',
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'underline', // Underline text
    // cursor: 'pointer', // Not used in React Native; touchable components handle clicks
  },
  
  








});

export default PlayZoneStyles;

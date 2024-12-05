import { StyleSheet } from "react-native";

const PlayZoneHeaderStyles = StyleSheet.create({
 
  firstContainer: {
    // flexDirection:'row',
    padding: 20,
    borderTopLeftRadius: 20,  // Apply radius to the top-left corner
    borderTopRightRadius: 20,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
    gap: 15,
    color: 'white',
    overflow:'hidden'
  },
   hideIcon:{
     flexDirection:'row',
     justifyContent:'flex-end'
   },
   imageTitle:{
     flexDirection:'row',
    gap:15,
    alignItems:'flex-start',
    justifyContent:'flex-start',
   },
   topCharacterImag: {
    height: 90,
    width: 90,
    borderRadius: 45,
  },
  Title: {
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 22.9,
    color: "white",
    marginTop:10
  },
  Name:{
    fontSize: 40,
    color:'white',
    fontWeight:'700',
    lineHeight:50
  },
  
  
  
  
  
  activeLevel: {
    color: 'white', // Bright gold or white for active level
  },
  inactiveLevel: {
    color: '#FFFFFF4D', // Faded white for inactive levels
  },
  
 LevelStyle:{
  marginRight:42,
  flexDirection:'row'
 },
 levelText: {
    color:'white',
    fontSize: 14,
    marginBottom:3,
    fontWeight: '700',
    textAlign: 'left', // React Native uses 'left' instead of 'start'
  },
  levelContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    position: 'relative',
    width:'100%',
  },
  progressBarWrapper: {
    position: 'absolute',
    top: '53%',
    left: 0,
    width: '100%',
    height: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
   progressBar: {
    backgroundColor: '#FFFFFF',
    height: 2,
    width:'100%',
  },
  circle: {
    backgroundColor: '#FFFFFF',
    width: 10,
    height: 10,
    // marginLeft:40,
    borderRadius: 5, // For a circular shape
    position:'relative'
  },
 nextLevelText: {
    position:'relative',
    fontSize: 12,
    fontWeight: '500',
    position: 'relative',
    color: '#FFFFFF',
    // marginLeft:40,
    left:20
  },
  playerPointText: {
    flexDirection: 'row',
    gap: 25,
  },
  playerPointsStreakRank: {
    flexDirection: 'column',
    position:'relative'
  },
  playerPointGapIncrease: {
    // display: 'flex', // Again, this is redundant, so you can skip it.
    // flexDirection: 'column',
  },
  playerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '400',
  },
  playerPoint: {
    fontSize: 24,
    fontWeight: '500',
    color: 'white',
  },
  superscript: {
    fontSize: 15,
    marginLeft:-2,
    color:'#FFFFFF'
    
  },
  playerPointGap: {
    display: 'flex', // This is the default value, so you can omit it.
    flexDirection: 'column', // Correct way in React Native.
  },

  questName: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 20,
  },
  earningText: {
    cursor: 'pointer', // Not necessary in React Native
    padding: 5,
    fontSize: 14,
    transition: 'all 0.5s ease', // This is also not needed in React Native
  },
  activeEarning: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: '#fff',
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 15,
    fontSize: 12,
    fontWeight: '500',
  },

  rewardPoint: {
    maxHeight: 95,
    width: 80,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    flexShrink: 0,
    padding: 10,
  },
  
  
});

export default PlayZoneHeaderStyles;

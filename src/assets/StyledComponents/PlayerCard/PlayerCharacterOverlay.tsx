import { StyleSheet } from "react-native";

export const PlayerCharStyle = StyleSheet.create({
  playerCharacterOverlay: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    // position: 'absolute', // closest equivalent to `fixed` in React Native
    flex:1,
    display: 'flex',
    backgroundColor:'white',
    flexDirection: 'column', // Flexbox is the default layout in React Native
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Space items horizontally
    overflow: 'hidden', // Handles overflow (no distinction between x/y)
    zIndex: 1005, // Layering order
    fontFamily: 'Soehne', // Use a custom font if added
  },
  playerCharacterWrapper: {
    backgroundColor: 'white', // White background
    fontFamily: 'Soehne', // Custom font if added to the project
    width: '100%', // Max width in pixels
    height: "70%", // Fixed height in pixels
    //  borderRadius: 20, // Rounded corners
    // padding: 10, // Padding around content
    display: 'flex', // Flexbox is default in React Native
    flexDirection: 'column', // Arrange children vertically
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    position: 'relative', // Absolute positioning
  },
  playerCharacterTextContainer: {
    flexDirection: 'row', // Equivalent to `display: flex`
    alignItems: 'center', // Vertically centers items
    justifyContent: 'center', // Horizontally centers items
    width: 247, // Fixed width in pixels
    height: 23, // Fixed height in pixels
  },
  centered: {
    position: 'relative', // Overrides the position for centered variant
  },
  playerCharacterTextChecked: {
    fontSize: 24, // Font size in pixels
    fontWeight: '700', // Bold font weight
    color: 'rgb(6, 24, 44)', // Text color
    opacity: 1, // React Native uses decimal (e.g., 1 for 100% opacity)
    lineHeight: 30, // Line height in pixels
  },
  playerCharacterRow: {
    height:'25%',
    flexDirection: 'row', // Horizontal layout
    alignItems: 'center', // Vertically center items
    justifyContent: 'center', // Horizontally center items
    width: '100%', // Full width
    overflow: 'hidden', // Clips overflowing content (applies only to the container)
    marginHorizontal: 'auto', // React Native doesn't support `auto`; adjust as needed
  },
  playerCharacterBtn: {
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row', 
    backgroundColor: 'black', // Button background color
    color: '#fff', // Text color
   
    paddingVertical: 8, // Top and bottom padding
    paddingHorizontal: 35, // Left and right padding
    borderRadius: 25, // Rounded corners
    // marginLeft: 50, // Space to the left
  },
  playerCharacterBtnHover: {
    backgroundColor: '#333', // Darker background on hover
  },
  buttonText:{
    
   color:'white'
  },


  //alert overlay
  alertOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    position: 'absolute', // Equivalent to 'fixed' in React Native
    width: '100%', // Full screen width
    height: '100%', // Full screen height
    left: 0, // Align to left
    top: 0, // Align to top
    fontFamily: 'Soehne', // Requires custom font configuration
    display: 'flex', // Default in React Native
    flexDirection: 'column', // Flex direction is column by default
    alignItems: 'center', // Center children horizontally
    justifyContent: 'space-around', // Distribute children vertically
    overflow: 'hidden', // React Native doesn't have `overflow-y`; use `overflow: 'hidden'` if necessary
    zIndex: 100, // Layer priority
  },
  closeBtn: {
    position: 'absolute', // Position button absolutely
    right: 15, // Align to the right
    top: 15, // Align to the top
  },


})
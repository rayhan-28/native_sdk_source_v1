import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');

const SurveyQuestionStyles = StyleSheet.create({
  surveyQuestionOverlay: {
    position: 'absolute', // Relative to the parent container
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
    fontFamily: 'Soehne', // Only works if "Soehne" is available in the project
    paddingHorizontal: width > 500 ? 40 : 0, // Responsive padding
    paddingTop: width > 500 ? 40 : 0,
  },
  surveyContainer: {
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 15, // Rounded top-left corner
    borderTopRightRadius: 15, // Rounded top-right corner
    position: 'relative',
    shadowColor: '#454545', // Box shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (x, y)
    shadowOpacity: 0.15, // Shadow opacity
    shadowRadius: 4, // Shadow blur radius
  },
  firstPart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  iconName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textOne: {
    marginTop: 0,
    fontWeight: '500',
    fontSize: 22,
    lineHeight: 25.48,
  },
  superscript: {
    fontSize: 10,
    position: 'relative',
    top: 3, // Adjust as per your design
    left: -1, // Adjust as per your design
  },
  textTwo: {
    color: '#06182C80',
    margin: 0,
    overflow: 'hidden',
    flexShrink: 1,
    textAlign:'justify',
    justifyContent:'center'
  },
  textTwoExpanded: {
    overflow: 'visible', // To show full content when expanded
  },
  textSection: {
    flexDirection: 'column',
  },
  linkPart: {
    flexDirection: 'row',
    gap: 5, // Gap is not supported directly in React Native
  },
  linkText: {
    color: '#06182CB2',
    textDecorationLine: 'underline',
  },
  customTextarea: {
    width: '100%',
    borderWidth: 0,

    height: 'auto',
    fontSize: 20,
    // backgroundColor:'teal',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Soehne', // Ensure the font is available in the project
    color: '#06182C', // Placeholder styling requires explicit setup
  },
  textareaPlaceholder: {
    color: '#06182C33', // Placeholder text color
  },
  lastPart: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  progressBarAndPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap:20
  },
  lastPartLargeScreen: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: '#06182C08',
    borderRadius: 10,
    height: 10,
    width: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 8,
  },
  leftProgress: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  leftArrow: {
    height: 40,
    width: 40,
    color: 'white',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#06182CB2',
    borderRadius: 20, // Fully rounded for a circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // React Native ignores `cursor`, remove for mobile apps
  },
  rightArrow: {
    height: 40,
    width: 40,
    color: 'white',
    backgroundColor: 'black',
    borderWidth: 0.1,
    borderColor: 'black',
    borderRadius: 20, // Fully rounded for a circle
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // Remove for mobile apps
  },
  arrow: {
    flexDirection: 'row',
    gap: 8, // Use margins for spacing as React Native doesn't support `gap`
  },
  finish: {
    backgroundColor: "#06182C",
    width: 85,
    height: 42,
    borderWidth: 0,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  finishText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: 'center',
  },

  // Give A Rate
  rateContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow wrapping of items
    rowGap: 10, // React Native doesn't directly support `rowGap`; use marginBottom in children
    columnGap: 12, // Same for `columnGap`; use marginRight in children
    width: '100%',
  },
  rateContainerLargeScreen: {
    width: '50%',
  },
  rateButton: {
    width: 57, // Fixed width
    height: 57, // Fixed height
    borderRadius: 3,
    backgroundColor: '#F9F9F9',
    borderWidth: 0.5,
    borderColor: '#06182C33',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rateButtonText: {
    fontSize: 16,
    color: '#06182C80'
  },
  rateButtonSelected: {
    backgroundColor: '#00BF9F08',
    borderWidth: 0.5,
    borderColor: 'rgb(0, 191, 159)',
  },

  // multiple image
  sliderContainer: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden', // For horizontal scrolling
  },
  slider: {
    flexDirection: 'row', // Images in a row
  },
  image: {
    width: 230,
    height: 230,
    borderRadius: 12,
  },
  imageItem: {
    position: 'relative', // For positioning children inside
    marginRight: 10,
  },
  imageItemHover: {
    opacity: 0.7,
  },
  starIcon: {
    position: 'absolute'
  },
  starIconHover: {
    display: 'flex', // Replace with conditional rendering
  },
  imageText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHandle: {
    maxWidth: 200,
    textAlign: 'center',
  },
  description: {
    color: '#06182C80',
  },

  // Yes/No Button
  yesNO: {
    width: '100%',
    height: 'auto', // Automatically adjust height
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#06182C33',
    color: '#06182C80',
    padding: 16,
  },
  yesNOSelected: {
    backgroundColor: '#00BF9F08',
    borderWidth: 0.5,
    borderColor: 'rgb(0, 191, 159)',
  },
  yesNOLargeScreen: {
    width: '50%', // Adjust width for larger screens
  },

  // Poll
  pollText: {
    width: '100%',
    height: 'auto', // Automatically adjust height
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#06182C33',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  
  pollTextHover: {
    backgroundColor: '#FFFFFF',
  },
  pollTextLargeScreen: {
    width: '50%', // Adjust width for larger screens
  },
  pollLeft: {
    flex: 0.8, // 80% width for text
    textAlign: 'left',
    overflow: 'hidden', // Hide overflowed content
    color: '#06182C80',
  },
  pollRight: {
    flex: 0.2, // 20% width for percentage
    textAlign: 'right',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  selectedText: {
    fontWeight: 'bold',
  },
  selectedBox: {
    borderWidth: 0.5,
    borderColor: 'rgb(0, 191, 159)', // Highlighted border color
  },
  selectedPercentage: {
    color: '#3eb9a3', // Set selected percentage color
  },

  // Multiple Image Slider
  multipleImageSlider: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  multipleImageSliderLargeScreen: {
    width: '50%',
  },
  multiImage: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  multiImageItem: {
    position: 'relative',
    cursor: 'pointer',
  },
  starIconMultiImage: {
    position: 'absolute',
    top: '40%',
    left: '40%'
  },
  multiImageItemHover: {
    opacity: 0.7,
  },
  starIconMultiImageHover: {
    display: 'flex',
  },
  multiTextHandle: {
    maxWidth: 180,
  },

  // Percentage Container
  percentageContainer: {
    width: '100%',
    height: 24, // Adjust height for the progress box
    borderRadius: 6,
    marginTop: 10,
    position: 'relative',
  },
  percentageBox: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    color: '#000', // Text color
    fontWeight: 'bold',
  },

  // Upload Image
  uploadImage: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  uploadImageLargeScreen: {
    width: '50%',
  },
  uploadContainer: {
    width: 160,
    height: 160,
    backgroundColor: '#f2f2f3',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    borderRadius: 8,
    cursor: 'pointer', // For web support
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Cropper Modal
  cropperModal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(6, 24, 44, 0.753)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    zIndex: 1000,
  },

  cropArea: {
    borderWidth: 3,
    borderStyle: 'dashed',
    borderColor: '#FFFFFF',
  },

  // Button Container for Cropper
  btnContainerCropper: {
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    marginTop: 25,
    marginBottom: 20,
  },

  // Controls
  controls: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomRange: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  zoomRangeThumb: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    borderRadius: 50,
    width: 12,
    height: 12,
  },
  zoomRangeHoverThumb: {
    shadowColor: 'rgba(63, 81, 181, 0.16)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },

  // Buttons
  saveBtn: {
    backgroundColor: 'black',
    color: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 25,
  },
  saveBtnHover: {
    backgroundColor: '#333',
  },
  cancelBtn: {
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 30,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'black',
  },
  cancelBtnHover: {
    backgroundColor: '#333',
  },

  // Modal Overlay
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    maxWidth: 320,
    borderRadius: 8,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)', // For web builds. For native use `elevation`.
    flexDirection: 'column',
  },
  modalButton: {
    backgroundColor: 'black',
    color: '#fff',
    width: 100,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 25,
    alignSelf: 'center', // Centers the button within its container
  },
  modalButtonHover: {
    backgroundColor: '#333', // Add hover effect for web
  },

  // Survey Point Text
  surveyPointText: {
    flexDirection: 'row',
    gap: 30,
  },
  surveyPointsStreakRank: {
    flexDirection: 'column',
  },
  surveyPoint: {
    fontSize: 20,
    fontWeight: '400',
    lineHeight: 17,
  },

  surveyPointGap: {
    flexDirection: 'column',
  },
  surveyPointGapIncrease: {
    flexDirection: 'column',
  },
  surveyText: {
    color: 'rgba(6, 24, 44, 0.5)',
    fontSize: 12,
    fontWeight: '400',
  }
});

export default SurveyQuestionStyles;

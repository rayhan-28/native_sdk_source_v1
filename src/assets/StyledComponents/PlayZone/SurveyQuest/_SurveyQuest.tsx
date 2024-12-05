import { StyleSheet } from 'react-native';

const SurveyQuestStyles = StyleSheet.create({
  highliteServeyQuestCard: {
    backgroundColor: '#c7f3ea',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 12
  },
  highliteUppper: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent:'flex-start',
    alignItems: 'baseline',
  },
  serveyStatus: {
    paddingVertical: 2,
    paddingHorizontal: 14,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  surveyVoucher: {
    width: 200,
    overflow: 'hidden', // Requires specific handling for text
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 15.29,
    height: 20,
  },
  surveyVoucherText: {
    display: 'flex', // Use Text with `numberOfLines` for ellipsis
    flexDirection: 'row',
    overflow: 'hidden',
    color: '#06182CCC',
    fontWeight:'500',
    lineHeight: 15.29,
    fontSize: 12,
  },
  commission: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    backgroundColor: '#e1f3ef',
    borderRadius: 20,
  },
  highliteLast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  highlitePoints: {
    display: 'flex',
    flexDirection: 'row',
  },
  pointsReferrals: {
    color: '#858383',
    fontSize: 14, // Adjust based on design
    fontWeight: 'bold',
    position: 'relative',
    bottom: -14,
  },
  referralText:{
    margin: 0,
    lineHeight: 22,
    fontSize: 22,
    fontWeight: "300",
    color: "#06182CCC",
  },
  task: {
    fontSize: 16,
    fontWeight: '500',
    color: '#06182CE5',
    marginTop: 0,
    marginBottom: 0,
  },
  progressBar: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 8,
    marginVertical: 10,
    width: '60%',
    alignSelf: 'center',
  },
  progressIndicator: {
    margin: 0,
    backgroundColor: '#000',
    height: '100%',
    borderRadius: 10
  },
  surveyGoButton: {
    backgroundColor: 'black',
    color: '#fff',
    width: 60,
    height: 26,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderWidth: 0,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: '500',
  },
  surveyGoButtonText: {
    color: '#fff',
    

    fontSize: 14,
    fontWeight: '500',
  },
  surveyGoButtonHover: {
    backgroundColor: '#333',
  },
});

export default SurveyQuestStyles;

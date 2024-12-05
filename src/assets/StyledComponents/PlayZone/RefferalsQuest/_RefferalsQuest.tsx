import { StyleSheet } from 'react-native';

const ReferralQuestStyle = StyleSheet.create({
  referralsCardWrapper: {
     
    backgroundColor: '#d4a6ab',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 12,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  referralVoucher: {
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
  referralVoucherText: {
    display: 'flex', // Use Text with `numberOfLines` for ellipsis
    flexDirection: 'row',
    overflow: 'hidden',
    color: '#06182CCC',
    fontWeight:'500',
    lineHeight: 15.29,
    fontSize: 12,
  },
  circleProgressText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent:'space-between',
    gap: 10,
  },
  referralDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  referralsDetailsText: {
    fontSize: 14,
    margin: 0,
    fontWeight: '500',
  },
  referralText:{
    margin: 0,
    lineHeight: 22,
    fontSize: 22,
    fontWeight: "300",
    color: "#06182CCC",
  },
  
  textEllipsisReferrals: {
    margin: 0,
    color: '#06182CCC',
    fontSize: 12,
    fontWeight: '400',
    overflow: 'hidden',
  },
  referralsGoButton: {
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
  referralsGoButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonStreaks: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default ReferralQuestStyle;

import { StyleSheet } from 'react-native';

const UserHabitStyles = StyleSheet.create({
  userHabitContainer: {
    display: 'flex',
    backgroundColor: '#d4a6ab',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 12,
    gap: 15,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  userHabitVoucher: {
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
    fontWeight: '700',
    lineHeight: 15.29,
  },
  userHabitVoucherText: {
    display: 'flex', // Use Text with `numberOfLines` for ellipsis
    flexDirection: 'row',
    overflow: 'hidden',
    color: '#06182CCC',
    fontWeight:'500',
    lineHeight: 15.29,
    fontSize: 12,
  },
  circleProgress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  buttonStreaks: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  iconText: {
    display: 'flex',
    flexDirection: 'row',
    gap: 5,
  },
  detailsText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17.84,
  },
  goButton: {
    backgroundColor: 'black',
    color: '#fff',
    width: 60,
    height: 26,
    borderWidth: 0,
    borderRadius: 25,
    fontSize: 14,
    fontWeight: '500',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  goButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  goButtonHover: {
    backgroundColor: '#333',
  },
});

export default UserHabitStyles;

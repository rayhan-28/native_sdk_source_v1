import { StyleSheet } from 'react-native';

const NudgesStyle = StyleSheet.create({
  nudgesQuest: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 40,
  },
  iconTextQuest: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  textEllipsis: {
    margin: 0,
    fontSize: 12,
    fontWeight: '700',
    overflow: 'hidden',
    // textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
  },
  arrowBox: {
    width: 20,
    height: 20,
    cursor: 'pointer', // You can remove this as React Native does not support `cursor`.
    borderWidth: 2,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
});

export default NudgesStyle;

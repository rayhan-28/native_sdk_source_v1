import { StyleSheet } from "react-native";

export const LeaderBoardStyles = StyleSheet.create({
  container: {
   backgroundColor:'#FFFFFF'
 
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding:20
  },
  headerText:{
    fontSize:12,
    color:'#06182C80',
    marginBottom:10
  },
  tableHeader:{
    width:'100%',
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20
  }
  ,
  title: {
    fontSize: 20,
    fontWeight: '500',
   
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  link: {
    fontSize: 14,
    fontWeight: '400',
    color: '#06182C80',
    textDecorationLine: 'underline',
  },
  tableContainer: {
    display: 'flex',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent:'center',
    alignItems:'center',
    paddingVertical: 12,
    paddingRight: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rank: {
    width: '20%',
    fontSize: 14,
    fontWeight: '500',
    paddingLeft: 20,

  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '55%',
    overflow: 'hidden'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
    marginLeft:12,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#06182C',
   
  },
  points: {
    width: '25%',
    fontSize: 16,
    fontWeight: '500',
    color: '#06182C99',
  },
});

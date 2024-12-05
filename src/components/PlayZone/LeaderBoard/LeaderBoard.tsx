

import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";
import {Image, ScrollView, Text, View } from "react-native";
import { LeaderBoardStyles } from "../../../assets/StyledComponents/PlayZone/LeaderBoard/LeaderBoard";
// import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";

// Define types for the leaderboard player
interface LeaderboardPlayer {
  _id: string;
  points: number;
  rank?: number; // rank will be added after sorting
  [key: string]: any; // Add more fields if necessary based on the API response
}

interface LeaderboardProps {
  width?: string;
  maxWidth?: string;
  email: string;
  // setIsloadingLeaderboard: (b: boolean) => void;
  // isLoading: boolean
}

const Leaderboard: React.FC<LeaderboardProps> = ({
  // width = "100%",
  email,
  // setIsloadingLeaderboard,
  // isLoading
}) => {
  const [leaderboardData, setLeaderBoardData] = useState<LeaderboardPlayer[]>([]);
  const [myRowData, setMyRowData] = useState<LeaderboardPlayer | null>(null); // Store the row that contains the email field
  // const { token } = useNativeReactSdk();
  const token = "4733788f-783d-455f-a2b7-3b1815e53196"

  // const [error, setError] = useState<string | null>(null);
  // const [showExtraUserRow, setShowExtraUserRow] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dev.api.pitch.space/api/leader-board", {
          params: {
            email: email,
            token: token,
          },
        });

        if (response.status === 200) {
          // setIsloadingLeaderboard(false);
          let leaderboard: LeaderboardPlayer[] = response.data.data;

          leaderboard.sort((a, b) => b.points - a.points);

          leaderboard = leaderboard.map((player, index) => ({
            ...player,
            rank: index + 1,
          }));
          const myRow = leaderboard.find((player) => player._id === email);
          if (myRow) {
            setMyRowData(myRow);
          }

          // setShowExtraUserRow(myRow && myRow.rank ? myRow.rank > 4 : false);


          setLeaderBoardData(leaderboard);
        }
      } catch (err) {
        // setIsloadingLeaderboard(false);
        // setError("You are not valid");
        console.error("Error fetching leaderboard:", err);
      }
    };

    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [email, token]); // Add email to the dependency array as it might change

  console.log(myRowData);
  console.log("leader board");
  // const maxHeight = myRowData && myRowData.rank! > 4 ? "230px" : "300px";

  return (<>
  { true && <View style={[LeaderBoardStyles.container]}>
      {/* {error && <Text style={LeaderBoardStyles.error}>{error}</Text>} */}
      {/* Main leaderboard section */}
      <View style={LeaderBoardStyles.header}>
        <Text style={LeaderBoardStyles.title}>
          Champions <Text style={LeaderBoardStyles.subtitle}>({leaderboardData.length})</Text>
        </Text>
        {/* <View style={LeaderBoardStyles.headerActions}>
          <TouchableOpacity>
            <Text style={LeaderBoardStyles.link}>Find me</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={LeaderBoardStyles.link}>Go to top</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      {/* Scrollable leaderboard table */}
      <ScrollView style={{ maxHeight:  myRowData && myRowData?.rank! > 4 ? 430 : 500 }} contentContainerStyle={LeaderBoardStyles.tableContainer}>
         <View style={LeaderBoardStyles.tableHeader}>
           <View style={{width:'20%'}}>
             <Text style={LeaderBoardStyles.headerText}>Rank</Text>
           </View>
           <View style={{width:'55%'}}>
           <Text style={LeaderBoardStyles.headerText}>Player</Text>
           </View>
           <View style={{width:'25%'}}>
           <Text style={LeaderBoardStyles.headerText}>Points</Text>
           </View>
         </View>
        {leaderboardData.map((player, index) => (
          <View
            key={index}
            style={[
              LeaderBoardStyles.row,
              { backgroundColor: player?.rank === myRowData?.rank ? '#FFFFFF' : '#f9f9f9', 
                
              },
            ]}
          >
            <Text style={LeaderBoardStyles.rank}>{player?.rank}.</Text>
            <View style={LeaderBoardStyles.playerInfo}>
              <Image
                source={{
                  uri:
                    player?.playerAvatar.split(',').length === 2
                      ? `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${player?.playerAvatar}`
                      : player?.playerAvatar,
                }}
                style={LeaderBoardStyles.avatar}
              />
              {player?.rank === myRowData?.rank ? (
                <Text style={LeaderBoardStyles.playerName} numberOfLines={1}>
                  You ({player?.playerName})
                </Text>
              ) : (
                <Text style={LeaderBoardStyles.playerName} numberOfLines={1}>
                  {player?.playerName}
                </Text>
              )}
            </View>
            <Text style={LeaderBoardStyles.points}>{player?.points}</Text>
          </View>
        ))}
      </ScrollView>
     
         
 

      {/* Display only the row with the email field if rank > 5 */}
      {myRowData?.rank! > 5 && (
        <View style={[LeaderBoardStyles.row,{backgroundColor:'#FFFFFF'}]}>
          <Text style={LeaderBoardStyles.rank}>{myRowData?.rank}</Text>
          <View style={LeaderBoardStyles.playerInfo}>
            <Image
              source={{
                uri: `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${myRowData?.playerAvatar}`,
              }}
              style={LeaderBoardStyles.avatar}
            />
            <Text style={LeaderBoardStyles.playerName}>{`You (${myRowData?.playerName})`}</Text>
          </View>
          <Text style={LeaderBoardStyles.points}>{myRowData?.points}</Text>
        </View>
      )}
    </View>}
  </>
  );
};

export default Leaderboard;

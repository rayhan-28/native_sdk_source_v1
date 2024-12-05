import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNativeReactSdk } from "../context/NativeReactSdkContext";
import SurveyQuestSvgIcon from "../assets/Image/SVG/SurveyQuest/SurveyQuestSvgIcon";
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SuccessScreenStyle } from "../assets/StyledComponents/PlayZone/ServeySuccessScreen/SuccessScreenWithoutReward";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Define types for props
interface NdugesServeyQuestOverlayProps {
  width?: string;
  maxWidth?: string;
  OnCloseServeyOverlay: () => void;
  isFromQuestion: boolean;
  questId: string;
  email: string;
}

// Define the structure of the player data returned by the API (adjust based on actual API response)
interface PlayerData {
  // Example fields, adjust based on actual structure
  playerName: string;
  level: number;
  points: number;
  Artifacts:number
  // Add other fields as necessary
}

const NdugesServeyQuestOverlay: React.FC<NdugesServeyQuestOverlayProps> = ({
  // width = "100%",
  // maxWidth = "520px",
  OnCloseServeyOverlay,
  isFromQuestion,
  questId,
  email
}) => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const { token } = useNativeReactSdk();

  const GetPlayerData = async () => {
    try {
      const response = await axios.get(
        "https://dev.api.pitch.space/api/player-info-for-quest",
        {
          params: {
            email,
            token,
            questId
          },
        }
      );
      if (response.status === 200) {
        setPlayerData(response.data?.data); // Assuming the response has a data property
      }
    } catch (err: unknown) {
      console.error("Error fetching player data:", err); // Handle the error appropriately
    }
  };

  useEffect(() => {
    if (token) {
      GetPlayerData(); // Fetch player data initially
    }
  }, [token, questId, email]);
  const isCLIQ= token === "4733788f-783d-455f-a2b7-3b1815e53196";
  const CLIQtopBarHeight=screenHeight*0.1;
  const height = isCLIQ ? screenHeight - CLIQtopBarHeight : screenHeight;
  return (
    // <View style={SuccessScreenStyle.successWithoutRewardOverlay}>
        
    <View style={[SuccessScreenStyle.successWithoutContainer,{height,width:screenWidth}]}>
      <TouchableOpacity onPress={OnCloseServeyOverlay} style={{ padding: 20 }} >
          <View style={SuccessScreenStyle.closeIcon}>
            <SurveyQuestSvgIcon.cross />
          </View>
        </TouchableOpacity>
        {isFromQuestion  ? <SurveyQuestSvgIcon.nice/> : <SurveyQuestSvgIcon.wow/>}
     
        <View style={{ alignItems: 'center' }}>
          <Text style={{fontSize: 24,fontWeight: '700', lineHeight: 30.58}}>
            Survey Completed
          </Text>
          <Text style={{fontSize: 16,fontWeight: '700', lineHeight: 20.38, color: "#06182CCC"}}>
            Thank you for your time
          </Text>
        </View>
    
        <View style={SuccessScreenStyle.pointAndArtifact}>
          <Text style={{fontSize: 12,fontWeight: '700', lineHeight: 12.74, color: "#06182CB2"}}>
            With this survey, you’ve collected:
          </Text>
          <View style={{ flexDirection: 'row', gap: 15 }}>
            <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
              <View style={SuccessScreenStyle.rewardContainer}>
                <SurveyQuestSvgIcon.black_star />
                <Text>X {playerData?.points}</Text>
              </View>
              <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Points</Text>
            </View>
            <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
              <View style={SuccessScreenStyle.rewardContainer}>
                <SurveyQuestSvgIcon.servey />
                <Text>X {playerData?.Artifacts}</Text>
              </View>
              <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Artefact</Text>
            </View>
          </View>
        </View>
      
        <TouchableOpacity onPress={OnCloseServeyOverlay} style={SuccessScreenStyle.successWithoutButton}>
          <Text style={{color:'white',  textAlign: 'center'}}>Collect more points</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, lineHeight: 15.29, fontWeight: '500', color: "#06182CB2" }}>Collect more points to unlock amazing rewards!</Text>
    </View>
  // </View>
  );
};

export default NdugesServeyQuestOverlay;

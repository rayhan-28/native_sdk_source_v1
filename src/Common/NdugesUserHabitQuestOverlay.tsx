import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SuccessScreenStyle } from '../assets/StyledComponents/PlayZone/ServeySuccessScreen/SuccessScreenWithoutReward';
import PlayZoneSvgIcon from '../assets/Image/SVG/PlayZone/PlayZone';
import { useNativeReactSdk } from '../context/NativeReactSdkContext';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

interface OverLaycontent {
    rewardCondition:string,
    reward:string,
    completedStreak:number,
    playTimesInCurrentStreak:number
}
// Define props types
interface NdugesUserHabitQuestOverlayProps {
  width?: string;
  maxWidth?: string;
  userHabitRewardAway: number;
  userHabitStreakAway: number;
  onCloseHabitQuestOverlay: () => void;
  email: string;
  questId: string;
  overlayContent:OverLaycontent
  paddingOverly?:number
}

// Define PlayerData type based on the expected API response
interface PlayerData {
  points: number;
  Artifacts: number;
  // Add more fields as necessary to match the API response
}

const NdugesUserHabitQuestOverlay: React.FC<NdugesUserHabitQuestOverlayProps> = ({
  // width = "100%",
  // maxWidth = 520,
  userHabitRewardAway,
  userHabitStreakAway,
  onCloseHabitQuestOverlay,
  email,
  questId,
  overlayContent,
  paddingOverly
}) => {

  // const token = "4733788f-783d-455f-a2b7-3b1815e53196"


  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const { token } = useNativeReactSdk();

  const GetPlayerData = async () => {
    try {
      const response: any = await axios.get<{ data: { data: PlayerData } }>(
        "https://dev.api.pitch.space/api/player-info-for-quest",
        {
          params: {
            email,
            token,
            questId,
          },
        }
      );
      if (response.status === 200) {
        setPlayerData(response.data?.data);
      }
    } catch (err) {
      console.error("Failed to fetch player data", err);
    }
  };

  useEffect(() => {
    if (token) {
      GetPlayerData(); // Fetch player data initially
    }
  }, [token]);

  const handleOverlay = () => {
    onCloseHabitQuestOverlay();
  };
  console.log(paddingOverly);

  const isCLIQ= token === "4733788f-783d-455f-a2b7-3b1815e53196";
  const CLIQtopBarHeight=screenHeight*0.1;
  const height = isCLIQ ? screenHeight - CLIQtopBarHeight : screenHeight;
  return (
   
      // <View style={[SuccessScreenStyle.successWithoutRewardOverlay,{height:screenHeight*0.9,width:screenWidth}]}>
      
      <View style={[SuccessScreenStyle.successWithoutContainer,{height,width:screenWidth}]}>
        <TouchableOpacity onPress={handleOverlay}>
          <View style={SuccessScreenStyle.closeIcon}>
            <PlayZoneSvgIcon.cross />
          </View>
      </TouchableOpacity>    
        {(userHabitStreakAway === 0 && userHabitRewardAway > 0) ? 
          <PlayZoneSvgIcon.wow /> : <PlayZoneSvgIcon.letsGo_big />
        }
        <View style={{alignItems:'center'}}>
          <Text style={{fontSize:25,fontWeight:'bold'}}>
              {userHabitStreakAway === 1 ? "1 action to save your streak" 
              : userHabitStreakAway > 1 ? `${userHabitStreakAway} more action for a streak`
                : userHabitStreakAway === 0 && userHabitRewardAway > 0 ? `You achieved ${userHabitRewardAway} streaks`
                : null
              }
          </Text> 
          <Text style={{fontSize: 16,fontWeight: '700', lineHeight: 20.38, color: "#06182CCC"}}>
              {userHabitStreakAway === 1 ? "This is your last chance before it’s reset" 
              : userHabitStreakAway > 1 ? `${overlayContent?.playTimesInCurrentStreak} actions: ${overlayContent.completedStreak+1} streak`
                : userHabitStreakAway === 0 && userHabitRewardAway > 0 ? `${overlayContent?.rewardCondition}: ${overlayContent?.reward}`
                : null
              }
          </Text>
          
       
        </View>

        <View style={SuccessScreenStyle.pointAndArtifact}>
          <Text style={{fontSize: 12,fontWeight: '700', lineHeight: 12.74, color: "#06182CB2"}}>You’ve collected:</Text>
          <View style={{flexDirection:'row',gap: 15}}>
              <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
                <View style={SuccessScreenStyle.rewardContainer}>
                  <PlayZoneSvgIcon.black_star />
                  <Text>X {playerData?.points}</Text>
                </View>
                <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Points</Text>
              </View>
              <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
                <View style={SuccessScreenStyle.rewardContainer}>
                  <PlayZoneSvgIcon.servey />
                  <Text>X {playerData?.Artifacts}</Text>
                </View>
                <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Artefact</Text>
              </View>
          </View>
        </View>
        
        
        <TouchableOpacity onPress={onCloseHabitQuestOverlay} style={SuccessScreenStyle.successWithoutButton}>
          <Text style={{color:'white',  textAlign: 'center'}}>Collect more points</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, lineHeight: 15.29, fontWeight: '500', color: "#06182CB2" }}>Collect more points to unlock amazing rewards!</Text>
    </View>
  // </View>
    
  
)
}

export default NdugesUserHabitQuestOverlay
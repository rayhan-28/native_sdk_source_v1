import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNativeReactSdk } from '../context/NativeReactSdkContext';
import ReferralSvgIcon from '../assets/Image/SVG/ReferralsQuest/ReferralsQuest';
import { TouchableOpacity, View, Text, Dimensions} from 'react-native';
import { SuccessScreenStyle } from '../assets/StyledComponents/PlayZone/ServeySuccessScreen/SuccessScreenWithoutReward';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

// Define props types
interface NdugesReferralsQuestOverlayProps {
  width?: string;
  maxWidth?: string;
  OnCloseReferralOverlay: () => void;
  questId: string;
  email: string;
  reward: string;
  rewardCondition: number;
  confirmedReferrals: number;
}

// Define PlayerData type based on the expected API response
interface PlayerData {
  // Define properties according to the actual data structure from the API response
  id: string;
  name: string;
  avatar: string;
  Artifacts:number;
  confirmedReferrals: number;
  points:number;
  // Add more fields as necessary
}

const NdugesReferralsQuestOverlay: React.FC<NdugesReferralsQuestOverlayProps> = ({
  // width = "100%",
  // maxWidth = "520px",
  OnCloseReferralOverlay,
  questId,
  email,
  reward,
  rewardCondition,
  confirmedReferrals
}) => {
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const { token } = useNativeReactSdk();

  const GetPlayerData = async () => {
    try {
      const response:any = await axios.get<{ data: { data: PlayerData } }>(
        "https://dev.api.pitch.space/api/player-info-for-quest",
        {
          params: {
            email,
            token,
            questId,
          },
        }
      );
      if (response.status === 200 && response.data) {
        setPlayerData(response.data?.data);
      }
    } catch (err) {
      console.error('Failed to fetch player data', err);
    }
  };

  useEffect(() => {
    if (token) {
      GetPlayerData(); // Fetch player data initially
    }
  }, [token]);

  const isCLIQ= token === "4733788f-783d-455f-a2b7-3b1815e53196";
  const CLIQtopBarHeight=screenHeight*0.1;
  const height = isCLIQ ? screenHeight - CLIQtopBarHeight : screenHeight;
  return (
    // <View style={SuccessScreenStyle.successWithoutRewardOverlay}>
       
       <View style={[SuccessScreenStyle.successWithoutContainer,{height,width:screenWidth}]}>
       <TouchableOpacity onPress={OnCloseReferralOverlay} style={{ padding: 10 }} >
          <View style={SuccessScreenStyle.closeIcon}>
            <ReferralSvgIcon.cross />
          </View>
        </TouchableOpacity>
      { rewardCondition>1 && confirmedReferrals<rewardCondition ? <ReferralSvgIcon.letsGo_big />
        : rewardCondition===undefined && confirmedReferrals>0 ? <ReferralSvgIcon.referral_nudges_big />
        : <ReferralSvgIcon.wow />
      }  
        <View style={{ alignItems: 'center' }}>
          <Text style={{fontSize: 25, fontWeight:'bold' }}>{playerData?.confirmedReferrals ?? 0} confirmed referrals</Text>
          {reward && 
            <Text style={{fontSize: 16,fontWeight: '700', lineHeight: 20.38, color: "#06182CCC"}}>
              {rewardCondition} referrals : {reward}
            </Text>
          }
        </View>
         
        <View style={SuccessScreenStyle.pointAndArtifact}>
          <Text style={{fontSize: 12,fontWeight: '700', lineHeight: 12.74, color: "#06182CB2"}}>
            With referrals, you’ve collected:
          </Text>
          <View style={{flexDirection: 'row', gap:15}}>
                <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
                  <View style={SuccessScreenStyle.rewardContainer}>
                    <ReferralSvgIcon.black_star />
                    <Text>X {playerData?.points}</Text>
                  </View>
                  <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Points</Text>
                </View>

                <View style={{flexDirection:'column', gap: 5, alignItems:'center',justifyContent:'center'}}>
                  <View style={SuccessScreenStyle.rewardContainer}>
                    <ReferralSvgIcon.servey />
                    <Text>X {playerData?.Artifacts}</Text>
                  </View>
                  <Text style={{fontSize:10, fontWeight: '500', lineHeight: 12.74, color: '#06182CB2'}}>Artefact</Text>
                </View>
            </View>
        </View>

        <TouchableOpacity onPress={OnCloseReferralOverlay} style={[SuccessScreenStyle.successWithoutButton, {width: 160, height: 40}]}>
          <Text style={{color:'white',  textAlign: 'center'}}>Refer a new friend</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 12, lineHeight: 15.29, fontWeight: '500', color: "#06182CB2" }}>Collect more points to unlock amazing rewards!</Text>
      </View>
    // </View>
  )
}

export default NdugesReferralsQuestOverlay
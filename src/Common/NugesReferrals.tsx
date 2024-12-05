import React from 'react';
import ReferralSvgIcon from '../assets/Image/SVG/ReferralsQuest/ReferralsQuest';
import NudgesStyle from '../assets/StyledComponents/Nudges/Nudges';
import { View,Text, TouchableOpacity } from 'react-native';

// Define the interface for the props
interface NugesReferralsProps {
  rewardCondition: number; // rewardCondition can be a number or undefined
  confirmedReferrals: number; // confirmedReferrals is a number
  setNudgesClicked: React.Dispatch<React.SetStateAction<boolean>>; // Set state for nudges clicked
  setReferralsNudgesOverlay: React.Dispatch<React.SetStateAction<boolean>>; // Set state for referrals nudges overlay
}

const NugesReferrals: React.FC<NugesReferralsProps> = ({
  rewardCondition,
  confirmedReferrals,
  setNudgesClicked,
  setReferralsNudgesOverlay,
}) => {

  const handleClicked = () => {
    setNudgesClicked(true);
    setReferralsNudgesOverlay(true);
  };



  return (
    <View  style={[NudgesStyle.nudgesQuest, {backgroundColor: 'rgba(255, 255, 255, 0.3)'}]}>
      <View style={NudgesStyle.iconTextQuest}>
        {rewardCondition > 1 && confirmedReferrals < rewardCondition ? (
          <>
            <View>
            <ReferralSvgIcon.letsGo  />
            </View>            
            <Text style={NudgesStyle.textEllipsis} numberOfLines={1}>Send {rewardCondition - confirmedReferrals} more referrals to earn a reward</Text>
          </>
        ) : rewardCondition === undefined && confirmedReferrals > 0 ? (
          <>
            <View>
            <ReferralSvgIcon.referral_nudges  />
            </View> 
            <Text style={NudgesStyle.textEllipsis} numberOfLines={1}>Earn more points to unlock rewards</Text>
          </>
        ) : (
          <>
            <View>
            <ReferralSvgIcon.wow_small  />
            </View> 
            <Text style={NudgesStyle.textEllipsis}>Congrats! You unlocked a reward...</Text>
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleClicked} style={NudgesStyle.arrowBox}>
          <View>
            <ReferralSvgIcon.right_quest_arrow  />
          </View> 
      </TouchableOpacity>
    </View>
  );
};

export default NugesReferrals;

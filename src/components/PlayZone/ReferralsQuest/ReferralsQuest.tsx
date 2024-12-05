import React, {  useState } from "react";
import axios from "axios";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
// import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";
import type { Quest } from "../PlayZone";
import ReferralQuestStyle from "../../../assets/StyledComponents/PlayZone/RefferalsQuest/_RefferalsQuest";
import ProgressBarSvg from "../../../Common/ProgressBarSvg";
import ReferralSvgIcon from "../../../assets/Image/SVG/ReferralsQuest/ReferralsQuest";
import * as Clipboard from 'expo-clipboard';
import { LinearGradient } from "expo-linear-gradient";
import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";
import NugesReferrals from "../../../Common/NugesReferrals";

// Define types for the props
interface ReferralsQuestProps {
  referralQuest:Quest[]; // Define a more specific type if possible
  // setNudgesClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setReferralsNudgesOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  maxWidth?: string;
  email: string;
  setQuestId: React.Dispatch<React.SetStateAction<string | null>>;
  referralsNdugesOverlayConditionData: any; // Define more specific type if possible
}

const hexToRgba = (hex: string, opacity: number): string => {
  let r = 0, g = 0, b = 0;
  if (hex?.length === 4) {
    r = parseInt(hex[1]! + hex[1], 16);
    g = parseInt(hex[2]! + hex[2], 16);
    b = parseInt(hex[3]! + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex[1]! + hex[2], 16);
    g = parseInt(hex[3]! + hex[4], 16);
    b = parseInt(hex[5]! + hex[6], 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const ReferralsQuest: React.FC<ReferralsQuestProps> = ({
  referralQuest,
  // setNudgesClicked,
  setReferralsNudgesOverlay,
 
  email,
  setQuestId,
  referralsNdugesOverlayConditionData
}) => {
  const [isLinkClicked, setIsLinkClicked] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const { token } = useNativeReactSdk(); // Get email and token from context
  //  const token = "4733788f-783d-455f-a2b7-3b1815e53196"
  // const [error, setError] = useState<string | null>(null);

  const handleClicked = (index: number, questId: string): void => {
    const getGeneratedLink = async () => {
      try {
        console.log("referral questId check misbah ", questId);
        const response = await axios.get(
          "https://dev.api.pitch.space/api/generated-url",
          {
            params: {
              email: email,
              token: token,
              questId: questId,
            },
          }
        );
        if (response.status === 200) {
          console.log("Labib wuwe ", questId);
          // navigator.clipboard
          //   .writeText(response.data)
          //   .then(() => {
          //     setClickedIndex(index);
          //     setIsLinkClicked(true);

          //     setTimeout(() => {
          //       setIsLinkClicked(false);
          //     }, 2000); // Reset after 2 seconds
          //   })
          //   .catch((err) => {
          //     console.error("Failed to copy link: ", err);
          //   });

          try {
            await Clipboard.setStringAsync(response.data); // Copy the link
            setClickedIndex(index);
            setIsLinkClicked(true);
      
            // Reset state after 2 seconds
            setTimeout(() => {
              setIsLinkClicked(false);
            }, 2000);
          } catch (err) {
            console.error("Failed to copy link: ", err);
          }
        }
      } catch (error) {
        // setError("You are not valid");
        console.error(error);
      }
    };

    if (token) {
      getGeneratedLink();
    }
  };
  

  return (
    <View >
      {referralQuest?.length > 0
        ? referralQuest.map((referrals, index) => {
            const defaultColor = "#fbeeee";
            const backgroundColor = referrals.gradientColor
              ? hexToRgba(referrals.gradientColor, 0.3)
              : hexToRgba(defaultColor, 0.3);

            return (
              <View
                style={[ReferralQuestStyle.referralsCardWrapper, {backgroundColor: backgroundColor, width:'100%', 
                  marginBottom: index !== referralQuest.length - 1 ? 20 : 0,}]}
                  key={referrals.questId || index}
              >
                <View
                  style={{display: "flex",justifyContent: "space-between",
                  }}
                >
                  <View>
                    {/* Conditionally render the voucher only if rewardCondition is not empty */}
                    {referrals?.reward && (
                      <LinearGradient
                      colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                      start={{ x: 0, y: 0.5 }} // 0% (left)
                      end={{ x: 1, y: 0.5 }}   // 100% (right)
                      style={ReferralQuestStyle.referralVoucher}
                    >
                      <ScrollView  horizontal={true} // Enables horizontal scrolling
                        showsHorizontalScrollIndicator={false} >
                      <Text numberOfLines={1} style={ReferralQuestStyle.referralVoucherText}>
                      {referrals?.reward} for each{" "}
                        {referrals.rewardCondition??0 > 1
                          ? referrals.rewardCondition
                          : ""}{" "}
                        confirmed
                        {referrals?.rewardCondition??0 > 1
                          ? " referrals"
                          : " referral"}
                      </Text>
                    </ScrollView>
                    </LinearGradient>
                    )}
                  
                    <View style={ReferralQuestStyle.circleProgressText}>
                      <View style={{flexDirection:'row',gap:10}}>
                      {referrals?.rewardCondition??0 > 1 ? (
                        <ProgressBarSvg
                          points={referrals.points ?? 0}
                          progress={referrals.progress || 0}
                          progressColor={referrals.gradientColor}
                        />
                      ) : (
                        <View>
                          <ReferralSvgIcon.referral_big  />
                        </View>
                      )}
                      
                      <View style={ReferralQuestStyle.referralDetails}>
                        <Text style={[ReferralQuestStyle.referralsDetailsText, 
                          {marginBottom:referrals?.rewardCondition??0 <= 1? 4: 0}]}>Referrals</Text>
                        {referrals?.rewardCondition??0 > 1 ? (
                          <Text
                            style={{
                              margin: 0,
                              lineHeight: 22,
                              fontSize: 22,
                              fontWeight: "300",
                              color: "#06182CCC",
                            }}
                          >
                            {referrals?.confirmedReferrals}
                            <Text
                              style={{
                                color: "#06182CCC",
                                fontSize: 12,
                                fontWeight: "300",
                              }}
                            >
                              {" "}
                              confrimed
                            </Text>
                          </Text>
                        ) : (
                          <View
                            style={{
                              marginBottom:referrals?.rewardCondition??0 <= 1? 4: 0,
                              display: "flex",
                              columnGap: 8,
                              alignItems: "baseline",
                              justifyContent: "flex-start",
                            }}
                          >
                            <Text
                              style={ReferralQuestStyle.referralText}>
                              {referrals?.confirmedReferrals}
                            </Text>
                            <Text
                              style={{
                                color: "#06182CCC",
                                fontSize: 12,
                                fontWeight: "300",
                                margin: 0,
                              }}
                            >
                              {" "}
                              x{" "}
                            </Text>
                            <View>
                             <ReferralSvgIcon.star_small/>
                            </View>
                            <Text style={{ margin: 0 }}>{referrals?.points}</Text>
                          </View>
                        )}

                        <Text numberOfLines={1} style={ReferralQuestStyle.textEllipsisReferrals}>
                          {referrals?.rewardCondition??0 <= 1 ? "confirmed" : ""}{" "}
                          out of {referrals?.sentReferrals} sent so far
                        </Text>
                      </View>
                     {/* last view */}
                     </View>
                    <View style={[ReferralQuestStyle.buttonStreaks,{alignSelf:'flex-end'}]}>
                        <TouchableOpacity
                          onPress={() => handleClicked(index, referrals?.questId!)}
                          style={ReferralQuestStyle.referralsGoButton}
                        >
                          <Text style={ReferralQuestStyle.referralsGoButtonText} >
                          {isLinkClicked && clickedIndex === index
                            ? "Copied"
                            : "Invite"}
                          </Text>
                          
                        </TouchableOpacity>
                    </View>

                    </View>
                  </View>
                  {/* <View style={[ReferralQuestStyle.buttonStreaks]}>
                    <TouchableOpacity
                      onPress={() => handleClicked(index, referrals?.questId!)}
                      style={ReferralQuestStyle.referralsGoButton}
                    >
                      <Text style={ReferralQuestStyle.referralsGoButtonText} >
                       {isLinkClicked && clickedIndex === index
                        ? "Copied"
                        : "Invite"}
                      </Text>
                      
                    </TouchableOpacity>
                  </View> */}
                </View>
                { (referrals.confirmedReferrals??0>0) ?
                  <NugesReferrals
                  rewardCondition={+(referrals.rewardCondition ?? "0")}
                  confirmedReferrals={referrals?.confirmedReferrals!}
                  setReferralsNudgesOverlay={setReferralsNudgesOverlay}
                  setNudgesClicked={()=>{
                    // setNudgesClicked(true);
                    setQuestId(referrals?.questId!)
                    referralsNdugesOverlayConditionData(referrals?.confirmedReferrals,referrals?.rewardCondition,referrals?.reward)
                  }} 
                /> : null }
              </View>
            );
          })
        : ""}
    </View>
  );
};

export default ReferralsQuest;

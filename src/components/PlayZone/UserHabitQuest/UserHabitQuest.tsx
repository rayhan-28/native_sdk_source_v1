import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Linking } from "react-native";
import type { Quest } from "../PlayZone";
import UserHabitStyles from "../../../assets/StyledComponents/PlayZone/UserHabibQuest/_UserHabitQuest";
import ProgressBarSvg from "../../../Common/ProgressBarSvg";
import UserHabitQuestSvgIcon from "../../../assets/Image/SVG/UserHabitQuest/UserHabitQuest";
import NugesUserHabit from "../../../Common/NugesUserHabit";
import { LinearGradient } from 'expo-linear-gradient';

interface UserHabitQuestProps {
  width?: string;
  maxWidth?: string;
  userHabitQuest: Quest[]; 
  // setNudgesClicked: (value: boolean) => void;
  // setNodgesType: (type: string) => void;
  // setTypeOfQuest: (type: string) => void;
  setUserHabitNuggesOverlay: (value: boolean) => void;
  reward_streak: (streakAway: number, rewardAway: number) => void;
  userHabitOverlayContent:(rewardCondition:string|"",reward:string|"",completedStreak:number,playTimesInCurrentStreak:number)  => void;
  setQuestId: (id: string) => void;
}

const hexToRgba = (hex: string, opacity: number): string => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
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

const UserHabitQuest: React.FC<UserHabitQuestProps> = ({
  
  // maxWidth = "375px",
  userHabitQuest,
  userHabitOverlayContent,
  setUserHabitNuggesOverlay,
  reward_streak,
  setQuestId,
}) => {
  const handleRedirect = (redirectUrl?: string) => {
    if (redirectUrl) {
      Linking.openURL(redirectUrl).catch((err) => console.error("Failed to open URL:", err));
    } else {
      console.error("No URL to redirect");
    }
  };

  return (
    <View style={{width:'100%'}}>
      {userHabitQuest.length > 0
        ? userHabitQuest.map((habit, index) => {
            const defaultColor = "#fbeeee";
            const backgroundColor = habit.gradientColor
              ? hexToRgba(habit.gradientColor, 0.3)
              : hexToRgba(defaultColor, 0.3);

            return (
              <View
                style={[UserHabitStyles.userHabitContainer, {backgroundColor: backgroundColor, width: '100%', 
                  marginBottom: index !== userHabitQuest.length - 1 ? 20 : 0}]}
                key={habit.questId || index}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: 'row',
                    justifyContent: "space-between",
                    alignItems: "stretch",
                  }}
                >
                  <View>
                    {habit.rewardCondition && (
                      
                      <LinearGradient
                          colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
                          start={{ x: 0, y: 0 }} // Start at the left
                          end={{ x: 1, y: 0 }}  
                          style={UserHabitStyles.userHabitVoucher}
                      >
                      <ScrollView
                      horizontal={true} // Enables horizontal scrolling
                      showsHorizontalScrollIndicator={false} 
                      >
                        <Text numberOfLines={1} style={UserHabitStyles.userHabitVoucherText}>
                          {habit.rewardCondition}: {habit.reward}
                        </Text>
                      </ScrollView>
                    </LinearGradient>
                       
                      
                    )}
                    <View style={UserHabitStyles.circleProgress}>
                      <ProgressBarSvg
                        points={habit.points || 0}
                        progress={habit.progress}
                        progressColor={habit.gradientColor}
                      />
                      <View>
                        <Text style={UserHabitStyles.detailsText}>{habit.actionName}</Text>
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: "300",
                            lineHeight: 28.03,
                            color: "#06182CCC",
                          }}
                        >
                          {habit.playTimesInCurrentStreak} out of{" "}
                          {habit.completionTarget.split(" ")[0]}
                        </Text>
                        <Text
                          style={{
                            color: "rgba(6, 24, 44, 0.8)",
                            fontSize: 12,
                            fontWeight: "400",
                            margin: 0,
                          }}
                        >
                          in {habit.targetDay} ({habit.dayLeftToQuestEnd} days
                          left)
                        </Text>
                      </View>
                    </View>
                    </View>
                    <View style={UserHabitStyles.buttonStreaks}>
                    <View style={UserHabitStyles.iconText}>
                      {habit.completedStreak ? (
                       <View style={{ marginRight: 2 }}>
                          <UserHabitQuestSvgIcon.streak/>
                      </View>
                      ) : (
                        <View style={{ marginRight: 5 }}>
                            <UserHabitQuestSvgIcon.empty_streak/>
                        </View>
                      )}
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          marginTop: 0,
                        }}
                      >
                        {habit.completedStreak ?? 0} Streaks
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleRedirect(habit.redirectUrl)}
                      style={UserHabitStyles.goButton}
                    >
                      
                        <Text style={UserHabitStyles.goButtonText} >Go</Text>
                   
                      
                    </TouchableOpacity>
                  </View>
                </View>
                {(habit.streakAway !== 0 ||
                  habit.rewardAway !== 0 ||
                  habit.completedStreak !== 0) && (
                  <NugesUserHabit
                    streakAway={habit.streakAway ?? 0}
                    rewardAway={habit.rewardAway ?? 0}
                    setUserHabitNuggesOverlay={() => {
                      setUserHabitNuggesOverlay(true);
                      reward_streak(habit?.streakAway ?? 0, habit.rewardAway ?? 0);
                      userHabitOverlayContent(habit?.rewardCondition?.toString() ?? "",habit?.reward ?? "",habit?.completedStreak ?? 0,habit?.playTimesInCurrentStreak ?? 0);
                      setQuestId(habit.questId!);
                    }}
                    
                  />
                )}
              </View>
            );
          })
        : ""}
    </View>
  );
};

export default UserHabitQuest;

import React from "react";
import UserHabitNudgesSvgIcon from "../assets/Image/SVG/UserHabitNudges/UserHabitNudges";
import { Text, View , TouchableOpacity} from "react-native";
import NudgesStyle from "../assets/StyledComponents/Nudges/Nudges";

interface NugesUserHabibProps {
  streakAway: number;
  rewardAway: number;
  fromPlayer?: boolean;
  setUserHabitNuggesOverlay: (value: boolean) => void;
}

const NugesUserHabib: React.FC<NugesUserHabibProps> = ({
  streakAway,
  rewardAway,
  fromPlayer = false,
  setUserHabitNuggesOverlay,
}) => {
  const handleClicked = () => {
    setUserHabitNuggesOverlay(true);
  };

  return (
    <View
      style={[NudgesStyle.nudgesQuest,{
        backgroundColor: fromPlayer
          ? "rgba(167, 159, 159, 0.1)"
          : "rgba(255, 255, 255, 0.3)",
      }]}
    >
      <View style={NudgesStyle.iconTextQuest}>
        {streakAway === 1 ? (
          <>
             <UserHabitNudgesSvgIcon.letsGo  />
            <Text style={NudgesStyle.textEllipsis}>Your last chance to save your streak</Text>
          </>
        ) : streakAway > 1 ? (
          <>
            <UserHabitNudgesSvgIcon.letsGo  />
            <Text style={NudgesStyle.textEllipsis}>You’re {streakAway} step's away from a streak...</Text>
          </>
        ) : streakAway === 0 && rewardAway > 0 ? (
          <>
           <UserHabitNudgesSvgIcon.letsGo  />
            <Text style={NudgesStyle.textEllipsis}>You’re {rewardAway} streaks away from a reward...</Text>
          </>
        ) : (
          <>
            <UserHabitNudgesSvgIcon.wow_small  />
            <Text style={NudgesStyle.textEllipsis}>Congrats! You unlocked a reward...</Text>
          </>
        )}
      </View>
      <TouchableOpacity onPress={handleClicked} style={NudgesStyle.arrowBox}>
      <View style={{ marginLeft: 1.5, marginBottom: 1 }}>
        <UserHabitNudgesSvgIcon.right_quest_arrow  />
      </View>
      </TouchableOpacity>
      </View>
    
  );
};



export default NugesUserHabib;

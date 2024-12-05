import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';// Assuming this is your SVG component
import SurveyQuestSvgIcon from '../assets/Image/SVG/SurveyQuest/SurveyQuestSvgIcon';

interface NudgesServeyProps {
  setQuestId: React.Dispatch<React.SetStateAction<string | null>>;
  setSurveyNudgesOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  questId: string;
}

 const NudgesServey: React.FC<NudgesServeyProps> = ({
  setQuestId,
  setSurveyNudgesOverlay,
  questId,
}) => {
  const handleClicked = () => {
    setSurveyNudgesOverlay(true);
    setQuestId(questId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconText}>
        <SurveyQuestSvgIcon.wow_small  />
        <Text numberOfLines={1} style={styles.text}>Congrats! You unlocked a reward...</Text>
      </View>
      <TouchableOpacity style={styles.arrowBox} onPress={handleClicked}>
        <SurveyQuestSvgIcon.right_quest_arrow  />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 40,
    backgroundColor: '#FFFFFF80',
  },
  iconText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    margin: 0,
    fontSize: 12,
    fontWeight: '700'
  },
  arrowBox: {
    width: 20,
    height: 20,
    backgroundColor:'black',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    cursor: 'pointer', // React Native uses Touchable components instead
  },
});

export default NudgesServey;

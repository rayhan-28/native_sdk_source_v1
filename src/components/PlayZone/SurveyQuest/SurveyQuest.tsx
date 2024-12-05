import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import type { Quest } from '../PlayZone';
import SurveyQuestStyles from '../../../assets/StyledComponents/PlayZone/SurveyQuest/_SurveyQuest';
import SurveyQuestSvgIcon from '../../../assets/Image/SVG/SurveyQuest/SurveyQuestSvgIcon';
import { LinearGradient } from 'expo-linear-gradient';
import NudgesServey from '../../../Common/NudgesServey';


// Helper function to convert hex color to RGBA
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

// Define the props interface for the ServeyQuest component
interface ServeyQuestProps {
  width?: string;
  maxWidth?: string;
  serveyQuest: Quest[]; // Replace with more specific type if possible
  setIsServeyGoClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setQuestId: React.Dispatch<React.SetStateAction<string | null>>;
  // setReward: React.Dispatch<React.SetStateAction<any>>;
  isAnswerIsCompleted: boolean;
  setIsAnswerIsCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  setSurveyNudgesOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  SurveyNameGet: (name: string) => void;
}

// ServeyQuest component
const ServeyQuest: React.FC<ServeyQuestProps> = ({
  serveyQuest,
  setIsServeyGoClicked,
  setQuestId,
  setSurveyNudgesOverlay,
  SurveyNameGet
}) => {
  
  // Handler for when the Go button is clicked
  const onGoClicked = (questId: string, name: string) => {
    setIsServeyGoClicked(true);
    setQuestId(questId);
    SurveyNameGet(name);
  }
  return (
    <View>
    {serveyQuest.length>0?(
     serveyQuest.map((survey,index)=>{
      const defaultColor = "#fbeeee";
      const backgroundColor = survey.gradientColor
        ? hexToRgba(survey.gradientColor, 0.3) // Apply 30% opacity to the gradient color
        : hexToRgba(defaultColor, 0.3); 
    return( 
    <View key={index}
     style={[SurveyQuestStyles.highliteServeyQuestCard, {backgroundColor: backgroundColor, 
      marginBottom: index !== serveyQuest.length - 1 ? 20 : 0}]}
     >
      <View style={SurveyQuestStyles.highliteUppper}>
        <Text style={{fontSize: 12, fontWeight:'500',color:'#06182CCC'}}>Survey</Text>
        {survey.rewardCondition && (
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.5)', 'rgba(255, 255, 255, 0)']}
          start={{ x: 0, y: 0.5 }} // 0% (left)
          end={{ x: 1, y: 0.5 }}   // 100% (right)
          style={SurveyQuestStyles.surveyVoucher}
        >
            <ScrollView 
            horizontal={true} // Enables horizontal scrolling
            showsHorizontalScrollIndicator={false}
            >
                <Text numberOfLines={1} style={SurveyQuestStyles.surveyVoucherText}>
                  {survey?.rewardCondition}: {survey?.reward}
                </Text>
            </ScrollView>
          </LinearGradient>
        )}
      </View>
      <Text style={SurveyQuestStyles.task}>Participate in our annual user survey</Text>
      <View style={{height: 5}}/>
      

      <View style={SurveyQuestStyles.highliteLast}>
        <View style={{flexDirection:'row',gap:10,alignItems:'center',maxWidth:'80%'}}>
        <SurveyQuestSvgIcon.stardust/>
        <Text style={{ fontSize: 12,fontWeight:'400',margin: 0}}>{survey.points}/{survey.totalPoints}</Text>
        <View style={SurveyQuestStyles.progressBar}>
          <Text
            style={[SurveyQuestStyles.progressIndicator, { width: `${(((survey.points??0) / (survey.totalPoints??1)) * 100) > 100 ? 100 : (((survey.points??0) / (survey?.totalPoints??1)) * 100)}%` ,backgroundColor:survey.gradientColor}]}
          ></Text>
        </View>
        </View>
        
        {survey.points !== survey.totalPoints 
        &&
        <TouchableOpacity 
        onPress={ ()=>onGoClicked(survey?.questId!,survey?.name!)} 
        style={SurveyQuestStyles.surveyGoButton}>
         <Text style={SurveyQuestStyles.surveyGoButtonText}>Go</Text>
        </TouchableOpacity>}
      </View>



      <View style={{height: 10}}/>
       {survey.points === survey.totalPoints && <NudgesServey 
         
         questId={survey?.questId!}
         setQuestId={setQuestId}
         setSurveyNudgesOverlay={setSurveyNudgesOverlay}
        />}
    </View>
    )
    })
    ):(
      <View></View>
    )}
    </View>
  )
}

export default ServeyQuest
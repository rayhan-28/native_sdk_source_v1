import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  // ActivityIndicator,
  Dimensions,
  Modal,
  // Dimensions,
  ScrollView,
  Text,
  // Text,
  View,
} from "react-native";
import PlayZoneHeader from "./PlayZoneHeader/PlayZoneHeader";
// import Leaderboard from "./LeaderBoard/LeaderBoard";
// import UserHabitQuest from "./UserHabitQuest/UserHabitQuest";
// import ReferralsQuest from "./ReferralsQuest/ReferralsQuest";
import PlayZoneStyles from "../../assets/StyledComponents/PlayZone/PlayZone";
import UserHabitQuest from "./UserHabitQuest/UserHabitQuest";
import NdugesUserHabitQuestOverlay from "../../Common/NdugesUserHabitQuestOverlay";
import ReferralsQuest from "./ReferralsQuest/ReferralsQuest";
import NdugesReferralsQuestOverlay from "../../Common/NdugesReferralsQuestOverlay";
import SurveyQuest from "./SurveyQuest/SurveyQuest";
import NdugesServeyQuestOverlay from "../../Common/NdugesServeyQuestOverlay";
import Leaderboard from "./LeaderBoard/LeaderBoard";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
// import { useNativeReactSdk } from "../../context/NativeReactSdkContext";
// import SurveyQuestion from "./SurveyQuest/SurveyQuestion/SurveyQuestion";
// import SurveyQuest from "./SurveyQuest/SurveyQuest";
// import NdugesUserHabitQuestOverlay from "../../Common/NdugesUserHabitQuestOverlay";
// import NdugesServeyQuestOverlay from "../../Common/NdugesServeyQuestOverlay";
// import NdugesReferralsQuestOverlay from "../../Common/NdugesReferralsQuestOverlay";
// import NdugesServeyQuestOverlay from "../Common/NdugesServeyQuestOverlay";
// import SurveyQuestion from "./SurveyQuest/SurveyQuestion/SurveyQuestion";
// import QuestionModal from "./SurveyQuest/SurveyQuestion/QuestionModal";
// import UserHabitQuest from "./UserHabitQuest/UserHabitQuest";
// import PlayZoneSvgIcon from "../../assets/image/SVG/PlayZone/PlayZone";
// import PlayZoneHeader from './PlayZoneHeader/PlayZoneHeader'
// import LeaderBoard from './LeaderBoard/LeaderBoard'
// import Error from "../Common/Error";
// import NdugesUserHabitQuestOverlay from "../Common/NdugesUserHabitQuestOverlay";
// import NdugesReferralsQuestOverlay from "../Common/NdugesReferralsQuestOverlay";

import { useNativeReactSdk } from "../../context/NativeReactSdkContext";

// Define types for the props
interface PlayZoneProps {
  width?: string;
  maxWidth?: string;
  email: string;
  photoUrl: string;
  erroShowSuccess: boolean;
  handleErrorClose: () => void; // Add this line
  handleCloseSuccess: () => void; // Add this line
  setErrorShowSuccess: (value: boolean) => void;
  PlayerName: string;
}

export interface Quest {
  questCategory: string;
  questId?: string;
  gradientColor?: string;
  rewardCondition?: string | number;
  reward?: string;
  points?: number;
  progress?: number;
  actionName?: string;
  playTimesInCurrentStreak?: number;
  completionTarget: string;
  targetDay?: string;
  dayLeftToQuestEnd?: number;
  completedStreak?: number;
  redirectUrl?: string;
  streakAway?: number;
  rewardAway?: number;
  totalPoints?: number;
  name?: string;
  confirmedReferrals?: number;
  sentReferrals: number;
}


const PlayZone: React.FC<PlayZoneProps> = ({
  handleCloseSuccess,
  email,
  photoUrl,
  // erroShowSuccess,
  // setErrorShowSuccess,
  PlayerName,
}) => {
  // const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const [userHabitQuest, setUserHabitQuest] = useState<Quest[]>([]);
  const [serveyQuest, setServeyQuest] = useState<Quest[]>([]);
  const [referralQuest, setReferralQuest] = useState<Quest[]>([]);
  // const [nodgesType, setNodgesType] = useState<string | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false); // State to track whether to show all quests
  const { token } = useNativeReactSdk();
  // console.log(setShowAll);
  // const [error, setError] = useState<Error | null>(null);
  const [isServeyClicked, setIsServeyGoClicked] = useState<boolean>(false);
  // const [nudgesClicked, setNudgesClicked] = useState<boolean>(false);
  const [questId, setQuestId] = useState<string | null>(null);
  const [reward, setReward] = useState<any | null>(null);
  // const [typeOfQuest, setTypeOfQuest] = useState<string | null>(null);
 
  const [isFinisedClickedServey, setIsFinisedClickedServey] = useState<boolean | null>(null);
  const [isAnswerIsCompleted, setIsAnswerIsCompleted] =useState<boolean>(false);
  // const [playerAvatarBg, setPlayerAvatarBg] = useState<string | null>(null);
  // const [checkCharacterType, setCheckCharacterType] = useState<number | null>( null);
  // const [playerAvatar, setPlayerAvatar] = useState<string | null>(null);
  // const [isErrorClicked, setIsErrorClicked] = useState<boolean>(false);
  // const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  // const [surveyQuestGoBtn, setSurveyQuestGoBtn] = useState<boolean>(false);
  const [surveyNudgesOverlay, setSurveyNudgesOverlay] = useState<boolean>(false);
  const [referralsNudgesOverlay, setReferralsNudgesOverlay] = useState<boolean>(false);
  const [userHabitNuggesOverlay, setUserHabitNuggesOverlay] = useState<boolean>(false);
  const [userHabitRewardAway, setUserHabitRewardAway] = useState<any | null>(null);
  const [userHabitStreakAway, setUserHabitStreakAway] = useState<any | null>(null);
  const [confirmedReferrals, setConfirmedReferrals] = useState<any | null>(null);
  const [rewardConditionReferrals, setRewardConditionReferrals] = useState<any | null>(null);
  const [rewardReferrals, setRewardReferrals] = useState<any | null>(null);
  const [surveyName, setSurveyName] = useState<string | null>(null);
  const [rewardCondition,setRewardCondition] = useState<string>("");
  // const [reward,setReward] = useState<string|null>(null);
  const [completedStreak,setCompletedStreak]=useState<number>(0);
  const [playTimesInCurrentStreak,setPlayTimesInCurrentStreak]=useState<number>(0);
  // const [isloadingHeader,setIsloadingHeader]=useState<boolean>(true);
  // const [isloadingQuest,setIsloadingQuest]=useState<boolean>(true);
  // const [isloadingLeaderboard,setIsloadingLeaderboard]=useState<boolean>(true);
  // const token = "4733788f-783d-455f-a2b7-3b1815e53196"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://dev.api.pitch.space/api/quest-for-arcade",
          {
            params: { email, token },
          }
        );

        if (response.status === 200) {
          // setIsloadingQuest(false);
          const quests: Quest[] = response.data.data; // Assuming the data is stored in `data`

          // Filter quests based on questCategory
          const serveyQuests = quests.filter(
            (quest) => quest.questCategory === "Survey Quest"
          );
          const userHabitQuests = quests.filter(
            (quest) => quest.questCategory === "User Habit Quest"
          );
          const referralQuests = quests.filter(
            (quest) => quest.questCategory === "Referral Quest"
          );

          // Update state for each category
          setServeyQuest(serveyQuests);
          setUserHabitQuest(userHabitQuests);
          setReferralQuest(referralQuests);
        }
      } catch (err: any) {
        // setIsloadingQuest(false);
        // setError(err);
      }
    };

    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [token]);

  // const handleCloseModal = () => {
  //   handleCloseSuccess();
  // };

  const SurveyNameGet = (name: string) => {
    setSurveyName(name);
  };

  // const checkForCharacter = (character: number, avatar: string) => {
  //   setCheckCharacterType(character);
  //   setPlayerAvatar(avatar);
  // };

  const userHabitOverlayContent = (rewardCondition:string,reward:string,completedStreak:number,playTimesInCurrentStreak:number) =>{
    setRewardCondition(rewardCondition);
    setReward(reward);
    setCompletedStreak(completedStreak);
    setPlayTimesInCurrentStreak(playTimesInCurrentStreak);
  }

  const reward_streak = (streak: any, reward: any) => {
    setUserHabitRewardAway(reward);
    setUserHabitStreakAway(streak);
  };

  const referralsNdugesOverlayConditionData = (
    confirmedReferrals: any,
    rewardCondition: any,
    reward: any
  ) => {
    setConfirmedReferrals(confirmedReferrals);
    setRewardConditionReferrals(rewardCondition);
    setRewardReferrals(reward);
  };

  // Limit the number of quests to show by default
  const MAX_DISPLAY_QUESTS = 6;

  // Merge all quests into one array and limit if showAll is false
  const allQuests = [...userHabitQuest, ...serveyQuest, ...referralQuest];
  const displayedQuests = showAll? allQuests : allQuests.slice(0, MAX_DISPLAY_QUESTS);

  // if (!isOpen) return null;

  const OnCloseServeyOverlay = () => {
    setIsFinisedClickedServey(false);
    setSurveyNudgesOverlay(false);
  };

  const OnCloseReferralOverlay = () => {
    setReferralsNudgesOverlay(false);
  };
  
  console.log(surveyName);
  console.log(isServeyClicked);
  const isCLIQ= token === "4733788f-783d-455f-a2b7-3b1815e53196";
  const CLIQtopBarHeight=screenHeight*0.1;
  const height = isCLIQ ? screenHeight - CLIQtopBarHeight : screenHeight;

  return (
    
    <View style={{height,width:screenWidth}}>

      {/* {isServeyClicked && (
          <SurveyQuestion
          email={email}
          onClose={() => setIsServeyGoClicked(false)}
          setIsFinisedClickedServey={setIsFinisedClickedServey}
          questId={questId!}
          setSurveyNudgesOverlay={setSurveyNudgesOverlay}
          // setSurveyQuestGoBtn={setSurveyQuestGoBtn}
          photoUrl={photoUrl}
          PlayerName={PlayerName}
          surveyName={surveyName!}
          />
        )
      } */}

      {/* { userHabitNuggesOverlay &&
        <NdugesUserHabitQuestOverlay
        email={email}
        questId={questId!}
        overlayContent={{rewardCondition,reward:reward!,completedStreak,playTimesInCurrentStreak}}
        userHabitRewardAway={userHabitRewardAway} 
        userHabitStreakAway={userHabitStreakAway}
        onCloseHabitQuestOverlay={()=>setUserHabitNuggesOverlay(false)}
        />
      } */}

      <Modal 
      transparent={true}
      visible={userHabitNuggesOverlay}
      animationType="fade"
      onRequestClose={()=>setUserHabitNuggesOverlay(false)}
      > 

      <View style={PlayZoneStyles.overlay}>
      <NdugesUserHabitQuestOverlay
          email={email}
          questId={questId!}
          overlayContent={{rewardCondition,reward:reward!,completedStreak,playTimesInCurrentStreak}}
          userHabitRewardAway={userHabitRewardAway} 
          userHabitStreakAway={userHabitStreakAway}
          onCloseHabitQuestOverlay={()=>setUserHabitNuggesOverlay(false)}
          />
      </View>

      </Modal>
      
      { surveyNudgesOverlay &&
        <NdugesServeyQuestOverlay 
          email={email}
          isFromQuestion={isFinisedClickedServey ?? false}
          questId={questId!}
          OnCloseServeyOverlay={OnCloseServeyOverlay}
        />
      }
      
      { referralsNudgesOverlay &&
        <NdugesReferralsQuestOverlay 
          email={email}
          questId={questId!}
          confirmedReferrals={confirmedReferrals}
          rewardCondition={rewardConditionReferrals}
          reward={rewardReferrals}
          OnCloseReferralOverlay={OnCloseReferralOverlay}
        />
      }

      {/* { (isloadingLeaderboard || isloadingHeader || isloadingQuest) && (
          <ActivityIndicator
            style={{position: 'absolute',top:screeHeight*0.5,left:screenWidth*0.46}}
            size="large" color="tomato" 
          />
      )} */}
      
      <ScrollView style={[PlayZoneStyles.scrollView,{height:screenHeight,width:screenWidth>=500?375:screenWidth}]} showsVerticalScrollIndicator={false}>
      {/* header section   */}
      <View >
         <PlayZoneHeader 
          //  checkForCharacter={checkForCharacter}
           photoUrl={photoUrl}
           email={email}
           PlayerName={PlayerName}
           handleCloseSuccess={handleCloseSuccess}
          //  isLoading={isloadingHeader || isloadingQuest || isloadingLeaderboard}
          //  setIsloadingHeader={setIsloadingHeader}
         />
      </View>


       {!false && <View style={{backgroundColor:'#FFFFFF'}}>
        <View style={PlayZoneStyles.playZoneQuestSee}>
          <View style={{flexDirection:'row'}}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>Quest{" "}</Text>
            <Text style={{fontWeight: "300",fontSize: 20,color: "rgba(6, 24, 44, 0.8)",}}>
              ({allQuests.length})
            </Text>
          </View>
          <Text
            style={PlayZoneStyles.playZoneSee}
            onPress={() => setShowAll(!showAll)}
          >
            {allQuests.length > 6 && (showAll ? "Show less" : "See all")}
          </Text>
        </View>

        <View style={{padding:20}}>
        

        {displayedQuests.filter(
            (quest) => quest.questCategory === "User Habit Quest").length > 0 && (
              <UserHabitQuest
              userHabitQuest={displayedQuests.filter(
              (quest) => quest.questCategory === "User Habit Quest"
              )}
              userHabitOverlayContent={userHabitOverlayContent}
              setUserHabitNuggesOverlay={setUserHabitNuggesOverlay}
              reward_streak={reward_streak}
              setQuestId={setQuestId}
            />
        )}
      
        {displayedQuests.filter(
            (quest) => quest.questCategory === "Survey Quest").length > 0 && (
            <View>
              <View style={{marginTop:20}}/>
              <SurveyQuest
                serveyQuest={displayedQuests.filter(
                        (quest) => quest.questCategory === "Survey Quest"
                )}
                setIsServeyGoClicked={setIsServeyGoClicked}
                setQuestId={setQuestId}
                // setReward={setReward}
                      
                isAnswerIsCompleted={isAnswerIsCompleted}
                setIsAnswerIsCompleted={setIsAnswerIsCompleted}
                setSurveyNudgesOverlay={setSurveyNudgesOverlay}
                SurveyNameGet={SurveyNameGet}
              />
            </View>
          )}


        {displayedQuests.filter(
          (quest) => quest.questCategory === "Referral Quest").length > 0 && (
              <View>
                <View style={{marginTop:20}}/>
                <ReferralsQuest
                referralQuest={displayedQuests.filter(
                (quest) => quest.questCategory === "Referral Quest"
                )}
                // setNudgesClicked={setNudgesClicked}
                setReferralsNudgesOverlay={setReferralsNudgesOverlay}

                email={email}
                setQuestId={setQuestId}
                referralsNdugesOverlayConditionData={referralsNdugesOverlayConditionData}
                />
              </View>
              
        )}

        </View>
      </View>} 
      

      {/* leaderboard section */}
        <Leaderboard 
          email={email} 
          // setIsloadingLeaderboard={setIsloadingLeaderboard} 
          // isLoading={isloadingHeader || isloadingQuest || isloadingLeaderboard}
        /> 
       
      
     

    </ScrollView>

    </View>
    
    
    
  );
};

export default PlayZone;

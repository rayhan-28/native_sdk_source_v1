import React, { useEffect, useState } from "react";
import { View, Text,  StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, Image, Modal } from "react-native";
import axios from "axios";
import ProgressBarSvg from "../../Common/ProgressBarSvg";
import PlayrCardSvgIcons from "../../assets/Image/SVG/PlayerCard/PlayerCardSvg";
import NugesUserHabib from "../../Common/NugesUserHabit";
import NdugesUserHabitQuestOverlay from "../../Common/NdugesUserHabitQuestOverlay";
import PlayZone from "../PlayZone/PlayZone";
import { PlayerCharacterOverlay } from "./PlayerCharacterOverlay/PlayerCharacterOverlay";
// import { useNativeReactSdk } from "../../context/NativeReactSdkContext";
// import PlayerCharacterOverlay from "./PlayerCharacterOverlay";
// import Error from "../Common/Error";
// import NugesUserHabib from "../Common/NugesUserHabit";
// import NdugesUserHabitQuestOverlay from "../Common/NdugesUserHabitQuestOverlay";
// import ProgressBarSvg from "../Common/ProgressBarSvg";
// import PlayZone from "../PlayZone/PlayZone";
// import { Linking } from "react-native";
// import PlayrCardSvgIcons from "../../assets/Image/SVG/PlayerCard/PlayerCardSvg";
// import ProgressBarSvg from "../../Common/ProgressBarSvg";
// import NugesUserHabib from "../../Common/NugesUserHabit";
// import { useNativeReactSdk } from "../../context/NativeReactSdkContext";
// import PlayZone from "../PlayZone/PlayZone";
// import NdugesUserHabitQuestOverlay from "../../Common/NdugesUserHabitQuestOverlay";
// import { PlayerCharacterOverlay } from "./PlayerCharacterOverlay/PlayerCharacterOverlay";
import ImageSlider from "./PlayerCharacterOverlay/SliderData";
import { useNativeReactSdk } from "../../context/NativeReactSdkContext";
// import Error from "../../Common/Error";

const {width:screenWidth}=Dimensions.get('screen')

interface PlayerCardProps {
  width?: string | number;
  maxWidth?: string | number;
  Name?: string;
  PhotoUrl?: string;
  email?: string;
  paddingOverly?:number
}

export interface PlayerData {
  points: number;
  streaks: number;
  rank: number;
  habitQuest: {
    rewardCondition: string;
    reward: string;
    completedStreak: number;
    streakAway: number;
    rewardAway: number;
    points: number;
    progress: number;
    gradientColor: string;
    actionName: string;
    playTimesInCurrentStreak: number;
    completionTarget: string;
    targetDay: number;
    dayLeftToQuestEnd: number;
    redirectUrl: string;
    questId: string;
  };
  playerName: string;
  playerAvatar: string;
  featureUsingDetails: {
    characterType: number;
  };
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  
  Name = "Jahir",
  PhotoUrl = "",
  email = "jahir.rayhan@bedatasolutions.com",
  paddingOverly
}) => {
  const { token } = useNativeReactSdk();
    // const token = "4733788f-783d-455f-a2b7-3b1815e53196"
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(false);
  const [userHabitFromPlayerCard, setUserHabitFromPlayerCard] = useState<boolean>(false);
  const [showPlayZone, setShowPlayZone] = useState<boolean>(false);
  const [erroShowSuccess, setErrorShowSuccess] = useState<boolean>(false);
  // const {width:screenWidth,height:screenHeight}=Dimensions.get('screen')
  // const [isLoading,setIsLoading]=useState<boolean>(false);
  
  //  console.log("palyer height",screenHeight);
  const getOrdinalSuffix = (rank: number): string => {
    if (rank % 10 === 1 && rank % 100 !== 11) return "st";
    if (rank % 10 === 2 && rank % 100 !== 12) return "nd";
    if (rank % 10 === 3 && rank % 100 !== 13) return "rd";
    return "th";
  };
  console.log(playerData);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://dev.api.pitch.space/api/player-info", {
        params: { email, token },
      });
      if (response.status === 200) {
        setPlayerData(response.data?.data);
        savePlayerNameAndAvatar(response.data?.data);
      }
    } catch {
      // setError("You are not valid");
    }
  };


  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  useEffect(() => {
    if (shouldRefetch) {
      fetchData();
      setShouldRefetch(false);
    }
  }, [shouldRefetch]);

  const savePlayerNameAndAvatar = async (player: PlayerData) => {
    try {
      // setIsLoading(true);
      const response = await axios.post(
        `https://dev.api.pitch.space/api/player-info?email=${email}&token=${token}`,
        {
          playerName: Name,
          playerAvatar:
            player?.featureUsingDetails?.characterType === 2
              ? PhotoUrl
              : player?.playerAvatar?.split(",")?.length === 2
              ? player?.playerAvatar
              : "PlayerCharacter,3",
        }
      );
      if(response.status===200){
        // setIsLoading(false)
      }
      
    } catch (error) {
      // setIsLoading(false)
      console.error("Failed to save player avatar");
    }
  };

  // const handleRedirect = (redirectUrl?: string) => {
  //   if (redirectUrl) {
  //     Linking.openURL(redirectUrl);
  //   } else {
  //     console.error("No URL to redirect");
  //   }
  // };

  const handleClick = () =>{
   setIsClicked(true); 
   console.log("char overley clck");
  } 



  const handleOpenPlayZone = () => setShowPlayZone(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setScroll(true);
  //     setTimeout(() => setScroll(false), 3000);
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, []);
  console.log(userHabitFromPlayerCard);
  const rankSuf = playerData?.rank ?? 0;
 
  return false? <View/> :
    
   isClicked?<PlayerCharacterOverlay ImageList={ImageSlider} email={email} Player={playerData!} onClose={()=>setIsClicked(false)} setShouldRefetch={setShouldRefetch}/>
   :
   <View style={{paddingHorizontal:20}}>
    <Modal 
     transparent={true}
     visible={userHabitFromPlayerCard}
     animationType="fade"
     onRequestClose={()=>setUserHabitFromPlayerCard(false)} 
    > 

    <View style={styles.overlay}>
    <NdugesUserHabitQuestOverlay 
      overlayContent={{rewardCondition: playerData?.habitQuest?.rewardCondition??"",
      reward:playerData?.habitQuest?.reward!,
      completedStreak:playerData?.habitQuest?.completedStreak??0,
      playTimesInCurrentStreak:playerData?.habitQuest?.playTimesInCurrentStreak??0
    }}
     questId={playerData?.habitQuest?.questId!}
     email={email}
     userHabitStreakAway= {playerData?.habitQuest?.streakAway!}
     userHabitRewardAway = {playerData?.habitQuest?.rewardAway!}
     onCloseHabitQuestOverlay={()=>setUserHabitFromPlayerCard(false)} 
     paddingOverly={paddingOverly}
    />
        </View>

    </Modal>

    <Modal 
     transparent={true}
     visible={showPlayZone}
     animationType="fade"
     onRequestClose={()=>setShowPlayZone(false)}
    > 

    <View style={styles.overlay}>
    <PlayZone
      email={email} 
      erroShowSuccess={erroShowSuccess} 
      setErrorShowSuccess={setErrorShowSuccess}
      handleErrorClose={()=>setErrorShowSuccess(false)}
      handleCloseSuccess={()=>setShowPlayZone(false)}
      PlayerName={Name}
      photoUrl={PhotoUrl}
    />
    </View>

    </Modal>

    {/* showPlayZone ? (
    <PlayZone
      email={email} 
      erroShowSuccess={erroShowSuccess} 
      setErrorShowSuccess={setErrorShowSuccess}
      handleErrorClose={()=>setErrorShowSuccess(false)}
      handleCloseSuccess={()=>setShowPlayZone(false)}
      PlayerName={Name}
      photoUrl={PhotoUrl}
    />
   ) */}
    <View
       style={[styles.playerCard,{width: screenWidth>=500?375:'100%',
       } ]}
     >
    {/* top */}
    { (false) ? (
    <ActivityIndicator  size="large" color="tomato" />
    ):
      <> 
      <View style={styles.playerCardTop}>
         {PhotoUrl && playerData?.featureUsingDetails?.characterType === 2 ? 
         <View style={styles.playerCardImage}>
         <Image
           source={{uri: PhotoUrl}}
           style={styles.playerImageUrl}
         />
       </View>
         : playerData?.featureUsingDetails?.characterType === 1  ? 
         <View style={styles.playerCardImage}>
           <TouchableOpacity onPress={handleClick}>
           <Image
             source={
               {uri: `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${playerData?.playerAvatar}`}
             }
             style={styles.playerImageUrl}
           />
           </TouchableOpacity>
         </View> : null
         }
         <View style={styles.playerNamePoints}>
           <View style={styles.playerNameTitle}>
             <View>
             <Text style={styles.playerName}>{Name ? Name : playerData?.playerName}</Text>
             </View>
             <Text style={styles.playerTitle}>YOUR PROGRESS</Text>
           </View>
           <View>
             <View style={styles.playerPointText}>
               <View style={styles.playerPointsStreakRank}>
                 <View style={styles.playerPointGapIncrease} >
                 <Text style={styles.playerText}>Points</Text>
                 <Text style={[styles.playerPoint]}>{playerData?.points}</Text>
                 </View>
               </View>

               <View style={styles.playerPointsStreakRank}>
               <View style={styles.playerPointGapIncrease}>
                 <Text style={styles.playerText}>Streaks</Text>
                 <Text style={[styles.playerPoint, ]}>{playerData?.streaks}</Text>
               </View>
               </View>

               <View style={styles.playerPointsStreakRank}>
               <View style={styles.playerPointGap}>
                 <Text style={styles.playerText}>Rank</Text>
                <View style={{flexDirection:'row'}}>
                 <Text style={[styles.playerPoint]}>{playerData?.rank}</Text>
                 <Text style={styles.superscript}>{getOrdinalSuffix(rankSuf)}</Text>
                </View> 
                      
                </View>
              </View>

             </View>
           </View>
         </View>
         {playerData?.featureUsingDetails?.characterType === 0 || (!PhotoUrl && playerData?.featureUsingDetails?.characterType === 2)?
         <TouchableOpacity onPress={handleOpenPlayZone}  style={{marginLeft:'23%'}}>
              <PlayrCardSvgIcons.openIcon  />
         </TouchableOpacity>
         :
         <TouchableOpacity onPress={handleOpenPlayZone}>
            <PlayrCardSvgIcons.openIcon  />
        </TouchableOpacity>
         }
         

       </View>
       {playerData?.habitQuest &&<>
       <View style={styles.playerCardMiddle}>

       <View style={styles.playerVoucher}>
        <ScrollView
          horizontal={true} // Enables horizontal scrolling
          showsHorizontalScrollIndicator={false} // Hides the scrollbar
        >
          <Text numberOfLines={1}  ellipsizeMode="tail" style={styles.voucherText}>
          {playerData?.habitQuest?.rewardCondition}: {playerData?.habitQuest?.reward}
          </Text>
        </ScrollView>
      </View>
         <View  style={styles.streakIcon}>
           {playerData?.habitQuest?.completedStreak===0?
           <View  style={{ marginRight: 5 ,marginTop: 3}}>
           <PlayrCardSvgIcons.empty_streak  />
           </View>
              : <View  style={{ marginRight: 5,marginTop: 3}}>
            <PlayrCardSvgIcons.streak  />
            </View>}
           <Text style={{fontSize: 12,fontWeight:'500'}}>{(playerData?.habitQuest?.completedStreak)} Streak</Text>
         </View>
       </View>
       
       <View  style={styles.playerCardLast}>
         <View  style={styles.circleProgress}>
           <ProgressBarSvg 
           points={playerData?.habitQuest?.points??0}
           progress={playerData?.habitQuest?.progress}
           progressColor={playerData?.habitQuest?.gradientColor??"#FFD4D4"}
           fromPlayerCard={true}
           />
           <View  style={styles.details}>
             <Text  style={styles.detailsText}>{playerData?.habitQuest?.actionName}</Text>
           
             <Text  style={styles.outOfPoint}>{playerData?.habitQuest?.playTimesInCurrentStreak} out of {playerData?.habitQuest?.completionTarget.split(' ',1)}
             </Text>
           
             <Text  style={styles.timeDuration}>
               in {playerData?.habitQuest?.targetDay} days ({playerData?.habitQuest?.dayLeftToQuestEnd} days left)
             </Text>
           </View>
         </View>
         
         <View>
           <TouchableOpacity 
           style={styles.playerGoButton} 
          //  onPress={()=>handleRedirect(playerData?.habitQuest?.redirectUrl)}
           >
            <Text style={styles.playerGoButtonText}  >Go</Text>
          </TouchableOpacity>
         </View>
       </View>
       <View style={{height: 10}}/>
       {playerData?.habitQuest?.streakAway===0 && playerData?.habitQuest?.rewardAway===0 && playerData?.habitQuest?.completedStreak===0 ? null:
           <NugesUserHabib
             streakAway = {playerData?.habitQuest?.streakAway}
             rewardAway = {playerData?.habitQuest?.rewardAway}
             fromPlayer={true}
             setUserHabitNuggesOverlay={setUserHabitFromPlayerCard}
           />}
           </>}
         </>
      }
       
     </View>
   </View>
     
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
    playerCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 20,
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom:18,
      // Shadow for iOS
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, // Transparency of the shadow
    shadowRadius: 3.5, 
    
    // Shadow for Android
    elevation: 2, 
    },
    playerCardTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    playerNamePoints: {
      width: '70%',
    },
    playerNameTitle: {
      flexDirection: 'column',
    },
    playerName: {
      fontSize: 20,
      fontWeight: '700',
      color: '#06182C',
    },
    playerTitle: {
      color: '#06182C80',
      fontSize: 10,
      fontWeight: '700',
    },
    playerText: {
    color: '#06182C80',
    fontSize: 12,
    fontWeight: '400',
    },
    playerPointText: {
      flexDirection: 'row',
      gap: 25,
    },
    playerPointsStreakRank: {
     flexDirection: 'column',
    position:'relative'
    },
    playerPoint: {
      fontSize: 24,
      fontWeight: '500',
      color: 'black',
    },
    playerCardMiddle: {
      height: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    streakIcon: {
      flexDirection: 'row',
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    circleProgress: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    playerCardLast: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    details: {
      flexDirection: 'column',
    },
    detailsText: {
      fontWeight: '700',
      fontSize: 14,
      color: '#06182CE5',
    },
    outOfPoint: {
      fontWeight: '300',
      fontSize: 22,
      color: '#06182CCC',
    },
    timeDuration: {
      fontWeight: '400',
      fontSize: 12,
      color: '#06182CCC',
    },
    playerGoButton: {
      backgroundColor: '#06182C',
      color: '#FFFFFF',
      width: 61,
      height: 26,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
    },
    goButtonText: {
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 14,
    },
    playerGoButtonText:{
      color: '#FFFFFF',
      fontWeight: '500',
      fontSize: 14,
    },
    nudgesQuest: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: 'rgba(219, 210, 210, 0.301)',
      borderRadius: 40,
    },
    iconTextQuest: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    textEllipsis: {
      fontSize: 12,
      fontWeight: '500',
      maxWidth: 100, // Adjust the max width based on screen size
      overflow: 'hidden'
    },
    arrowBox: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      backgroundColor: 'black',
    },
    arrowText: {
      color: 'white',
    },
    superscript: {
      fontSize: 13,
      top:2,
      marginLeft:-2.3,
      // position: 'absolute',
    },
      playerCardImage: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginRight: 10,
      },
      playerImageUrl: {
        height: 80, // Use numeric values for dimensions
        width: 80,
        borderRadius: 40, // Half of the width/height for a circular image
        marginRight: 10,
      },
      playerPointGap: {
        display: 'flex', // This is the default value, so you can omit it.
        flexDirection: 'column', // Correct way in React Native.
      },
      playerPointGapIncrease: {
        // display: 'flex', // Again, this is redundant, so you can skip it.
        // flexDirection: 'column',
      },
    
      playerVoucher: {
        maxWidth: 200,
        height:20,
        overflow: 'hidden',
        position: 'relative',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 0,
        paddingHorizontal: 10,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        
      },
      voucherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        
      },
      voucherText: {
        color: '#06182CCC',
        fontWeight:'500',
        lineHeight: 15.29,
         fontSize: 12,
      },

      


     
      
  });

export default PlayerCard;
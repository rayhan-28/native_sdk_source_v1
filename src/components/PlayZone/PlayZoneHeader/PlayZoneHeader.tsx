import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayZoneHeaderSvgIcon from "../../../assets/Image/SVG/PlayZoneHeader/PlayZoneHeader";
import { TouchableOpacity, View, Image, Text, ScrollView, ImageBackground} from "react-native";
import PlayZoneSvgIcon from "../../../assets/Image/SVG/PlayZone/PlayZone";
import PlayZoneHeaderStyles from "../../../assets/StyledComponents/PlayZone/PlayZoneHeader/PlayZoneHeader";
import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";
// const {width:screenWidth,height:screeHeight}=Dimensions.get('screen')

// Define types for props
interface PlayZoneHeaderProps {
  width?: string;
  maxWidth?: string;
  email: string;
  PhotoUrl: string;
  handleCloseSuccess: () => void;
  // checkForCharacter: (characterType: number, avatarPlayer: string) => void;
  PlayerName: string;
  setIsloadingHeader: (b: boolean) => void
  isLoading: boolean
}

const Levels = [
  "Explorer",
  "Rookie",
  "Adventurer",
  "Master",
  "Champion",
  "Legend",
  "Hero",
  "Titan",
  "Native",
  "Super Native",
];

const text = [
  "for sending referrals",
  "for having streaks",
  "for taking surveys",
  "for being active",
  "for posting about us",
  "for leaving reviews",
];

const rewardsIcon = [
  PlayZoneHeaderSvgIcon.referrals,
  PlayZoneHeaderSvgIcon.UserGenerateContent,
  PlayZoneHeaderSvgIcon.servey,
  PlayZoneHeaderSvgIcon.userActivation,
  PlayZoneHeaderSvgIcon.userHabit,
  PlayZoneHeaderSvgIcon.reviewRestimonial,
];

const PlayZoneHeader: React.FC<PlayZoneHeaderProps> = ({
  // width = "100%",
  // maxWidth = 375,
  email,
   PhotoUrl,
  // checkForCharacter,
  PlayerName,
  handleCloseSuccess,
  setIsloadingHeader,
  isLoading
}) => {
  // const [selectedEarning, setSelectedEarning] = useState<string>("artefact");
  // const [isloadingImage, setIsloadingImage]=useState<boolean>(true)

  const getOrdinalSuffix = (rank: number): string => {
    if (rank % 10 === 1 && rank % 100 !== 11) {
      return "st";
    } else if (rank % 10 === 2 && rank % 100 !== 12) {
      return "nd";
    } else if (rank % 10 === 3 && rank % 100 !== 13) {
      return "rd";
    } else {
      return "th";
    }
  };
  

  // api call
  const { token } = useNativeReactSdk(); 

  const [data, setData] = useState<any | null>(null); // Set state to store the API data
  // const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // Make an API call with the stored email and token
    const fetchData = async () => {
     
      try {
         setIsloadingHeader(true)
        const response = await axios.get(
          "https://dev.api.pitch.space/api/player-level",
          {
            params: {
              email: email,
              token: token,
            },
          }
        );
        console.log(email);
        if (response.status === 200) {
          setIsloadingHeader(false);
          setData(response.data);
        }
      } catch (err) {
        setIsloadingHeader(false);
        // setError("You are not valid");
      }
    };

    if (token) {
      fetchData(); // Only fetch if both email and token are set
    }
  }, [token, data?.data?.currentLevel]);

  // const [currentIndex, setCurrentIndex] = useState<number | undefined>(data?.data?.currentLevel); // Ensure this is a number or undefined

  // const calculateProgress = (currentIndex: number): number => {
  //   const totalLevels = Levels.length;
  //   const progressPercentage = (currentIndex / (totalLevels - 1)) * 100;
  //   return progressPercentage;
  // };

  const characterType = data?.data?.featureUsingDetails?.characterType ?? 0;
  // const avatarPlayer = data?.data?.playerAvatar;
  console.log(characterType);

  // if (characterType === 1) {
  //   checkForCharacter(characterType, avatarPlayer);
  // }

  const rankSuf = data?.data?.rank ?? 0;

  const [selectedEarning, setSelectedEarning] = useState<string>("artefact")

  const handleSelectEarning = (earning:any) => {
    setSelectedEarning(earning);
  };
  // const [random,setRandom]=useState(2)
  // const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   // Calculate the offset based on the desired index (e.g., index 4)
  //   const itemWidth = 100; // Set the width of each level item (you can adjust this)
  //   const desiredIndex = 4; // Change this index to whatever index you want to show at 0
  //   // const offset = itemWidth * desiredIndex; // Calculate the content offset
  //   // setScrollPosition(offset);
  // }, []);

  const backgroundImageUrl = data?.data?.featureUsingDetails?.characterType===1
  ? `https://res.cloudinary.com/pitchspace/image/upload/v1/player-icons/${data?.data?.playerAvatar}`
  : null;

  const handleCloseModal = () => {
    handleCloseSuccess();
  };


  return (
  <>
    {/* top part */}

    {/* { isloadingImage && ( <ActivityIndicator 
        style = {{ position: 'absolute', top: screeHeight*0.3, left:screenWidth*0.46 }} 
        size="large" color="green" 
      />
    )} */}
   
    {!isLoading && <ImageBackground
      source={data?.data?.featureUsingDetails?.characterType==1? { uri: backgroundImageUrl ?? undefined } : undefined}
      style={[PlayZoneHeaderStyles.firstContainer, {
        height:data?.data?.featureUsingDetails?.characterType===1?590:'auto',
        backgroundColor:characterType===1?"":'#ABA1FA',
        // borderRadius:20,
      }]}
      // onLoadStart={() => setIsloadingImage(true)}
      // onLoadEnd={() => setIsloadingImage(false)}
    >
    <TouchableOpacity onPress={handleCloseModal}>
    <View style={PlayZoneHeaderStyles.hideIcon}>
        <PlayZoneSvgIcon.hideButton/>
    </View >
    </TouchableOpacity>
        {data?.data?.featureUsingDetails?.characterType===1&&<View style={{marginTop:140}}/>}
        <View style={PlayZoneHeaderStyles.imageTitle}>
          {characterType===2  ? (
          <Image
            source={{ uri: PhotoUrl }}
            style={PlayZoneHeaderStyles.topCharacterImag}
          />
        ) : null}
        <View>
          {(data?.data?.playerName  || PlayerName) &&
           <Text style={PlayZoneHeaderStyles.Title}>Hello</Text>}
          <Text 
            style={PlayZoneHeaderStyles.Name} >
            {data?.data?.playerName?data?.data?.playerName:PlayerName}</Text>
        </View>
        </View>
   
        


      {/* second part Level */}
      <View style={PlayZoneHeaderStyles.levelContainer}>
        <View style={PlayZoneHeaderStyles.progressBarWrapper}>
          <View style={PlayZoneHeaderStyles.progressBar}/>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {Levels.map((level,index)=>(
            <View key={index} style={PlayZoneHeaderStyles.LevelStyle}>
              <View style={{flexDirection:'column'}}>
                <Text style={PlayZoneHeaderStyles.levelText}>{level}</Text>
                
              {index === data?.data?.currentLevel && (
                  // <View>hello</View>
                  <View style={PlayZoneHeaderStyles.circle}/>
              )}
              {index === data?.data?.currentLevel && (
                  <Text style={PlayZoneHeaderStyles.nextLevelText}>
                        ({data?.data?.requiredPointToLevelUp} to level up)
                  </Text>
                )}
              </View>
              
            </View>

          ))}
        </ScrollView>
      </View>

    
   
   {/* third part point streak rank */}
   
   <View>
      <View style={PlayZoneHeaderStyles.playerPointText}>
        <View style={PlayZoneHeaderStyles.playerPointsStreakRank}>
        <View style={PlayZoneHeaderStyles.playerPointGapIncrease} >
          <Text style={PlayZoneHeaderStyles.playerText}>Points</Text>
          <Text style={[PlayZoneHeaderStyles.playerPoint]}>{data?.data?.points}</Text>
        </View>
        </View>

        <View style={PlayZoneHeaderStyles.playerPointsStreakRank}>
        <View style={PlayZoneHeaderStyles.playerPointGapIncrease}>
          <Text style={PlayZoneHeaderStyles.playerText}>Streaks</Text>
          <Text style={[PlayZoneHeaderStyles.playerPoint]}>{data?.data?.streaks}</Text>
        </View>
        </View>

        <View style={PlayZoneHeaderStyles.playerPointsStreakRank}>
        <View style={PlayZoneHeaderStyles.playerPointGap}>
        <Text style={PlayZoneHeaderStyles.playerText}>Rank</Text>
        <View style={{flexDirection:'row'}}>
         <Text style={[PlayZoneHeaderStyles.playerPoint]}>{data?.data?.rank}</Text>
         <Text style={PlayZoneHeaderStyles.superscript}>{getOrdinalSuffix(rankSuf)}</Text>
        </View> 
          
        </View>
        </View>

        </View>
  </View>

  {/* fourth part */}
  <View style={PlayZoneHeaderStyles.questName}>
      <TouchableOpacity onPress={() => handleSelectEarning("artefact")}>
        <Text
          style={[
            PlayZoneHeaderStyles.earningText,
            selectedEarning === "artefact" && PlayZoneHeaderStyles.activeEarning,
            {color:'white'}
          ]}
        >
          Artefacts ({data?.data?.artefacts})
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleSelectEarning("reward")}>
        <Text
          style={[
            PlayZoneHeaderStyles.earningText,
            selectedEarning === "reward" && PlayZoneHeaderStyles.activeEarning,
            {color:'white'}
          ]}
        >
          Reward (0)
        </Text>
      </TouchableOpacity>
    </View>
    
    {/* fifth part */}
    {selectedEarning==='artefact' &&<View style={PlayZoneHeaderStyles.levelContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {rewardsIcon.map((Icon,index)=>(
            <View key={index}
            style={[
             PlayZoneHeaderStyles.rewardPoint,
             {
               padding:(index===0 || index===5)?5:11,
               marginRight:15
             }
           ]}
           >
             <View  style={{ marginLeft: index === 0 ? 7 : index === 1 ? 2 : 0 }}>
               <Icon/>
             </View>
             <Text style={{ margin: 0,fontSize:14,fontWeight:'500',lineHeight:15,color:'white' }}>x 1</Text>
             <Text style={{ margin:0,fontSize: 10,fontWeight:'700',color:'white' }}>
             {text[index]}
             </Text>
           </View>

          ))}
        </ScrollView>
      </View>
  }

     </ImageBackground>}
  </>
  );
};

export default PlayZoneHeader;

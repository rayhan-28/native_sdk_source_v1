import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import SliderItem from "./SliderItem";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import type { ImageSliderType } from "./SliderData";
import type { PlayerData } from "../PlayerCard";
// import { useNativeReactSdk } from "../../../context/NativeReactSdkContext";
import ReferralSvgIcon from "../../../assets/Image/SVG/ReferralsQuest/ReferralsQuest";
const {width,height}=Dimensions.get('screen')

type Props = {
  ImageList: ImageSliderType[];
  email:string;
  Player:PlayerData,
  onClose: () => void;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;

};

export interface Player {
  playerAvatar: string | null;
  [key: string]: any; // Allow other dynamic fields
}

export const PlayerCharacterOverlay = ({ ImageList,email,Player,setShouldRefetch,onClose, }: Props) => {
  const [isCrossButtonClicked, setIsCrossButtonClicked] = useState<boolean>(false);
  // const { token } = useNativeReactSdk(); // Get email and token from context

    const token = "4733788f-783d-455f-a2b7-3b1815e53196"
  const [isCharacterClicked,setIsCharacterClicked]=useState<number>(0);
  const [newIndex,setNewIndex]=useState<number|null>(null)
  
  const currentIndex = Player?.playerAvatar ? Number(Player.playerAvatar.split(",")[1]) : 2

  const onPlayerAvaterSaved = async (index:number) => {
    try {
      const response = await axios.post(
        `https://dev.api.pitch.space/api/player-info?email=${email}&token=${token}`,
        {
          playerAvatar: "PlayerCharacter," + (index+1)
        }
      );
      if (response.status === 200) {
        setShouldRefetch(true);
      } 
    } catch (err) {
      // setError('You are not valid');
    }
  };

  

  useEffect(() => {
    if (isCrossButtonClicked) {
      // setIsOverlayClicked(false);
      setIsCrossButtonClicked(false);
    }
  }, [isCrossButtonClicked, setIsCrossButtonClicked]);

 

  const flatListRef = useRef<FlatList<ImageSliderType>>(null); 
  const scrollX = useSharedValue(0);

  console.log("misbah ",currentIndex, ImageList.length);

  useEffect(() => {
    // Scroll to the current index when the component mounts
    if (flatListRef.current && currentIndex <= ImageList.length) {
      flatListRef.current.scrollToIndex({ index: currentIndex-1, animated: false });
    }
  }, [currentIndex, ImageList]);


  

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    },
   
  });
  
  console.log("over check ,",isCharacterClicked);
  // const handleIndexChange = (index: number) => {
  //   setCurrentIndex(index);
  // };
  return (
    <View style={styles.container}>
      <TouchableOpacity  onPress={onClose} style={{alignSelf:'flex-end',paddingRight:'8%',paddingTop:'20%'}}>
        <ReferralSvgIcon.cross />
      </TouchableOpacity>
      {/* <View style={{paddingBottom:'10%'}}/> */}

      <Text style={styles.characterTitle}>Select your character</Text>
      <Animated.FlatList
        data={ImageList}
        ref={flatListRef}
        renderItem={({ item, index }) => (
          <SliderItem item={item} index={index} scrollX={scrollX} setNewIndex={setNewIndex}
          isCharacterClicked={isCharacterClicked}
          setIsCharacterClicked={setIsCharacterClicked}/>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={onScrollHandler}
        removeClippedSubviews={false}
        getItemLayout={(_, index) => ({
          length: width, // Width of each item
          offset: width * index, // Position of each item
          index,
        })}
      />
      
        <TouchableOpacity 
        style=
        {[styles.btn,{backgroundColor:isCharacterClicked?'black':'#f0eded'}]}
         onPress={ () => {
          if (newIndex !== null) {
             onPlayerAvaterSaved(newIndex);
            onClose();
          }
        }}
        disabled={!isCharacterClicked}
        >
      <Text style={styles.btnText}>Save</Text>
    </TouchableOpacity>
      <View style={{paddingBottom:'50%'}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width,
    height,
    backgroundColor: "#FFFFFF", // Background color for the safe area
    alignItems: "center",
    justifyContent: 'space-between',
    flexDirection: "column",
    // paddingTop:'10%'
    
    borderRadius:20,
    


  },
  characterTitle: {
    fontWeight: "500",
    fontSize: 24,

  },

  btn: {
    width: 140, // Directly apply the width
    height: 40, // Directly apply the height
    backgroundColor: "black",
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center", // Ensure text alignment
  },
});

import {  Image, StyleSheet, Dimensions, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import type { ImageSliderType } from './SliderData'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import type {SharedValue} from 'react-native-reanimated'

const {width}=Dimensions.get('screen')

type Props={
    item:ImageSliderType;
    index:number;
    scrollX:SharedValue<number>;
    setNewIndex: (index: number|null) => void;
    setIsCharacterClicked: React.Dispatch<React.SetStateAction<number>>;
    isCharacterClicked: number;
}

const SliderItem = ({item,index,scrollX,setNewIndex,setIsCharacterClicked,isCharacterClicked}:Props) => {

    
    const rnAnimatedStyle =useAnimatedStyle(()=>{
        return {
            transform:[
                {
                    translateX:interpolate(
                        scrollX.value,
                        [(index-1)*width,index*width,(index+1)*width],
                        [-width*0.30,0,width*0.30],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale :interpolate(
                        scrollX.value,
                        [(index-1)*width,index*width,(index+1)*width],
                        [0.9,1,0.9],
                        Extrapolation.CLAMP
                    )
                }
            ]
        }
})
  
const handleClick = () => {
    
    if (isCharacterClicked === (index + 1)) {
     
      setNewIndex(null);
      setIsCharacterClicked(0);
    } else {
      // Otherwise, select the imag
      setNewIndex(index)
      setIsCharacterClicked(index + 1)
    }
     
  };
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
         <Animated.View style={[styles.itemContainer,rnAnimatedStyle]}>
      <Image
       source={item.image}
       style={[
        styles.image,
        isCharacterClicked===index+1 && styles.selectedImage, // Conditionally apply border
      ]}
      />
    </Animated.View>
    </TouchableWithoutFeedback>
   
  )
}

const styles=StyleSheet.create({
    itemContainer:{
        justifyContent:'center',
        alignItems:'center',
        // gap:10,
        width
        
    },
    image: {
        width:  width * 0.7,
        height: 350,
        borderRadius: 20,
      },
      selectedImage: {
        borderWidth: 5,
        borderColor: '#e0dcdc', // Add your desired border color
      },
})


export default SliderItem
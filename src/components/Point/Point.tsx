import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ReferralSvgIcon from '../../assets/Image/SVG/ReferralsQuest/ReferralsQuest';

import axios from 'axios';
import { useNativeReactSdk } from '../../context/NativeReactSdkContext';

interface PointProps {
  actionName?: string; // Optional prop with a default value
}

const Point: React.FC<PointProps> = ({ actionName = '' }) => {
  const { token } = useNativeReactSdk();
  const [point, setPoint] = useState<any | null>(null);

  // Memoize the GetPoint function using useCallback
  const GetPoint = useCallback(async () => {
    try {
      const response: any = await axios.get(
        'https://dev.api.pitch.space/api/point-for-action',
        {
          params: {
            token,
            actionName,
          },
        }
      );
      if (response.status === 200) {
        setPoint(response.data?.data?.point);
      }
    } catch (err) {
      console.error('Failed to fetch player data', err);
    }
  }, [token, actionName]); // Dependencies: only re-run if token or actionName changes

  useEffect(() => {
    if (token && actionName) {
      GetPoint(); // Fetch player data initially
    }
  }, [token, actionName, GetPoint]); // Re-run effect when token, actionName, or GetPoint changes

  return (
    <View style={styles.pointsContainer}>
      <ReferralSvgIcon.star_small />

      <Text style={styles.text}>{point || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pointsContainer: {
    backgroundColor: '#e0d1fc',
    color: '#333',
    height: 30,
    width: 70,
    borderRadius: 20,
    fontWeight: '500',
    fontSize: 18,
    display: 'flex',
    columnGap: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
});

export default Point;

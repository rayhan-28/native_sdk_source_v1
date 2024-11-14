import {
  requireNativeComponent,
  UIManager,
  Platform,
  type ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'practice-native-sdk' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type PracticeNativeSdkProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'PracticeNativeSdkView';

export const PracticeNativeSdkView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<PracticeNativeSdkProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

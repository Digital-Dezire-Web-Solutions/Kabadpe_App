// import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  createStackNavigator,
} from '@react-navigation/stack';
import { withLayoutContext } from 'expo-router';

const { Navigator } = createStackNavigator();

export const JsStack = withLayoutContext(Navigator);

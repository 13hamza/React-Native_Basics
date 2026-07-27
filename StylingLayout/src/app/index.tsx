import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
//import App from "./components/StyleSheet";
//import FlexboxExample from "./components/FlexboxExample";
//import AxisExample from "./components/AxisExample";
//import FlexProperties from "./components/FlexProperties";
//import Dimensions from "./components/Dimensions";
//import DimensionsWithRotation from "./components/DimensionsWithRotation";
//import UseWindowDimensionsExample from "./components/UseWindowDimensionsExample";
//import PixelRatioExample from "./components/PixelRatioExample";
//import GetResponsiveSize from "./components/getResponsiveSize";
import ProfileCard from "./components/ProfileCard";

export default function Index() {
  return (
    <ProfileCard
      name="Jane Doe"
      role="Software Engineer"
      avatarUrl="https://example.com/avatar.png"
    />
  );
}

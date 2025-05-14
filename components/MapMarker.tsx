import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CircleAlert as AlertCircle, TriangleAlert as AlertTriangle, BellRing, MapPin } from 'lucide-react-native';
import colors from '@/styles/colors';
import { AlertType } from '@/types/alert';

type MarkerType = AlertType | 'user';

interface Props {
  lat: number;
  lng: number;
  type: MarkerType;
  text: string;
}

const MapMarker = ({ type, text }: Props) => {
  const getMarkerStyle = () => {
    switch (type) {
      case 'test':
        return {
          backgroundColor: colors.alert.test,
          icon: <BellRing size={16} color={colors.white} />,
        };
      case 'type1':
        return {
          backgroundColor: colors.alert.type1,
          icon: <AlertTriangle size={16} color={colors.white} />,
        };
      case 'type2':
        return {
          backgroundColor: colors.alert.type2,
          icon: <AlertCircle size={16} color={colors.white} />,
        };
      case 'user':
        return {
          backgroundColor: colors.primary[500],
          icon: <MapPin size={16} color={colors.white} />,
        };
      default:
        return {
          backgroundColor: colors.primary[500],
          icon: <MapPin size={16} color={colors.white} />,
        };
    }
  };

  const markerStyle = getMarkerStyle();

  return (
    <View style={styles.markerContainer}>
      <View style={[styles.marker, { backgroundColor: markerStyle.backgroundColor }]}>
        {markerStyle.icon}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'relative',
    transform: [{ translateX: -20 }, { translateY: -40 }],
  },
  marker: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 2,
    borderColor: colors.white,
  },
  textContainer: {
    position: 'absolute',
    bottom: -20,
    backgroundColor: colors.white,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  text: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    color: colors.neutral[800],
    textAlign: 'center',
  },
});

export default MapMarker;
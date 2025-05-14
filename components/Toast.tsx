import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { X, TriangleAlert as AlertTriangle, CircleAlert as AlertCircle, BellRing } from 'lucide-react-native';
import colors from '@/styles/colors';
import { AlertType } from '@/types/alert';

interface Props {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: AlertType;
  duration?: number;
}

export default function Toast({
  visible,
  onClose,
  title,
  message,
  type,
  duration = 5000,
}: Props) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (visible) {
      // Start animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      // Auto hide after duration
      timeout.current = setTimeout(() => {
        hide();
      }, duration);
    }
    
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [visible]);

  const hide = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  if (!visible) return null;

  const getAlertTypeInfo = () => {
    switch (type) {
      case 'test':
        return {
          color: colors.alert.test,
          icon: <BellRing size={20} color={colors.white} />,
        };
      case 'type1':
        return {
          color: colors.alert.type1,
          icon: <AlertTriangle size={20} color={colors.white} />,
        };
      case 'type2':
        return {
          color: colors.alert.type2,
          icon: <AlertCircle size={20} color={colors.white} />,
        };
      default:
        return {
          color: colors.primary[500],
          icon: <AlertCircle size={20} color={colors.white} />,
        };
    }
  };

  const alertInfo = getAlertTypeInfo();

  return (
    <Animated.View 
      style={[
        styles.container, 
        { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        })}] }
      ]}
    >
      <View style={[styles.toast, { borderLeftColor: alertInfo.color }]}>
        <View style={[styles.iconContainer, { backgroundColor: alertInfo.color }]}>
          {alertInfo.icon}
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={hide}>
          <X size={20} color={colors.neutral[500]} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60, // Below the header
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    padding: 16,
  },
  toast: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: colors.white,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderLeftWidth: 4,
    overflow: 'hidden',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  content: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.neutral[800],
    marginBottom: 4,
  },
  message: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.neutral[600],
  },
  closeButton: {
    padding: 8,
  },
});
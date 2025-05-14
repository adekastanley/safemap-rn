import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CircleAlert as AlertCircle, TriangleAlert as AlertTriangle, BellRing, Clock } from 'lucide-react-native';
import colors from '@/styles/colors';
import { Alert } from '@/types/alert';

interface Props {
  alert: Alert;
}

export default function AlertCard({ alert }: Props) {
  const getAlertTypeInfo = () => {
    switch (alert.type) {
      case 'test':
        return {
          color: colors.alert.test,
          icon: <BellRing size={20} color={colors.white} />,
          label: 'Test Alert',
        };
      case 'type1':
        return {
          color: colors.alert.type1,
          icon: <AlertTriangle size={20} color={colors.white} />,
          label: 'Community Alert',
        };
      case 'type2':
        return {
          color: colors.alert.type2,
          icon: <AlertCircle size={20} color={colors.white} />,
          label: 'Emergency Alert',
        };
      default:
        return {
          color: colors.primary[500],
          icon: <AlertCircle size={20} color={colors.white} />,
          label: 'Alert',
        };
    }
  };

  const alertInfo = getAlertTypeInfo();
  
  const formatTimestamp = (timestamp: number) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes === 1 ? '' : 's'} ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours === 1 ? '' : 's'} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days === 1 ? '' : 's'} ago`;
    }
  };

  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: alertInfo.color }]}>
        {alertInfo.icon}
        <Text style={styles.badgeText}>{alertInfo.label}</Text>
      </View>
      
      <Text style={styles.title}>{alert.title}</Text>
      <Text style={styles.description}>{alert.description}</Text>
      
      <View style={styles.footer}>
        <Clock size={16} color={colors.neutral[500]} />
        <Text style={styles.timestamp}>{formatTimestamp(alert.timestamp)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  badgeText: {
    color: colors.white,
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginLeft: 4,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.neutral[800],
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.neutral[700],
    marginBottom: 16,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.neutral[500],
    marginLeft: 8,
  },
});
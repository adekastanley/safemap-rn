export type AlertType = 'test' | 'type1' | 'type2';

export interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: number;
  userId: string;
}

export interface UserProfile {
  id: string;
  name: string;
  location: string;
  alerts: Alert[];
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  type: 'store' | 'logistics' | 'cafe';
  time: string;
  value: string;
}

export interface StatCardProps {
  label: string;
  value: string;
  trend?: string;
  icon: string;
  color: string;
}

export interface RewardItem {
  id: string;
  brand: string;
  offer: string;
  progress: number;
  total: number;
  icon: string;
  color: string;
  distance: string;
}

export interface CampaignItem {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'scheduled';
  zone: string;
  openRate: string;
  convRate: string;
  startTime?: string;
}

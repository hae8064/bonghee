interface AwardType {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  category: string;
  images?: {
    url: string;
    alt: string;
  }[];
}

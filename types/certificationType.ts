export interface CertificationType {
  id: number;
  name: string;
  issuer: string; // 발급기관
  period: string; // 취득일
  description?: string; // 선택사항
}

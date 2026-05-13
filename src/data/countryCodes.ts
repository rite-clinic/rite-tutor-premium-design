export type Country = {
  code: string; // ISO
  name: string;
  dial: string; // without +
  flag: string;
  min: number;
  max: number;
};

// Curated list of common countries; min/max = national number length range
export const COUNTRIES: Country[] = [
  { code: "US", name: "United States", dial: "1", flag: "🇺🇸", min: 10, max: 10 },
  { code: "CA", name: "Canada", dial: "1", flag: "🇨🇦", min: 10, max: 10 },
  { code: "IN", name: "India", dial: "91", flag: "🇮🇳", min: 10, max: 10 },
  { code: "GB", name: "United Kingdom", dial: "44", flag: "🇬🇧", min: 10, max: 10 },
  { code: "AU", name: "Australia", dial: "61", flag: "🇦🇺", min: 9, max: 9 },
  { code: "AE", name: "United Arab Emirates", dial: "971", flag: "🇦🇪", min: 8, max: 9 },
  { code: "SA", name: "Saudi Arabia", dial: "966", flag: "🇸🇦", min: 9, max: 9 },
  { code: "SG", name: "Singapore", dial: "65", flag: "🇸🇬", min: 8, max: 8 },
  { code: "MY", name: "Malaysia", dial: "60", flag: "🇲🇾", min: 9, max: 10 },
  { code: "PH", name: "Philippines", dial: "63", flag: "🇵🇭", min: 10, max: 10 },
  { code: "ID", name: "Indonesia", dial: "62", flag: "🇮🇩", min: 9, max: 12 },
  { code: "JP", name: "Japan", dial: "81", flag: "🇯🇵", min: 10, max: 10 },
  { code: "KR", name: "South Korea", dial: "82", flag: "🇰🇷", min: 9, max: 10 },
  { code: "CN", name: "China", dial: "86", flag: "🇨🇳", min: 11, max: 11 },
  { code: "HK", name: "Hong Kong", dial: "852", flag: "🇭🇰", min: 8, max: 8 },
  { code: "NZ", name: "New Zealand", dial: "64", flag: "🇳🇿", min: 8, max: 10 },
  { code: "DE", name: "Germany", dial: "49", flag: "🇩🇪", min: 10, max: 11 },
  { code: "FR", name: "France", dial: "33", flag: "🇫🇷", min: 9, max: 9 },
  { code: "IT", name: "Italy", dial: "39", flag: "🇮🇹", min: 9, max: 11 },
  { code: "ES", name: "Spain", dial: "34", flag: "🇪🇸", min: 9, max: 9 },
  { code: "NL", name: "Netherlands", dial: "31", flag: "🇳🇱", min: 9, max: 9 },
  { code: "SE", name: "Sweden", dial: "46", flag: "🇸🇪", min: 7, max: 10 },
  { code: "NO", name: "Norway", dial: "47", flag: "🇳🇴", min: 8, max: 8 },
  { code: "DK", name: "Denmark", dial: "45", flag: "🇩🇰", min: 8, max: 8 },
  { code: "FI", name: "Finland", dial: "358", flag: "🇫🇮", min: 9, max: 10 },
  { code: "IE", name: "Ireland", dial: "353", flag: "🇮🇪", min: 9, max: 9 },
  { code: "CH", name: "Switzerland", dial: "41", flag: "🇨🇭", min: 9, max: 9 },
  { code: "AT", name: "Austria", dial: "43", flag: "🇦🇹", min: 10, max: 11 },
  { code: "BE", name: "Belgium", dial: "32", flag: "🇧🇪", min: 9, max: 9 },
  { code: "PT", name: "Portugal", dial: "351", flag: "🇵🇹", min: 9, max: 9 },
  { code: "PL", name: "Poland", dial: "48", flag: "🇵🇱", min: 9, max: 9 },
  { code: "CZ", name: "Czechia", dial: "420", flag: "🇨🇿", min: 9, max: 9 },
  { code: "GR", name: "Greece", dial: "30", flag: "🇬🇷", min: 10, max: 10 },
  { code: "TR", name: "Türkiye", dial: "90", flag: "🇹🇷", min: 10, max: 10 },
  { code: "IL", name: "Israel", dial: "972", flag: "🇮🇱", min: 8, max: 9 },
  { code: "ZA", name: "South Africa", dial: "27", flag: "🇿🇦", min: 9, max: 9 },
  { code: "EG", name: "Egypt", dial: "20", flag: "🇪🇬", min: 10, max: 10 },
  { code: "NG", name: "Nigeria", dial: "234", flag: "🇳🇬", min: 10, max: 10 },
  { code: "KE", name: "Kenya", dial: "254", flag: "🇰🇪", min: 9, max: 9 },
  { code: "BR", name: "Brazil", dial: "55", flag: "🇧🇷", min: 10, max: 11 },
  { code: "MX", name: "Mexico", dial: "52", flag: "🇲🇽", min: 10, max: 10 },
  { code: "AR", name: "Argentina", dial: "54", flag: "🇦🇷", min: 10, max: 11 },
  { code: "CL", name: "Chile", dial: "56", flag: "🇨🇱", min: 9, max: 9 },
  { code: "CO", name: "Colombia", dial: "57", flag: "🇨🇴", min: 10, max: 10 },
  { code: "PK", name: "Pakistan", dial: "92", flag: "🇵🇰", min: 10, max: 10 },
  { code: "BD", name: "Bangladesh", dial: "880", flag: "🇧🇩", min: 10, max: 10 },
  { code: "LK", name: "Sri Lanka", dial: "94", flag: "🇱🇰", min: 9, max: 9 },
  { code: "NP", name: "Nepal", dial: "977", flag: "🇳🇵", min: 10, max: 10 },
  { code: "VN", name: "Vietnam", dial: "84", flag: "🇻🇳", min: 9, max: 10 },
  { code: "TH", name: "Thailand", dial: "66", flag: "🇹🇭", min: 9, max: 9 },
];

export const DEFAULT_COUNTRY = COUNTRIES[0];

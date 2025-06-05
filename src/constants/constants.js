// constants.js

export const FEATURES = [
  {
    key: "transmission",
    label: "Automatic",
    icon: "icon-automatic",
    hasFill: false,
  },
  { key: "AC", label: "AC", icon: "icon-ac", hasFill: false },
  { key: "engine", label: "Petrol", icon: "icon-petrol", hasFill: false },
  { key: "kitchen", label: "Kitchen", icon: "icon-kitchen", hasFill: false },
  { key: "radio", label: "Radio", icon: "icon-radio", hasFill: false },
  { key: "bathroom", label: "Bathroom", icon: "icon-bathroom", hasFill: false },
  { key: "TV", label: "TV", icon: "icon-tv", hasFill: false },
  {
    key: "refrigerator",
    label: "Refrigerator",
    icon: "icon-refrigerator",
    hasFill: false,
  },
  {
    key: "microwave",
    label: "Microwave",
    icon: "icon-microwave",
    hasFill: true,
  },
  { key: "gas", label: "Gas", icon: "icon-gas", hasFill: true },
  { key: "water", label: "Water", icon: "icon-water", hasFill: true },
];

export const EQUIPMENT = [
  ...FEATURES.filter(({ key }) => !["engine"].includes(key)),
];

export const VEHICLE_TYPES = [
  { key: "panelTruck", label: "Panel Truck", icon: "icon-van", hasFill: false },
  {
    key: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "icon-fully-integrated",
    hasFill: false,
  },
  { key: "alcove", label: "Alcove", icon: "icon-alcove", hasFill: false },
];

export const DETAILS = [
  { key: "form", label: "Form" },
  { key: "length", label: "Length" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "tank", label: "Tank" },
  { key: "consumption", label: "Consumption" },
];

// Для фільтрів у SearchForm
export const SEARCH_FORM_EQUIPMENT = [
  { key: "AC", label: "AC", icon: "faWind" },
  { key: "transmission", label: "Automatic", icon: "faSitemap" },
  { key: "TV", label: "TV", icon: "faDesktop" },
  { key: "kitchen", label: "Kitchen", icon: "faCoffee" },
  { key: "bathroom", label: "Bathroom", icon: "faBath" },
  { key: "radio", label: "Radio", icon: "faRadio" },
  { key: "refrigerator", label: "Refrigerator", icon: "faAirFreshener" },
  { key: "gas", label: "Gas", icon: "faGasPump" },
  { key: "water", label: "Water", icon: "faWater" },
  { key: "microwave", label: "Microwave", icon: "faFileWaveform" },
];

export const SEARCH_FORM_VEHICLE_TYPES = [
  { key: "panelTruck", label: "Panel Truck", icon: "icon-van", hasFill: false },
  {
    key: "fullyIntegrated",
    label: "Fully Integrated",
    icon: "icon-fully-integrated",
    hasFill: false,
  },
  { key: "alcove", label: "Alcove", icon: "icon-alcove", hasFill: false },
];

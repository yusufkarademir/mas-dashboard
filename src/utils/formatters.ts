import { format } from "date-fns";
import { tr } from "date-fns/locale";

export const formatNDVI = (value: number) => value.toFixed(3);

export const formatCoordinate = (lat: number, lng: number) => 
  `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

export const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  return format(new Date(dateString), "dd MMM yyyy HH:mm", { locale: tr });
};

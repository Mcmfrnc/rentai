export type BookingStatus =
  | "pending"
  | "confirmed"
  | "active"
  | "completed"
  | "cancelled";

export type Booking = {
  id: string;
  vehicleId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: BookingStatus;
  totalAmount: number;
  pickupLocation: string;
  returnLocation: string;
  createdAt: string;
};

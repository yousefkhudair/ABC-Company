import { create } from 'zustand';
import { UseFormReturn } from 'react-hook-form';
import { FlightSearch } from '@shared/schema';

type BookingFormState = {
  form: UseFormReturn<FlightSearch> | null;
  setForm: (form: UseFormReturn<FlightSearch>) => void;
  setDestination: (destination: string) => void;
};

export const useBookingForm = create<BookingFormState>((set, get) => ({
  form: null,
  setForm: (form) => set({ form }),
  setDestination: (destination) => {
    const form = get().form;
    if (form) {
      form.setValue('destination', destination, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  },
}));
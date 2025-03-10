import { create } from 'zustand';

type BookingFormState = {
  setDestination: (destination: string) => void;
};

export const useBookingForm = create<BookingFormState>((set) => ({
  setDestination: (destination) => {
    // Find all form inputs for destination and set their value
    const inputs = document.querySelectorAll('input[placeholder="City or airport"]');
    inputs.forEach((input: HTMLInputElement) => {
      input.value = destination;
      // Trigger change event to update form state
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
  },
}));

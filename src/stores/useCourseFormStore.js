import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCourseFormStore = create(
  persist(
    (set) => ({
      step: 1,
      course: {},
      edit: false,
      setStep: (step) =>
        set((state) => ({
          step,
          edit: step === 1 ? true : false,
        })),
      setEdit: (edit) => set({ edit }),
      setCourse: (course) => set({ course }),
      reset: () => set({ step: 1, course: {}, edit: false }),
    }),
    {
      name: "devnest-current_course",
      getStorage: () => localStorage,
    }
  )
);

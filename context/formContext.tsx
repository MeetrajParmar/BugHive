"use client";
import { createContext, useContext, useState } from "react";
import { MultipleStepForm, FormStep } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../context/authContext";
import {
  CombinedFormSchema,
  type CombinedFormType,
} from "@/lib/validations/onboarding";
import { updateUserDetails } from "@/services/onboarding/updateUserDetails";

const MutliStepFormContext = createContext<MultipleStepForm | null>(null);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [currentPosition, setCurrentPosition] = useState(0);
  const form = useForm<CombinedFormType>({
    resolver: zodResolver(CombinedFormSchema),
    mode: "onChange",
    defaultValues: {
      availability: false,
      remote: false,
      gitConnected: false,
      language: [],
    },
  });

  const StepField: (keyof CombinedFormType)[][] = [
    ["username"],
    ["headline", "bio", "language"],
    ["availability", "location", "remote"],
    ["gitConnected"],
  ];

  const nextStep = async () => {
    const currentSchema = StepField[currentPosition];

    const isValid = await form.trigger(currentSchema);
    if (!isValid) return;
    console.log("currentPosition", currentPosition);

    //Updating Form
    const current_data = form.getValues();
    if (current_data && currentPosition === 2) {
      if (!user?.email) return;
      await updateUserDetails(current_data, user?.email!);
    }
    setCurrentPosition((prev) => prev + 1);

    console.log("Feild Data:", current_data);
  };

  const previousStep = async () => {
    setCurrentPosition((prev) => Math.max(prev - 1, 0));
  };

  const isFirst = currentPosition === 0;
  const isLast = currentPosition === 3;

  return (
    <MutliStepFormContext.Provider
      value={{
        currentPosition,
        isFirst,
        isLast,
        nextStep,
        previousStep,
        form,
      }}
    >
      {children}
    </MutliStepFormContext.Provider>
  );
}

export function useMultiStepForm() {
  const context = useContext(MutliStepFormContext);
  if (!context) {
    throw new Error(`MultiStepForm must be inside FormProvider.`);
  }
  return context;
}

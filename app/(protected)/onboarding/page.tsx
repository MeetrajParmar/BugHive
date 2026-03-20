"use client";
import { AnimatePresence, motion } from "motion/react";
import { Step1Form } from "@/component/onboarding/Step1";
import { Step2Form } from "@/component/onboarding/Step2";
import { Step3Form } from "@/component/onboarding/Step3";
import { Step4Form } from "@/component/onboarding/Step4";
import { useMultiStepForm } from "@/context/formContext";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { refreshCookie } from "@/utils/refreshCookie";
import { ButtonComp } from "@/component/ui/button";

export default function Onboard() {
  const { form, isLast, isFirst, currentPosition, previousStep, nextStep } =
    useMultiStepForm();
  const steps = [<Step1Form />, <Step2Form />, <Step3Form />, <Step4Form />];
  const stepLabel = ["Profile", "Skills", "Availability", "Github"];
  const router = useRouter();
  const { refreshUser } = useAuth();
  const onSubmit = form.handleSubmit((data) => {
    //console.log("All steps valid, final data:", data);
    router.push("/dashboard/claims");
    refreshUser();
    refreshCookie();
  });
  const progress = ((currentPosition + 1) / steps.length) * 100;

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="bg-gray-100 w-150 p-4 rounded">
          <h2 className="font-bold p-2">OnBoarding Form</h2>
          <div className="bg-gray-300 h-2 rounded">
            <div
              style={{
                width: `${progress}%`,
                background: "black",
                height: "8px",
              }}
              className="transition-all duration-300"
            />
            <div>
              <h3 className="px-3 font-bold text-lg">{`${stepLabel[currentPosition]}`}</h3>
              <span className=" text-sm text-gray-600 px-2 py-0.5">{`STEP ${currentPosition + 1} OF ${steps.length}`}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              className="mt-5 p-4"
              key={currentPosition}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 10 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              {steps[currentPosition]}
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-row justify-between p-2 ">
            <div>
              {!isFirst && (
                <ButtonComp
                  className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-900 cursor-pointer"
                  onClick={previousStep}
                  text="Prev"
                />
              )}
            </div>
            {!isLast ? (
              <ButtonComp
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-900 cursor-pointer"
                onClick={nextStep}
                text="Next"
              />
            ) : (
              <ButtonComp
                type="submit"
                className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 cursor-pointer"
                text="Submit"
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
}

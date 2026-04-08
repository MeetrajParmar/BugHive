import { Dispatch, SetStateAction, useState } from "react";

export function Step2({
  technicalComplexity,
  setTechnicalComplexity,
  codebaseImpact,
  setCodebaseImpact,
  collaborationQuality,
  setCollaborationQuality,
}: {
  technicalComplexity: number;
  setTechnicalComplexity: Dispatch<SetStateAction<number>>;
  codebaseImpact: number;
  setCodebaseImpact: Dispatch<SetStateAction<number>>;
  collaborationQuality: number;
  setCollaborationQuality: Dispatch<SetStateAction<number>>;
}) {
  // const [technicalComplexity, setTechnicalComplexity] = useState<number>(2.5);
  // const [codebaseImpact, setCodebaseImpact] = useState<number>(3);
  // const [collaborationQuality, setCollaborationQuality] = useState<number>(1);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <label>Technical Complexity:{technicalComplexity}</label>
        <input
          type="range"
          min="1"
          max="5"
          step={0.1}
          value={technicalComplexity}
          onChange={(e) => setTechnicalComplexity(Number(e.target.value))}
        />
      </div>

      <div className="flex flex-col">
        <label>Codebase Impact:{codebaseImpact}</label>
        <input
          type="range"
          min="1"
          max="5"
          step={0.1}
          value={codebaseImpact}
          onChange={(e) => setCodebaseImpact(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label>Collaboration Quality:{collaborationQuality}</label>
        <input
          type="range"
          min="1"
          max="5"
          step={0.1}
          value={collaborationQuality}
          onChange={(e) => setCollaborationQuality(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

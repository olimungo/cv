import React from 'react';

export interface PanelSkillsProps {
    role: string;
    skillsAcquired: string[];
    technologiesUsed?: string[];
}

export function CardSkills(props: PanelSkillsProps) {
    const { role, skillsAcquired, technologiesUsed } = { ...props };

    return (
        <div className="text-sm text-fuchsia-100">
            <div className="mb-4">
                <span className="text-primary">ROLE</span>
                <span className="ml-2 mt-2 uppercase">{role}</span>
            </div>

            <div className="flex">
                <div>
                    <div className="mb-2 text-primary">SKILLS ACQUIRED</div>

                    {skillsAcquired.map((element, index) => {
                        return (
                            <div key={index} className="ml-2">
                                {element}
                            </div>
                        );
                    })}
                </div>

                {technologiesUsed && technologiesUsed.length > 0 && (
                    <div className="">
                        <div className="mb-2 text-primary">
                            TECHNOLOGIES USED
                        </div>

                        {technologiesUsed.map((element, index) => {
                            return (
                                <div key={index} className="ml-2">
                                    {element}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

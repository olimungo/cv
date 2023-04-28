import React from 'react';
import { Tag } from './tag';

export interface PanelSkillsProps {
    role: string;
    skillsAcquired: string[];
    technologiesUsed?: string[];
}

export function CardSkills(props: PanelSkillsProps) {
    const { role, skillsAcquired, technologiesUsed } = { ...props };

    return (
        <div className="text-xs text-secondary md:text-base">
            <div className="bg-accent-secondary py-2 pl-4">
                <span className="mr-3 text-primary">ROLE</span>
                <span className="uppercase">{role}</span>
            </div>

            <div className="p-5 leading-none">
                <div className="text-primary">SKILLS ACQUIRED</div>

                <div className="flex">
                    <div className="flex flex-wrap gap-x-2">
                        {skillsAcquired.map((element, index) => {
                            return (
                                <div key={index} className="mt-4">
                                    <Tag
                                        label={element}
                                        type="rounded"
                                        color="accent"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

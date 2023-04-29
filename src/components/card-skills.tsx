import React from 'react';
import { Tag } from './tag';

export interface PanelSkillsProps {
    className?: string;
    role: string;
    skillsAcquired: string[];
}

export function CardSkills(props: PanelSkillsProps) {
    const { className = '', role, skillsAcquired } = props;

    return (
        <div className={`${className} text-xs text-secondary md:text-base`}>
            <div className="bg-accent-secondary p-4 py-2">
                <span className="uppercase">{role}</span>
            </div>

            <div className="p-5 leading-none">
                <div className="text-primary">SKILLS ACQUIRED</div>

                <div className="mt-6 flex flex-wrap gap-x-2 gap-y-3">
                    {skillsAcquired.map((element, index) => {
                        return (
                            <div key={index}>
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
    );
}

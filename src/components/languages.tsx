import React from 'react';
import { Panel } from './panel';
import { CenteredContainer } from './centered-container';
import { Skill } from './skill';

export function Languages(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <Panel className={`${className} flex-col items-center py-12`}>
            <div className="gradient-soft mb-10 text-2xl uppercase text-fuchsia-300">
                LANGUAGES
            </div>

            <CenteredContainer className="flex flex-col justify-center md:flex-row md:gap-x-12">
                <div>
                    <Skill label="English" color="orange" value={75} />
                    <Skill label="French" color="orange" value={100} />
                    <Skill label="Italiano" color="orange" value={75} />
                    <Skill label="Nederlands" color="orange" value={50} />
                </div>
            </CenteredContainer>
        </Panel>
    );
}

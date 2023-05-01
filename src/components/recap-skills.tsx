import React from 'react';
import { Panel } from './panel';
import { CenteredContainer } from './centered-container';
import { Skill } from './skill';

export function RecapSkills(props: { className?: string }) {
    const { className = '' } = props;

    return (
        <Panel className={`${className} flex-col items-center py-12`}>
            <div className="gradient-soft mb-10 text-2xl uppercase text-fuchsia-300">
                Recap relevant skills
            </div>

            <CenteredContainer className="flex flex-col justify-center md:flex-row md:gap-x-12">
                <div>
                    <Skill label="Oracle RDBMS" value={75} />
                    <Skill label="Oracle PL/SQL" value={75} />
                    <Skill label="Adobe ColdFusion" value={30} />
                    <Skill label="JavaScript/TypeScript" value={90} />
                    <Skill label="HTML/CSS" value={90} />
                    <Skill label="Angular" value={65} />
                    <Skill label="RxJs/NgRx" value={65} />
                    <Skill label="React" value={75} />
                    <Skill label="Rust" value={25} />
                    <Skill label="Python/Micropython" value={60} />
                </div>

                <div>
                    <Skill label="Java" value={30} />
                    <Skill label="PHP" value={50} />
                    <Skill label="Docker" value={60} />
                    <Skill label="AWS" value={50} />
                    <Skill label="Jira/Confluence" value={80} />
                    <Skill label="Tomcat" value={30} />
                    <Skill label="Bamboo/Bitbucket" value={80} />
                    <Skill label="Agile methodologies" value={80} />
                    <Skill label="PM<sup>2</sup> (EC governance)" value={80} />
                </div>
            </CenteredContainer>
        </Panel>
    );
}

import signal from 'signal-js';
import { Dashboard } from './components/dahsboard';
import {
    MissionEventLabel,
    MissionEvents,
} from './components/mission-events/mission-events';
import { CanvasProps, getCanvasProps } from './utils/canvas';
import { Vector } from './utils/vector';
import { missionEventCompleted } from './components/mission-events/mission-event';

export class Hub {
    canvasProps: CanvasProps;
    anchor: Vector;
    angle = 0;
    dashboard: Dashboard;
    missionEvents: MissionEvents;

    constructor() {
        this.canvasProps = getCanvasProps();

        this.anchor = new Vector(
            this.canvasProps.centerX,
            this.canvasProps.height +
                this.canvasProps.height / 5 +
                this.canvasProps.centerX
        );

        this.dashboard = new Dashboard(this.canvasProps, this.anchor);
        this.missionEvents = new MissionEvents(this.canvasProps, this.anchor);

        const main = document.getElementById('main');
        const hub = document.getElementById('hub');

        if (main) {
            main.addEventListener('scroll', () => {
                const completion =
                    (main.scrollTop / (main.scrollHeight - main.clientHeight)) *
                    100;

                this.angle =
                    -((this.missionEvents.getMaxAngle() + 0.01 - 270) / 100) *
                    completion;
            });

            if (hub) {
                hub.addEventListener(
                    'wheel',
                    (event: WheelEvent) => {
                        main.scrollTop += event.deltaY / 2;
                        // event.preventDefault();
                    },
                    { passive: true }
                );
            }
        }

        signal.on(
            missionEventCompleted,
            (event: { label: MissionEventLabel; completed: boolean }) => {
                switch (event.label) {
                    case 'LIFTOFF':
                        if (event.completed) {
                            this.dashboard.startTimer();
                        } else {
                            this.dashboard.resetTimer();
                        }

                        break;
                    case 'MECO':
                        if (event.completed) {
                            this.dashboard.displayStage2();
                        } else {
                            this.dashboard.hideStage2();
                        }

                        break;
                    case 'SECO':
                        if (event.completed) {
                            this.dashboard.hideStage1();
                        } else {
                            this.dashboard.displayStage1();
                        }

                        break;
                }
            }
        );
    }

    render() {
        // Updates
        this.missionEvents.update(this.angle);
        this.dashboard.update(this.missionEvents.telemetry);

        // Draws
        this.canvasProps.ctx.save();

        this.canvasProps.ctx.clearRect(
            0,
            0,
            this.canvasProps.width,
            this.canvasProps.height
        );

        this.dashboard.render();
        this.missionEvents.render();

        this.canvasProps.ctx.restore();
    }
}

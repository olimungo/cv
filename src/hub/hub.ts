import { Dashboard } from './components/dahsboard';
import { MissionEvents } from './components/mission-events/mission-events';
import { CanvasProps, getCanvasProps } from './utils/canvas';
import { Vector } from './utils/vector';

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
                hub.addEventListener('wheel', (event: WheelEvent) => {
                    main.scrollTop += event.deltaY / 2;
                    event.preventDefault();
                });
            }
        }
    }

    render() {
        // Updates
        const prevMissionEventsState = this.missionEvents.missionEventsState;
        const prevMecoCompleted = this.missionEvents.mecoCompleted;
        const prevSecoCompleted = this.missionEvents.secoCompleted;

        this.missionEvents.update(this.angle);
        if (this.missionEvents.missionEventsState !== prevMissionEventsState) {
            if (this.missionEvents.missionEventsState === 'contract') {
                this.dashboard.resetTimer();
            } else {
                this.dashboard.startTimer();
            }
        }
        if (this.missionEvents.mecoCompleted !== prevMecoCompleted) {
            if (this.missionEvents.mecoCompleted) {
                this.dashboard.displayStage2();
            } else {
                this.dashboard.hideStage2();
            }
        }
        if (this.missionEvents.secoCompleted !== prevSecoCompleted) {
            if (this.missionEvents.secoCompleted) {
                this.dashboard.hideStage1();
            } else {
                this.dashboard.displayStage1();
            }
        }
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

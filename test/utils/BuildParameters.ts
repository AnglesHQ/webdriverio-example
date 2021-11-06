

export class BuildParameters {
    static readonly baseURL: string = process.env.BASE_URL || 'https://angleshq.github.io/';

    static readonly isAnglesEnabled: boolean = new Boolean(process.env.ANGLES_ENABLED || true).valueOf();
    static readonly anglesURL: string = process.env.ANGLE_SURL || 'http://127.0.0.1:3000/rest/api/v1.0/';
    static readonly anglesReportingURL: string = process.env.ANGLES_REPORTING_URL || 'http://127.0.0.1:3001/';
    static readonly anglesBuildName: string = process.env.ANGLES_BUILD_NAME || 'Example Test Run';
    static readonly anglesTeam: string = process.env.ANGLES_TEAM || 'angles';
    static readonly anglesEnvironment: string = process.env.ANGLES_ENVIRONMENT || 'qa';
    static readonly anglesComponent: string = process.env.ANGLES_COMPONENT || 'wdio-example';

}

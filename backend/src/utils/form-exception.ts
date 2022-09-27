import HTTPStatusCode from "./http-status-code";

export class FormException extends Error {
    constructor(
        public code: HTTPStatusCode,
        public formError: {
            path: string,
            message: string
        }[],
    ) {
        super();
        this.name = 'FormException';
    }
}
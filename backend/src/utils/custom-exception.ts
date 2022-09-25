import HTTPStatusCode from "./http-status-code";

export class CustomException extends Error {
    constructor(
        public code: HTTPStatusCode,
        public customMessage?: string | string[] | object,
    ) {
        super();
        this.name = 'CustomException';
    }
}
import { StatusCodes } from "http-status-codes"

export const http = StatusCodes

export function HTTPError(code: number, details: string) {
    Object.assign(new Error(details), { statusCode: code })
} 
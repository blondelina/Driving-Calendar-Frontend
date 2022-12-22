export function isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode <= 299
}
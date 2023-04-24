export function isTokenValid(token: string) {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));
    const tokenExpirationDate = new Date(decodedPayload.exp * 1000);

    return tokenExpirationDate > new Date();
}

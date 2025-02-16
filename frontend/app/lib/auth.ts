export class AuthService {
  private static TOKEN_KEY = 'token';

  /**
   * Retrieves the user token from localStorage
   * @returns {string | null} The token if found, otherwise null
   */
  static getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }
}
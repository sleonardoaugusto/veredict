export class AuthService {
  private static TOKEN_KEY = 'veredict:auth:token'

  static setToken(token: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, token)
  }

  /**
   * Retrieves the user token from localStorage
   * @returns {string | null} The token if found, otherwise null
   */
  static getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY)
  }
}

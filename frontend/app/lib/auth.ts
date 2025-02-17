export class AuthService {
  private static TOKEN_KEY = 'token'

  /**
   * Retrieves the user token from localStorage
   * @returns {string | null} The token if found, otherwise null
   */
  static getToken(): string | null {
    if (typeof window === 'undefined') {
      console.warn('AuthService.getToken() was called on the server')
      return null
    }

    return localStorage.getItem(AuthService.TOKEN_KEY)
  }
}

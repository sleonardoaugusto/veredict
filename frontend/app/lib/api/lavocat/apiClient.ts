import { showErrorToast, showSuccessToast } from '@/app/utils/toast'

export const makeRequest = async <T>(
  action: () => { unwrap: () => Promise<T> },
  successMessage: string,
  errorMessage: string
): Promise<T | undefined> => {
  try {
    const resp = await action().unwrap()
    showSuccessToast(successMessage)
    return resp
  } catch (error: any) {
    showErrorToast(errorMessage)
  }
}

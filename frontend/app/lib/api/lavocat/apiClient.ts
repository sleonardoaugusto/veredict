import { showErrorToast, showSuccessToast } from '@/app/utils/toast'

export const makeRequest = async <T>(
  action: () => Promise<T>,
  successMessage: string,
  errorMessage: string
) => {
  try {
    const resp = await action()
    showSuccessToast(successMessage)
    return resp
  } catch {
    showErrorToast(errorMessage)
  }
}

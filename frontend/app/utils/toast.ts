import { Slide, toast, ToastContainerProps } from 'react-toastify'

export const toastDefaultOptions: ToastContainerProps = {
  autoClose: 5000,
  hideProgressBar: true,
  theme: 'colored',
  transition: Slide,
  position: 'bottom-center',
  pauseOnFocusLoss: false,
  icon: false,
  closeOnClick: true,
  limit: 1,
}

const baseToastStyle = {
  justifyContent: 'center',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  width: 'fit-content',
  height: 'fit-content',
  padding: '0.5rem 2.5rem',
  minHeight: '0',
  marginBottom: '0',
  borderRadius: '6px',
}

const toastStyles = {
  success: {
    ...baseToastStyle,
    backgroundColor: '#F0FDF4',
    color: '#22C55E',
  },
  error: {
    ...baseToastStyle,
    backgroundColor: '#FEF2F2',
    color: '#DC2626',
  },
  warning: {
    ...baseToastStyle,
    backgroundColor: '#FFF7ED',
    color: '#F97316',
  },
}

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    style: toastStyles.success,
  })
}

export const showErrorToast = (message: string) => {
  toast.error(message, {
    style: toastStyles.error,
  })
}

export const showWarningToast = (message: string) => {
  toast.warn(message, {
    style: toastStyles.warning,
  })
}

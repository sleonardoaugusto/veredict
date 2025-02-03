import {Slide, toast, ToastContainerProps} from 'react-toastify'

export const toastDefaultOptions: ToastContainerProps = {
    autoClose: 3000,
    hideProgressBar: true,
    theme: 'colored',
    transition: Slide,
    position: 'bottom-center',
    pauseOnFocusLoss: false,
    icon: false,
    closeOnClick: true,
    limit: 1
}

const baseToastStyle = {
    justifyContent: 'center',
    backgroundColor: 'white',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    width: 'fit-content',
    height: 'fit-content',
    padding: '0.5rem 4rem',
    minHeight: '0',
    marginBottom: '0'
};

const toastStyles = {
    success: {
        ...baseToastStyle,
        color: '#4CAF50',
    },
    error: {
        ...baseToastStyle,
        color: '#DC143C',
    },
};
// Function to show a success toast with green text and white background
export const showSuccessToast = (message: string) => {
    toast.success(message, {
        style: toastStyles.success
    })
}

export const showErrorToast = (message: string) => {
    toast.error(message, {
        style: toastStyles.error
    })
}

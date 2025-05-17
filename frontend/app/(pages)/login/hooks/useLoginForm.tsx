import * as Yup from 'yup'
import type { FormikValues } from 'formik'
import { AuthService } from '@/app/lib/auth'
import { useAuthenticateMutation } from '@/app/lib/api/lavocat/auth'
import { useRouter } from 'next/navigation'

export default function useLoginForm() {
  const router = useRouter()

  const [authenticate] = useAuthenticateMutation()

  const validationSchema = Yup.object({
    username: Yup.string().required('Usuário é obrigatírio.'),
    password: Yup.string().required('Senha é obrigatíria.'),
  })

  const handleSubmit = async (
    values: FormikValues,
    { setSubmitting }: { setSubmitting: (flag: boolean) => void }
  ) => {
    const resp = await authenticate({
      username: values.username,
      password: values.password,
    }).unwrap()
    AuthService.setToken(resp['access'])
    setSubmitting(false)
    router.push('/processings')
  }

  return { validationSchema, handleSubmit }
}

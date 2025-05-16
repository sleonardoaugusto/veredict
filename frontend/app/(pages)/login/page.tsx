'use client'

import { Formik, Form, ErrorMessage, FormikValues } from 'formik'
import * as Yup from 'yup'
import { InputField } from '@/app/ui/InputField'
import { useAuthenticateMutation } from '@/app/lib/api/lavocat/auth'
import { AuthService } from '@/app/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [authenticate] = useAuthenticateMutation()

  const initialValues = {
    username: '',
    password: '',
  }

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700">
          Login
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <InputField
                  name="username"
                  placeholder="Usuário"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <InputField
                  name="password"
                  placeholder="Senha"
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 text-white font-medium py-2 rounded-md hover:bg-indigo-700 transition"
              >
                {isSubmitting ? 'Signing In...' : 'Sign In'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

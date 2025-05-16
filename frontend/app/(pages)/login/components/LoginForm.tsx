import { ErrorMessage, Form, Formik } from 'formik'
import { InputField } from '@/app/ui/InputField'
import useLoginForm from '@/app/(pages)/login/hooks/useLoginForm'
import Button from '@/app/ui/Button'
import Image from 'next/image'
import icon from 'public/veredito-icon.png'
export default function LoginForm() {
  const { validationSchema, handleSubmit } = useLoginForm()

  const initialValues = {
    username: '',
    password: '',
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <Image
          src={icon}
          alt="Veredito"
          width={72}
          height={72}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1E2A38]">
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
                  Usuário
                </label>
                <InputField name="username" placeholder="Usuário" />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <InputField
                  name="password"
                  placeholder="Senha"
                  type="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-600 mt-1"
                />
              </div>

              <Button
                className="w-full justify-center text-white font-medium py-2 rounded-md transition"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Entrando...' : 'Entrar'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

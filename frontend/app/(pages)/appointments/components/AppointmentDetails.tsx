import { Appointment } from '@/app/lib/api/lavocat/types'
import { Form, Formik } from 'formik'
import { InputField } from '@/app/ui/InputField'
import SelectField from '@/app/ui/SelectField'
import { useAppointmentDetails } from '@/app/(pages)/appointments/hooks/useAppointmentDetails'
import { usePatchAppointmentMutation } from '@/app/lib/api/lavocat/appointments'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'

type CustomerDetailsProps = {
  appointment?: Appointment
}
export default function AppointmentDetails({
  appointment,
}: CustomerDetailsProps) {
  const { appointmentTypeOptions } = useAppointmentDetails()

  const [patchAppointment] = usePatchAppointmentMutation()

  const initialValues = {
    customer_name: appointment?.customer_name || null,
    services_types: appointment?.services_types || '',
    source: appointment?.source || null,
    document_id: appointment?.document_id || null,
  }

  const handleSubmit = async (fieldName: string, value: any) => {
    if (appointment) {
      return await makeRequest(
        () =>
          patchAppointment({
            appointmentId: appointment?.id,
            data: { [`${fieldName}`]: value },
          }),
        'Atendimento salvo',
        'Um erro ocorreu'
      )
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={() => {}}>
      {({ values }) => (
        <Form>
          <div className="flex flex-row gap-x-6 mb-6">
            <InputField
              placeholder="Origem"
              name="source"
              onBlur={() => {
                handleSubmit('source', values.source)
              }}
            />
            <InputField
              placeholder="CPF"
              name="document_id"
              onBlur={() => {
                handleSubmit('document_id', values?.document_id)
              }}
            />
          </div>
          <div className="flex flex-row gap-x-6 mb-6">
            <InputField
              placeholder="Nome"
              name="customer_name"
              onBlur={() => {
                handleSubmit('customer_name', values.customer_name)
              }}
            />
          </div>
          <div className="flex flex-row gap-x-6 mb-6">
            <SelectField
              name="services_types"
              placeholder="Serviços Oferecidos"
              options={appointmentTypeOptions}
              isMulti={true}
              onBlur={() => {
                handleSubmit('services_types', values.services_types)
              }}
            />
          </div>
        </Form>
      )}
    </Formik>
  )
}

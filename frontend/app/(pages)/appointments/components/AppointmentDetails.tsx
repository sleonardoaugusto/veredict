'use client'

import { Appointment } from '@/app/lib/api/lavocat/types'
import { Form, Formik } from 'formik'
import { InputField } from '@/app/ui/InputField'
import SelectField from '@/app/ui/SelectField'
import { useAppointmentDetails } from '@/app/(pages)/appointments/hooks/useAppointmentDetails'
import {
  useCreateAppointmentMutation,
  usePatchAppointmentMutation,
} from '@/app/lib/api/lavocat/appointments'
import { makeRequest } from '@/app/lib/api/lavocat/apiClient'
import React from 'react'
import Button from '@/app/ui/Button'

type CustomerDetailsProps = {
  appointment?: Appointment | null
  onCreateAppointmentAction?: (data: Appointment) => void
}
export default function AppointmentDetails({
  appointment,
  onCreateAppointmentAction,
}: CustomerDetailsProps) {
  const { appointmentTypeOptions } = useAppointmentDetails()

  const [createAppointment] = useCreateAppointmentMutation()
  const [patchAppointment] = usePatchAppointmentMutation()

  const initialValues: Partial<Appointment> = {
    customer_name: appointment?.customer_name || '',
    services_types: appointment?.services_types || [],
    source: appointment?.source || '',
    document_id: appointment?.document_id || '',
  }

  const handlePatch = async (fieldName: string, value: any) => {
    if (appointment) {
      return await makeRequest(
        () =>
          patchAppointment({
            appointmentId: appointment?.id,
            data: { [`${fieldName}`]: value },
          }),
        'Dados Atualizados.',
        'Um inesperado erro ocorreu.'
      )
    }
  }

  const handleCreate = async (values: Partial<Appointment>) => {
    const data = await makeRequest(
      () =>
        createAppointment({
          data: values,
        }),
      'Atendimento Criado.',
      'Um inesperado erro ocorreu.'
    )

    if (onCreateAppointmentAction && data) {
      onCreateAppointmentAction(data)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleCreate}
      enableReinitialize={true}
    >
      {({ values }) => (
        <Form>
          <div className="flex flex-row gap-x-6 mb-6">
            <InputField
              placeholder="Origem"
              name="source"
              onBlur={() => {
                handlePatch('source', values.source)
              }}
            />
            <InputField
              placeholder="CPF"
              name="document_id"
              onBlur={() => {
                handlePatch('document_id', values?.document_id)
              }}
            />
          </div>
          <div className="flex flex-row gap-x-6 mb-6">
            <InputField
              placeholder="Nome"
              name="customer_name"
              onBlur={() => {
                handlePatch('customer_name', values.customer_name)
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
                handlePatch('services_types', values.services_types)
              }}
            />
          </div>
          {!appointment && <Button type="submit">Criar Atendimento</Button>}
        </Form>
      )}
    </Formik>
  )
}

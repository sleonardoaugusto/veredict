import { Appointment } from '@/app/lib/api/lavocat/types'

type CustomerDetailsProps = {
  appointment: Appointment
}
export default function CustomerDetails({ appointment }: CustomerDetailsProps) {
  console.log(appointment);
  return <div></div>
}

export type AppointmentDocument = {
  id: number
  attendance: number
  file: string
  filename: string
}

export type Appointment = {
  id: number
  title: string
  date: string // ISO string format
  services_types: string[]
  files: AppointmentDocument[]
  customer_name: string
}

export type Note = {
  id: number
  header: string
  content: string
}

export type Processing = {
  id: number
  created_at: string
}

export type ProcessingImage = {
  id: number
  processing: number
  image: string
}

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

export type ProcessingImageMetadata = {
  id: number
  processing_image: number
  ocr_code_1: string
  date_1: string
  city_1: string
  ocr_code_2: string
  date_2: string
  city_2: string
  ocr_code_3: string
  date_3: string
  city_3: string
  ocr_code_1_flag: 'error' | 'warning' | null
  ocr_code_2_flag: 'error' | 'warning' | null
  ocr_code_3_flag: 'error' | 'warning' | null
  city_1_flag: 'error' | 'warning' | null
  city_2_flag: 'error' | 'warning' | null
  city_3_flag: 'error' | 'warning' | null
}

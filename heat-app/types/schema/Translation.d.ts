export interface Translation {
  id: number
  user_id: number
  request_lang: number | null
  result_lang: number | null
  created_at: Date
  request_text: string
  result_text: string
  request_len: number
  result_len: number
}

// Translation.ts
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

// AdminLog.ts
export type ActionType = '유저 관리' | '이력 조회' | '통계'
export interface AdminLog {
  id: number
  admin_id: number
  created_at: Date
  action_type: ActionType
  action_detail: string | null
}

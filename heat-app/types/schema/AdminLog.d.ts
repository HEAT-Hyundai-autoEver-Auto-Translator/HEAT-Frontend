export type ActionType = '유저 관리' | '이력 조회' | '통계'
export interface AdminLog {
  id: number
  admin_id: number
  created_at: Date
  action_type: ActionType
  action_detail: string | null
}

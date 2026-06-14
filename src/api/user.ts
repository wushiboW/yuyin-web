import { apiClient } from './request';

// ========== 类型定义 ==========

export interface User {
  id: number;
  phone: string;
  email: string;
  nickname: string;
  avatar: string;
  points: number;
  membership_level: string;
  created_at: string;
  last_login: string;
}

export interface LoginResponse {
  user: User;
  tokens: {
    access_token: string;
    refresh_token: string;
  };
}

export interface MembershipInfo {
  user: {
    id: number;
    phone: string;
    email: string;
    nickname: string;
    points: number;
    membership_level: string;
  };
  benefits: string[];
  points_to_next_level: number;
  all_levels: Record<string, { threshold: number; benefits: string[] }>;
}

export interface PointsInfo {
  current_points: number;
  transactions: Array<{
    id: number;
    points: number;
    type: 'earn' | 'spend';
    reason: string;
    balance_after: number;
    created_at: string;
  }>;
}

export interface Address {
  id: number;
  country: string;
  province: string;
  city: string;
  district: string;
  postal_code: string;
  address_line1: string;
  address_line2: string;
  recipient_name: string;
  recipient_phone: string;
  recipient_email: string;
  is_default: boolean;
  tags: string[];
  created_at: string;
}

export interface AddressList {
  count: number;
  limit: number;
  results: Address[];
}

export interface SecurityEvent {
  id: number;
  event_type: string;
  event_type_display: string;
  ip_address: string;
  location: string;
  device_fingerprint: string;
  user_agent: string;
  extra_data: Record<string, unknown>;
  created_at: string;
}

export interface SecurityEvents {
  count: number;
  page: number;
  page_size: number;
  days: number;
  results: SecurityEvent[];
}

export interface DeletionStatus {
  status: 'active' | 'pending' | 'expired' | 'purged';
  is_deleted: boolean;
  is_purged: boolean;
  deleted_at?: string;
  cooling_off_until?: string;
  cooling_off_days?: number;
  seconds_remaining?: number;
  message?: string;
}

export interface SmsCodeResponse {
  code: number;
  message: string;
  data?: { expires_in: number; ttl: number };
  dev_code?: string; // 开发模式下的真实验证码
}

// ========== API 方法 ==========

export const userApi = {
  // ========== Auth ==========

  /** 登录 (邮箱或手机号 + 密码) */
  login: (identifier: string, password: string) =>
    apiClient.post<LoginResponse>('/auth/login/', { identifier, password }),

  /** 注册 */
  register: (data: { username: string; password: string; email: string; phone?: string }) =>
    apiClient.post<LoginResponse>('/auth/register/', data),

  /** 登出 */
  logout: () =>
    apiClient.post<{ message: string }>('/auth/logout/'),

  /** 刷新访问令牌 */
  refreshToken: (refresh_token?: string) =>
    apiClient.post<{ access_token: string }>('/auth/refresh_token/', refresh_token ? { refresh_token } : {}),

  // ========== 用户信息 ==========

  /** 获取当前用户信息 */
  getMe: () =>
    apiClient.get<User>('/users/me/'),

  /** 修改密码 */
  changePassword: (old_password: string, new_password: string) =>
    apiClient.post<{ message: string }>('/users/change_password/', { old_password, new_password }),

  /** 获取会员等级、权益及升级进度 */
  getMembership: () =>
    apiClient.get<MembershipInfo>('/users/membership/'),

  /** 获取积分余额及积分变动历史 */
  getPoints: (limit = 50) =>
    apiClient.get<PointsInfo>('/users/points/', { params: { limit } }),

  // ========== SMS 验证码 ==========

  /** 发送手机验证码 */
  sendSmsCode: (phone: string, scene: 'login' | 'register' | 'reset_password' | 'bind_phone' | 'change_phone') =>
    apiClient.post<SmsCodeResponse>('/sms/send/', { phone, scene }),

  /** 校验手机验证码 */
  verifySmsCode: (phone: string, scene: string, code: string) =>
    apiClient.post<{ code: number; message: string }>('/sms/verify/', { phone, scene, code }),

  // ========== 社交绑定 ==========

  /** 获取已绑定的社交账号列表 */
  getSocialBindings: () =>
    apiClient.get<{ count: number; bindings: Array<{ id: number; provider: string; uid: string; nickname: string; avatar_url: string; bound_at: string }>; supported_providers: string[] }>('/social/bindings/'),

  /** 绑定新的社交账号 */
  bindSocial: (provider: string, uid: string) =>
    apiClient.post<{ binding: { id: number; provider: string; uid: string; nickname: string; avatar_url: string; bound_at: string }; created: boolean }>('/social/bind/', { provider, uid }),

  /** 解绑社交账号 */
  unbindSocial: (provider: string, verify_type: 'password' | 'sms', data: { password?: string; sms_code?: string }) =>
    apiClient.delete<{ message: string; provider: string }>(`/social/unbind/${provider}/`, { data: { verify_type, ...data } }),

  // ========== 实名认证 ==========

  /** 查询实名认证状态 */
  getRealnameStatus: () =>
    apiClient.get<{ has_verification: boolean; status: string; verification?: { id: number; real_name: string; id_card_number_masked: string; status: string; status_display: string } }>('/realname/status/'),

  // ========== 地址簿 ==========

  /** 获取地址列表 */
  getAddresses: () =>
    apiClient.get<AddressList>('/addresses/'),

  /** 获取单个地址 */
  getAddress: (id: number) =>
    apiClient.get<Address>(`/addresses/${id}/`),

  /** 创建新地址 */
  createAddress: (data: Omit<Address, 'id' | 'created_at'>) =>
    apiClient.post<Address>('/addresses/', data),

  /** 更新地址 */
  updateAddress: (id: number, data: Partial<Omit<Address, 'id' | 'created_at'>>) =>
    apiClient.put<Address>(`/addresses/${id}/`, data),

  /** 删除地址 */
  deleteAddress: (id: number) =>
    apiClient.delete<void>(`/addresses/${id}/`),

  /** 设置默认地址 */
  setDefaultAddress: (id: number) =>
    apiClient.post<{ message: string }>(`/addresses/${id}/set-default/`),

  // ========== 安全事件 ==========

  /** 获取安全事件记录 */
  getSecurityEvents: (params?: { page?: number; page_size?: number; days?: number; event_type?: string }) =>
    apiClient.get<SecurityEvents>('/security/events/', { params }),

  // ========== 账号注销 ==========

  /** 申请注销账号 */
  requestAccountDeletion: (data: { password?: string; sms_code?: string; reason?: string }) =>
    apiClient.post<{ message: string; status: string; cooling_off_until: string; cooling_off_days: number }>('/users/account/request-deletion/', data),

  /** 恢复已申请注销的账号 */
  restoreAccount: (deletion_token?: string) =>
    apiClient.post<{ message: string; status: string }>('/users/account/restore/', deletion_token ? { deletion_token } : {}),

  /** 查询账号注销状态 */
  getDeletionStatus: () =>
    apiClient.get<DeletionStatus>('/users/account/deletion-status/'),
};

export default userApi;
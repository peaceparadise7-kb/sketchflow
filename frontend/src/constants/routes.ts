export const ROUTES = {
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',

  // Route pattern for React Router
  BOARD: '/board/:boardId',

  // Helper for navigation
  BOARD_DETAIL: (boardId: string) => `/board/${boardId}`,

  NOT_FOUND: '*',
} as const;
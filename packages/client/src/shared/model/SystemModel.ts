export interface AppRouter{
  //! URI 경로
  path: string
  //! ㅇㅇㅇ
  element: any
  //! 타이틀
  title: string
  //! 아이콘
  icon: any
  //! 자식 라웥
  child: AppRouter[]
  //! 페이지 이동 허용 여부
  clickable: boolean
}
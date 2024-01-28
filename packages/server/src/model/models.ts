export interface response_packet<T>{
  is_success: boolean
  message: string
  body: T
}

export interface svn_heartheat_request{
  query: string
}

export interface svn_create_request{
  repository_name: string
}

export interface svn_list_request{
}
export interface repository{
  name: string
}
export interface svn_list_response{
  repostiories: repository[]
}
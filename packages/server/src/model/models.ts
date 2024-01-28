interface response_packet<T>{
  is_success: boolean
  message: string
  body: T
}

interface svn_heartheat_request{
  query: string
}

interface svn_create_request{
  repository_name: string
}

interface svn_list_request{
}
interface repository{
  name: string
}
interface svn_list_response{
  repostiories: repository[]
}
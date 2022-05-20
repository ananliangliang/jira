import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from "react"
import qs from "qs"
import { cleanObject, useMount, useDebounce } from "../../utils"

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {

  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncerParam = useDebounce(param, 2000)
  const [list, setList] = useState([])


  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debouncerParam))}`).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncerParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  console.log('project list')

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}
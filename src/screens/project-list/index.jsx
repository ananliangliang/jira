
import {List} from "./list";
import {useEffect, useState} from "react";
import qs from "qs";
import {cleanObject} from "../../utils";
import {SearchPanel} from "./search-panel";


const aipUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const [list, setList] = useState([])

    useEffect(() => {
        fetch(`${aipUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if(response.ok) {
                setList(await response.json())
            }
        })
    }, [param])

    useEffect(() => {
        fetch(`${aipUrl}/users`).then(async response => {
            if(response.ok) {
                setUsers(await response.json())
            }
        })
    }, [param])

    return <div>
        <SearchPanel users={users} param={param} setParam={setParam}/>
        <List users={users} list={list}/>
    </div>
}
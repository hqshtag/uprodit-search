import { UproditUser } from '../services/search/types'
import UserCard from './UserCard'

type UserListProps = {
    users: UproditUser[]
}

const UserList = ({users}: UserListProps) => {
    let renderedUsers = users ? users.map((u,i)=>{
        return (
         <li key={'u'+i+u.id}>
            <UserCard user={u} />
         </li>   
        )
    }) : []
  return (
    <ul>
        {renderedUsers}
    </ul>
  )
}

export default UserList
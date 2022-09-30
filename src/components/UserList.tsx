import { UproditUser } from '../services/search/types'
import UserCard from './UserCard'

type UserListProps = {
    users: UproditUser[]
}

const UserList = ({users}: UserListProps) => {
    let renderedUsers = users ? users.map((u,i)=>{
        return (
            <UserCard user={u} key={'u'+i+u.id} />
        )
    }) : []
  return (
    <div className="user-list">
        {renderedUsers}
    </div>
  )
}

export default UserList
import Avatar from "../assets/defaultAvatar.json";
import { UproditImage } from '../services/image/types'
import { UproditUser } from '../services/search/types'
import { selectImageByProfileId } from '../features/search/searchSlice'
import { useAppSelector } from '../app/hooks'

type UserCardProps = {
    user: UproditUser
}

const UserCard = ({user}: UserCardProps) => {

    const image = useAppSelector(state => selectImageByProfileId(state, parseInt(user.id)));
    let profileImageUrl = Avatar.B64DataUrl;
    if(image && image.mimeType && image.b64Content){
        profileImageUrl = parseImageToDataUrl(image)
    }

    let titleStr = user.specialities.join('/');
    if(titleStr.length > 26){
      titleStr = titleStr.split('').slice(0, 26).join('') + '...'
    }


  return (
    <div className='user-card'>
        <img src={profileImageUrl} alt="user profile" />
        <p className="name">{user.denomination}</p>
        <p className="title">{titleStr}</p>
        <span>{`${user.stars_count} ⭐`}</span>

    </div>
  )
}

const parseImageToDataUrl = (image: UproditImage) => {
  return `data:${image.mimeType};base64,${image.b64Content}`;
}

export default UserCard
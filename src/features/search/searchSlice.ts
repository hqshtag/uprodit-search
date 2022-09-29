import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { SearchQuerySettings, UproditUser } from '../../services/search/types';
import { UproditImage } from "../../services/image/types"
import { getImage } from '../../services/image';
import { search } from '../../services/search';
import { RootState } from '../../app/store';

type SearchStateType = {
    users: UproditUser[],
    images: UproditImage[]
}

const initialState: SearchStateType = {
    users: [],
    images: []
}

export const searchUsers = createAsyncThunk(
  'uprodit/users',
  async(queryParams: SearchQuerySettings) => {
    let payload: UproditUser[] = [];

    const users = await search(queryParams);
    
    if(users && users.length > 0){
     for (let i = 0; i < users.length; i++) {
      const user = users[i];
      payload.push(user);
    };
   
    return payload;
  }
}
)


export const searchImage = createAsyncThunk(
  'uprodit/images',
  async (id: number) =>{

    let userImage = await getImage(id.toString());
    return userImage
  }
);


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearData: (state) => {
      state.images = [];
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
    }).addCase(searchUsers.fulfilled, (state, action)=>{
      let {payload} = action;
      if(payload) state.users = payload;
    }).addCase(searchImage.fulfilled, (state, action)=>{
      let  {payload} = action;
      if(payload) state.images.push(payload);
    })
  }
});


const selectImages = (state: RootState) => state.search.images;
const forwardProfileId = (_state: RootState, id: number) => id;
export const selectImageByProfileId =  createSelector(
    [
      selectImages,
      forwardProfileId
    ],
    (images, id) => {
      return images.find(img => img.profileId === id)
    }
  )



export const {clearData} = searchSlice.actions

export default searchSlice.reducer
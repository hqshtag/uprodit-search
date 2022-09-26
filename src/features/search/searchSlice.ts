import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { SearchTDO, StateType, UprodiImageResponse, UproditUser } from './types';
import { getUproditUserImage, searchUproditUsers } from './uproditApi';




const initialState: StateType = {
    data: []
}

interface ParsedResponse 
{user: UproditUser, image: UprodiImageResponse}



export const searchUsers = createAsyncThunk(
  'uproditSearch/users',
  async(searchData: SearchTDO) => {
    let payload: ParsedResponse[] = [];
    const users = await searchUproditUsers(searchData);
    if(users && users.length > 0){
    //  let imagesResults: Promise<UprodiImageResponse>[] =[];
     for (let i = 0; i < users.length; i++) {
      const user = users[i];
      let userImage = await getUproditUserImage(user.image_id);
      payload.push({user, image: userImage});
    };
   
    return payload;
  }
}
)

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearData: (state) => {
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(searchUsers.pending, (state) => {
    }).addCase(searchUsers.fulfilled, (state, action)=>{
      let {payload} = action;
      if(payload) state.data = payload;
    }).addCase(searchUsers.rejected, (state, action) => {
      console.log(action)
    })
  }
});


export const dataSelector = (state: StateType) => state.data;

export const {clearData} = searchSlice.actions

export default searchSlice.reducer
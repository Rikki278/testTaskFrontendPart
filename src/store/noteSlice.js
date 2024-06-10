import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/API";

// Async thunks for CRUD operations
export const getPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await API.getNotes(); // Fetch notes from API
    return response;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    const response = await API.postNote(post); // Create new note via API
    return response;
});

export const editPost = createAsyncThunk('posts/editPost', async ({id, post}) => {
    const response = await API.updateNote(id, post); // Update note via API
    return response;
});

export const removePost = createAsyncThunk('posts/removePost', async (id) => {
    await API.deleteNotes(id); // Delete note via API
    return id;
});

// Initial state for the notes slice
const defaultValues = {
    notes: [
        {
            id: '',
            noteTitle: '',
            noteContent: '',
            noteDate: ''
        }
    ],
    status: 'idle',
    error: null,
    language: 10 // 10 - English language | 20 - Ukrainian language
};

// Create noteSlice with initial state and reducers
const noteSlice = createSlice({
    name: 'notes',
    initialState: defaultValues,
    reducers: {
        // Reducer to change language
        changeLanguage: (state, action) => {
            state.language = action.payload;
        }
    },
    extraReducers: (builder)=> {
        // Extra reducers for handling async actions
        builder
            .addCase(getPosts.pending, (state) => {
                state.status = 'loading'; // Set status to loading while fetching notes
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'; // Set status to succeeded when fetch is successful
                state.notes = action.payload; // Update notes with fetched data
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.status = 'failed'; // Set status to failed if fetch fails
                state.error = action.error.message; // Store error message
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.notes.push(action.payload); // Add new note to notes array
            })
            .addCase(editPost.fulfilled, (state, action) => {
                const index = state.notes.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.notes[index] = action.payload; // Update existing note
                }
            })
            .addCase(removePost.fulfilled, (state, action) => {
                state.notes = state.notes.filter(post => post.id !== action.payload); // Remove deleted note from notes array
            });
    }
});

// Export actions and reducer
export const actions = noteSlice.actions;
export default noteSlice.reducer;

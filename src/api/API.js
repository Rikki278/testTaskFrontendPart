import axios from "../axios"; // Import axios instance

// API methods for notes
export default {
    // Get all notes
    getNotes: async () => {
        try {
            const response = await axios.get("/notes"); // Send GET request to /notes
            return response.data; // Return response data
        } catch (error) {
            console.log(error); // Log any errors
        }
    },

    // Delete note by ID
    deleteNotes: async (id) => {
        try {
            return await axios.delete(`/notes/${id}`); // Send DELETE request to /notes/{id}
        } catch (error) {
            console.log(error); // Log any errors
        }
    },

    // Create new note
    postNote: async (dataToSend) => {
        try {
            const response = await axios.post("/notes", dataToSend); // Send POST request to /notes with dataToSend
            return response.data; // Return response data
        } catch (error) {
            console.log(error); // Log any errors
        }
    },

    // Update note by ID
    updateNote: async (id, dataToSend) => {
        try {
            const response = await axios.put(`/notes/${id}`, dataToSend); // Send PUT request to /notes/{id} with dataToSend
            return response.data; // Return response data
        } catch (error) {
            console.log("Error: Put Note");
            console.log(error); // Log any errors
        }
    }
};

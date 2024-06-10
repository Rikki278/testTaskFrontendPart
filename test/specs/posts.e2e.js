describe('Posts Functionality', () => {
    before(async () => {
        await browser.url('http://localhost:3000'); // Replace with your application's URL
    });

    describe('Posts Functionality', () => {
        before(async () => {
            await browser.url('http://localhost:3000'); // Replace with your application's URL
        });

        it('should open the modal when the Add Note button is clicked', async () => {
            const addNoteButton = await $('.addButton'); // Replace with your Add Note button class
            await addNoteButton.click();

            const modal = await $('#modalOverlay'); // Replace with your modal class
            await modal.waitForDisplayed();
            expect(await modal.isDisplayed()).toBe(true);
        });

        it('should not allow saving with empty inputs', async () => {
            const saveButton = await $('#saveButton'); // Replace with your Save button class
            await saveButton.click();

            const error = await $('#errorLabel'); // Replace with your error message class
            await error.waitForDisplayed();
            expect(await error.isDisplayed()).toBe(true);
        });
        it('should close the modal when the Close button is clicked', async () => {
            const closeButton = await $('#closeButton'); // Replace with your Close button class
            await closeButton.click();

            const modal = await $('#modalOverlay'); // Replace with your modal class
            await modal.waitForDisplayed({ reverse: true });
            expect(await modal.isDisplayed()).toBe(false);
        });
        it('should add a note with valid inputs', async () => {
            const addNoteButton = await $('#addButton'); // Replace with your Add Note button selector
            await addNoteButton.waitForDisplayed();
            await addNoteButton.click();

            const noteNameInput = await $('#noteNameInput'); // Replace with your Note Name input selector
            const noteContentInput = await $('#noteContentInput'); // Replace with your Note Content input selector

            await noteNameInput.waitForDisplayed();
            await noteContentInput.waitForDisplayed();

            await noteNameInput.setValue('Test Note');
            await noteContentInput.setValue('This is a test note.');

            const saveButton = await $('#saveButton'); // Replace with your Save button selector
            await saveButton.waitForDisplayed();
            await saveButton.click();

            const error = await $('#errorLabel'); // Replace with your error message selector
            const isErrorDisplayed = await error.isDisplayed();
            expect(isErrorDisplayed).toBe(false);

            const newNote = await $$('.noteCard')[await $$('.noteCard').length - 1]; // Replace with your new note selector
            await newNote.waitForDisplayed();
            const isNewNoteDisplayed = await newNote.isDisplayed();
            const newNoteText = await newNote.getText();

            expect(isNewNoteDisplayed).toBe(true);
            expect(newNoteText).toContain('Test Note');
        });

        it('should open the modal with pre-filled data when the edit button is clicked', async () => {
            const editButton = await $$('#editButton')[await $$('#editButton').length - 1]; // Replace with your Edit button selector
            await editButton.click();

            const modal = await $('#modalOverlay'); // Replace with your modal selector
            await modal.waitForDisplayed();
            expect(await modal.isDisplayed()).toBe(true);

            const noteNameInput = await $('#noteNameInput'); // Replace with your Note Name input selector
            const noteContentInput = await $('#noteContentInput'); // Replace with your Note Content input selector

            expect(await noteNameInput.getValue()).toBe('Test Note'); // Replace with expected note name
            expect(await noteContentInput.getValue()).toBe('This is a test note.'); // Replace with expected note content
        });
        it('should edit a note with valid inputs', async () => {
            const noteNameInput = await $('#noteNameInput'); // Replace with your Note Name input selector
            const noteContentInput = await $('#noteContentInput'); // Replace with your Note Content input selector

            await noteNameInput.setValue('Updated Test Note');
            await noteContentInput.setValue('This is an updated test note.');

            const saveButton = await $('#saveButton'); // Replace with your Save button selector
            await saveButton.click();

            const error = await $('#errorLabel'); // Replace with your error message selector
            expect(await error.isDisplayed()).toBe(false);

            const updatedNote = await $$('.noteCard')[await $$('#editButton').length - 1]; // Replace with your updated note selector
            await updatedNote.waitForDisplayed();
            expect(await updatedNote.isDisplayed()).toBe(true);
            expect(await updatedNote.getText()).toContain('Updated Test Note');
        });
        it('should delete a post when the delete button is clicked', async () => {
            const initialPosts = await $$('.noteCard'); // Replace with your note card selector
            const initialCount = initialPosts.length;
            expect(initialCount).toBeGreaterThan(0); // Ensure there is at least one post

            // Select the first post to delete
            const postToDelete = initialPosts[0];
            const deleteButton = await postToDelete.$('#deleteButton'); // Adjust the selector to target the delete button within the post

            // Click the delete button
            await deleteButton.waitForDisplayed();
            await deleteButton.click();


            // Get the updated count of note cards
            const updatedPosts = await $$('.noteCard');
            const updatedCount = updatedPosts.length;

            // Assert the count has decreased by one
            expect(updatedCount).toBe(initialCount - 1);
        });
    });


});

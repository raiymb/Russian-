
document.addEventListener('DOMContentLoaded', function() {
    // Edit button functionality
    document.querySelectorAll('.edit-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-itemid');
            document.querySelectorAll(`[data-itemid="${itemId}"] [contenteditable]`).forEach(element => {
                element.contentEditable = true;
                element.classList.add('edit-field');
            });
            this.classList.add('d-none');
            document.querySelector(`.save-item[data-itemid="${itemId}"]`).classList.remove('d-none');
        });
    });

    // Save button functionality for Update
    document.querySelectorAll('.save-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-itemid');
            const updatedName = document.querySelector(`[data-itemid="${itemId}"][data-field="name.en"]`).textContent;
            const updatedDescription = document.querySelector(`[data-itemid="${itemId}"][data-field="description.en"]`).textContent;

            fetch(`/update-item/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nameEn: updatedName, descriptionEn: updatedDescription }),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Update successful:', data);
                document.querySelectorAll(`[data-itemid="${itemId}"] [contenteditable]`).forEach(element => {
                    element.contentEditable = false;
                    element.classList.remove('edit-field');
                });
                this.classList.add('d-none');
                document.querySelector(`.edit-item[data-itemid="${itemId}"]`).classList.remove('d-none');
            })
            .catch(error => console.error('Error:', error));
        });
    });

    // Delete button functionality
    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = this.getAttribute('data-itemid');
            if (confirm('Are you sure you want to delete this item?')) {
                fetch(`/delete-item/${itemId}`, {
                    method: 'DELETE',
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Deletion successful:', data);
                    document.querySelector(`.card[data-itemid="${itemId}"]`).remove();
                })
                .catch(error => console.error('Error:', error));
            }
        });
    });
});
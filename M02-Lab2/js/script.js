window.addEventListener('load', () => {
    const processForm = () => {
        const form = document.getElementById('empForm');
        Array.from(form.elements).forEach((input) => {
            // Skip the submit button
            if (input.type === "submit") return;

            console.log(input.labels[0].innerHTML + ": " + input.value);
        });
    };

    document.getElementById('empForm').addEventListener('submit', (e) => {
        e.preventDefault();
        processForm();
    });
});
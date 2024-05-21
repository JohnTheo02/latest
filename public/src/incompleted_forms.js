document.addEventListener("DOMContentLoaded", function() {
    const currentTime = new Date();

    document.querySelectorAll('.eventButtons').forEach(eventButton => {
        const formDate = new Date(eventButton.dataset.date);
        const timeDifference = currentTime - formDate;
        const oneMinute = 20*60*1000;

        if (timeDifference > oneMinute) {
            eventButton.style.display = 'none';
        }
    });
});

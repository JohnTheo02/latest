function toggleSignup() {
            var signin = document.getElementById("signin");
            var signup = document.getElementById("signup");
            signin.style.left = "100em";
            signup.style.left = "8em";
        }

        function toggleSignin() {
            var signin = document.getElementById("signin");
            var signup = document.getElementById("signup");
            signup.style.left = "100em";
            signin.style.left = "8em";
        }

        document.querySelectorAll(".btn.sundesh").forEach(button => {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                toggleSignup();
            });
        });

        document.querySelectorAll(".btn.dhmiourgia").forEach(button => {
            button.addEventListener("click", function(event) {
                event.preventDefault();
                toggleSignin();
            });
        });

        // Show the correct form based on error messages if any
        if (document.querySelector("#signin #error-msg li")) {
            toggleSignin();
        } else if (document.querySelector("#signup #error-msg li")) {
            toggleSignup();
        } else {
            toggleSignin(); // Default to signin form
        }
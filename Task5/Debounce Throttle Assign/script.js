
// DEBOUNCE

function debounce(fn, delay) {

    let timer;

    return function (...args) {

        // Cancel the previous timer
        clearTimeout(timer);

        // Start a new timer
        timer = setTimeout(() => {

            fn.apply(this, args);

        }, delay);
    };
}


// THROTTLE

function throttle(fn, delay) {

    let lastExecution = 0;

    return function (...args) {

        const now = Date.now();

        // Check whether enough time has passed
        if (now - lastExecution >= delay) {

            lastExecution = now;

            fn.apply(this, args);
        }
    };
}


// DEBOUNCE DEMO

const searchInput =
    document.querySelector("#searchInput");

const searchStatus =
    document.querySelector("#searchStatus");

const results =
    document.querySelector("#results");


// This function makes the API request
async function searchUsers(event) {

    const query = event.target.value.trim();

    // If input is empty
    if (!query) {

        searchStatus.textContent =
            "Start typing...";

        results.innerHTML = "";

        return;
    }

    searchStatus.textContent =
        `Searching for "${query}"...`;

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();


        // Filter users based on search query
        const filteredUsers = users.filter(user => {

            return user.name
                .toLowerCase()
                .includes(query.toLowerCase());

        });


        // Clear previous results
        results.innerHTML = "";


        // Display results
        filteredUsers.forEach(user => {

            const li = document.createElement("li");

            li.textContent =
                `${user.name} - ${user.email}`;

            results.appendChild(li);
        });


        searchStatus.textContent =
            `Found ${filteredUsers.length} user(s).`;

    } catch (error) {

        searchStatus.textContent =
            "Something went wrong.";

        console.error(error);
    }
}

// Create debounced version of searchUsers
const debouncedSearch =
    debounce(searchUsers, 500);

// Listen for input events
searchInput.addEventListener(
    "input",
    debouncedSearch
);


// THROTTLE 

function logScrollPosition() {

    console.log(
        `Scroll position: ${window.scrollY}px`
    );
}

// Create throttled version
const throttledScroll =
    throttle(logScrollPosition, 200);

// Listen for scroll events
window.addEventListener(
    "scroll",
    throttledScroll
);
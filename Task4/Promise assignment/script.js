 
// 1. Implement a sleep(ms) function using Promises.

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function test() {
    console.log("Start");

    sleep(2000);

    console.log("SYNC END");

    await sleep(2000);

    console.log("After 2 Seconds ASYNC END");
}

test();

// ---------------------------------------------------------------------------------


// 2. Implement a retry(fn, attempts) that retries an async function on failure.

async function retry(fn, attempts) {

    let lastError;

    for (let attempt = 1; attempt <= attempts; attempt++) {

        try {
            return await fn();

        } catch (error) {

            lastError = error;

            console.log(`Attempt ${attempt} failed`);
        }
    }

    throw lastError;
}

async function fetchData() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return response.json();
}

async function main() {
    try {
        const users = await retry(fetchData, 3);

        console.log(users);

    } catch (error) {
        console.error("All attempts failed:", error);
    }
}

main();

// ------------------------------------------------------------------------------

// 3. Implement Promise.all from scratch.

function promiseAll(promises) {
    return new Promise((resolve, reject) => {

        const results = [];
        let completed = 0;

        if (promises.length === 0) {
            resolve([]);
            return;
        }

        promises.forEach((promise, index) => {

            Promise.resolve(promise)
                .then(value => {

                    results[index] = value;
                    completed++;

                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    });
}
const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

promiseAll([p1, p3, p2]).then(result => { console.log(result);
    });

// ------------------------------------------------------------------------

// Fetch data from https://jsonplaceholder.typicode.com/users, then for each user 
// fetch their posts (/users/:id/posts). Do this in parallel using Promise.all and 
// log a { user, posts } object for each.

async function fetchUsersWithPosts() {

    // 1. Fetch all users
    const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!usersResponse.ok) {
        throw new Error("Failed to fetch users");
    }

    const users = await usersResponse.json();

    // 2. Create one Promise for each user's posts
    const userWithPostsPromises = users.map(async user => {

        const postsResponse = await fetch(
            `https://jsonplaceholder.typicode.com/users/${user.id}/posts`
        );

        if (!postsResponse.ok) {
            throw new Error(
                `Failed to fetch posts for user ${user.id}`
            );
        }

        const posts = await postsResponse.json();

        return {
            user,
            posts
        };
    });

    // 3. Wait for all post requests in parallel
    const usersWithPosts = await Promise.all(
        userWithPostsPromises
    );

    // 4. Log each result
    usersWithPosts.forEach(result => {
        console.log(result);
    });
}

fetchUsersWithPosts()
    .catch(error => {
        console.error(error);
    });
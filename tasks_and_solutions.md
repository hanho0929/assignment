## Tasks:

1) Create/code a way to have script commands in the package.json of each server folder (microservice, gql, next.js) that can deploy each server in either a dev, qa, or production environment. If you are not familiar with what "environment" means - it is a dedicated set of servers that developers user to develop in (dev), test with (qa), or deploy to production for your real users (production). Then briefly write the instructions you would give to your dev-ops team on how to use it:

2) Create/code a way to have a single command start up all 3 servers for local development (microservice, gql, next.js). Then briefly write the instructions you would give to a new developer on your team on how to use it:

Your instructions: <
    Not familiar with Next.js, I create a client folder for rendering the index.html page in public folder. Using webpack.config to render the front-end pages.

    1. npm run microserver: to start the microservice which run by nodemon to serve port: 3000
    2. npm run gql_server: to start the gql_server which run by nodemon to serve port: 4000
    3. npm run dev-client: to start the client side which written by react.js, build in tailwind css.
    4. npm run start : which run 3 server simultaneously
>


---

3) The dev team you are working on has asked you to make sure this repo's code always looks pretty and easy to read since other developers from all around the world will be writing to it and some will not know what formatting you like in your code (ex. they may use 1 space vs 2 spaces to indent their code). Describe how you will make sure committed code is always formatted consistently and implement the tool or process.

Describe your solution: <
    Right click and click on Formate Document with Prettier(as default)
>

---

4) Implement the UI design shown and described in the last 2 slides of the attached PDF. To fetch data for the UI, use the 2 graphql queries written in the Apollo graphql server to fetch the ___userRecommendedItems___ and ___item___ information. Please implement ___server-side___ rendering for initial page load and ___client-side___ rendering for subsequent React app interactions as described in our system diagram and in the UI design slides of the PDF.

---

5) Your product team wants to make a change to the UI design in the last 2 slides. For non-grocery department items (home and furniture, electronics, apparel), they want to change the specification name of “Weight” to “Shipping Weight”. And if that non-grocery item does not have a “weight” but instead has a “packaged weight”, they would like to use the "packaged weight" value to show as the “Shipping Weight”.

    Implement the code change(s) needed in any of the 3 servers to implement this feature considering that not only the React app, but also iOS and Android mobile UIs for your company will also need to make this UI change as well. Hint - Try to be DRY from the perspective of all the code that needs to be written in all UIs and servers to implement this feature. Briefly describe your solution and why it is good so your product team understands:

Describe your solution: <___TODO-FILL_ME_IN___>

---

6) The dev-ops team has noticed that calls from the React app to fetch the userRecommendedItems are taking a very long time and it is causing the microservice server to almost crash during peak site usage. Please fix this issue by making changes to either the React app or the graphql server or both to try and reduce this load on the microservice. Briefly describe your solution so the devops team understands:

Describe your solution: <
    Try to cache the img before rendering the page at start, I don't have time to finished SSR, but it seems like doable if I had more time to figure out of SSR.

    I noticed that I should do on ApolloClient with set SSR to true, and write a component to render the page as blank html, which make faster, then use React.hydrate to render the pages after.


>

---

7) The QA team has also found that if they make a request for an item page for an item id that has a “$” in
it (ex. '000$'), they can cause the microservice server to crash because the DB cannot handle an invalid item id with $ value. Design and code a solution in any or in all 3 servers (Next.js, gql server, or microservice) to solve this problem. Hint - Try to be DRY from the perspective of all the code that needs to be written in all UIs (web and mobile) and servers to implement this fix. Briefly describe your solution so the QA team understands the fix:
:

Describe your solution: <
    Didn't finished this part, I had another question about the grapql.
    The id is "0001" in db, so when I tried to use gql`id = 0001`, it showed error which 0 can't start with the stirng after another 0, so I modified the id from `0001 -> 1` to make it works.

    The error -> Syntax Error: Invalid number, unexpected digit after 0: "0".
>

---
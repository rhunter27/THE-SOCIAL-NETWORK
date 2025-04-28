# THE-SOCIAL-NETWORK API

A NoSQL-based social network API that handles large amounts of unstructured data, featuring user relationships, thought posts, and reactions.


## Table of Contents
- [Installation](#installation)
- [Features] (#features)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/) (v3.8 or higher)
- [Git](https://git-scm.com/)
- [Mongoose] (https://mongoosejs.com)
- [Express]

## Features

- **User Management**
  - Create/update/delete users
  - Add/remove friends
  - Automatic friend count tracking
- **Thought System**
  - Post/update/delete thoughts
  - Add/remove reactions
  - Automatic reaction count tracking
- **NoSQL Flexibility**
  - MongoDB for unstructured data
  - Mongoose ODM for schema validation
  - Optimized for social media data relationships

## Usage
1. bash installations
- Clone repository/ git clone  https://github.com/rhunter27/THE-SOCIAL-NETWORK
- npm install
- npm install mongoose
- npm run dev
2. open insomnia
- chose new document for JSON 
- in tab, choose GET 
- in url, type http;/localhost:3001/api/users 
- GET all users
- click "body" and enter JSON object
- GET users and enter user id #680a7bb4bba168e65883c2b4
- enter body JSON text {"username": "lernantino",
    "email": "lernantino@gmail.com"}
- POST new user
3. POST and DELETE /api/users/:userId/friends/:friendId
- POST to add a new friend to a user's friend list
- DELETE to remove a friend from a user's friend list
4. /api/thoughts
- GET to get all thoughts
- GET to get a single thought by its _id
- POST to create a new thought. Don't forget to push the created thought's _id to the associated user's thoughts array field.
   EXAMPLE: {
    "thoughtText": "Here's a cool thought...",
    "username": "lernantino",
    "userId": "5edff358a0fcb779aa7b118b"
}
- PUT to update a thought by its _id
- DELETE to remove a thought by its _id
5. /api/thoughts/:thoughtId/reactions
- POST to create a reaction stored in a single thought's reactions array field
- DELETE to pull and remove a reaction by the reaction's reactionId value

## Licence
[MIT](https://choosealicense.com/licenses/mit/)

## Contributing 
John Brown, Luis Sanchez, John Murphy, and Juno Nguyen

## Test
https://drive.google.com/file/d/1J9IlTp2fZzF39zqlU5Ei0i7poh324shx/view?usp=sharing

## Questions
If you have any questions, please contact me:
GitHub: [rhunter27] (https://github.com/rhunter27)
email: [ravenhunter207@gmail.com] (mailto:ravenhunter207@gmail.com)
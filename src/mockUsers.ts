export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    username: 'johnDoe',
    age: 30,
    hobbies: ['reading', 'hiking']
  },
  {
    id: '4ec3b5f6-11c0-43b8-97a2-2f0d7a3b1c4d',
    username: 'janeDoe',
    age: 25,
    hobbies: ['painting', 'cooking']
  },
  {
    id: '6317f3a5-8e9f-4a2a-b3c1-d4e5f6a7b8c9',
    username: 'bobSmith',
    age: 40,
    hobbies: ['gaming', 'traveling']
  }
];
# Welcome to Kakeibo Budgeting:
This project is a simple budgeting tool based on the Japanese budgeting philosophy named Kakeido, aka "the art of saving money". As users manage their individual expenses they become more mindful of their spending habits. Like Kakeido, each expense falls into one of four categories: need, want, cultural, and unexpected. For example, cultural expenses represent anything that broaders an individual's horizons like travel or self improvement. Within this app, users will be able to Create, Read, Update, and Delete expense resources from a React frontent to an Express backend API to a MongoDB database. Users can also see a visual breakdown of their overall spending defined by the four categories of expenses.   

### Setup to run frontend 
1. clone ``` git clone git@github.com:matthewhiggins415/kakeibofrontend.git ```
2. ``` npm install ```
3. ``` npm run server ```
4. [Kakeibo Frontend Repo](https://github.com/matthewhiggins415/kakeibofrontend) ..should you need it

### Technologies Used: 
- express 
- mongoose
- mongodb
- passport 
- jsonWebTokens
- cors
- bcrypt
- axios

### ERD:
<img src="https://user-images.githubusercontent.com/67120920/157540390-7405e325-c118-4ce6-b2b1-58be4335b651.jpg" alt="app data screen" style="width:550px; height:auto; margin:0 auto;"/>

### Backend Routes:
| Verb      | Route         | Description             | Resource |
| --------- | ------------- | ----------------------- | -------- |
| POST      | /sign-up      | sign up a user          | User     |
| POST      | /sign-in      | sign in a user          | User     |
| GET       | /user/:id     | get a user              | User     |
| DELETE    | /sign-out     | log out a user          | User     |
| UPDATE    | /user/:id     | update a user           | User     |
| POST      | /expense      | create an expense       | Expense  |
| GET       | /expenses     | get all epenses         | Expense  | 
| GET       | /expenses/:id | get a single expense    | Expense  |
| PATCH     | /expense/:id  | update a single expense | Expense  |
| DELETE    | /expense/:id  | delete a single expense | Expense  |
| DELETE    | /expenses     | delete all expenses     | Expense  | 

# getir Test

The task is to build a RESTful API to fetch records data from a remote database. 

# Get Started
- Clone the repository using git clone https://github.com/gate3/ct-backend-task
- Run ```npm i``` or ```npm install``` to install all app dependencies
- Make a copy of the .env.sample file and rename to .env
- Start the app using 
    - ```npm run dev``` for development
    - ```npm run prod``` for production 
    
# Demo

The app is hosted on heroku. The base url is <a href="https://tranquil-hamlet-81728.herokuapp.com">https://tranquil-hamlet-81728.herokuapp.com</a>.
The default endpoint is an health check endpoint that returns a success response.

## API

There is only a single api available, it can be used to retrieve records

| Parameter | Description                               | 
|-------------|-----------------------------------------|
| Http Method | POST                                    |
| Path        | /v1/records                             |

### Request Parameters

```
    {
       "startDate":"2015-12-08",
       "endDate":"2016-09-09",
       "minCount":4000,
       "maxCount":9000
    }
```

### Sample Success Response Parameters

```
    {
        "code": 0,
        "msg": "Success",
        "records": [
            {
                "key": "yETEORdu",
                "createdAt": "2016-09-08T19:53:20.959Z",
                "totalCount": 4886
            },
            {
                "key": "BQsaeOpF",
                "createdAt": "2016-09-07T22:56:55.798Z",
                "totalCount": 5850
            }
        ]
    }
```

### Sample Error Response Parameters

```
    {
        "code": 500,
        "msg": "Error",
        "records": []
    }
```

# Project Structure
![file structure](https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2019/10/folder-structure.png?w=730&ssl=1)

<a href="https://blog.logrocket.com/the-perfect-architecture-flow-for-your-next-node-js-project/">Source LogRocket</a>


# Libraries Used

- Jest - For running unit tests
- Express - Popular framework with a robust set of features for running apps
- Dotenv - For using environment variables in development
- Joi - For validating data
- Http Status Codes - For a complete set of status codes
- Mongoose - ODM for mongodb that makes maning the database much easier
- SuperTest - Library used for running api integration tests to assert response codes and response body


# Todo

I had a lot of fun building this but there are some improvements I can still make:

- More tests, especially integration tests, unit tests for the services and api tests using super test.
- Use a DTO object to handle transfer of data from the api routes to the service layer, this will help keep data consistent even data names change
- Add push pre-hooks that runs eslint and prettifier before every push
- Add a mock database (e.g. in memory mongodb database) to be used for integration tests
- Add a dependency injection library like awilix to handle injection of dependencies
- Include a makefile to ease the execution of some common tasks

# Testing

- To run the tests, simply type ```npm test```
- We can also get code coverage by ```npm run coverage```

Thank you 👍

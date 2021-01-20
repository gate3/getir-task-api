# getir Test

The task is to build a RESTful API to fetch data from a remote database. The app contains functionality to create fetch

# Architecture

![Architecture](https://github.com/gate3/ct-backend-task/blob/staging/backend%20arch.png)

## Explanation

The diagram above shows a rudimentary architecture to the backend application. My focus was majorly on making sure the app is extensible, DRY and ensuring components or tools can be swapped out without having to make large changes to the codebase.
Here is an explanation to some important parts of the architecture.

1. Services - This contains the core business logic of the functionalities implemented in the backend. In this case we have just the order service, but in an ideal situation we could have other functionalities or resources that the api needs to manage.
   The duty of the service is to perform the core business logic on the data provided by the user. In this case, it takes order information for both create and update orders, validates them according to business rules and passes them on to the repository, then takes the response from the repository and returns it back to the route.

2. Repository - The repository functions follows the repository pattern, by encapsulating logic to access the data source. It can help put all related data access logic in one place and helps decouple the infrastructure from the domain/service layer. More can be read here about it
   <a href="https://docs.microsoft.com/en-us/dotnet/architecture/microservices/microservice-ddd-cqrs-patterns/infrastructure-persistence-layer-design">Design the infrastructure persistence layer</a>

# Libraries Used

- Awilix - For dependency injection
- Jest - For running unit tests
- Dotenv - For using environment variables in development
- Joi - For validating data
- Http Status Codes - For a complete set of status codes

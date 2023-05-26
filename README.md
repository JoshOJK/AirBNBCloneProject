# AirBNBCloneProject
First project, backend on AirBNB



![schema](https://github.com/JoshOJK/AirBNBCloneProject/assets/91496865/9cc22152-daf2-40bc-840d-c25dd8a67cda)



Where does API documentation come from?
API documentation is not only a great reference tool for those working with a completed API, it is also extremely helpful for planning out the endpoints that need to be implemented. In many cases, a frontend development team will already have a frontend implemented or in development, they just need data from the backend through very specifically outlined API endpoints. In these scenarios, the API documentation will be provided by the frontend team, setting the expectations for each success and error response.

The project that you will be working on will follow a similar pattern. API documentation will be given to you for your specific application with most of the specifications provided. These documents should guide the planning and implementation of your API.

What is given in the project's API documentation?
The API documentation provided for your project details the responses that the frontend development team needs in order for their application to function. Each section of the documentation details an endpoint that needs to be implemented, describing the basic functionality, what is expected from a successful request, and possible error responses.

Take a look at this sample section for an AirBnB API:

## Delete a Spot

Deletes an existing spot.

* Require Authentication: true
* Require proper authorization: Spot must belong to the current user
* Request
  * Method: Delete
  * URL: /spot/:spotid
  * Body: none

* Successful Response
  * Status Code: 200
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Successfully deleted",
      "statusCode": 200
    }
    ```

* Error response: Couldn't find a Spot with the specified id
  * Status Code: 404
  * Headers:
    * Content-Type: application/json
  * Body:

    ```json
    {
      "message": "Spot couldn't be found",
      "statusCode": 404
    }
    ```
In the above example, an endpoint is described that will delete an existing spot from the database. You'll notice that the endpoint indicates a request requires an authenticated user and that the user is only authorized to perform this action if the spot belongs to them.

The method and the URL for the request to this endpoint are up to you to determine. The frontend team does not have any requirements for these aspects of the endpoint, just be sure to use values that make sense for the endpoint's purpose and get approval from your Project Manager.

If a body will be provided in the request, its structure will be detailed in the documentation. The expected response from a successful request is described, detailing the expected JSON body and status. Similarly, any error responses specific to this endpoint will be described with the cause of the error and the expected body and status codes.

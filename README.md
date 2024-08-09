# IP-HCK73

API DOCS IP-DONNY

# Link Deployment : api.halobangjago.site

# EndPoint

# list of Available end point

- POST /register
- POST /login
- POST /search
- POST /auth/google

# Need Authentication

- GET /user
- PUT /editprofile
- DELETE /deleteprofile
- GET /home
- POST /search

# User

# 1. /register

# Description :

- Register a new user into the system

#### body:

json
{
"username": "string",
"email": "string",
"password": "string",
}

- #### Response (201 - Created)
  json
  {
  "id": "number"
  "username": "string"
  "email": "string"
  }
- #### Response (400 - Bad Request)

  json
  {
  "message": "Email already exist"
  }

  _OR_
  json
  {
  "message": "please input the right email"
  }

  _OR_
  json
  {
  "message": "email/password can not be empty"
  }

  _OR_
  json
  {
  "message": "password minimal 5 characters"
  }

- #### Response (403 - Forbidden)
  json
  {
  "message": "Forbidden error at authorization"
  }
- #### Response (500 - Internal Server Error)

  json
  {
  "message": "Internal Server Error"
  }

# 2. POST /login

# Description :

- Login existed user into the system

- #### body:
  json
  {
  "email": "string",
  "password": "string"
  }
- #### Response (200 - OK)
  json
  {
  "access_token": "string"
  }
- #### Response (400 - Bad Request)

  json
  {
  "message": "please input the right email"
  }

  _OR_

  json
  {
  "message": "email/password can not be empty"
  }

  _OR_

  json
  {
  "message": "email/password can not be empty"
  }

- #### Response (401 - Unauthorize)
  json
  {
  "message": "invalid user/password"
  }
- #### Response (500 - Internal Server Error)
  json
  {
  "message": "Internal Server Error"
  }

# 3. PUT /editprofile

# Description :

- Edit User Profile

- #### headers:

  json
  {
  "Authorization": "Bearer <access_token>"
  }

- #### body:

  json
  {
  "email": "string",
  "password": "string"
  }

  - #### Response (200 - OK)

  ```json
  {
    "message": "Successfully Update Profile"
  }
  ```

- # Response (400-Bad Request)

{
"message" : "Validation Error Message"
}

- # Response (401-authenticatin)

  {
  "message" : "Error Authentication"
  }

- #### Response (500 - Internal Server Error)
  json
  {
  "message": "Internal Server Error"
  }

# 4. DELETE /deleteprofile

##### Description:

- Delete profile by id from database

#### Request:

- #### headers:
  json
  {
  "access_token": "string"
  }
- #### params:
  json
  {
  "id": "number"
  }
- #### body:
  json
  {
  "name": "string"
  }
- #### Response (404 - Not Found)
  json
  {
  "message": "Data not found"
  }
- #### Response (500 - Internal Server Error)

  json
  {
  "message": "Internal Server Error"
  }

  ```

  ```

- # 5. POST /auth/google

  ## description :

  - Login with Google

  - #### body:
    json
    {
    "email": "string",
    "password": "string"
    }

- #### Response (200 - OK)
  json
  {
  "access_token": "string"
  }
- #### Response (400 - Bad Request)

  json
  {
  "message": "please input the right email"
  }

  _OR_

  json
  {
  "message": "email/password can not be empty"
  }

  _OR_

  json
  {
  "message": "email/password can not be empty"
  }

- #### Response (401 - Unauthorize)
  json
  {
  "message": "invalid user/password"
  }
- #### Response (500 - Internal Server Error)
  json
  {
  "message": "Internal Server Error"
  }

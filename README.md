# Start Application

## Installation

```sh
npm install
```

## Running the project locally

In order to run the webpack dev server:

```sh
npm run dev
```

### How it works

1. Once the application is started the API will be fetched and shown to user.

2. On Scroll to bottom once it reach the end, again the following API call will be taking place and shows more JD in the list.

3. Coming to filters, When the user tries to filter based on the filter parameters the jobs will be filtered.

4. When there is any filter applied we dont fetch new job on scroll reach bottom.

5. Filter that is currently available Role, Experience, baseSalary, companyName, and remote.

FYI Location filter is been added to remote since the response was coming as remote in location there is no use of keep seperate filter were we dont have remote or hybrid from Response.

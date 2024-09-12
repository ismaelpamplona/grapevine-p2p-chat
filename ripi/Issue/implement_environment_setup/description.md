# implement_environment_setup (Issue)

- [x] Initialize a Node.js project locally with `npm init`.
- [x] Install the necessary dependencies (grenache-nodejs-link, grenache-nodejs-ws).
- [x] Create a Dockerfile that sets up the project inside the container and installs dependencies.
- [x] Build the Docker container and verify the Grape node is running.

  ```sh
  docker build -t grapevine-grape .
  ```

  ```sh
  docker run -p 30001:30001 -p 20001:20001 grapevine-grape
  ```

- [x] Create a `.gitignore` file to exclude unnecessary files from the repository.
- [x] Create a `.dockerignore` file to prevent unwanted files from being copied into the Docker container.

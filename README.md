# tutors-management-microservice

What info do we need to store about tutors:
- Unique indentifier,
- First and last name,
- Didactic degree,
- Date of birth,
- Office,
- Email address,
- Phone number,
- Departament,
- Hire date.

We need to limit the API access with an access token, and the service must be scalable.

Deploying the app to Google App Engine
-
Prerequisites:
- A Google Cloud project with App Engine enabled,
- gcloud command-line tool installed,
- gcloud configured with your account and set to use the project you created.

To run the app in App Engine, go to the root of the folder and run `gcloud app deploy`.


Running the app locally
-
Prerequisites:
- Python 3.7 installed.

To run the app locally, run the following command: `python main.py`. You don't need to have the **create-react-app** since the app is already built and the static files are served by the Python Flask app.

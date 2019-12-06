# Dialogflow application for voice recognition (Python)
Open a terminal and go to python-micro-service folder (backend)

First set up google application credential: run 1 of these lines

For Windows:
$env:GOOGLE_APPLICATION_CREDENTIALS="[local path to InspirationalQuote-dc8da3808508.json]"

For Linux:
export GOOGLE_APPLICATION_CREDENTIALS="[local path to InspirationalQuote-dc8da3808508.json]"

Then run the backend server:
pipenv run uvicorn --reload delivery.api.microservice:app

Open another terminal and go to vuejs-client-master (frontend):

yarn install then yarn serve to run frontend server

Click record to start recording, press stop to stop then click submit to send request away
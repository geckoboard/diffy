# Diffy

A page diffing tool

## Installation

You'll need PhantomJS 2

```
git clone https://github.com/geckoboard/diffy.git .
npm install
```

Diffy needs some environment variables for S3

```
export S3_BUCKET=<S3_BUCKET_NAME>
export S3_ACCESS_KEY_ID=<S3_ACCESS_KEY>
export S3_SECRET_ACCESS_KEY=<S3_SECRET_ACCESS_KEY>
export S3_REGION=<S3_REGION_FOR_YOUR_BUCKET>
export ACCESS_TOKEN=<SHARED_SECRET>
export SLACK_CHANNEL=<CHANNEL_TO_POST_RESULTS_TO>
export SLACK_TOKEN=<SLACK_API_TOKEN_FOR_YOUR_BOT>
export SLACK_USERNAME=<SLACK_USERNAME_FOR_YOUR_BOT>
```

## Usage

Diffy screen captures a dashboard and compares it to previous captures of the same dashboard.
If differences are detected it uploads an image to S3 displaying those differences.

### CLI

```
./bin/diffy <DASHBOARD_URL>
```

### HTTP

```
curl -X POST -d 'token=<SHARED_SECRET>&url=<DASHBOARD_URL>' https://hostname
```

#### Responses

* `204 No Content` - Nothing has changed, all is good, carry on
* `200 OK` - Changes have been detected, the body will contain the URL of an image containing the changes

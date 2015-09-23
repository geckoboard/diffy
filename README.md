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
-export S3_BUCKET=<S3_BUCKET_NAME>
-export S3_ACCESS_KEY_ID=<S3_ACCESS_KEY>
-export S3_SECRET_ACCESS_KEY=<S3_SECRET_ACCESS_KEY>
-export S3_REGION=<S3_REGION_FOR_YOUR_BUCKET>
```

## Usage

Diffy screen captures a dashboard and compares it to previous captures of the same dashboard.
If differences are detected it uploads an image to S3 displaying those differences.

```
./bin/diffy <DASHBOARD_URL>
```

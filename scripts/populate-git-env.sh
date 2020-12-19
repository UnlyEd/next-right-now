# List of environment variables you want to have access during next development and deployment.
# To have access to your variables (e.g: echo $GIT_COMMIT_SHA) you have to use "source" like this: `source ./scripts/populate-git-env.sh`
# If you miss the dot or use a prefix like sh it's not going to work.

export "GIT_COMMIT_TAGS=${GIT_COMMIT_TAGS:-$(yarn --silent git:getReleasesAndTags)}"
export "GIT_COMMIT_REF=${GIT_COMMIT_REF:-$(yarn --silent git:getCommitRef)}"
export "GIT_COMMIT_SHA=${GIT_COMMIT_SHA:-$(yarn --silent git:getCommitSHA)}"

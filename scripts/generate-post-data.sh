# Generates JSON using a bash function - See https://stackoverflow.com/a/57369772/2391795
# "End Of File" must be at the beginning of the line with no space/tab before or after - See https://stackoverflow.com/a/12909284/2391795
# But, when executed by GitHub Action, it must be inside the "run" section instead
# You can find more details here: https://stackoverflow.com/questions/2500436/how-does-cat-eof-work-in-bash
. ./scripts/populate-git-env.sh

generate_post_data() {
  cat <<EndOfMessage
  {
    "MANUAL_TRIGGER_CUSTOMER": "${MANUAL_TRIGGER_CUSTOMER}",
    "CUSTOMER_REF": "${CUSTOMER_REF_TO_DEPLOY}",
    "STAGE": "${DEPLOYMENT_STAGE}",
    "GIT_COMMIT_SHA": "${GIT_COMMIT_SHA}",
    "GIT_COMMIT_REF": "${GIT_COMMIT_REF}",
    "GIT_COMMIT_TAGS": "${GIT_COMMIT_TAGS}",
    "GITHUB_REF_SLUG": "${GITHUB_REF_SLUG}",
    "GITHUB_HEAD_REF_SLUG": "${GITHUB_HEAD_REF_SLUG}",
    "GITHUB_BASE_REF_SLUG": "${GITHUB_BASE_REF_SLUG}",
    "GITHUB_EVENT_REF_SLUG": "${GITHUB_EVENT_REF_SLUG}",
    "GITHUB_REPOSITORY_SLUG": "${GITHUB_REPOSITORY_SLUG}",
    "GITHUB_REF_SLUG_URL": "${GITHUB_REF_SLUG_URL}",
    "GITHUB_HEAD_REF_SLUG_URL": "${GITHUB_HEAD_REF_SLUG_URL}",
    "GITHUB_BASE_REF_SLUG_URL": "${GITHUB_BASE_REF_SLUG_URL}",
    "GITHUB_EVENT_REF_SLUG_URL": "${GITHUB_EVENT_REF_SLUG_URL}",
    "GITHUB_REPOSITORY_SLUG_URL": "${GITHUB_REPOSITORY_SLUG_URL}",
    "GITHUB_SHA_SHORT": "${GITHUB_SHA_SHORT}"
  }
EndOfMessage
}

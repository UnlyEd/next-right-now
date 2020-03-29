---
layout: default
title: How to use Github Actions
parent: CI/CD
grand_parent: Guides
nav_order: 20
---

# Introducing GitHub Actions

> Stuff to read if you're not familiar with GitHub Actions

[Official documentation](https://help.github.com/en/actions/automating-your-workflow-with-github-actions)

Most useful documentation links:
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#about-yaml-syntax-for-workflows](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#about-yaml-syntax-for-workflows)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#on)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idneeds)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#jobsjob_idruns-on)
- [https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions#filter-pattern-cheat-sheet)


## Dependencies

### Actions
* _**[actions/setup-node@v1](https://github.com/actions/setup-node)**_:
    Setup node.js and install dependencies
* _**[actions/checkout@v1](https://github.com/cypress-io/github-action)**_:
    Checkout to last commit to retrieve code
* _**[cypress-io/github-action@v1](https://github.com/cypress-io/github-action)**_:
    Run Cypress tests
* _**[actions/upload-artifact@v1](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/persisting-workflow-data-using-artifacts)**_:
    Upload artifacts to Github

---

## Complex commands
* _**[jq](https://cameronnokes.com/blog/working-with-json-in-bash-using-jq/)**_:
    JSON parser for bash
* _**[tr](http://linuxcommand.org/lc3_man_pages/tr1.html)**_:
    Bash editor, used to remove characters
* _**[echo "::set-env name=key::value"](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/development-tools-for-github-actions)**_:
    Set env variable for all others jobs

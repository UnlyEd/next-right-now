1. `git clone https://github.com/UnlyEd/next-right-now.git nrn-quick-start` - Clones the Next Right Now repository
1. `cd nrn-quick-start && git checkout {{ include.preset }}` - Selects the default preset branch
1. `cp .env.local.example .env.local` - Copies the default ENV variables from the example file, necessary when running the project locally
1. `yarn` - Installs all dependencies from `package.json`
1. `yarn start` - Starts the app on [http://localhost:8888/](http://localhost:8888/)
    - Alternatively, on Windows, you need to run `yarn start:windows`

That's it! The project should work on your local computer!
The demo should run locally, and you can start playing around.

**If it doesn't**, read our tips below, or ask for help on [github issues](https://github.com/UnlyEd/next-right-now/issues).

---

## Tips

{% include installation-guide-tips.md %}

---

## Deploying online manually

[Read the default preset documentation (`{{ include.preset }}`)](../../available-presets/{{ include.preset }})

---

## Windows concerns

{% include windows-concerns.md %}
{: .mb-6 }

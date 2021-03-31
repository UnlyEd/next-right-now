- On Windows OS, the `yarn start:windows` command should be used instead of `yarn start`
    - That's because the `yarn start` command uses some bash script which aren't compatible with Windows (unless you're using WSL)
    - You might want to install [WSL on Windows 10](https://www.thewindowsclub.com/how-to-run-sh-or-shell-script-file-in-windows-10) to enable basic bash support
- NRN v2 has been tested on Windows (on June 1st, 2020) and works correctly
    - **Tip**: We recommend [`nvm-windows`](https://github.com/coreybutler/nvm-windows/releases) as replacement for `nvm` (download the `nvm-setup.zip`)
- When manually deploying (i.e: `yarn deploy`), the symbolic link for `vercel.json` (which points to another `vercel.*.json` file, depending on the preset) **will not work on Windows**, and you'll have to create a `vercel.json` yourself (just copy the content of any `vercel.*.json` file)
    - This is not a concern if you don't need to deploy manually from a Windows computer, as CI/CD will deploy properly (CI/CD runs under Unix)

**Using Cygwin/Babun**

It's possible to use Cygwin/Babun to simulate a unix-like local environment. It's not required.

It's particularly useful if you encounter issues and can't use `wsl2`. (e.g: Not available on < Windows 10)

If you don't use Cygwin/Babun, check out `wsl2`.

- **Tip**: Babun support has been discontinued in 2019, but it still works perfectly.
- **Tip**: **Windows 10** `wsl2` may provide a better experience  - [What is wsl2?](https://docs.microsoft.com/en-us/windows/wsl/wsl2-about)

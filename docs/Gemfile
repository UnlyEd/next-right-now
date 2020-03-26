# XXX This file is only used when working on your local machine, in development

source "https://rubygems.org"

git_source(:github) {|repo_name| "https://github.com/#{repo_name}" }

# If you have any plugins, put them here!
group :jekyll_plugins do
 gem 'just-the-docs' # XXX Our Jekyll theme - See https://pmarsceill.github.io/just-the-docs/
 gem "github-pages" # XXX Necessary to reproduce the behaviour of GitHub Pages - When this is loaded, "jekyll" must not be bundled because it's included within
end

# ------- WINDOWS SUPPORT ---------

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?


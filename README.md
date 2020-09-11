# CI Cleanup action
Used to automate removal of preview deployments

## Example template

```yaml
name: Make release

on: [delete]

jobs:
  sls-cleanup:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v1
      with:
        node-version: 12.x
        registry-url: 'https://npm.pkg.github.com'
    - uses: g-network/ci-cleanup-action@v1
      env:
        AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
        AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

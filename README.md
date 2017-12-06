# visc-website
VISC website

## Guide

You need to clone recursively to include the themes:

```
git clone --recursive git@github.com:VISCHub/visc-website.git
```

If you already cloned without recursion, run for the first time:

```
git submodule update --init --recursive
```

For subsequent updates:

```
git submodule update --recursive
```

or:

```
git pull --recurse-submodules
```

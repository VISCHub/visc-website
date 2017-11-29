.PHONY: all clean build publish update-theme

build:
	hugo -b 'https://visc.network/' --canonifyURLs -d _dsite

clean:
	rm -rf _dsite/*

publish:
	rsync -avz --partial --progress --delete _dsite/ visc-site:~/visc-website/

all: clean build publish

update-theme:
	git submodule update --remote themes/minimal

.PHONY:
serve:
	yarn serve --port 8000

.PHONY:
clean:
	cd src && bash -c 'for f in `find . \( -not -path ./assets/\* \) -name \*.js`; do if [ -f $${f%.js}.ts ]; then rm "$$f"; fi; done'

# yangli-evo.github.io

Source for [yangli-evo.github.io](https://yangli-evo.github.io), the homepage of Yang Li.

## Editing

Everything on the page comes from the files in `_data/`:

| File | Section |
| --- | --- |
| `profile.yml` | Name, photo, links, bio, research interests |
| `news.yml` | News |
| `publications.yml` | Publications |
| `honors.yml` | Honors & awards |
| `education.yml` | Education & positions |

Figures live in `images/`, paper PDFs in `pdf/`.

## Local preview

```bash
bundle install
bundle exec jekyll serve
```

Then open http://127.0.0.1:4000.

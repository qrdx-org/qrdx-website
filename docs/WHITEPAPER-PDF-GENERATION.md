# Generating PDF from QRDX Whitepaper

This guide explains how to convert the QRDX whitepaper markdown file to PDF format.

## Method 1: Using Pandoc (Recommended)

### Installation

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install pandoc texlive-xetex texlive-fonts-recommended
```

**macOS:**
```bash
brew install pandoc basictex
```

**Windows:**
Download from https://pandoc.org/installing.html

### Generate PDF

```bash
cd /workspaces/qrdx-website

pandoc public/QRDX-Whitepaper-v2.0.md \
  -o public/QRDX-Whitepaper-v2.0.pdf \
  --pdf-engine=xelatex \
  --toc \
  --toc-depth=2 \
  --number-sections \
  -V geometry:margin=1in \
  -V fontsize=11pt \
  -V documentclass=article \
  -V colorlinks=true \
  -V linkcolor=blue \
  -V urlcolor=blue \
  --metadata title="QRDX Protocol Whitepaper v2.0" \
  --metadata author="QRDX Foundation Research Team" \
  --metadata date="November 3, 2025"
```

## Method 2: Using Browser Print-to-PDF

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open http://localhost:3000/whitepaper in your browser

3. Use browser's Print function (Ctrl+P / Cmd+P)

4. Select "Save as PDF" as the destination

5. Configure print settings:
   - Enable "Background graphics"
   - Margins: Default or Custom
   - Save as: `QRDX-Whitepaper-v2.0.pdf`

## Method 3: Using VS Code Extensions

1. Install "Markdown PDF" extension in VS Code

2. Open `public/QRDX-Whitepaper-v2.0.md`

3. Right-click in the editor and select "Markdown PDF: Export (pdf)"

4. PDF will be generated in the same directory

## Method 4: Online Converters

Upload the markdown file to:
- https://www.markdowntopdf.com/
- https://dillinger.io/ (export as PDF)
- https://cloudconvert.com/md-to-pdf

## Method 5: Using Script

A bash script is provided at `scripts/generate-whitepaper-pdf.sh`:

```bash
bash scripts/generate-whitepaper-pdf.sh
```

This will generate the PDF in the `public/` directory.

## Customization Options

### Change Page Size
Add `-V papersize=a4` or `-V papersize=letter`

### Change Margins
Modify `-V geometry:margin=1in` to desired margin (e.g., `0.75in`, `2cm`)

### Add Cover Page
Create a separate markdown file for the cover and combine:
```bash
pandoc cover.md public/QRDX-Whitepaper-v2.0.md -o output.pdf
```

### Custom Fonts
```bash
-V mainfont="Times New Roman" \
-V monofont="Courier New"
```

### Include Syntax Highlighting
```bash
--highlight-style=tango
```

## Verification

After generation, verify the PDF:
- Check all sections are included
- Verify table of contents is correct
- Ensure code blocks are formatted properly
- Check that all links work
- Verify page numbers
- Ensure images are rendered (if any)

## Output Location

Generated PDFs will be saved to:
```
/workspaces/qrdx-website/public/QRDX-Whitepaper-v2.0.pdf
```

This file will be accessible at:
```
http://localhost:3000/QRDX-Whitepaper-v2.0.pdf
```

Or for download in production:
```
https://qrdx.org/QRDX-Whitepaper-v2.0.pdf
```

## Troubleshooting

### "pandoc: command not found"
Install pandoc using the installation instructions above.

### "xelatex not found"
Install LaTeX distribution (texlive-xetex on Linux, basictex on macOS).

### PDF too large
- Remove unnecessary images
- Compress images before conversion
- Use `-V fontsize=10pt` for smaller text

### Fonts not rendering correctly
Ensure required fonts are installed or specify available fonts with `-V mainfont`.

### Page breaks not working
Use `\newpage` in markdown where you want manual page breaks.

## Additional Resources

- Pandoc Manual: https://pandoc.org/MANUAL.html
- LaTeX Documentation: https://www.latex-project.org/help/documentation/
- Markdown Guide: https://www.markdownguide.org/

## Notes

- The markdown file is optimized for both web and PDF viewing
- PDF generation preserves all formatting, including tables and code blocks
- Generated PDFs are suitable for professional distribution
- File size typically ranges from 500KB to 2MB depending on content

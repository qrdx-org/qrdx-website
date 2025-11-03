#!/bin/bash
# Script to generate PDF from QRDX whitepaper markdown

set -e

echo "QRDX Whitepaper PDF Generator"
echo "=============================="
echo ""

# Check if pandoc is installed
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc is not installed."
    echo ""
    echo "To install pandoc:"
    echo "  Ubuntu/Debian: sudo apt-get install pandoc texlive-xetex"
    echo "  macOS:         brew install pandoc basictex"
    echo "  Or visit:      https://pandoc.org/installing.html"
    echo ""
    exit 1
fi

echo "✅ Pandoc found: $(pandoc --version | head -n1)"
echo ""

# Input and output files
INPUT_FILE="public/QRDX-Whitepaper-v2.0.md"
OUTPUT_FILE="public/QRDX-Whitepaper-v2.0.pdf"

# Check if input file exists
if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ Input file not found: $INPUT_FILE"
    exit 1
fi

echo "📄 Input:  $INPUT_FILE"
echo "📄 Output: $OUTPUT_FILE"
echo ""

# Generate PDF
echo "🔨 Generating PDF..."
pandoc "$INPUT_FILE" \
    -o "$OUTPUT_FILE" \
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
    -V toccolor=black \
    --metadata title="QRDX Protocol Whitepaper v2.0" \
    --metadata author="QRDX Foundation Research Team" \
    --metadata date="November 3, 2025"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ PDF generated successfully!"
    echo "📍 Location: $OUTPUT_FILE"
    
    # Get file size
    if command -v du &> /dev/null; then
        SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo "📊 File size: $SIZE"
    fi
else
    echo ""
    echo "❌ PDF generation failed"
    exit 1
fi

echo ""
echo "Done! 🎉"

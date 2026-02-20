#!/bin/bash
# Script to generate PDFs from QRDX whitepaper markdown files

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
    # Assume Linux environment for installation attempt
    sudo apt-get update
    sudo apt-get install -y pandoc texlive-xetex
    #exit 1
fi

echo "✅ Pandoc found: $(pandoc --version | head -n1)"
echo ""

# Function to generate PDF
generate_pdf() {
    local INPUT_FILE=$1
    local OUTPUT_FILE=$2
    local VERSION=$3
    local DATE=$4
    
    # Check if input file exists
    if [ ! -f "$INPUT_FILE" ]; then
        echo "❌ Input file not found: $INPUT_FILE"
        return 1
    fi
    
    echo "📄 Input:  $INPUT_FILE"
    echo "📄 Output: $OUTPUT_FILE"
    echo ""
    
    # Generate PDF
    echo "🔨 Generating PDF for version $VERSION..."
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
        --metadata title="QRDX Protocol Whitepaper $VERSION" \
        --metadata author="QRDX Foundation Research Team" \
        --metadata date="$DATE"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ PDF generated successfully!"
        echo "📍 Location: $OUTPUT_FILE"
        
        # Get file size
        if command -v du &> /dev/null; then
            SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
            echo "📊 File size: $SIZE"
        fi
        echo ""
        return 0
    else
        echo ""
        echo "❌ PDF generation failed for $VERSION"
        return 1
    fi
}

# Generate v2.0 PDF
generate_pdf "public/QRDX-Whitepaper-v2.0.md" "public/QRDX-Whitepaper-v2.0.pdf" "v2.0" "November 3, 2025"

# Generate v2.3 PDF (if file exists)
if [ -f "public/QRDX-Whitepaper-v2.3.md" ]; then
    echo "---"
    echo ""
    generate_pdf "public/QRDX-Whitepaper-v2.3.md" "public/QRDX-Whitepaper-v2.3.pdf" "v2.3" "December 9, 2025"
fi

# Generate v3.2 PDF (if file exists)
if [ -f "public/QRDX-Whitepaper-v3.2.md" ]; then
    echo "---"
    echo ""
    generate_pdf "public/QRDX-Whitepaper-v3.2.md" "public/QRDX-Whitepaper-v3.2.pdf" "v3.2" "February 16, 2026"
fi

echo "Done! 🎉"

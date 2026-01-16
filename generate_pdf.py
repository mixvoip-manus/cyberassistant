import markdown
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

# Read markdown
with open('brochure_content.md', 'r') as f:
    md_content = f.read()

# Convert to HTML
html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])

# Create full HTML document with styling
full_html = '''
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
@page {
    size: A4;
    margin: 2cm;
    @bottom-center {
        content: "Mixvoip Cyber Assistance - Information Brochure";
        font-size: 9pt;
        color: #666;
    }
    @bottom-right {
        content: "Page " counter(page);
        font-size: 9pt;
        color: #666;
    }
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 11pt;
    line-height: 1.6;
    color: #1a1a1a;
}

h1 {
    color: #22c55e;
    font-size: 28pt;
    font-weight: 700;
    margin-top: 0;
    page-break-before: always;
}

h1:first-of-type {
    page-break-before: avoid;
}

h2 {
    color: #1a1a1a;
    font-size: 18pt;
    font-weight: 700;
    border-bottom: 3px solid #22c55e;
    padding-bottom: 8px;
    margin-top: 30px;
    page-break-after: avoid;
}

h3 {
    color: #22c55e;
    font-size: 14pt;
    font-weight: 600;
    margin-top: 20px;
}

h4 {
    color: #1a1a1a;
    font-size: 12pt;
    font-weight: 600;
}

p {
    margin: 10px 0;
}

strong {
    font-weight: 600;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 10pt;
}

th {
    background-color: #22c55e;
    color: white;
    padding: 10px;
    text-align: left;
    font-weight: 600;
}

td {
    padding: 8px 10px;
    border-bottom: 1px solid #e5e5e5;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

ul, ol {
    margin: 10px 0;
    padding-left: 25px;
}

li {
    margin: 5px 0;
}

hr {
    border: none;
    border-top: 2px solid #22c55e;
    margin: 30px 0;
}

code {
    background-color: #f4f4f4;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 10pt;
}

blockquote {
    border-left: 4px solid #22c55e;
    margin: 15px 0;
    padding: 10px 20px;
    background-color: #f0fdf4;
}
</style>
</head>
<body>
''' + html_content + '''
</body>
</html>
'''

# Generate PDF
font_config = FontConfiguration()
html = HTML(string=full_html)
css = CSS(string='@page { size: A4; }', font_config=font_config)
html.write_pdf('client/public/Mixvoip_Cyber_Assistance_Brochure_Updated.pdf', stylesheets=[css], font_config=font_config)
print('PDF created successfully!')

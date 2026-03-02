$htmlFilePath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\index.html"
$outputFilePath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\forms\html_names.txt"

# File path will already exist by default so no need to check if it exists

$htmlContent = Get-Content -Path $htmlFilePath -Raw

# Find the text name=". Then grab everything inside the name attribute until the next closing quote is read
# After it the next closing quote is read, skip and continue to look through other name attributes
# Lookahead. If the text is viewport, ignore it entirely.
$pattern = 'name="(?!viewport)([^"]+)"'

#Using regex to find everything matching name="value"

$results = [regex]::Matches($htmlContent, $pattern) | ForEach-Object {$_.Groups[1].Value}

$results | Sort-Object -Unique | Out-File -FilePath $outputFilePath

Write-Host "Extracted names saved to:" $outputFilePath -ForegroundColor Cyan

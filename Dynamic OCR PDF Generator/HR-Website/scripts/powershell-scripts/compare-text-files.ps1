$htmlNamesPath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\forms\html_names.txt"
$formFieldNamesPath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\forms\form_fields.txt"

$htmlContentText = Get-Content -Path $htmlNamesPath
$formContentText = Get-Content -Path $formFieldNamesPath

$diff = Compare-Object -ReferenceObject $formContentText -DifferenceObject $htmlContentText -IncludeEqual:$false

if ($diff) {
        Write-Host "Differences found:" -ForegroundColor Yellow
        $diff | ForEach-Object {
            if ($_.SideIndicator -eq "<=") {
                Write-Host "Only in form_fields.txt: $($_.InputObject)" -ForegroundColor Magenta
            }
            elseif ($_.SideIndicator -eq "=>") {
                Write-Host "Only in html_names.txt: $($_.InputObject)" -ForegroundColor Green
            }
        }
    }
else {
        Write-Host "The files are identical." -ForegroundColor Cyan
    }
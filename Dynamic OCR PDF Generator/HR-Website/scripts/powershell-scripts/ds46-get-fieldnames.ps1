$filePath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\forms\DS 46 New.pdf"
$outPutFilePath = "C:\Users\khburgos\Projects\generate-pdf\Dynamic OCR PDF Generator\HR-Website\forms\form_fields.txt"
try {
$file = Get-Item -Path $filePath -ErrorAction Stop
$fileName = Split-Path $filePath -Leaf
Write-Host "DS 46 form found in location:" $file.FullName -ForegroundColor Green
(pdftk $filePath dump_data_fields | Select-String "FieldName:") -replace "FieldName: ", "" | Out-File -FilePath $outPutFilePath -Encoding utf8
Write-Host "Ds 46 File name:" $fileName -ForegroundColor Cyan
Write-Host "Field names successfully saved to:" $outPutFilePath -ForegroundColor Cyan
}
catch {
Write-Host "Error: File not found or inaccessible." -ForegroundColor Red
Write-Host "Check naming convention for file!" -ForegroundColor Red
}
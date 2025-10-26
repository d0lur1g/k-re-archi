# ========================================
# Script d'affichage de la structure projet
# K-Ré Architecture - Next.js 16
# ========================================

# Supprime l'ancien fichier s'il existe
if (Test-Path structure.txt) {
    Remove-Item structure.txt
}

# === FICHIERS RACINE ===
@"
=== FICHIERS RACINE ===

    Directory: $PWD

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
"@ | Out-File structure.txt -Encoding UTF8

Get-ChildItem -File | Format-Table Mode, LastWriteTime, Length, Name -HideTableHeaders | Out-File structure.txt -Append -Encoding UTF8

# === PUBLIC ===
"`n=== PUBLIC ===" | Out-File structure.txt -Append -Encoding UTF8

if (Test-Path public) {
    tree public /F /A | Out-File structure.txt -Append -Encoding UTF8
}
else {
    "Le dossier public n'existe pas" | Out-File structure.txt -Append -Encoding UTF8
}

# === SRC ===
"`n=== SRC ===" | Out-File structure.txt -Append -Encoding UTF8

if (Test-Path src) {
    tree src /F /A | Out-File structure.txt -Append -Encoding UTF8
}
else {
    "Le dossier src n'existe pas" | Out-File structure.txt -Append -Encoding UTF8
}

# Affiche le résultat
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Structure du projet générée avec succès" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

Get-Content structure.txt

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Fichier sauvegardé : structure.txt" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

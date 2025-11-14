Get-ChildItem -Path . -Recurse -Include app.json,package.json,index.*,*.js,*.ts -File -ErrorAction SilentlyContinue |
  Select-String -Pattern "PlataformConstants" -SimpleMatch -List
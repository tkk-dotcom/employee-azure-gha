# GitHub OIDC setup for Azure AKS
$APP_NAME = "employee-gha-oidc"
$RESOURCE_GROUP = "employee-rg"
$GITHUB_REPO = "tkk-dotcom/employee-azure-gha"
$BRANCH = "main"

Write-Host "Starting GitHub OIDC setup for Azure..."

az account show > $null 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "You are not logged in. Run 'az login' first."
    exit 1
}

az ad app create --display-name $APP_NAME > $null 2>&1

$APP_ID = az ad app list --display-name $APP_NAME --query "[0].appId" -o tsv
if (-not $APP_ID) {
    Write-Host "Failed to retrieve App ID."
    exit 1
}

az ad sp create --id $APP_ID > $null 2>&1

$SUB = az account show --query id -o tsv
$TENANT = az account show --query tenantId -o tsv

Write-Host "Subscription ID: $SUB"
Write-Host "Tenant ID: $TENANT"
Write-Host "App (Client) ID: $APP_ID"

az role assignment create `
  --assignee $APP_ID `
  --role contributor `
  --scope "/subscriptions/$SUB/resourceGroups/$RESOURCE_GROUP" > $null 2>&1

$FED_JSON = @"
{
  "name": "github-oidc-employee",
  "issuer": "https://token.actions.githubusercontent.com",
  "subject": "repo:$GITHUB_REPO:ref:refs/heads/$BRANCH",
  "audiences": ["api://AzureADTokenExchange"]
}
"@
az ad app federated-credential create --id $APP_ID --parameters $FED_JSON > $null 2>&1

az ad app federated-credential list --id $APP_ID --output table

Write-Host "Use these values in GitHub repo variables:"
Write-Host "  AZURE_CLIENT_ID       = $APP_ID"
Write-Host "  AZURE_TENANT_ID       = $TENANT"
Write-Host "  AZURE_SUBSCRIPTION_ID = $SUB"

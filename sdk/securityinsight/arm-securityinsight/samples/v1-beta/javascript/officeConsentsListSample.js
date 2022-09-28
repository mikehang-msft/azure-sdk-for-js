/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const { SecurityInsights } = require("@azure/arm-securityinsight");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to Gets all office365 consents.
 *
 * @summary Gets all office365 consents.
 * x-ms-original-file: specification/securityinsights/resource-manager/Microsoft.SecurityInsights/preview/2022-09-01-preview/examples/officeConsents/GetOfficeConsents.json
 */
async function getAllOfficeConsents() {
  const subscriptionId = "d0cfe6b2-9ac0-4464-9919-dccaee2e48c0";
  const resourceGroupName = "myRg";
  const workspaceName = "myWorkspace";
  const credential = new DefaultAzureCredential();
  const client = new SecurityInsights(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.officeConsents.list(resourceGroupName, workspaceName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

getAllOfficeConsents().catch(console.error);

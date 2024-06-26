/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import {
  ProblemClassificationsClassificationInput,
  MicrosoftSupport,
} from "@azure/arm-support";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Classify the right problem classifications (categories) available for a specific Azure service.
 *
 * @summary Classify the right problem classifications (categories) available for a specific Azure service.
 * x-ms-original-file: specification/support/resource-manager/Microsoft.Support/preview/2023-06-01-preview/examples/ClassifyProblemClassificationsForSubscription.json
 */
async function classifyListOfProblemClassificationsForASpecifiedAzureServiceForASubscription() {
  const subscriptionId =
    process.env["SUPPORT_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const problemServiceName = "serviceId1";
  const problemClassificationsClassificationInput: ProblemClassificationsClassificationInput =
    {
      issueSummary: "Can not connect to Windows VM",
      resourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rgname/providers/Microsoft.Compute/virtualMachines/vmname",
    };
  const credential = new DefaultAzureCredential();
  const client = new MicrosoftSupport(credential, subscriptionId);
  const result = await client.problemClassifications.classifyProblems(
    problemServiceName,
    problemClassificationsClassificationInput,
  );
  console.log(result);
}

async function main() {
  classifyListOfProblemClassificationsForASpecifiedAzureServiceForASubscription();
}

main().catch(console.error);

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { HealthApi } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Parameters from "../models/parameters";
import { GeneratedClientContext } from "../generatedClientContext";
import { HealthApiGetServiceStatusOptionalParams } from "../models";

/** Class representing a HealthApi. */
export class HealthApiImpl implements HealthApi {
  private readonly client: GeneratedClientContext;

  /**
   * Initialize a new instance of the class HealthApi class.
   * @param client Reference to the service client
   */
  constructor(client: GeneratedClientContext) {
    this.client = client;
  }

  /**
   * Get service health status.
   * @param options The options parameters.
   */
  getServiceStatus(
    options?: HealthApiGetServiceStatusOptionalParams
  ): Promise<void> {
    return this.client.sendOperationRequest(
      { options },
      getServiceStatusOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer({}, /* isXml */ false);

const getServiceStatusOperationSpec: coreClient.OperationSpec = {
  path: "/api/health",
  httpMethod: "HEAD",
  responses: { 200: {}, default: {} },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host],
  serializer
};

/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { SparkJobDefinitionOperations } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as coreTracing from "@azure/core-tracing";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClientContext } from "../artifactsClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  SparkJobDefinitionResource,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams,
  SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionOptionalParams,
  SparkJobDefinitionGetSparkJobDefinitionResponse,
  SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams,
  SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams,
  SparkJobDefinitionExecuteSparkJobDefinitionResponse,
  ArtifactRenameRequest,
  SparkJobDefinitionRenameSparkJobDefinitionOptionalParams,
  SparkJobDefinitionDebugSparkJobDefinitionOptionalParams,
  SparkJobDefinitionDebugSparkJobDefinitionResponse,
  SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing SparkJobDefinitionOperations operations. */
export class SparkJobDefinitionOperationsImpl
  implements SparkJobDefinitionOperations {
  private readonly client: ArtifactsClientContext;

  /**
   * Initialize a new instance of the class SparkJobDefinitionOperations class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClientContext) {
    this.client = client;
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  public listSparkJobDefinitionsByWorkspace(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): PagedAsyncIterableIterator<SparkJobDefinitionResource> {
    const iter = this.getSparkJobDefinitionsByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.getSparkJobDefinitionsByWorkspacePagingPage(options);
      }
    };
  }

  private async *getSparkJobDefinitionsByWorkspacePagingPage(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): AsyncIterableIterator<SparkJobDefinitionResource[]> {
    let result = await this._getSparkJobDefinitionsByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._getSparkJobDefinitionsByWorkspaceNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *getSparkJobDefinitionsByWorkspacePagingAll(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): AsyncIterableIterator<SparkJobDefinitionResource> {
    for await (const page of this.getSparkJobDefinitionsByWorkspacePagingPage(
      options
    )) {
      yield* page;
    }
  }

  /**
   * Lists spark job definitions.
   * @param options The options parameters.
   */
  private async _getSparkJobDefinitionsByWorkspace(
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse> {
    const { span } = createSpan(
      "ArtifactsClient-_getSparkJobDefinitionsByWorkspace",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { options },
        getSparkJobDefinitionsByWorkspaceOperationSpec
      );
      return result as SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceResponse;
    } catch (error) {
      span.setStatus({
        code: coreTracing.SpanStatusCode.UNSET,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateSparkJobDefinition(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options?: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse
      >,
      SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse
    >
  > {
    const { span } = createSpan(
      "ArtifactsClient-beginCreateOrUpdateSparkJobDefinition",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse;
      } catch (error) {
        span.setStatus({
          code: coreTracing.SpanStatusCode.UNSET,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { sparkJobDefinitionName, sparkJobDefinition, options },
      createOrUpdateSparkJobDefinitionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Creates or updates a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param sparkJobDefinition Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginCreateOrUpdateSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    sparkJobDefinition: SparkJobDefinitionResource,
    options?: SparkJobDefinitionCreateOrUpdateSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionCreateOrUpdateSparkJobDefinitionResponse> {
    const poller = await this.beginCreateOrUpdateSparkJobDefinition(
      sparkJobDefinitionName,
      sparkJobDefinition,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Gets a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async getSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionGetSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionResponse> {
    const { span } = createSpan(
      "ArtifactsClient-getSparkJobDefinition",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { sparkJobDefinitionName, options },
        getSparkJobDefinitionOperationSpec
      );
      return result as SparkJobDefinitionGetSparkJobDefinitionResponse;
    } catch (error) {
      span.setStatus({
        code: coreTracing.SpanStatusCode.UNSET,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }

  /**
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginDeleteSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const { span } = createSpan(
      "ArtifactsClient-beginDeleteSparkJobDefinition",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as void;
      } catch (error) {
        span.setStatus({
          code: coreTracing.SpanStatusCode.UNSET,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { sparkJobDefinitionName, options },
      deleteSparkJobDefinitionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Deletes a Spark Job Definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginDeleteSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionDeleteSparkJobDefinitionOptionalParams
  ): Promise<void> {
    const poller = await this.beginDeleteSparkJobDefinition(
      sparkJobDefinitionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginExecuteSparkJobDefinition(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<SparkJobDefinitionExecuteSparkJobDefinitionResponse>,
      SparkJobDefinitionExecuteSparkJobDefinitionResponse
    >
  > {
    const { span } = createSpan(
      "ArtifactsClient-beginExecuteSparkJobDefinition",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as SparkJobDefinitionExecuteSparkJobDefinitionResponse;
      } catch (error) {
        span.setStatus({
          code: coreTracing.SpanStatusCode.UNSET,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { sparkJobDefinitionName, options },
      executeSparkJobDefinitionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
  }

  /**
   * Executes the spark job definition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param options The options parameters.
   */
  async beginExecuteSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    options?: SparkJobDefinitionExecuteSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionExecuteSparkJobDefinitionResponse> {
    const poller = await this.beginExecuteSparkJobDefinition(
      sparkJobDefinitionName,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Renames a sparkJobDefinition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async beginRenameSparkJobDefinition(
    sparkJobDefinitionName: string,
    request: ArtifactRenameRequest,
    options?: SparkJobDefinitionRenameSparkJobDefinitionOptionalParams
  ): Promise<PollerLike<PollOperationState<void>, void>> {
    const { span } = createSpan(
      "ArtifactsClient-beginRenameSparkJobDefinition",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<void> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as void;
      } catch (error) {
        span.setStatus({
          code: coreTracing.SpanStatusCode.UNSET,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { sparkJobDefinitionName, request, options },
      renameSparkJobDefinitionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Renames a sparkJobDefinition.
   * @param sparkJobDefinitionName The spark job definition name.
   * @param request proposed new name.
   * @param options The options parameters.
   */
  async beginRenameSparkJobDefinitionAndWait(
    sparkJobDefinitionName: string,
    request: ArtifactRenameRequest,
    options?: SparkJobDefinitionRenameSparkJobDefinitionOptionalParams
  ): Promise<void> {
    const poller = await this.beginRenameSparkJobDefinition(
      sparkJobDefinitionName,
      request,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginDebugSparkJobDefinition(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: SparkJobDefinitionDebugSparkJobDefinitionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<SparkJobDefinitionDebugSparkJobDefinitionResponse>,
      SparkJobDefinitionDebugSparkJobDefinitionResponse
    >
  > {
    const { span } = createSpan(
      "ArtifactsClient-beginDebugSparkJobDefinition",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as SparkJobDefinitionDebugSparkJobDefinitionResponse;
      } catch (error) {
        span.setStatus({
          code: coreTracing.SpanStatusCode.UNSET,
          message: error.message
        });
        throw error;
      } finally {
        span.end();
      }
    };
    const sendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ) => {
      let currentRawResponse:
        | coreClient.FullOperationResponse
        | undefined = undefined;
      const providedCallback = args.options?.onResponse;
      const callback: coreClient.RawResponseCallback = (
        rawResponse: coreClient.FullOperationResponse,
        flatResponse: unknown
      ) => {
        currentRawResponse = rawResponse;
        providedCallback?.(rawResponse, flatResponse);
      };
      const updatedArgs = {
        ...args,
        options: {
          ...args.options,
          onResponse: callback
        }
      };
      const flatResponse = await directSendOperation(updatedArgs, spec);
      return {
        flatResponse,
        rawResponse: {
          statusCode: currentRawResponse!.status,
          body: currentRawResponse!.parsedBody,
          headers: currentRawResponse!.headers.toJSON()
        }
      };
    };

    const lro = new LroImpl(
      sendOperation,
      { sparkJobDefinitionAzureResource, options },
      debugSparkJobDefinitionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs,
      lroResourceLocationConfig: "location"
    });
  }

  /**
   * Debug the spark job definition.
   * @param sparkJobDefinitionAzureResource Spark Job Definition resource definition.
   * @param options The options parameters.
   */
  async beginDebugSparkJobDefinitionAndWait(
    sparkJobDefinitionAzureResource: SparkJobDefinitionResource,
    options?: SparkJobDefinitionDebugSparkJobDefinitionOptionalParams
  ): Promise<SparkJobDefinitionDebugSparkJobDefinitionResponse> {
    const poller = await this.beginDebugSparkJobDefinition(
      sparkJobDefinitionAzureResource,
      options
    );
    return poller.pollUntilDone();
  }

  /**
   * GetSparkJobDefinitionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 GetSparkJobDefinitionsByWorkspace method.
   * @param options The options parameters.
   */
  private async _getSparkJobDefinitionsByWorkspaceNext(
    nextLink: string,
    options?: SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextOptionalParams
  ): Promise<SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse> {
    const { span } = createSpan(
      "ArtifactsClient-_getSparkJobDefinitionsByWorkspaceNext",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { nextLink, options },
        getSparkJobDefinitionsByWorkspaceNextOperationSpec
      );
      return result as SparkJobDefinitionGetSparkJobDefinitionsByWorkspaceNextResponse;
    } catch (error) {
      span.setStatus({
        code: coreTracing.SpanStatusCode.UNSET,
        message: error.message
      });
      throw error;
    } finally {
      span.end();
    }
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const getSparkJobDefinitionsByWorkspaceOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept],
  serializer
};
const createOrUpdateSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    201: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    202: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    204: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.sparkJobDefinition,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [
    Parameters.accept,
    Parameters.contentType,
    Parameters.ifMatch
  ],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionResource
    },
    304: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.ifNoneMatch],
  serializer
};
const deleteSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}",
  httpMethod: "DELETE",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const executeSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/execute",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept],
  serializer
};
const renameSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/sparkJobDefinitions/{sparkJobDefinitionName}/rename",
  httpMethod: "POST",
  responses: {
    200: {},
    201: {},
    202: {},
    204: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.request,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.sparkJobDefinitionName],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const debugSparkJobDefinitionOperationSpec: coreClient.OperationSpec = {
  path: "/debugSparkJobDefinition",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.SparkBatchJob
    },
    201: {
      bodyMapper: Mappers.SparkBatchJob
    },
    202: {
      bodyMapper: Mappers.SparkBatchJob
    },
    204: {
      bodyMapper: Mappers.SparkBatchJob
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.sparkJobDefinitionAzureResource,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const getSparkJobDefinitionsByWorkspaceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.SparkJobDefinitionsListResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint, Parameters.nextLink],
  headerParameters: [Parameters.accept],
  serializer
};

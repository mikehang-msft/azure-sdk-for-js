/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { createSpan } from "../tracing";
import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DataFlowDebugSession } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as coreTracing from "@azure/core-tracing";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { ArtifactsClientContext } from "../artifactsClientContext";
import { PollerLike, PollOperationState, LroEngine } from "@azure/core-lro";
import { LroImpl } from "../lroImpl";
import {
  DataFlowDebugSessionInfo,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextOptionalParams,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams,
  CreateDataFlowDebugSessionRequest,
  DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams,
  DataFlowDebugSessionCreateDataFlowDebugSessionResponse,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse,
  DataFlowDebugPackage,
  DataFlowDebugSessionAddDataFlowOptionalParams,
  DataFlowDebugSessionAddDataFlowResponse,
  DeleteDataFlowDebugSessionRequest,
  DataFlowDebugSessionDeleteDataFlowDebugSessionOptionalParams,
  DataFlowDebugCommandRequest,
  DataFlowDebugSessionExecuteCommandOptionalParams,
  DataFlowDebugSessionExecuteCommandResponse,
  DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DataFlowDebugSession operations. */
export class DataFlowDebugSessionImpl implements DataFlowDebugSession {
  private readonly client: ArtifactsClientContext;

  /**
   * Initialize a new instance of the class DataFlowDebugSession class.
   * @param client Reference to the service client
   */
  constructor(client: ArtifactsClientContext) {
    this.client = client;
  }

  /**
   * Query all active data flow debug sessions.
   * @param options The options parameters.
   */
  public listQueryDataFlowDebugSessionsByWorkspace(
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams
  ): PagedAsyncIterableIterator<DataFlowDebugSessionInfo> {
    const iter = this.queryDataFlowDebugSessionsByWorkspacePagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.queryDataFlowDebugSessionsByWorkspacePagingPage(options);
      }
    };
  }

  private async *queryDataFlowDebugSessionsByWorkspacePagingPage(
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams
  ): AsyncIterableIterator<DataFlowDebugSessionInfo[]> {
    let result = await this._queryDataFlowDebugSessionsByWorkspace(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._queryDataFlowDebugSessionsByWorkspaceNext(
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *queryDataFlowDebugSessionsByWorkspacePagingAll(
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams
  ): AsyncIterableIterator<DataFlowDebugSessionInfo> {
    for await (const page of this.queryDataFlowDebugSessionsByWorkspacePagingPage(
      options
    )) {
      yield* page;
    }
  }

  /**
   * Creates a data flow debug session.
   * @param request Data flow debug session definition
   * @param options The options parameters.
   */
  async beginCreateDataFlowDebugSession(
    request: CreateDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<
        DataFlowDebugSessionCreateDataFlowDebugSessionResponse
      >,
      DataFlowDebugSessionCreateDataFlowDebugSessionResponse
    >
  > {
    const { span } = createSpan(
      "ArtifactsClient-beginCreateDataFlowDebugSession",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DataFlowDebugSessionCreateDataFlowDebugSessionResponse> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as DataFlowDebugSessionCreateDataFlowDebugSessionResponse;
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
      { request, options },
      createDataFlowDebugSessionOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Creates a data flow debug session.
   * @param request Data flow debug session definition
   * @param options The options parameters.
   */
  async beginCreateDataFlowDebugSessionAndWait(
    request: CreateDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionCreateDataFlowDebugSessionOptionalParams
  ): Promise<DataFlowDebugSessionCreateDataFlowDebugSessionResponse> {
    const poller = await this.beginCreateDataFlowDebugSession(request, options);
    return poller.pollUntilDone();
  }

  /**
   * Query all active data flow debug sessions.
   * @param options The options parameters.
   */
  private async _queryDataFlowDebugSessionsByWorkspace(
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceOptionalParams
  ): Promise<
    DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse
  > {
    const { span } = createSpan(
      "ArtifactsClient-_queryDataFlowDebugSessionsByWorkspace",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { options },
        queryDataFlowDebugSessionsByWorkspaceOperationSpec
      );
      return result as DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceResponse;
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
   * Add a data flow into debug session.
   * @param request Data flow debug session definition with debug content.
   * @param options The options parameters.
   */
  async addDataFlow(
    request: DataFlowDebugPackage,
    options?: DataFlowDebugSessionAddDataFlowOptionalParams
  ): Promise<DataFlowDebugSessionAddDataFlowResponse> {
    const { span } = createSpan("ArtifactsClient-addDataFlow", options || {});
    try {
      const result = await this.client.sendOperationRequest(
        { request, options },
        addDataFlowOperationSpec
      );
      return result as DataFlowDebugSessionAddDataFlowResponse;
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
   * Deletes a data flow debug session.
   * @param request Data flow debug session definition for deletion
   * @param options The options parameters.
   */
  async deleteDataFlowDebugSession(
    request: DeleteDataFlowDebugSessionRequest,
    options?: DataFlowDebugSessionDeleteDataFlowDebugSessionOptionalParams
  ): Promise<void> {
    const { span } = createSpan(
      "ArtifactsClient-deleteDataFlowDebugSession",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { request, options },
        deleteDataFlowDebugSessionOperationSpec
      );
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
  }

  /**
   * Execute a data flow debug command.
   * @param request Data flow debug command definition.
   * @param options The options parameters.
   */
  async beginExecuteCommand(
    request: DataFlowDebugCommandRequest,
    options?: DataFlowDebugSessionExecuteCommandOptionalParams
  ): Promise<
    PollerLike<
      PollOperationState<DataFlowDebugSessionExecuteCommandResponse>,
      DataFlowDebugSessionExecuteCommandResponse
    >
  > {
    const { span } = createSpan(
      "ArtifactsClient-beginExecuteCommand",
      options || {}
    );
    const directSendOperation = async (
      args: coreClient.OperationArguments,
      spec: coreClient.OperationSpec
    ): Promise<DataFlowDebugSessionExecuteCommandResponse> => {
      try {
        const result = await this.client.sendOperationRequest(args, spec);
        return result as DataFlowDebugSessionExecuteCommandResponse;
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
      { request, options },
      executeCommandOperationSpec
    );
    return new LroEngine(lro, {
      resumeFrom: options?.resumeFrom,
      intervalInMs: options?.updateIntervalInMs
    });
  }

  /**
   * Execute a data flow debug command.
   * @param request Data flow debug command definition.
   * @param options The options parameters.
   */
  async beginExecuteCommandAndWait(
    request: DataFlowDebugCommandRequest,
    options?: DataFlowDebugSessionExecuteCommandOptionalParams
  ): Promise<DataFlowDebugSessionExecuteCommandResponse> {
    const poller = await this.beginExecuteCommand(request, options);
    return poller.pollUntilDone();
  }

  /**
   * QueryDataFlowDebugSessionsByWorkspaceNext
   * @param nextLink The nextLink from the previous successful call to the
   *                 QueryDataFlowDebugSessionsByWorkspace method.
   * @param options The options parameters.
   */
  private async _queryDataFlowDebugSessionsByWorkspaceNext(
    nextLink: string,
    options?: DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextOptionalParams
  ): Promise<
    DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse
  > {
    const { span } = createSpan(
      "ArtifactsClient-_queryDataFlowDebugSessionsByWorkspaceNext",
      options || {}
    );
    try {
      const result = await this.client.sendOperationRequest(
        { nextLink, options },
        queryDataFlowDebugSessionsByWorkspaceNextOperationSpec
      );
      return result as DataFlowDebugSessionQueryDataFlowDebugSessionsByWorkspaceNextResponse;
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

const createDataFlowDebugSessionOperationSpec: coreClient.OperationSpec = {
  path: "/createDataFlowDebugSession",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    201: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    202: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    204: {
      bodyMapper: Mappers.CreateDataFlowDebugSessionResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.request1,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const queryDataFlowDebugSessionsByWorkspaceOperationSpec: coreClient.OperationSpec = {
  path: "/queryDataFlowDebugSessions",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.QueryDataFlowDebugSessionsResponse
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
const addDataFlowOperationSpec: coreClient.OperationSpec = {
  path: "/addDataFlowToDebugSession",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AddDataFlowToDebugSessionResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.request2,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteDataFlowDebugSessionOperationSpec: coreClient.OperationSpec = {
  path: "/deleteDataFlowDebugSession",
  httpMethod: "POST",
  responses: {
    200: {},
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.request3,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const executeCommandOperationSpec: coreClient.OperationSpec = {
  path: "/executeDataFlowDebugCommand",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    201: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    202: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    204: {
      bodyMapper: Mappers.DataFlowDebugCommandResponse
    },
    default: {
      bodyMapper: Mappers.CloudErrorAutoGenerated
    }
  },
  requestBody: Parameters.request4,
  queryParameters: [Parameters.apiVersion1],
  urlParameters: [Parameters.endpoint],
  headerParameters: [Parameters.accept, Parameters.contentType],
  mediaType: "json",
  serializer
};
const queryDataFlowDebugSessionsByWorkspaceNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.QueryDataFlowDebugSessionsResponse
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
